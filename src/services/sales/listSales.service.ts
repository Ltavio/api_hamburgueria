import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const listSalesService = async () => {
    const sales = await prisma.sale.findMany({
        where: {
          isDeleted: false
        },
        include: {
          product: true,
        }
    })

    return sales
}