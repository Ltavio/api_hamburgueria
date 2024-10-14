import { ISaleRequest } from "../../interfaces/sales";
import { priceCalculated } from "../../utils/sales";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createdSalesService = async (data: ISaleRequest) => {
    let showPrice = await priceCalculated(data.product) 

    const sale = await prisma.sale.create({
        data: {
        ...data,
        product: {
            create: data.product.map((c) => ({
            product: {
                connect: {
                id: c.id
                }
            },
            quantity: c.quantity
            }))
        },
        price: showPrice
        },
        include: {
        product: {
            include: {
            product: true
            }
        },
        },
    });

    return sale
}