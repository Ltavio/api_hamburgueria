import { validationIsActivateSales } from "../../middlewares/ensureIsActivate.middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteSalesService = async (id: Number) => {
    await validationIsActivateSales(Number(id))

    const sale = await prisma.sale.update({
      where: { id: Number(id) },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        status: "CANCELADO"
      }
    })

    return sale
}