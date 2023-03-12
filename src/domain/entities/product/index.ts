import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("products")
class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("text", { array: true })
  images: string[];

  @Column()
  price: number;

  @Column()
  shopee_url: string;
}

export default Product;
