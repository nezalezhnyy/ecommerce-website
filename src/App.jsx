import Header from "./components/Header/Header.jsx";
import MainPage from "./pages/MainPage/MainPage.jsx";
import Layout from "./components/Layout/Layout.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom"


const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Layout/>,
    children: [
      { index: true, element: <MainPage/> },
      { path: "product/:id", element: <ProductDetail/> },
    ],
  },
]);

function App() {

  return (
    <>
        <RouterProvider router={router}/>
    </>
  )
}

export default App

