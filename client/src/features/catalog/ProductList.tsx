import { Grid2 } from "@mui/material";
import { Product } from "../../app/models/products";
import ProductCard from "./ProductCard";

type Props = {
  products: Product[];
};
const ProductList = ({ products }: Props) => {
  return (
    <Grid2 container spacing={3}>
      {products.map((product) => (
        <Grid2 size={3} display="flex">
          <ProductCard key={product.id} product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
};
export default ProductList;
