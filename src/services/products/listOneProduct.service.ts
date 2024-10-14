import { validationIsActivateProduct } from "../../middlewares/ensureIsActivate.middleware";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const listOneProductService = async (code: string) => {
    const product = await prisma.product.findUnique({
        where: { code: Number(code) },
        include: { sales: true }
    })
    
    return product
}