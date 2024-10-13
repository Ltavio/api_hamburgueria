import { PrismaClient } from "@prisma/client";
import { productSale_Template } from "../src/models/products";
const prisma = new PrismaClient();

export const priceCalculated = async (products: productSale_Template[]) => {
    let sumPrices = 0

    for (let i = 0; i < products.length; i++) {
        const {id, quantity} = products[i]
        const product = await prisma.product.findUnique({where: {id: String(id)}})
        if(product) {
            sumPrices += Number(product.price) * Number(quantity)
        }
    }
    
    return sumPrices
}