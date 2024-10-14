import { 
    listOneProductController,
    createProductsController,
    updateProductController,
    deleteProductController,
    listProductsController
} from "../controllers/products"

import { Router } from "express"

const routes = Router()

export const productRoutes = () => {
    routes.delete("/:id", deleteProductController);
    routes.get("/:code", listOneProductController);
    routes.patch("/:id", updateProductController);
    routes.post("/", createProductsController);
    routes.get("/", listProductsController);

    return routes
}