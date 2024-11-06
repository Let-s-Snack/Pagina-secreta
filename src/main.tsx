import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Bi1 } from "./pages/Bi1/index.tsx";
import { Bi2 } from "./pages/Bi2/index.tsx";
import { MainPage } from "./pages/MainPage/index.tsx";
import { LoginPage } from "./pages/Login/index.tsx";
import { ErrorPage } from "./pages/ErrorPage/index.tsx";
import { IA } from "./pages/IA/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Bi1 />,
      },
      {
        path: "/bi2",
        element: <Bi2 />,
      },
    ],
  },
  {
    path: "/login",
    errorElement: <ErrorPage />,
    element: <LoginPage />,
  },
  {
    path: "/ia",
    errorElement: <ErrorPage />,
    element: <IA />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
