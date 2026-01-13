/**
 * Russian month names in nominative case (именительный падеж)
 */
const monthNamesNominative = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
];

/**
 * Russian month names in genitive case (родительный падеж)
 * Used with prepositions and numbers: "5 постов января", "записи марта"
 */
const monthNamesGenitive = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
];

/**
 * Get month name in nominative case
 * @param monthIndex - Month index (0-11)
 */
export function getMonthName(monthIndex: number): string {
    return monthNamesNominative[monthIndex] || '';
}

/**
 * Get month name in genitive case
 * @param monthIndex - Month index (0-11)
 */
export function getMonthNameGenitive(monthIndex: number): string {
    return monthNamesGenitive[monthIndex] || '';
}

/**
 * Format a count of posts with proper Russian plural form
 * @param count - Number of posts
 * @returns Formatted string like "1 пост", "2 поста", "5 постов"
 */
export function formatPostCount(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${count} постов`;
    }

    if (lastDigit === 1) {
        return `${count} пост`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${count} поста`;
    }

    return `${count} постов`;
}

/**
 * Format a count of years with proper Russian plural form
 * @param count - Number of years
 * @returns Formatted string like "1 год", "2 года", "5 лет"
 */
export function formatYearCount(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${count} лет`;
    }

    if (lastDigit === 1) {
        return `${count} год`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${count} года`;
    }

    return `${count} лет`;
}

/**
 * Format year-month header for timeline
 * @param year - Year number
 * @param month - Month index (0-11)
 * @returns Formatted string like "Март 2007"
 */
export function formatYearMonthHeader(year: number, month: number): string {
    return `${getMonthName(month)} ${year}`;
}

/**
 * Format day-month header
 * @param day - Day of month
 * @param month - Month index (0-11)
 * @returns Formatted string like "9 марта"
 */
export function formatDayMonth(day: number, month: number): string {
    return `${day} ${getMonthNameGenitive(month)}`;
}
