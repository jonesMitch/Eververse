import { Category } from "./Category";

export class Product {
    id: number;
    title: string;
    category: Category;
    description: string;
    price: number;
    image: string;
    rating_rate: number;
    rating_count: number;

    constructor (
        id: number,
        title: string,
        category: Category,
        description: string,
        price: number,
        image: string,
        rating_rate: number,
        rating_count: number
    ) { 
        this.id = id;
        this.title = title;
        this.category = category;
        this.description = description;
        this.price = price;
        this.image = image;
        this.rating_rate = rating_rate;
        this.rating_count = rating_count;
    }

    getJson(): string {
        return ""
        +  "{\n"
        +  `    ${this.id}: {\n`
        +  `        "category": "${this.category}",\n`
        +  `        "description": "${this.description}",\n`
        +  `        "image": "${this.image}",\n`
        +  `        "price": ${this.price},\n`
        +  `        "rating": {\n`
        +  `            "count": ${this.rating_count},\n`
        +  `            "rate": ${this.rating_rate}\n`
        +  `        },\n`
        +  `        "title": "${this.title}"\n`
        +  `    }\n`
        +  `}\n`;
    }
    getJson2(): string {
        return `{ "category": "${this.category}", "description": "${this.description}", "image": "${this.image}",` 
        + `"price": ${this.price}, "rating_count": ${this.rating_count}, "rating_rate": ${this.rating_rate}, "title": "${this.title}" }`;
    }

    getJson3(): string {
        return ""
        +  "{"
        +  `    "person2": {`
        +  `        "name": "test",`
        +  `        "email": "I hate this"`
        +  `    }`
        +  `}`;
    }
}