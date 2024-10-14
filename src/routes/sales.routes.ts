import { 
    createdSalesController,
    listOneSaleController,
    updateSalesController,
    deleteSaleController,
    listSalesController
} from "../controllers/sales"

import { Router } from "express"

const routes = Router()

export const saleRoutes = () => {
    routes.patch("/:id", updateSalesController);
    routes.delete("/:id", deleteSaleController);
    routes.get("/:id", listOneSaleController);
    routes.post("/", createdSalesController);
    routes.get("/", listSalesController);

    return routes
}