import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { formatStartAndEndDate } from './dateTime';
import { Brackets } from 'typeorm';
import * as commonFunction from './commonFunction';
/**
 * 將selectQueryBuilder加上where條件
 * @param selectQueryBuilder 將前面的selectQueryBuilder傳入
 * @param query {hawb: '567890987654', _unitSn: 'R12345'}, 模糊查詢查詢字段前面加_，_unitSn為模糊查詢。使用or查詢：{keyword:trayId,_hawb=123}。
 * @param byDate 預設false，使用日期範圍(startDate、endDate)，無日期則為今天整天的範圍
 * @returns  回傳的selectQueryBuilder加上where條件
 */
export const execWhereByQuery = <T extends ObjectLiteral>(
  selectQueryBuilder: SelectQueryBuilder<T>,
  query: ObjectLiteral,
  byDate: boolean = false,
) => {
  const { startDate, endDate } = formatStartAndEndDate(query.startDate, query.endDate);
  const queryKeys = Object.keys(query);
  const alias = selectQueryBuilder.expressionMap.mainAlias.name;
  const columnNames = selectQueryBuilder.expressionMap.mainAlias.metadata.columns.map((column) =>
    commonFunction.snakeToCamel(column.databaseName),
  );

  queryKeys.forEach((x) => {
    if (!query[x]) {
      return;
    }

    if (x === 'keywordColumns') {
      const keyword = query.keyword;
      if (!keyword) {
        return;
      }
      const columns = query.keywordColumns.split(',');

      const orQuery = {};
      const exceptDeleted = `and ${alias}.deleted_at is null`;
      const keywordColumnsString = columns.map((keyX) => {
        let isKeywordFuzzyKey = false;
        if (keyX.startsWith('_')) {
          isKeywordFuzzyKey = true;
          keyX = keyX.replace(/^_/, '');
          orQuery[keyX] = `%${keyword}%`;
        } else {
          orQuery[keyX] = keyword;
        }

        const keywordFuzzyString = `ilike :${keyX}`;
        const keywordEqString = `= :${keyX}`;
        const isRaw = keyX.match(/\./);
        const columnName = isRaw ? keyX : `${alias}.${keyX}`;
        const keywordQueryString = `${columnName} ${isKeywordFuzzyKey ? keywordFuzzyString : keywordEqString}`;
        return `${keywordQueryString} ${exceptDeleted}`;
      });
      selectQueryBuilder.andWhere(
        new Brackets((qb) => {
          keywordColumnsString.forEach((column) => {
            qb.orWhere(column, orQuery);
          });
        }),
      );
      return;
    }

    if (!columnNames.includes(x)) {
      return;
    }

    let isFuzzyKey = false;
    if (x.startsWith('_')) {
      isFuzzyKey = true;
      x = x.replace(/^_/, '');
      const fuzzyKey = `_${x}`;
      query[x] = `%${query[fuzzyKey]}%`;
    }
    const fuzzyString = `ilike :${x}`;
    const eqString = `= :${x}`;
    const queryString = `${alias}.${x} ${isFuzzyKey ? fuzzyString : eqString}`;
    selectQueryBuilder.andWhere(queryString, query);
  });

  if (byDate) {
    if (startDate) {
      selectQueryBuilder.andWhere(`${alias}.createdAt >= :startDate`, { startDate });
    }
    if (endDate) {
      selectQueryBuilder.andWhere(`${alias}.createdAt <= :endDate`, { endDate });
    }
  }

  return selectQueryBuilder;
};
/**
 * 將selectQueryBuilder加上order排序
 * @param selectQueryBuilder 將前面的selectQueryBuilder傳入
 * @param alias createQueryBuilder的別名
 * @param query orderBy為要要排序的欄位，direction為排序方式，如:{orderBy:id,direction:'ASC'}
 * @returns 回傳的selectQueryBuilder加上order排序
 */

export const execOrderByByQuery = <T extends ObjectLiteral>(
  selectQueryBuilder: SelectQueryBuilder<T>,
  query: ObjectLiteral,
) => {
  const alias = selectQueryBuilder.expressionMap.mainAlias.name;
  if (query.orderBy) {
    let direction: 'ASC' | 'DESC' = 'ASC';
    if (query.direction) {
      direction = query.direction;
      delete query.direction;
    }

    selectQueryBuilder.orderBy(`${alias}.${query.orderBy}`, `${direction}`);
    if (query.orderBy !== 'createdAt') {
      selectQueryBuilder.addOrderBy(`${alias}.createdAt`, 'DESC');
    }
    delete query.orderBy;
  } else {
    selectQueryBuilder.orderBy(`${alias}.createdAt`, 'DESC');
  }

  return selectQueryBuilder;
};

export const execOrderByAndWhereByQuery = <T extends ObjectLiteral>(
  selectQueryBuilder: SelectQueryBuilder<T>,
  query: ObjectLiteral,
  byDate: boolean = true,
) => {
  execOrderByByQuery(selectQueryBuilder, query);
  execWhereByQuery(selectQueryBuilder, query);
  return selectQueryBuilder;
};
