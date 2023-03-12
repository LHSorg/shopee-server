import Product from "../domain/entities/product";

export type AtLeast<T, U extends keyof T> = Partial<T> & Pick<T, U>;

export type CreateProduct = Omit<Product, "id">;
