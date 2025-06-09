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
import LoginForm from "../../features/account/LoginForm";
import RegistrationForm from "../../features/account/RegistrationForm";
import RequiredAuth from "./RequiredAuth";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          element: <RequiredAuth />,
          children: [{ path: "checkout", element: <CheckoutPage /> }],
        },
        { path: "", element: <HomePage /> },
        { path: "catalog", element: <Catalog /> },
        { path: "catalog/:id", element: <ProductDetails /> },
        { path: "about", element: <AboutPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "basket", element: <BasketPage /> },
        { path: "server-error", element: <ServerError /> },
        { path: "login", element: <LoginForm /> },
        { path: "register", element: <RegistrationForm /> },
        { path: "not-found", element: <NotFound /> },
        { path: "*", element: <Navigate replace to="/not-found" /> },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
