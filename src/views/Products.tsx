import { ActionFunctionArgs, Link, useLoaderData } from "react-router-dom";
import { getProducts, updateProductAvailability } from "../services/ProductService";
import ProductDetail from "../Components/ProductDetail";
import { Product } from "../types";

//react-router-dom: loader similar a un useEffect para consultar apis
export async function loader() {
    return await getProducts();
}

//action -> manipular datos
export async function action( {request} : ActionFunctionArgs ) {
    const data = Object.fromEntries(await request.formData());

    await updateProductAvailability(+data.id)
    return {}
}

export default function Products() {

    const products = useLoaderData() as Product[];

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link
                    to="productos/nuevo"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Agregar Producto
                </Link>
            </div>

            <div className="p-2">
                <table className="w-full mt-5 table-auto">
                    <thead className="bg-slate-800 text-white">
                        <tr>
                            <th className="p-2">Producto</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map(product => (
                            <ProductDetail
                                product={product}
                                key={product.id}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
