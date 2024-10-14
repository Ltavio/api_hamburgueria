import { ISaleUpdate } from "../../interfaces/sales";
import { priceCalculated } from "../../utils/sales";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updatedSalesService = async (data: ISaleUpdate, id: number) => {
    let showPrice

    if(data.product) {
        await prisma.productOnSales.deleteMany({
          where: { saleId: id }
        })
        
        showPrice = await priceCalculated(data.product)
      }
  
      const saleUpdate = await prisma.sale.update({
        where: { id: id },
        data: {
          ...data,
          product: {
            create: data.product?.map((p: any) => {
              return {
                productId: p.id,
                quantity: p.quantity
              }
            })
          },
          price: showPrice
        },
        include: {
          product: true
        }
      })

      return saleUpdate
}