import { MigrationInterface, QueryRunner } from "typeorm";

export class Vdr1682469786478 implements MigrationInterface {
    name = 'Vdr1682469786478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cross_channel" ("channelId" varchar PRIMARY KEY NOT NULL, "channelName" varchar NOT NULL, "guildId" varchar, "guildName" varchar, "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cross_channel"`);
    }

}
