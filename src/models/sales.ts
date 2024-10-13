import { StatuSales } from "@prisma/client";
import { productSale_Template } from "./products";

export type sale_template = {
    id: Number;
    product: Array<productSale_Template>;
    nameClient: string;
    cpfClient: Number;
    status: StatuSales;
}