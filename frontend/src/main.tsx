import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import HomeScreen from "./screens/HomeScreen";
import Homepage from "./pages/Homepage";
import CreateTravel from "./pages/CreateTravel";
import LoginScreen from "./screens/loginScreen";
import RegisterScreen from "./screens/Registerscreen";
import { Provider } from "react-redux";

import store from "./store/store";
import ProfileScreen from "./screens/profileScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomeScreen /> },
      { path: "/homepage", element: <Homepage /> },
      { path: "/create", element: <CreateTravel /> },
      { path: "/profile", element: <ProfileScreen /> },
      { path: "/login", element: <LoginScreen /> },
      { path: "/signup", element: <RegisterScreen /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
