export interface IProduct {
    id: String;
    code: Number;
    Description: String;
    price: Number;
    isDelete: Boolean;
    deletedAt: Date;
    createAt: Date;
    updateAt: Date;
}

export interface IProductSale {
    id: string;
    quantity: number;
}
