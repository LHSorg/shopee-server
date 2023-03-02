import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTable1677698055355 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user" (
            id SERIAL PRIMARY KEY,
            username VARCHAR NOT NULL UNIQUE,
            password VARCHAR NOT NULL,
            role VARCHAR NOT NULL,
            created DATE DEFAULT CURRENT_TIMESTAMP,
            updated DATE DEFAULT CURRENT_TIMESTAMP
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "user" CASCADE`);
  }
}
