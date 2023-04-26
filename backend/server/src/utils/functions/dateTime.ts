import * as moment from 'moment';

export const formatStartAndEndDate = (startDate?: string | Date, endDate?: string | Date) => {
  const initStartTime = startDate || moment().format('YYYY-MM-DD');
  const initEndTime = endDate || moment().format('YYYY-MM-DD');
  startDate = moment(initStartTime).format('YYYY-MM-DD HH:mm:ss');
  endDate = moment(initEndTime).endOf('day').format('YYYY-MM-DD HH:mm:ss.SSS');
  return { startDate, endDate };
};
