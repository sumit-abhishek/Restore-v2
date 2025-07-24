import { Grid2, Typography } from "@mui/material";
import OrderSummary from "../../app/shared/components/OrderSummary";
import CheckoutStepper from "./CheckoutStepper";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useFetchBasketQuery } from "../basket/basketApi";
import { useEffect, useMemo, useRef } from "react";
import { useCreatePaymentIntentMutation } from "./checkoutApi";
import { useAppSelector } from "../../app/store/store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
export const CheckoutPage = () => {
  const { data: basket } = useFetchBasketQuery();
  const create = useRef(false);
  const [createPaymentIntent, { isLoading }] = useCreatePaymentIntentMutation();
  const { darkMode } = useAppSelector((state) => state.ui);

  useEffect(() => {
    if (!create.current) createPaymentIntent();
    create.current = true;
  }, [createPaymentIntent]);
  const options: StripeElementsOptions | undefined = useMemo(() => {
    if (!basket?.clientSecret) return undefined;
    return {
      clientSecret: basket.clientSecret,
      appearance: {
        labels: "floating",
        theme: darkMode ? "night" : "stripe",
      },
    };
  }, [basket?.clientSecret, darkMode]);
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {!stripePromise || !options || isLoading ? (
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
