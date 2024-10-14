import { validationIsActivateProduct } from "../middlewares/ensureIsActivate.middleware";
import { PrismaClient } from "@prisma/client";
import { productSchema } from "../validators";
import { Request, Response } from "express";
const prisma = new PrismaClient()

import { Router } from "express";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try{
        const products = await prisma.product.findMany({
            orderBy: { name: 'asc'},
            where: { isDeleted: false},
            include: { sales: true }
        })

        res.status(200).json(products)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.get("/:code", async (req: Request, res: Response) => {
    const { code } = req.params;
    try{
        const product = await prisma.product.findUnique({
            where: { code: Number(code) },
            include: { sales: true }
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/", async (req: Request, res: Response) => {
    try {
        const valid = productSchema.safeParse(req.body)

        if(!valid.success) {
            res.status(400).json({error: valid.error})

            return;
        }
        
        const codeMax = await prisma.product.findMany({ orderBy: { code: 'desc'}})

        const product = await prisma.product.create({
            data: {
                ...valid.data,
                code: valid.data.code ? valid.data.code : Number(codeMax[0]?.code) + 1
            }
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.patch("/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await validationIsActivateProduct(id)

        const valid = productSchema.partial()
        const validPartial = valid.safeParse(req.body)

        if(!validPartial.success) {
            res.status(400).json({error: validPartial.error})

            return ;
        }

        const product = await prisma.product.update({
            where: { id: id},
            data: validPartial.data
        })

        res.status(201).json(product)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        await validationIsActivateProduct(id)

        const product = await prisma.product.update({
            where: { id: id },
            data: {
                isDeleted:  true,
                deletedAt: new Date()
            }
        })

        res.status(204).json(product)
    } catch(error) {
        res.status(400).json(error)
    }
})

export default router