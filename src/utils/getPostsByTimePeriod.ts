import type { CollectionEntry } from "astro:content";
import { getSortedPosts } from "./getSortedPosts";

export interface YearMonthData {
    month: number;
    posts: CollectionEntry<"blog">[];
    count: number;
}

export interface YearData {
    year: number;
    months: YearMonthData[];
    posts: CollectionEntry<"blog">[];
    count: number;
}

export interface DayData {
    day: number;
    posts: CollectionEntry<"blog">[];
    count: number;
}

export interface MonthDayData {
    month: number;
    days: DayData[];
    posts: CollectionEntry<"blog">[];
    count: number;
}

export interface TimelineStats {
    totalPosts: number;
    totalYears: number;
    earliestYear: number;
    latestYear: number;
}

/**
 * Get posts grouped by year
 */
export async function getPostsByYear(): Promise<Map<number, CollectionEntry<"blog">[]>> {
    const posts = await getSortedPosts();
    const byYear = new Map<number, CollectionEntry<"blog">[]>();

    posts.forEach((post) => {
        const year = post.data.date.getFullYear();
        if (!byYear.has(year)) {
            byYear.set(year, []);
        }
        byYear.get(year)!.push(post);
    });

    return byYear;
}

/**
 * Get posts grouped by year and month
 */
export async function getPostsByYearMonth(): Promise<Map<number, Map<number, CollectionEntry<"blog">[]>>> {
    const posts = await getSortedPosts();
    const byYearMonth = new Map<number, Map<number, CollectionEntry<"blog">[]>>();

    posts.forEach((post) => {
        const year = post.data.date.getFullYear();
        const month = post.data.date.getMonth(); // 0-11

        if (!byYearMonth.has(year)) {
            byYearMonth.set(year, new Map());
        }
        const yearMap = byYearMonth.get(year)!;
        if (!yearMap.has(month)) {
            yearMap.set(month, []);
        }
        yearMap.get(month)!.push(post);
    });

    return byYearMonth;
}

/**
 * Get posts grouped by year, month, and day
 */
export async function getPostsByYearMonthDay(): Promise<Map<number, Map<number, Map<number, CollectionEntry<"blog">[]>>>> {
    const posts = await getSortedPosts();
    const byYearMonthDay = new Map<number, Map<number, Map<number, CollectionEntry<"blog">[]>>>();

    posts.forEach((post) => {
        const year = post.data.date.getFullYear();
        const month = post.data.date.getMonth(); // 0-11
        const day = post.data.date.getDate();

        if (!byYearMonthDay.has(year)) {
            byYearMonthDay.set(year, new Map());
        }
        const yearMap = byYearMonthDay.get(year)!;

        if (!yearMap.has(month)) {
            yearMap.set(month, new Map());
        }
        const monthMap = yearMap.get(month)!;

        if (!monthMap.has(day)) {
            monthMap.set(day, []);
        }
        monthMap.get(day)!.push(post);
    });

    return byYearMonthDay;
}

/**
 * Get structured year data for timeline visualization
 */
export async function getYearDataList(): Promise<YearData[]> {
    const byYear = await getPostsByYear();
    const byYearMonth = await getPostsByYearMonth();

    const yearDataList: YearData[] = [];

    for (const [year, yearPosts] of byYear.entries()) {
        const monthsMap = byYearMonth.get(year) || new Map();
        const months: YearMonthData[] = [];

        for (const [month, monthPosts] of monthsMap.entries()) {
            months.push({
                month,
                posts: monthPosts,
                count: monthPosts.length,
            });
        }

        // Sort months in descending order (Dec to Jan)
        months.sort((a, b) => b.month - a.month);

        yearDataList.push({
            year,
            months,
            posts: yearPosts,
            count: yearPosts.length,
        });
    }

    // Sort years in descending order (newest first)
    yearDataList.sort((a, b) => b.year - a.year);

    return yearDataList;
}

/**
 * Get month data with days for a specific year
 */
export async function getYearDetailData(year: number): Promise<MonthDayData[]> {
    const byYearMonthDay = await getPostsByYearMonthDay();
    const yearData = byYearMonthDay.get(year);

    if (!yearData) {
        return [];
    }

    const monthDayDataList: MonthDayData[] = [];

    for (const [month, monthMap] of yearData.entries()) {
        const days: DayData[] = [];
        const monthPosts: CollectionEntry<"blog">[] = [];

        for (const [day, dayPosts] of monthMap.entries()) {
            days.push({
                day,
                posts: dayPosts,
                count: dayPosts.length,
            });
            monthPosts.push(...dayPosts);
        }

        // Sort days in descending order (31 to 1)
        days.sort((a, b) => b.day - a.day);

        monthDayDataList.push({
            month,
            days,
            posts: monthPosts,
            count: monthPosts.length,
        });
    }

    // Sort months in descending order (Dec to Jan)
    monthDayDataList.sort((a, b) => b.month - a.month);

    return monthDayDataList;
}

/**
 * Get timeline statistics
 */
export async function getTimelineStats(): Promise<TimelineStats> {
    const posts = await getSortedPosts();
    const years = [...new Set(posts.map(p => p.data.date.getFullYear()))];

    return {
        totalPosts: posts.length,
        totalYears: years.length,
        earliestYear: Math.min(...years),
        latestYear: Math.max(...years),
    };
}
