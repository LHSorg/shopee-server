import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("Products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  images: string[];

  @Column()
  price: number;

  @Column()
  shopee_url: string;
}
