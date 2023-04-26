import { CrossChannel } from '../entities/CrossChannel';
import { execWhereByQuery, execOrderByAndWhereByQuery } from '../utils/functions/queryBuilder';
export const getMany = async (query: {}) => {
  const selectQueryBuilder = CrossChannel.createQueryBuilder('channel');
  execOrderByAndWhereByQuery(selectQueryBuilder, query);
  return await selectQueryBuilder.getMany();
};
export const save = async (payload: CrossChannel) => {
  return await CrossChannel.getRepository().save(payload);
};
