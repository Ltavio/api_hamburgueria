import { validationIsActivateSales } from "../middlewares/ensureIsActivate.middleware";
import { StatuSales, PrismaClient } from "@prisma/client";
import { priceCalculated } from "../../utils/sales";
import { Request, Response } from "express";
import { saleSchema } from "../validators";
const prisma = new PrismaClient();

import { Router } from "express";
const router = Router()

router.get("/", async (req: Request, res: Response) => {
    try {
        const sales = await prisma.sale.findMany({
          where: {
            isDeleted: false
          },
          include: {
            product: true,
          }
        })

        res.status(200).json(sales)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    try {

      const sale = await prisma.sale.findUnique({
          where: {
              id: Number(id)
          },
          include: {
              product: true
          }
      })

        res.status(200).json(sale)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/", async (req: Request, res: Response) => {
    try {
        const valid = saleSchema.safeParse(req.body);
    
        if (!valid.success) {
          return res.status(400).json(valid.error);
        }

        let showPrice = await priceCalculated(valid.data.product) 

        const sale = await prisma.sale.create({
          data: {
            ...valid.data,
            product: {
              create: valid.data.product.map((c) => ({
                product: {
                  connect: {
                    id: c.id
                  }
                },
                quantity: c.quantity
              }))
            },
            price: showPrice
          },
          include: {
            product: {
              include: {
                product: true
              }
            },
          },
        });
    
        return res.status(200).json(sale)
      } catch (error) {
        return res.status(400).json({ error: error});
      }
})

router.patch("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  let showPrice

  try {
    await validationIsActivateSales(Number(id))

    const valid = saleSchema.partial()
    const validPartial = valid.safeParse(req.body)

    if(!validPartial.success) {
      res.status(400).json({error: validPartial.error})

      return ;
    }

    if(validPartial.data.product) {
      await prisma.productOnSales.deleteMany({
        where: { saleId: Number(id) }
      })
      
      showPrice = await priceCalculated(validPartial.data.product)
    }

    const saleUpdate = await prisma.sale.update({
      where: { id: Number(id) },
      data: {
        ...validPartial.data,
        product: {
          create: validPartial.data.product?.map((p: any) => {
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

    res.status(201).json(saleUpdate)
  } catch (error) {
    res.status(400).json(error)
  }
})

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await validationIsActivateSales(Number(id))

    const sale = await prisma.sale.update({
      where: { id: Number(id) },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        status: "CANCELADO"
      }
    })
    res.status(204).json(sale)
  } catch (error) {
    res.status(400).json(error)
  }
})

export default router