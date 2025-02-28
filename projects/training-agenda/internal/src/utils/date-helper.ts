export class DateHelper {
    static timeBetweenDates(startTime: Date, endTime: Date): string {
        return this.timeBetweenDatesCalculator(startTime, endTime);
    }

    static timeToDate(endTime: Date): string {
        const now = new Date();
        return this.timeBetweenDatesCalculator(now, endTime);
    }

    private static timeBetweenDatesCalculator(startTime: Date, endTime: Date): string {
        const miliseconds = endTime.getTime() - startTime.getTime();
        const seconds = Math.floor(miliseconds / 1000);
        const minutes = Math.floor(miliseconds / (1000 * 60));
        const hours = Math.floor(miliseconds / (1000 * 60 * 60));
        const days = Math.floor(miliseconds / (1000 * 60 * 60 * 24));

        if (days > 0) {
            return days > 1 ? `${days} days` : `${days} day`;
        }
        if (hours > 0) {
            return hours > 1 ? `${hours} hours` : `${hours} hour`;
        }
        if (minutes > 0) {
            return minutes > 1 ? `${minutes} minutes` : `${minutes} minute`;
        }
        if (seconds > 0) {
            return seconds > 1 ? `${seconds} seconds` : `${seconds} second`;
        }
        return '';
    }
}
