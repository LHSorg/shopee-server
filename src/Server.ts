import "reflect-metadata";
import { ProductRoutes } from "./routes/product";
import { IProductRepository } from "@app/domain/ports/product";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import { container } from "tsyringe";
import helmet from "helmet";
import cors from "cors";
import AuthRoutes from "./routes/auth";
import UserRoutes from "./routes/user";
import errorMiddleware from "./middlewares/errorHandler";
import { IUserRepository } from "./domain/ports/user";
import { UserRepository } from "./repositories/user";
import { ProductRepository } from "./repositories/product";

export class ServerInit {
  public app: Express;
  private authRoutes: AuthRoutes;
  private userRouter: UserRoutes;
  private productRoutes: ProductRoutes;

  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.registerDependencies();
    this.resolveDependencies();
    this.initRouters();
    this.initErrorMiddleware();
  }

  private registerDependencies() {
    container.registerSingleton<IUserRepository>(
      "UserRepository",
      UserRepository
    );
    container.registerSingleton<IProductRepository>(
      "ProductRepository",
      ProductRepository
    );
  }

  private resolveDependencies() {
    this.authRoutes = container.resolve(AuthRoutes);
    this.productRoutes = container.resolve(ProductRoutes);
    this.userRouter = new UserRoutes();
  }

  private initMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(cors());
    this.app.use(helmet());
  }

  private initRouters() {
    this.app.use("/shopee", this.productRoutes.router);
    this.app.use("/auth", this.authRoutes.router);
    this.app.use("/user", this.userRouter.router);
    this.app.get("/", (_req, res) => {
      res.send("Welcome");
    });
  }

  private initErrorMiddleware() {
    this.app.use(errorMiddleware);
  }
}
