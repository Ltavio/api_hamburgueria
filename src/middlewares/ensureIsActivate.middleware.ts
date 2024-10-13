import { PrismaClient } from "@prisma/client";
import AppError from "../errors/appErrors";
const prisma = new PrismaClient();

export const validationIsActivateSales = async ( id: number ) => {
    const sale = await prisma.sale.findUnique({
        where: { id: id }
    })

    if (sale?.isDeleted) {
        throw new AppError(`Venda deletada em ${sale.deletedAt}`)
    }
}

export const validationIsActivateProduct = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: { id: id }
    })

    if (product?.isDeleted) {
        throw new AppError(`Produto deletado em ${product.deletedAt}`)
    }
}