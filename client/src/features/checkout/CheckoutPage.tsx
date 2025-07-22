import { Grid2, Typography } from "@mui/material";
import OrderSummary from "../../app/shared/components/OrderSummary";
import CheckoutStepper from "./CheckoutStepper";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useFetchBasketQuery } from "../basket/basketApi";
import { useMemo } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
export const CheckoutPage = () => {
  const { data: basket } = useFetchBasketQuery();
  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    return {
      clientSecret: basket.clientSecret,
    };
  }, [basket?.clientSecret]);
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {!stripePromise || options ? (
          <Typography variant="h6">Loading Checkout...</Typography>
        ) : (
          <Elements stripe={stripePromise} options={options}>
            <CheckoutStepper />
          </Elements>
        )}
      </Grid2>
      <Grid2 size={4}>
        <OrderSummary />
      </Grid2>
    </Grid2>
  );
};
