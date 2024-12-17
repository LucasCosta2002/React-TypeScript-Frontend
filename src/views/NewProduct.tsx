import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../Components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../Components/ProductForm";

//procesar datos del formulario
export async function action( {request} : ActionFunctionArgs){

    //recuperar datos del Prototype del navegador, recupera los datos por el name de cada input
    const data = Object.fromEntries(await request.formData());

    let error = "";

    if (Object.values(data).includes("")){
        error = "Todos los campos son Obligatorios";
    }

    if (error.length) {
        return error;
    }

    await addProduct(data)

    return redirect("/");
}

export default function NewProduct() {

    //obtener los datos del action en el componente
    const error = useActionData() as string;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
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
                <ProductForm />
                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
