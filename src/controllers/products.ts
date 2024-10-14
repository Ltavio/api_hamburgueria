import { validationIsActivateProduct } from "../middlewares/ensureIsActivate.middleware";
import { PrismaClient } from "@prisma/client";
import { productSchema } from "../validators";
import { Request, Response } from "express";
const prisma = new PrismaClient()

import { Router } from "express";
import { createdProductsService } from "../services/products/createdProducts.service";
import { updatedProductService } from "../services/products/updatedProducts.service";
import { deleteProductService } from "../services/products/deleteProduct.service";
import { listOneProductService } from "../services/products/listOneProduct.service";
import { listProductsService } from "../services/products/listProducts.service";
const router = Router();

export const listProductsController = async (req: Request, res: Response) => {
    try{
        const response = await listProductsService()

        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const listOneProductController = async (req: Request, res: Response) => {
    const { code } = req.params;
    try{
        const response = await listOneProductService(code)

        res.status(200).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const createProductsController = async (req: Request, res: Response) => {
    try {
        const valid = productSchema.safeParse(req.body)

        if(!valid.success) {
            res.status(400).json({error: valid.error})

            return;
        }
        
        const response = await createdProductsService(valid.data)

        res.status(201).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const updateProductController = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const valid = productSchema.partial()
        const validPartial = valid.safeParse(req.body)

        if(!validPartial.success) {
            res.status(400).json({error: validPartial.error})

            return ;
        }

        const response = await updatedProductService(validPartial.data, id)

        res.status(201).json(response)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const deleteProductController = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const response = await deleteProductService(id)

        res.status(204).json(response)
    } catch(error) {
        res.status(400).json(error)
    }
}

export default router