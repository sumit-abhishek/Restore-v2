import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/products";
import { Link } from "react-router-dom";
import { useAddBasketItemMutation } from "../basket/basketApi";

type Props = {
  product: Product;
};
const ProductCard = ({ product }: Props) => {
  const [addBasketItem, { isLoading }] = useAddBasketItemMutation();
  return (
    <Card
      elevation={3}
      sx={{
        width: 200,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        sx={{ height: 240, backgroundSize: "cover " }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography
          gutterBottom
          sx={{ textTransform: "uppercase" }}
          variant="subtitle2"
        >
          {product.name}
        </Typography>
        <Typography variant="h6" sx={{ color: "secondary.main" }}>
          ${(product.price / 100).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          disabled={isLoading}
          onClick={() => addBasketItem({ productId: product.id, quantity: 1 })}
        >
          Add to Card
        </Button>
        <Button component={Link} to={`/catalog/${product.id}`}>
          View
        </Button>
      </CardActions>
    </Card>
  );
};
export default ProductCard;
