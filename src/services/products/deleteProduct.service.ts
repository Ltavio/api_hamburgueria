import { validationIsActivateProduct } from "../../middlewares/ensureIsActivate.middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteProductService = async (id: string) => {
    await validationIsActivateProduct(id)

    const product = await prisma.product.update({
        where: { id: id },
        data: {
            isDeleted:  true,
            deletedAt: new Date()
        }
    })

    return product
}