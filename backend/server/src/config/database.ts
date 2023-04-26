import {
    DataSource,
    DataSourceOptions,
} from 'typeorm';

const Options: DataSourceOptions = {
    type: 'sqlite',
    database: process.env.DB_FILE as string, // 指定資料庫名稱
    synchronize: false,
    logging: true, // 顯示 SQL 查詢紀錄，可以用來 debug
    entities: [ // mapping class的放的位置，指定放在shared下
        `${__dirname}/../entities/**/*.ts`,
    ],
    migrations: [ // 存放資料庫版本管控(migration)的檔案，指定放在shared下
        `${__dirname}/../migrations/**/*.ts`,
    ],
};

export const Database = new DataSource(Options);
