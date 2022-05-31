//Adapted from https://bobbyhadz.com/blog/javascript-get-date-x-days-ago
function getDateXDaysAgo(numOfDays, date = new Date()) {
  const daysAgo = new Date(date.getTime());

  daysAgo.setDate(date.getDate() - numOfDays);

  return daysAgo;
}

export default getDateXDaysAgo;
