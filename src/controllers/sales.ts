import { StatuSales, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { Router } from "express";
const router = Router()

import { Schema, z } from "zod";

const saleSchema = z.object({
    product: z.object({id: z.string(), quantity: z.number()}).array(),
    nameClient: z.string().optional(),
    cpfClient: z.number().optional(),
    status: z.nativeEnum(StatuSales).optional()
})

router.get("/", async (req, res) => {
    try {
        const sales = await prisma.sale.findMany({
          include: {
            product: true,
          }
        })

        res.status(200).json(sales)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
    try {
        const valid = saleSchema.safeParse(req.body);
    
        if (!valid.success) {
          return res.status(400).json(valid.error);
        }

        let sumPrice = 0

        for(let i = 0; i < valid.data.product.length; i++) {
          const {id, quantity} = valid.data.product[i]
          const product = await prisma.product.findUnique({
            where: {
              id: id
            }
          })
          if(product?.price) {
            sumPrice += Number(product.price) * quantity
          }
        }
        console.log(sumPrice)

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
            price: sumPrice
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

router.patch("/:id", async (req, res) => {
  const { id } = req.params
  let priceCalculated = 0

  try {
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
      

      for (let i = 0; i < validPartial.data.product.length; i++) {
        const {id, quantity} = validPartial.data.product[i]
        const product = await prisma.product.findUnique({where: {id: id}})

        if(product) {
          priceCalculated += Number(product.price) * quantity
        }
      }
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
        price: priceCalculated
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

export default router