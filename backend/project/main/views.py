from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from common.email import send_email



# generates a reset link email & send to user
@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    reset_email = request.data.get("email")
    user = User.objects.filter(email=reset_email).first()
    if not user:
        return Response({"message": "user not found!"}, status=status.HTTP_404_NOT_FOUND)
    
    uid = urlsafe_base64_encode(force_bytes(user.id))
    token = PasswordResetTokenGenerator().make_token(user)
    default_email = "contact@shgbazar.org"
    mail_sub = "Password Reset Link"
    
    message = f"""
    Hello,

    You requested a password reset for your account. Click on the link below to set a new password:

    http://127.0.0.1:5173/resetpassword/?uid={uid}&token={token}

    If you did not request this, please ignore this email.

    Best regards,
    SHG Bazar Support Team
    """
    
    try:
        send_email(request, default_email, reset_email, message, mail_sub)
    except Exception as e:
        print(f"Reset email failed: {str(e)}")

    return Response({"message": "Reset link generated and sent to your email."})




# sets a new password in database
@api_view(['POST'])
@permission_classes([AllowAny])
def set_new_password(request):
    uid = request.data.get("uid")
    token = request.data.get("token")
    new_password = request.data.get("newpassword")
    
    if not uid or not token or not new_password:
        return Response({"message": "uid, token and new_password are required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user_id = urlsafe_base64_decode(uid).decode()
        user = User.objects.get(id=user_id)
    except:
        return Response({"message": "invalid uid"}, status=status.HTTP_400_BAD_REQUEST)
    
    if PasswordResetTokenGenerator().check_token(user, token):
        user.set_password(new_password)
        user.save()
        
        default_email = "contact@shgbazar.org"
        mail_sub = "Your Password Has Been Changed"
        confirm_message = f"""
        Hello {user.username},

        This is a confirmation that the password for your account has been successfully changed.

        If you did not perform this action, please contact our support team immediately.

        Best regards,
        SHG Bazar Support Team
        """
        try:
            send_email(request, default_email, user.email, confirm_message, mail_sub)
        except Exception as e:
            print(f"Confirmation email failed: {str(e)}")

        return Response({"message": "password reset successfully."})
    else:
        return Response({"message": "Invalid or expired token.."}, status=status.HTTP_400_BAD_REQUEST)