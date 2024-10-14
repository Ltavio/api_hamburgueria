import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listProductsService = async () => {
    const products = await prisma.product.findMany({
        orderBy: { name: 'asc'},
        where: { isDeleted: false},
        include: { sales: true }
    })

    return products
}