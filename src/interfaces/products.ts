export interface IProduct {
    id: String;
    code: Number;
    name: string;
    Description: String;
    price: Number;
    isDelete: Boolean;
    deletedAt: Date;
    createAt: Date;
    updateAt: Date;
}

export interface IProductRequest {
    code?: number;
    name: string;
    description: string;
    price: number;
}

export interface IProductUpdate {
    code?: number;
    name?: string;
    description?: string;
    price?: number;
}

export interface IProductSale {
    id: string;
    quantity: number;
}
