import { Grid2 } from "@mui/material";
import { useFetchProductsQuery } from "./catalogApi";
import ProductList from "./ProductList";
import Filters from "./Filters";

const Catalog = () => {
  const { data, isLoading } = useFetchProductsQuery();
  if (isLoading || !data) return <div>Loading...</div>;
  return (
    <Grid2 container spacing={4}>
      <Grid2 size={3}>
        <Filters />
      </Grid2>
      <Grid2 size={9}>
        <ProductList products={data} />
      </Grid2>
    </Grid2>
  );
};
export default Catalog;
