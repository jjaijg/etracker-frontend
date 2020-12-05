import moment from 'moment';
const curDate = new Date();

export const checkDate = (date) => {
  return {
    isToday: moment(date).isSame(curDate, 'day'),
    isWeek: moment(date).isSame(curDate, 'week'),
    isMonth: moment(date).isSame(curDate, 'month'),
    isYear: moment(date).isSame(curDate, 'year'),
  };
};
