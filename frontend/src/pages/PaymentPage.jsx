import { useLocation } from "react-router-dom";
import StripeProvider from "../components/StripeProvider";
import CheckoutForm from "../components/CheckoutForm";

function PaymentPage() {
  const location = useLocation();
  const amount = location.state?.amount || 0;

  const publishableKey = "pk_test_51SvjQ42NIyaeQkGBk4EwDYck55MHTzPLXyulClCQg43ic8DKPjOuYGRftF8jTLmVcFhVdunQEw2mXxt5uJttmra00065KQ1HL4"; 

  return (
    <StripeProvider publishableKey={publishableKey}>
      <CheckoutForm amount={amount} />
    </StripeProvider>
  );
}

export default PaymentPage;
