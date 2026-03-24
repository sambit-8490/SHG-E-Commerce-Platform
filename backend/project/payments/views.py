import stripe
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from Customers.models import CustomerForm, Customer_Orders
from Products.models import Cart_Items
from groups.models import Order_Items
from common.email import send_email

# secret key
stripe.api_key = settings.STRIPE_SECRET_KEY

# creates an payment intent
@api_view(['POST'])
@permission_classes([AllowAny])
def create_payment_intent(request):
    amount = request.data.get("amount")

    intent = stripe.PaymentIntent.create(
        amount=int(amount) * 100,
        currency="inr",
        payment_method_types=["card"],
    )

    return Response({
        "client_secret": intent.client_secret,
        "publishable_key": settings.STRIPE_PUBLISHABLE_KEY
    })




# confirms the card payment (online payment) & send payment confirmation mail
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirm_payment(request):
    payment_intent_id = request.data.get("payment_intent_id")
    user_id = request.user.id

    intent = stripe.PaymentIntent.retrieve(payment_intent_id)

    if intent.status != "succeeded":
        return Response({"error": "Payment not successful"}, status=400)

    customer = CustomerForm.objects.get(customer_id=user_id)
    cart_items = Cart_Items.objects.filter(user_id=customer)

    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)

    total_amount = 0

    for item in cart_items:
        total_amount += item.quantity * item.product_id.price

    shipping_address = (
        customer.address
        if hasattr(customer, "address") and customer.address
        else "Address not provided"
    )

    order = Customer_Orders.objects.create(
        customer_id=customer,
        total_amount=total_amount,
        shipping_address=shipping_address,
        order_status="PENDING"
    )

    default_email = "contact@shgbazar.org"
    mail_sub = "Payment Successful & Order Confirmed"
    confirm_message = f"""
    Hello {request.user.username},
    
    Thank you for your purchase on SHG Bazar! 🎉
    
    We’re happy to inform you that your payment has been successfully processed and your order has been placed.
    
    🧾 Order Details:
    - Order Status: Pending
    - Total Amount: ₹{total_amount}
    - Shipping Address: {shipping_address}
    
    Your order is currently being prepared and will be processed shortly. You will be notified once it is shipped.
    
    If you did not authorize this payment or notice any discrepancy, please contact our support team immediately.
    
    Thank you for supporting SHG communities and shopping with SHG Bazar.
    
    Warm regards,
    SHG Bazar Support Team
    contact@shgbazar.org
"""

    for item in cart_items:
        product = item.product_id

        if product.stock_quantity < item.quantity:
            return Response({"error": "Insufficient stock"}, status=400)

        Order_Items.objects.create(
            order_id=order,
            customer_id=customer,
            product_id=product,
            quantity=item.quantity,
            price_at_time_of_order=product.price,
            shg_groups_id=product.shg_group_id
        )

        product.stock_quantity -= item.quantity
        product.save()

    send_email(request, default_email, customer.customer_name,
               confirm_message, mail_sub)
    cart_items.delete()

    return Response({"status": "order_created"})




# confirms the cash on delivery & send sends confirmation mail
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cash_on_delivery(request):
    user_id = request.user.id
    customer = CustomerForm.objects.get(customer_id=user_id)
    cart_items = Cart_Items.objects.filter(user_id=customer)

    if not cart_items.exists():
        return Response({"error": "Cart is empty"}, status=400)

    total_amount = 0

    for item in cart_items:
        total_amount += item.quantity * item.product_id.price

    shipping_address = (
        customer.address
        if hasattr(customer, "address") and customer.address
        else "Address not provided"
    )

    order = Customer_Orders.objects.create(
        customer_id=customer,
        total_amount=total_amount,
        shipping_address=shipping_address,
        order_status="PENDING"
    )

    default_email = "contact@shgbazar.org"
    mail_sub = "Order Placed Successfully – Cash on Delivery"

    confirm_message = f"""
    Hello {request.user.username},

    Thank you for placing your order on SHG Bazar! 🛍️

    Your order has been successfully placed with **Cash on Delivery** as the selected payment method.

    🧾 Order Details:
    - Payment Method: Cash on Delivery
    - Order Status: Pending
    - Total Amount Payable: ₹{total_amount}
    - Shipping Address: {shipping_address}

    Please keep the exact amount ready at the time of delivery. Our team is currently processing your order, and you will be notified once it is shipped.

    If you did not place this order or notice any issue, please contact our support team immediately.

    Thank you for supporting SHG communities and shopping with SHG Bazar.

    Warm regards,  
    SHG Bazar Support Team  
    contact@shgbazar.org
"""

    for item in cart_items:
        product = item.product_id

        if product.stock_quantity < item.quantity:
            return Response({"error": "Insufficient stock"}, status=400)

        Order_Items.objects.create(
            order_id=order,
            customer_id=customer,
            product_id=product,
            quantity=item.quantity,
            price_at_time_of_order=product.price,
            shg_groups_id=product.shg_group_id
        )

        product.stock_quantity -= item.quantity
        product.save()

    send_email(request, default_email, customer.customer_name,
               confirm_message, mail_sub)
    cart_items.delete()

    return Response({"status": "order_created"})
