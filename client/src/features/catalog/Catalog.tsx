import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Product } from "../../app/models/products";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <>
      <ProductList products={products} />
    </>
  );
};
export default Catalog;
