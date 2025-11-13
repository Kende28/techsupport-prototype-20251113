import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Main } from "./pages/Main.tsx";
import { PC } from "./pages/PC.tsx";
import { Components } from "./pages/Components.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Main,
      },
      {
        path: "pcs/unique",
        Component: Main,
      },
      {
        path: "pcs",
        Component: PC,
      },
      {
        path: "components",
        Component: Components,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
