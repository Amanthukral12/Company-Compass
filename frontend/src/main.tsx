import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Home from "./pages/Home.tsx";
import PrivateRoute2 from "./components/PrivateRoute2.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoute2 />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
