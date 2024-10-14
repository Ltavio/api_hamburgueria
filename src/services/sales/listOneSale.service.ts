import { validationIsActivateSales } from "../../middlewares/ensureIsActivate.middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listOneSaleService = async (id: Number) => {
    const sale = await prisma.sale.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            product: true
        }
    })

    return sale
}