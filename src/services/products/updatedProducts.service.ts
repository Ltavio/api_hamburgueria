import { validationIsActivateProduct } from "../../middlewares/ensureIsActivate.middleware";
import { IProductUpdate } from "../../interfaces/products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updatedProductService = async (data: IProductUpdate, id: string) => {
    await validationIsActivateProduct(id)

    const product = await prisma.product.update({
        where: { id: id},
        data: data
    })

    return product
}