import { PrismaClient } from "@prisma/client";
import { IProductSale } from "../interfaces/products";
const prisma = new PrismaClient();

export const priceCalculated = async (products: IProductSale[]) => {
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