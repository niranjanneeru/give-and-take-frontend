export function getOrdinalSuffix(number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const lastDigit = number % 10;

  return lastDigit === 1 && number !== 11
    ? `${number}${suffixes[1]}`
    : lastDigit === 2 && number !== 12
    ? `${number}${suffixes[2]}`
    : lastDigit === 3 && number !== 13
    ? `${number}${suffixes[3]}`
    : `${number}${suffixes[0]}`;
}

export function dateToReadableFormat(timeStampString) {
  const timestamp = timeStampString;

  const dateObject = new Date(timestamp);

  const day = dateObject.getDate();
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObject);
  const year = dateObject.getFullYear();

  const formattedDate = `${getOrdinalSuffix(day)} ${month} ${year}`;

  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const amOrPm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

  const formattedTime = `${formattedHours}.${formattedMinutes}${amOrPm}`;

  return `${formattedDate} ${formattedTime}`;
}
