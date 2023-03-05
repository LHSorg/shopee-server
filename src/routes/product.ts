import {
  DeleteProductsHandler,
  DeleteProductsRequest,
} from "./../handlers/Products/DeleteProducts";
import {
  UpdateProductHandler,
  UpdateProductRequest,
} from "./../handlers/Products/UpdateProducts";
import {
  CreateProductsHandler,
  CreateProductsRequest,
} from "./../handlers/Products/CreateProducts";
import { ListProductsHandler } from "./../handlers/Products/ListProducts";
import { Router } from "express";
import { inject, injectable } from "tsyringe";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

@injectable()
export class ProductRoutes {
  public router = Router();
  private listProductHandler: ListProductsHandler;
  private createProductsHandler: CreateProductsHandler;
  private updateProductHandler: UpdateProductHandler;
  private deleteProductsHandler: DeleteProductsHandler;

  constructor(
    @inject(ListProductsHandler) listProductHandler,
    @inject(CreateProductsHandler) createProductsHandler,
    @inject(UpdateProductHandler) updateProductHandler,
    @inject(DeleteProductsHandler) deleteProductsHandler
  ) {
    this.listProductHandler = listProductHandler;
    this.createProductsHandler = createProductsHandler;
    this.updateProductHandler = updateProductHandler;
    this.deleteProductsHandler = deleteProductsHandler;
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/products", async (req, res, next) => {
      try {
        const response = await this.listProductHandler.execute({});
        res.status(200).json(response);
      } catch (error) {
        next(error);
      }
    });

    this.router.post(
      "/products",
      checkJwt,
      checkRole(["ADMIN"]),
      async (req, res, next) => {
        try {
          const { products }: CreateProductsRequest = req.body;
          const response = await this.createProductsHandler.execute({
            products,
          });

          res.status(201).json(response);
        } catch (error) {
          next(error);
        }
      }
    );

    this.router.put(
      "/products",
      checkJwt,
      checkRole(["ADMIN"]),
      async (req, res, next) => {
        try {
          const { product }: UpdateProductRequest = req.body;

          await this.updateProductHandler.execute({ product });
          res.status(204).send();
        } catch (error) {
          next(error);
        }
      }
    );

    this.router.delete(
      "/products",
      checkJwt,
      checkRole(["ADMIN"]),
      async (req, res, next) => {
        try {
          const { productsIds }: DeleteProductsRequest = req.body;

          await this.deleteProductsHandler.execute({
            productsIds,
          });
          res.status(204).send();
        } catch (error) {
          next(error);
        }
      }
    );
  }
}
