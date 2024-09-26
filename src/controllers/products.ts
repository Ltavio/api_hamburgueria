import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Router } from "express";
const router = Router();

import { Schema, z } from "zod"

const productSchema = z.object({
    code: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
})
