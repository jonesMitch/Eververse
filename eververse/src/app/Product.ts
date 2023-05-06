import { Category } from "./Category";

export interface Product {
    id: number,
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