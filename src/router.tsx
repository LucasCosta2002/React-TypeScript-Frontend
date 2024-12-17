import {createBrowserRouter} from "react-router-dom"
import Layout from "./layouts/Layout.tsx"
import Products, { loader as productsLoader, action as updateAvailabilityAction } from "./views/Products.tsx"
import NewProduct, { action as newProductAction } from "./views/NewProduct.tsx"
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./views/EditProduct.tsx"
import { action as deleteProductAction } from "./Components/ProductDetail.tsx"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                //ruta
                index: true,
                //vista
                element: <Products />,
                //loader obtener
                loader: productsLoader,
                //action manipular
                action: updateAvailabilityAction
            },
            {
                path: "productos/nuevo",
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: "productos/:id/editar", //ROA Pattern
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path: "productos/:id/eliminar", //ROA Pattern
                action: deleteProductAction
            }
        ]
    }
])