const relativeTime = new Intl.RelativeTimeFormat('ru', {
  numeric: 'auto',
  // style: 'narrow',
});
const relativeTimeMinutes = new Intl.RelativeTimeFormat('ru', {
  // numeric: 'always',
  // style: 'long'
});

export function formatDate(date) {
  const now = new Date();
  const offset = date.getTimezoneOffset() / 60
  let rest = '';

  const diff = {
    month: now.getMonth() - date.getMonth(),
    day: now.getDate() - date.getDate(),
    hour: now.getHours() - date.getHours() + offset,
    minute: now.getMinutes() - date.getMinutes(),
  }

  for (let key in diff) {
    if(diff[key] > 0) {
      if(key === 'minute') {
        rest += relativeTimeMinutes.format(-diff[key], key) + ' '
      } else {
        rest += relativeTime.format(-diff[key], key) + ' '
      }
    }
  }

  return rest


  // if (diffSec < 1) {
  //   return 'прямо сейчас';
  // } else if (diffMin < 1) {
  //   return `${diffSec} сек. назад`
  // } else if (diffHour < 1) {
  //   return `${diffMin} мин. назад`
  // } else if (diffDays < 1) {
  //   return relativeTime.format(-diffHour, 'hours');//`${diffHour} час. назад`
  // } else {
  //   return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`
  // }
}
