import {object, string, number, boolean, InferOutput, array} from "valibot"

//draft: cuando no tiene id, o no posee todos sus atributos
export const DraftProductSchema = object({
    name: string(),
    price: number()
})

export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})

//creamos un array de ProductSchema
export const ProductsSchema = array(ProductSchema);

// crear un type con los valores del Schema validados por Valibot
export type Product = InferOutput<typeof ProductSchema>;