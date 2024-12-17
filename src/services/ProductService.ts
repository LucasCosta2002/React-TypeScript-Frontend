import { safeParse , number, parse, string, transform, pipe} from "valibot";
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types";
import axios from "axios";
import { toBoolean } from "../helpers";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

//service - funciones generales - similar a ContextAPI
export async function addProduct(product : ProductData ) {
    try {
        //valida el schema  con la data recibida
        const result = safeParse(DraftProductSchema, {
            name: product.name,
            price: +product.price
        });

        if (! result.success) {
            throw new Error("Datos no válidos");
        }

        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/products`, {
            name: result.output.name,
            price: result.output.price
        });
    }
    catch (error) {
        console.log(error);
    }
}

export async function getProducts() {
    try {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/products`);

        const result = safeParse(ProductsSchema, data.data)

        if (! result.success) {
            throw new Error("Hubo un Error");
        }

        return result.output;
    }
    catch (error) {
        console.log(error);
    }
}

export async function getProductById(id: Product['id']) {
    try {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/api/products/${id}`);

        const result = safeParse(ProductSchema, data.data)

        if (! result.success) {
            throw new Error("Hubo un Error");
        }

        return result.output;
    }
    catch (error) {
        console.log(error);
    }
}

export async function updateProduct(data: ProductData, id: Product['id']) {
    try {
        //forza a convertir los datos
        const NumberSchema = pipe(string(), transform(Number), number());

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })

        if (! result.success) {
            throw new Error("Hubo un Error");
        }

        await axios.put(`${import.meta.env.VITE_API_URL}/api/products/${id}`, result.output);
    } catch (error) {
        console.log(error);
    }
}


export async function deleteProduct(id: Product['id']) {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
    } catch (error) {
        console.log(error);
    }
}

export async function updateProductAvailability(id: Product['id']) {
    try {
        await axios.patch(`${import.meta.env.VITE_API_URL}/api/products/${id}`);
    } catch (error) {
        console.log(error);
    }
}