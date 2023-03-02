import { IProductRepository } from "@app/domain/ports/product";
import { Handler } from "./../../commons/handler";
import { Product } from "@app/domain/entities/product";
import { inject, injectable } from "tsyringe";

export type ListProductsRequest = object;

export type ListProductsResponse = {
  products: Product[];
  total: number;
};

@injectable()
export class ListProductsHandler
  implements Handler<ListProductsRequest, Promise<ListProductsResponse>>
{
  private productRepo: IProductRepository;

  constructor(@inject("ProductRepository") productRepo: IProductRepository) {
    this.productRepo = productRepo;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(_request: object): Promise<ListProductsResponse> {
    const products = await this.productRepo.listAllProducts();
    return { products, total: products.length };
  }
}
