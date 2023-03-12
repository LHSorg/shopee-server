import { IProductRepository } from "../../domain/ports/product";
import { Handler } from "./../../commons/handler";
import { inject, injectable } from "tsyringe";
import Product from "../../domain/entities/product";
import { CreateProduct } from "../../commons/types";

export type CreateProductsRequest = {
  products: CreateProduct[];
};

export type CreateProductsResponse = {
  products: Product[];
  total: number;
};

@injectable()
export class CreateProductsHandler
  implements Handler<CreateProductsRequest, Promise<CreateProductsResponse>>
{
  private productRepo: IProductRepository;

  constructor(@inject("ProductRepository") productRepo: IProductRepository) {
    this.productRepo = productRepo;
  }
  async execute(
    request: CreateProductsRequest
  ): Promise<CreateProductsResponse> {
    const { products } = request;

    const createdProducts = await this.productRepo.createManyProducts(products);
    return { products: createdProducts, total: createdProducts.length };
  }
}
