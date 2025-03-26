import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "#baecf9",
  },
};

const midLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const NavBar = () => {
  const dispatch = useAppDispatch();
  const { isLoading, darkMode } = useAppSelector((state) => state.ui);
  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Side of Navbar */}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography component={NavLink} to={"/"} variant="h6" sx={navStyles}>
            Re-Store
          </Typography>
          <IconButton onClick={() => dispatch(setDarkMode())}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        </Box>

        {/* Mid-Part of Navbar */}

        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        {/* RightSide of Navbar */}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            sx={{ color: "inherit" }}
          >
            <Badge badgeContent="4" color="secondary">
              <ShoppingCart></ShoppingCart>
            </Badge>
          </IconButton>
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  );
};
export default NavBar;
