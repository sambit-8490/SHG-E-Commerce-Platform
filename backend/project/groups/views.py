from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from groups.models import Shg_Group_Registration
from groups.serializers import ShgFormSerializer, AdminPanelSerializer
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from groups.models import Order_Items
from rest_framework.decorators import api_view, permission_classes
from common.email import send_email
from Products.models import Products



# registers a new group
class SubmitRegistrationForm(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = ShgFormSerializer(data=request.data)

        if serializer.is_valid():
            shg_username = request.data.get("email")
            shg_password = request.data.get("password")

            shg_user = User.objects.create(
                username=shg_username,
                email=shg_username,
                is_staff=True
            )
            shg_user.set_password(shg_password)
            shg_user.save()
            Shg_Group_Registration.objects.create(
                shg=shg_user,
                name_of_shg=serializer.validated_data['name_of_shg'],
                date_of_formation=serializer.validated_data['date_of_formation'],
                registration_number=serializer.validated_data['registration_number'],
                contact_number=serializer.validated_data['contact_number'],
                village=serializer.validated_data['village'],
                taluka=serializer.validated_data['taluka'],
                district=serializer.validated_data['district'],
                type_of_shg=serializer.validated_data['type_of_shg'],
                address=serializer.validated_data['address'],
                image=serializer.validated_data.get('image')
            )

            refresh = RefreshToken.for_user(shg_user)

            return Response({
                "message": "Group registered & logged in successfully",
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# authenticate & logins a group
class AdminLogin(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request, format=None):
        username = request.data.get('email')
        password = request.data.get('password')
        try:
            if '@' not in username:
                return Response({'message': 'invalid email id'}, status=status.HTTP_400_BAD_REQUEST)

            user_obj = User.objects.get(email=username)
            user = authenticate(username=user_obj.username, password=password)

            if user is not None:
                # Role Check: Check if user is registered in the SHG table
                is_shg = Shg_Group_Registration.objects.filter(
                    shg_id=user.id).exists()

                if not is_shg:
                    return Response({'message': 'Access denied: You are not registered as an SHG group'}, status=status.HTTP_403_FORBIDDEN)

                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'shg logged in successfully',
                    'access': str(refresh.access_token),
                    'refresh': str(refresh)
                }, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({'message': 'user not registered'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'message': f'Server error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# create a new product of group
class AdminPanelView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        user = request.user
        serializer = AdminPanelSerializer(data=request.data)

        try:
            shg_group = Shg_Group_Registration.objects.get(shg=user)

        except Shg_Group_Registration.DoesNotExist:
            return Response({'message': 'No SHG profile found for this user.'}, status=status.HTTP_400_BAD_REQUEST)

        if serializer.is_valid():
            serializer.save(shg_group_id=shg_group)
            return Response({'message': 'Product added Successfully'}, status=status.HTTP_201_CREATED)
        else:
            print("Serializer Errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# approve or reject the order
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def approve_or_reject_order(request):
    Shg_id = Shg_Group_Registration.objects.get(shg_id=request.user.id)
    order_id = request.data.get("order_id")
    action = request.data.get("action")
    try:
        order_item = Order_Items.objects.get(
            id=order_id, shg_groups_id=Shg_id)
        if action in ['APPROVED', 'REJECTED']:
            order_item.action = action
            order_item.save()
            if action == 'APPROVED':
                product = order_item.product_id
                product.stock_quantity -= order_item.quantity
                product.save()
            order_item.action = action
            order_item.save()
            return Response({"message": f"Order {action.lower()} successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)
    except Order_Items.DoesNotExist:
        return Response({"message": "Order item not found"}, status=status.HTTP_404_NOT_FOUND)




# checks if order is shipped or not & send mail ones shipped
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def is_shipped(request):
    order_id = request.data.get("order_id")
    try:
        order_item = Order_Items.objects.get(
            id=order_id, shg_groups_id__shg_id=request.user.id)
        order_item.shipped_order = True
        order_item.save()

        main_order = order_item.order_id
        main_order.order_status = 'Shipped'
        main_order.save()

        distributer_email = request.user.email
        customer_email = order_item.customer_id.customer_email

        if customer_email and distributer_email:
            mail_sub = "Your Order Has Been Shipped"
            message = """
            Hello,

            We’re happy to let you know that your order has been shipped and is on its way to you.

            Shipment details:

            Order Number: [Order Number]

            Carrier: [Shipping Carrier]

            Tracking Number: [Tracking Number]

            Estimated Delivery Date: [Estimated Delivery Date]

            You can track your shipment using the tracking number provided above. If you have any questions or need further assistance, feel free to contact us.

            Thank you for your business—we hope you enjoy your purchase!

            Best regards,
            Customer Support Team
            """

            try:
                send_email(request, distributer_email,
                           customer_email, message, mail_sub)
            except Exception as email_err:
                print(f"Email delivery failed: {str(email_err)}")

        return Response({"message": "Order marked as shipped successfully"}, status=status.HTTP_200_OK)

    except Order_Items.DoesNotExist:
        return Response({"message": "Order item not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"message": f"Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# marks order as delivered
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_delivered(request):
    order_item_id = request.data.get("order_id")
    try:
        order_item = Order_Items.objects.get(
            id=order_item_id, shg_groups_id__shg_id=request.user.id)

        if not order_item.shipped_order:
            return Response({"message": "Order must be marked as shipped before delivery confirmation."}, status=status.HTTP_400_BAD_REQUEST)

        order_item.delivered_order = True
        order_item.save()

        main_order = order_item.order_id
        main_order.order_status = 'Delivered'
        main_order.save()

        distributer_email = request.user.email
        customer_email = order_item.customer_id.customer_email

        if customer_email and distributer_email:
            mail_sub = "Your Order Has Been Delivered"
            message = f"""
            Hello,

            Your order for {order_item.product_id.product_name} has been successfully delivered.

            We hope you are satisfied with your purchase. Thank you for supporting our Self-Help Group!

            Best regards,
            Customer Support Team
            """
            try:
                send_email(request, distributer_email,
                           customer_email, message, mail_sub)
            except Exception as email_err:
                print(f"Email delivery failed: {str(email_err)}")

        return Response({"message": "Order delivered successfully!"}, status=status.HTTP_200_OK)

    except Order_Items.DoesNotExist:
        return Response({"message": "Order record not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# fetches the group profile data
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_profile_data(request, format=None):
    group_email = User.objects.filter(id=request.user.id).values("username")
    shg_grp_details = Shg_Group_Registration.objects.filter(shg_id=request.user.id).values(
        "name_of_shg", "date_of_formation", "registration_number", "contact_number", "village", "taluka", "district", "type_of_shg", "address", "image")
    return Response({"group_email": group_email, "shg_grp_details": shg_grp_details})




# updates the group profile data in database
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_group_profile_data(request):
    name_of_shg = request.data.get("name_of_shg")
    date_of_formation = request.data.get("date_of_formation")
    registration_number = request.data.get("registration_number")
    contact_number = request.data.get("contact_number")
    village = request.data.get("village")
    taluka = request.data.get("taluka")
    district = request.data.get("district")
    type_of_shg = request.data.get("type_of_shg")
    email = request.data.get("username")
    address = request.data.get("address")
    group_image = request.FILES.get("image")
    group_id = User.objects.filter(
        id=request.user.id).values_list("id", flat=True)
    if Shg_Group_Registration.objects.filter(shg_id=group_id[0]).exists():
        group_email = User.objects.get(id=request.user.id)
        group = Shg_Group_Registration.objects.get(shg_id=group_id[0])
        group_email.username = email
        group_email.email = email
        group.name_of_shg = name_of_shg
        group.date_of_formation = date_of_formation
        group.registration_number = registration_number
        group.contact_number = contact_number
        group.village = village
        group.taluka = taluka
        group.district = district
        group.type_of_shg = type_of_shg
        group.address = address
        group.image = group_image
        group_email.save()
        group.save()
        return Response({"message": "profile updated"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "profile updation failed"},  status=status.HTTP_400_BAD_REQUEST)




# fetches the product data of of a particular groups
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_group_products_data(request, format=None):
    shg_group_id = Shg_Group_Registration.objects.get(shg_id=request.user.id)
    products_list = Products.objects.filter(shg_group_id_id=shg_group_id).values("id",
                                                                                 "product_name", "category", "description", "image", "price", "stock_quantity")
    return Response({"products_list": products_list, })




# fetches the order items by customers of particular group
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_shg_orders(request):
    try:
        shg_group = Shg_Group_Registration.objects.get(shg_id=request.user.id)
        orders = Order_Items.objects.filter(shg_groups_id=shg_group).select_related('customer_id', 'product_id').values(
            "id",
            "customer_id__customer_name",
            "product_id__product_name",
            "quantity",
            "price_at_time_of_order",
            "action",
            "shipped_order",
            "delivered_order"
        ).order_by('-id')

        return Response({"orders_list": list(orders)}, status=status.HTTP_200_OK)

    except Shg_Group_Registration.DoesNotExist:
        return Response({"message": "SHG profile not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error: {str(e)}")
        return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# fetches the order items by customers of particular group
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_shg_orders(request):
    try:
        shg_group = Shg_Group_Registration.objects.get(shg_id=request.user.id)
        orders = Order_Items.objects.filter(shg_groups_id=shg_group).values(
            "id",
            "customer_id__customer_name",
            "product_id__product_name",
            "quantity",
            "price_at_time_of_order",
            "action",
            "shipped_order",
            "delivered_order"
        ).order_by('-id')

        return Response({"orders_list": list(orders)}, status=status.HTTP_200_OK)

    except Shg_Group_Registration.DoesNotExist:
        return Response({"message": "SHG profile not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(f"Error: {str(e)}")
        return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# fetches the data of all groups
@api_view(['GET'])
@permission_classes([AllowAny])
def get_groups_data(request, format=None):
    shg_grp_list = Shg_Group_Registration.objects.values(
        "name_of_shg", "date_of_formation", "registration_number", "contact_number", "village", "taluka", "district", "type_of_shg", "address", "image")
    return Response({"shg_grp_list": shg_grp_list})
