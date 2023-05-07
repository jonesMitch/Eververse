import { Product } from "./product";

export interface Order {
    account: string,
    date: number,  // milliseconds passed since epoch
    items: string[]
}