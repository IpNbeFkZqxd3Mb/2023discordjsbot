import { MigrationInterface, QueryRunner } from "typeorm";

export class Vdr1682473036107 implements MigrationInterface {
    name = 'Vdr1682473036107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_cross_channel" ("channelId" varchar PRIMARY KEY NOT NULL, "channelName" varchar NOT NULL, "guildId" varchar, "guildName" varchar)`);
        await queryRunner.query(`INSERT INTO "temporary_cross_channel"("channelId", "channelName", "guildId", "guildName") SELECT "channelId", "channelName", "guildId", "guildName" FROM "cross_channel"`);
        await queryRunner.query(`DROP TABLE "cross_channel"`);
        await queryRunner.query(`ALTER TABLE "temporary_cross_channel" RENAME TO "cross_channel"`);
        await queryRunner.query(`CREATE TABLE "temporary_cross_channel" ("channelId" varchar PRIMARY KEY NOT NULL, "channelName" varchar NOT NULL, "guildId" varchar, "guildName" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_cross_channel"("channelId", "channelName", "guildId", "guildName") SELECT "channelId", "channelName", "guildId", "guildName" FROM "cross_channel"`);
        await queryRunner.query(`DROP TABLE "cross_channel"`);
        await queryRunner.query(`ALTER TABLE "temporary_cross_channel" RENAME TO "cross_channel"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cross_channel" RENAME TO "temporary_cross_channel"`);
        await queryRunner.query(`CREATE TABLE "cross_channel" ("channelId" varchar PRIMARY KEY NOT NULL, "channelName" varchar NOT NULL, "guildId" varchar, "guildName" varchar)`);
        await queryRunner.query(`INSERT INTO "cross_channel"("channelId", "channelName", "guildId", "guildName") SELECT "channelId", "channelName", "guildId", "guildName" FROM "temporary_cross_channel"`);
        await queryRunner.query(`DROP TABLE "temporary_cross_channel"`);
        await queryRunner.query(`ALTER TABLE "cross_channel" RENAME TO "temporary_cross_channel"`);
        await queryRunner.query(`CREATE TABLE "cross_channel" ("channelId" varchar PRIMARY KEY NOT NULL, "channelName" varchar NOT NULL, "guildId" varchar, "guildName" varchar, "created_on" datetime NOT NULL DEFAULT (datetime('now')), "updated_on" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "cross_channel"("channelId", "channelName", "guildId", "guildName") SELECT "channelId", "channelName", "guildId", "guildName" FROM "temporary_cross_channel"`);
        await queryRunner.query(`DROP TABLE "temporary_cross_channel"`);
    }

}
