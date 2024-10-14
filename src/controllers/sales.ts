import { validationIsActivateSales } from "../middlewares/ensureIsActivate.middleware";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { saleSchema } from "../validators";
const prisma = new PrismaClient();

import { createdSalesService } from "../services/sales/createdSales.service";
import { updatedSalesService } from "../services/sales/updatedSales.service";
import { deleteSalesService } from "../services/sales/deleteSales.service";
import { listOneSaleService } from "../services/sales/listOneSale.service";
import { listSalesService } from "../services/sales/listSales.service";

import { Router } from "express";
const router = Router()

export const listSalesController = async (req: Request, res: Response) => {
  try {
    const response = await listSalesService()

    res.status(200).json(response)
  } catch (error) {
    res.status(500).json(error)
  }
}

export const listOneSaleController = async (req: Request, res: Response) => {
  const { id } = req.params
  try {

    const response = await listOneSaleService(Number(id))

    res.status(200).json(response)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const createdSalesController = async (req: Request, res: Response) => {
  try {
    const valid = saleSchema.safeParse(req.body);

    if (!valid.success) {
      return res.status(400).json(valid.error);
    }

    const response = await createdSalesService(valid.data)

    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json({ error: error})
  }
}

export const updateSalesController = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    await validationIsActivateSales(Number(id))

    const valid = saleSchema.partial()
    const validPartial = valid.safeParse(req.body)

    if(!validPartial.success) {
      res.status(400).json({error: validPartial.error})

      return ;
    }

    const response = await updatedSalesService( validPartial.data, Number(id) )

    res.status(201).json(response)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const deleteSaleController = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const response = await deleteSalesService(Number(id))

    res.status(204).json(response)
  } catch (error) {
    res.status(400).json(error)
  }
}

export default router