import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./Layout.jsx";
import { store } from "./redux/store/store.js";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    elemmet: <Layout />,
    children: [
      {
        path: "/",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/app",
        element: <App />,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
