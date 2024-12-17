import { Product } from "../types"
import { formatCurrency } from "../helpers"
import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router-dom";
import { deleteProduct } from "../services/ProductService";

type ProductDetailProps = {
    product: Product;
}

export async function action( {params} : ActionFunctionArgs) {

    if (params.id !== undefined) {
        await deleteProduct(+params.id);
        return redirect("/");
    }
}

export default function ProductDetail( {product} : ProductDetailProps) {

    const fetcher = useFetcher();
    const isAvailable = product.availability;
    const navigate = useNavigate();
console.log(fetcher);

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? "text-black" : "text-red-600"} rounded-lg p-2 text-sm uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        { isAvailable ? "Disponible" : "No Disponible"}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    {/* pasar datos a otra */}
                    <button onClick={ () => navigate(`/productos/${product.id}/editar`) }
                        className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center"
                    >Editar
                    </button>
                    <Form
                        className="w-full"
                        method="POST"
                        onSubmit={ e => {
                            if (! confirm("Eliminar?")) {
                                e.preventDefault()
                            }
                        }}
                        action={`productos/${product.id}/eliminar`}
                    >
                        <input
                            type="submit"
                            value="Eliminar"
                            className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
