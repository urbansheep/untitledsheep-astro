const formatterDate = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
});

const formatterTime = new Intl.DateTimeFormat('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'UTC'
});


/* eslint-disable no-mixed-spaces-and-tabs */
export const getFormattedDate = (date) => (date ? formatterDate.format(date) : '');
export const getFormattedTime = (date) => (date ? formatterTime.format(date) : '');
