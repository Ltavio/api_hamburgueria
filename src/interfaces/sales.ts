import { StatuSales } from "@prisma/client";
import { IProductSale } from "./products";

export interface ISale {
    id: Number;
    product: IProductSale[];
    nameClient: string;
    cpfClient: Number;
    status: StatuSales;
    createAt: Date;
    updateAt: Date;
    isDeleted: Boolean;
    deletedAt: Date;
}

export interface ISaleRequest {
    product: IProductSale[];
    nameClient?: string;
    cpfClient?: number;
}

export interface ISaleUpdate {
    product?: IProductSale[];
    nameClient?: string;
    cpfClient?: number;
    status?: StatuSales;
}

export interface IListSalesProducts {
    productId: String;
    saleId: Number;
    quantity: Number;
    createAt: Date;
}

export interface ISaleGet {
    id: Number;
    product: Array<IListSalesProducts>;
    nameClient: string;
    cpfClient: Number;
    status: StatuSales;
    createAt: Date;
    updateAt: Date;
    isDeleted: Boolean;
    deletedAt: Date;
}

export interface IListSales {
    sale: ISale[];
}