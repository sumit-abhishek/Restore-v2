import { Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi";

const BasketPage = () => {
  const { data, isLoading } = useFetchBasketQuery();
  if (isLoading) return <Typography>Loading Basket...</Typography>;
  if (!data) return <Typography variant="h3">Your Basket is Empty</Typography>;
  return <div>{data.basketId}</div>;
};
export default BasketPage;
