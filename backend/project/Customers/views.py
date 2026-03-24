from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from Customers.serializers import UserFormSerializer
from Customers.models import CustomerForm
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from Customers.models import CustomerForm
from Products.models import Cart_Items, Products
from groups.models import *
from django.db.models import Q




# registers a new customer
class SubmitUserRegistrationForm(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format=None):
        serializer = UserFormSerializer(data=request.data)

        if serializer.is_valid():
            customer_name = request.data.get("customer_name")
            customer_email = request.data.get("email")
            customer_phoneno = request.data.get("phone_number")
            password = request.data.get("password")

            if User.objects.filter(email=customer_email).exists():
                return Response(
                    {'message': 'email id already registered'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            user = User.objects.create(
                username=customer_email,
                email=customer_email
            )
            user.set_password(password)
            user.save()

            CustomerForm.objects.create(
                customer=user,
                customer_name=customer_name,
                phone_number=customer_phoneno,
                customer_email=customer_email,
            )

            return Response(
                {'message': 'form submitted successfully'},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# authenticate & logins a customer
class UserLogin(APIView):
    permission_classes = []

    def post(self, request, format=None):
        user_email = request.data.get("email")
        password = request.data.get("password")

        try:

            user_obj = User.objects.get(email=user_email)
            user = authenticate(username=user_obj.username, password=password)

            if user is not None:

                is_shg = Shg_Group_Registration.objects.filter(
                    shg_id=user.id).exists()
                if is_shg:
                    return Response({'message': 'SHG admins must use the Admin Login portal'}, status=status.HTTP_403_FORBIDDEN)

                try:
                    is_customer = CustomerForm.objects.filter(
                        customer_email=user_email).exists()

                    if not is_customer:
                        return Response({'message': 'Access denied: No customer profile found'}, status=status.HTTP_403_FORBIDDEN)

                    refresh = RefreshToken.for_user(user)
                    return Response({
                        'message': 'user logged in successfully',
                        'access': str(refresh.access_token),
                        'refresh': str(refresh)
                    }, status=status.HTTP_200_OK)

                except Exception as model_err:
                    print(f"Model Error: {str(model_err)}")
                    return Response({'message': 'Database configuration error in Customer profile'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'message': 'invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({'message': 'user not registered'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(f"General Login Error: {str(e)}")
            return Response({'message': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# fetches the username of customer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_username(request):
    username = User.objects.filter(id=request.user.id).values("email")
    return Response({"username": username})




# fetches the details of customer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile_data(request):
    user_details = CustomerForm.objects.filter(customer_id=request.user.id).values("customer_name", "customer_email", "phone_number",
                                                                                   "address")
    return Response({"user_details": user_details})




# adds the product to the customer cart
@api_view(['POST'])
@permission_classes([AllowAny])
def add_to_cart(request):
    if not request.user.is_authenticated:
        return Response({"message": "Authentication required to add items to cart."}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        product_id = request.data.get("product_id")
        quantity = request.data.get("quantity")
        user_id = CustomerForm.objects.get(customer_id=request.user.id)
        if not Products.objects.filter(id=product_id).exists():
            return Response({"message": "Products does not exists"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if Products.objects.get(id=product_id).stock_quantity >= quantity:
                if Cart_Items.objects.filter(product_id=product_id, user_id=user_id).exists():
                    cart_item = Cart_Items.objects.get(
                        product_id=product_id, user_id=user_id)
                    cart_item.quantity += quantity
                    cart_item.save()
                    return Response({"message": " Product quantity updated in the Cart Successfully"}, status=status.HTTP_200_OK)
                else:
                    Cart_Items.objects.create(user_id=user_id, product_id=Products.objects.get(
                        id=product_id), quantity=quantity, shg_group_id=Products.objects.get(id=product_id).shg_group_id)
                    return Response({"message": " Product added to the Cart Successfully"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"message": " Insufficient stock for the product"}, status=status.HTTP_400_BAD_REQUEST)




# adds the product to the customer cart
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    product_id = request.data.get("product_id")
    user_id = CustomerForm.objects.get(customer_id=request.user.id)
    if not Products.objects.filter(id=product_id).exists():
        return Response({"message": "Products does not exists"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        if Cart_Items.objects.filter(product_id=product_id, user_id=user_id).exists():
            cart_item = Cart_Items.objects.get(
                product_id=product_id, user_id=user_id)
            cart_item.delete()
            return Response({"message": " Product removed from the Cart Successfully"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": " Product not found in the Cart"}, status=status.HTTP_400_BAD_REQUEST)




# fetches the cart data of customer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def view_cart(request):
    cart_items = Cart_Items.objects.filter(
        user_id__customer_id=request.user.id
    ).values(
        "product_id__id",
        "product_id__product_name",
        "product_id__price",
        "product_id__image",
        "quantity"
    )

    return Response(
        {"cart_items": cart_items},
        status=status.HTTP_200_OK
    )




# creates an order of products which is purchased by customer
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def purchase_now(request):
    user_id = CustomerForm.objects.get(customer_id=request.user.id)
    product_id = request.data.get("product_id")
    quantity = request.data.get("quantity")
    if Products.objects.filter(id=product_id).exists():
        product = Products.objects.get(id=product_id)
        if product.stock_quantity >= quantity:
            product.stock_quantity -= quantity
            product.save()
            Order_Items.objects.create(
                customer_id=user_id,
                product_id=product,
                quantity=quantity,
                price_at_time_of_order=product.price,
                shg_groups_id=product.shg_group_id
            )
            return Response({"message": " Purchase successful"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": " Insufficient stock for the product"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({"message": " Products does not exists"}, status=status.HTTP_400_BAD_REQUEST)




# fetches the order pending history of customer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def order_history(request):
    customer_id = CustomerForm.objects.filter(
        customer_id=request.user.id).values_list("id", flat=True)
    order_items_list = Order_Items.objects.filter(customer_id_id=customer_id[0], delivered_order=False).filter( Q(shipped_order=True) | Q(shipped_order=False)).select_related("product_id_id").values(
        "product_id__id",
        "product_id__product_name",
        "product_id__image",
        "product_id__category",
        "product_id__description",
        "quantity",
        "price_at_time_of_order",
        "shipped_order",
        "delivered_order",
        "action",)
   
    if not order_items_list:
        return Response({"message": "items not found"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"order_items_list": order_items_list})




# fetches the delivered order history of customer
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def delivered_history(request):
    customer_id = CustomerForm.objects.filter(
        customer_id=request.user.id).values_list("id", flat=True)
    delivered_items_list = Order_Items.objects.filter(customer_id_id=customer_id[0], delivered_order=True, shipped_order=True, action='APPROVED').select_related("product_id_id").values(
        "product_id__id",
        "product_id__product_name",
        "product_id__image",
        "product_id__category",
        "product_id__description",
        "quantity",
        "price_at_time_of_order",
        "shipped_order",
        "delivered_order",
        "action",)
 
    if not delivered_items_list:
        return Response({"message": "items not found"}, status=status.HTTP_400_BAD_REQUEST)
    return Response({"delivered_items_list": delivered_items_list})




# updates the user profile data in database
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    customer_name = request.data.get("customer_name")
    customer_email = request.data.get("customer_email")
    phone_number = request.data.get("phone_number")
    address = request.data.get("address")
    customer_id = User.objects.filter(
        id=request.user.id).values_list("id", flat=True)
    if CustomerForm.objects.filter(customer_id=customer_id[0]).exists():
        user_email = User.objects.get(id=request.user.id)
        customer = CustomerForm.objects.get(customer_id=customer_id[0])
        user_email.username = customer_email
        user_email.email = customer_email
        customer.customer_name = customer_name
        customer.customer_email = customer_email
        customer.phone_number = phone_number
        customer.address = address
        user_email.save()
        customer.save()
        return Response({"message": "profile updated"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "profile updation failed"},  status=status.HTTP_400_BAD_REQUEST)
