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
        const sales = await prisma.sale.findMany()

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

export default router