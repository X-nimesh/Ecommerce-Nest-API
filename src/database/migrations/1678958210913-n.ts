import { MigrationInterface, QueryRunner } from 'typeorm';

export class n1678958210913 implements MigrationInterface {
  name = 'n1678958210913';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Google_Auth" ("id" SERIAL NOT NULL, "googleToken" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "avatarUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, CONSTRAINT "UQ_01c040f0ec315a1538a56c3f21e" UNIQUE ("googleToken"), CONSTRAINT "PK_587f54f5999afecc28a99f71892" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Google_Auth"`);
  }
}
