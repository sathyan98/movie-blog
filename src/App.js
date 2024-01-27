import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Form from "./components/form";
import Home from "./components/Home";
import "./App.css";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const app = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/form", element: <Form /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={app} />;
}

export default App;
