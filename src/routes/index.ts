import { Express } from "express"

import { productRoutes } from "./products.routes"
import { saleRoutes } from "./sales.routes"

export const AppRoutes = (app: Express) => {
    app.use("/products", productRoutes())
    app.use("/sales", saleRoutes())
}