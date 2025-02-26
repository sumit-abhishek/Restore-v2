import { Product } from "../../app/models/products";
import ProductList from "./ProductList";

type Props = {
  products: Product[];
};

const Catalog = ({ products }: Props) => {
  return (
    <>
      <ProductList products={products} />
    </>
  );
};
export default Catalog;
