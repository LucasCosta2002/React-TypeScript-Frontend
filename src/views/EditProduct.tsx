import { Link, Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ErrorMessage from "../Components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../Components/ProductForm";

//obtener datos desde url
export async function loader({params} : LoaderFunctionArgs) {

    if (params.id !== undefined) {
        const product = await getProductById(+params.id)

        if (!product) {
            return redirect("/");
        }

        return product;
    }
}

//procesar datos del formulario
export async function action( {request, params} : ActionFunctionArgs){

    //recuperar datos del Prototype del navegador, recupera los datos por el name de cada input
    const data = Object.fromEntries(await request.formData());

    let error = "";

    if (Object.values(data).includes("")){
        error = "Todos los campos son Obligatorios";
    }

    if (error.length) {
        return error;
    }

    if (params.id !== undefined) {
        await updateProduct(data, +params.id )
    }

    return redirect("/");
}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
]

export default function EditProduct() {

    //obtener los datos del loader
    const product = useLoaderData() as Product;

    //obtener los datos del action en el componente
    const error = useActionData() as string;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link
                    to="/"
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >
                    Volver a Productos
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form
                className="mt-10"
                method="POST"
            >
                <ProductForm
                    product={product}
                />

                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>
        </>
    )
}
