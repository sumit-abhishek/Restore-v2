import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import ServerError from "../error/ServerError";
import NotFound from "../error/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import { CheckoutPage } from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<HomePage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/:id" element={<ProductDetails />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/basket" element={<BasketPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/server-error" element={<ServerError />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Route>
  )
);
