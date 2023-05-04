import { Category } from "./Category";

export interface Product {
    title: string,
    description: string, 
    category: Category,
    image: string,
    price: number,
    rating: {
        rate: number,
        count: number
    }
}