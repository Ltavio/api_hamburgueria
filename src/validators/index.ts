import { StatuSales } from "@prisma/client";

import { z } from "zod";

export const productSchema = z.object({
    code: z.number().optional(),
    name: z.string({
        message: "Nome do produto é obrigatório"
    }),
    description: z.string({
        message: "Descrição do produto é obrigatório"
    }),
    price: z.number({
        message: "Preço do produto é obrigatório"
    })
})

export const saleSchema = z.object({
    product: z.object({id: z.string(), quantity: z.number()}, 
    {message: "Os produtos devem conter seu ID e a quantidade"}).array(),
    nameClient: z.string().optional(),
    cpfClient: z.number().optional(),
    status: z.nativeEnum(StatuSales).optional(),
    isDelete: z.boolean().optional()
})


