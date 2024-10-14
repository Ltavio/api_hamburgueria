import { IProductRequest } from "../../interfaces/products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createdProductsService = async (data: IProductRequest) => {
    const codeMax = await prisma.product.findMany({ orderBy: { code: 'desc'}})

    const product = await prisma.product.create({
        data: {
            ...data,
            code: data.code ? data.code : Number(codeMax[0]?.code) + 1
        }
    })

    return product
}