import { products } from "@/data/products";
import { Product } from "@/types/product";
import { rejects } from "assert";

export const getAllProducts = async (): Promise<Product[]> => {
    return new Promise((resolve, reject) => {
        return setTimeout(() => {
            resolve(products);
        }, 2000);
    })
};