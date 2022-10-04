import LANGUAGES from "./lang/languages";

const testTask = () => {
    /**
     * Converts `value` to string and pad it with leading zeroes
     * until resulting string reaches `length`
     *
     * @param {Number} value
     * @param {Number} [length=2]
     * 
     * @return {String}
     */
    const leadingZeroes = (value, length = 2) => String(value).padStart(length, '0');

    const tokens = {
        YYYY: (date) => date.getFullYear(),
        YY: (date) => leadingZeroes(date.getFullYear() % 100),
        MMMM: (date, format) => languages[unitTestingTask.lang()].months(date, format),
        MMM: (date, format) => languages[unitTestingTask.lang()].monthsShort(date, format),
        MM: (date) => leadingZeroes(date.getMonth() + 1),
        M: (date) => date.getMonth() + 1,
        DDD: (date) => languages[unitTestingTask.lang()].weekdays[date.getDay()],
        DD: (date) => languages[unitTestingTask.lang()].weekdaysShort[date.getDay()],
        D: (date) => languages[unitTestingTask.lang()].weekdaysMin[date.getDay()],
        dd: (date) => leadingZeroes(date.getDate()),
        d: (date) => date.getDate(),
        HH: (date) => leadingZeroes(date.getHours()),
        H: (date) => date.getHours(),
        hh: (date) => leadingZeroes(date.getHours() % 12 || 12),
        h: (date) => date.getHours() % 12 || 12,
        mm: (date) => leadingZeroes(date.getMinutes()),
        m: (date) => date.getMinutes(),
        ss: (date) => leadingZeroes(date.getSeconds()),
        s: (date) => date.getSeconds(),
        ff: (date) => leadingZeroes(date.getMilliseconds(), 3),
        f: (date) => date.getMilliseconds(),
        A: (date) => languages[unitTestingTask.lang()].meridiem(date.getHours(), false),
        a: (date) => languages[unitTestingTask.lang()].meridiem(date.getHours(), true),
        ZZ: (date, format, separator) => {
            const tz = date.getTimezoneOffset();
            const hours = Math.abs(Math.floor(tz / 60));
            const mins = tz % 60;
            const sign = tz > 0 ? '-' : '+';

            separator = separator || '';

            return sign + [leadingZeroes(hours), leadingZeroes(mins)].join(separator);
        },
        Z: (date) => tokens.ZZ(date, null, ':')
    };

    const possibleFormats = [];

    for (const extractor in tokens) {
        possibleFormats.push(extractor); 
    }
    const regexp = new RegExp(possibleFormats.join('|'), 'mg');

    /**
     * Formats date according to `format` string.
     * Format string may consist of any characters, but some of them considered tokens,
     * and will be replaced by appropriate value from `date`.
     * Possible tokens include:
     *  * **YYYY**: 4-digit year
     *  * **YY**: last 2 digit of year
     *  * **MMMM**: full name of month
     *  * **MMM**: short name of month
     *  * **MM**: ISO8601-compatible number of month (i.e. zero-padded) in year (with January being 1st month)
     *  * **M**: number of month in year without zero-padding (with January being 1st month)
     *  * **DDD**: full name of day
     *  * **DD**: short name of day
     *  * **D**: min name of day
     *  * **dd**: zero-padded number of day in month
     *  * **d**: number of day in month
     *  * **HH**: zero-padded hour in 24-hr format
     *  * **H**: hour in 24-hr format
     *  * **hh**: zero-padded hour in 12-hr format
     *  * **h**: hour in 12-hr format
     *  * **mm**: zero-padded minutes
     *  * **m**: minutes
     *  * **ss**: zero-padded seconds
     *  * **s**: seconds
     *  * **ff**: zero-padded milliseconds
     *  * **f**: milliseconds
     *  * **A**: AM/PM
     *  * **a**: am/pm
     *  * **ZZ**: time-zone in ISO8601-compatible basic format (i.e. "-0400")
     *  * **Z**: time-zone in ISO8601-compatible extended format (i.e. "-04:00")
     *
     *  Longer tokens take precedence over shorter ones (so "MM" will aways be "04", not "44" in april).
     *
     * @param {String} format
     * @param {Date|Number|String} [date=new Date()]
     *
     * @return {String}
     */
    const unitTestingTask = (format, date) => {
        if (!format || typeof format !== 'string') {
            throw new TypeError('Argument `format` must be a string');
        }

        if (date !== undefined && !(date instanceof Date) && typeof date !== 'number' && typeof date !== 'string') {
            throw new TypeError('Argument `date` must be instance of Date or Unix Timestamp or ISODate String');
        }

        const dt = date ? date instanceof Date ? date : new Date(date) : new Date();

        format = format.toString();

        return unitTestingTask._formatters[format] ? unitTestingTask._formatters[format](dt) : format.replace(regexp, match => tokens[match](dt, format));
    }

    /**
     * Predefined languages storage.
     *
     * @type {Object}
     */
    var languages = unitTestingTask._languages = {};

    /**
     * Creates lang function.
     *
     * @param  {String}   lang      Language to set
     * @param  {Object}   [options] Language options
     *
     * @return {String}             Current language.
     */
    const lang = unitTestingTask.lang = (lang, options) => {
        if (!lang) {
            return languages.current;
        }

        if (!options) {
            if (languages[lang] && languages.current !== lang) {
                languages.current = lang;
            } else if (LANGUAGES[lang]) {
                LANGUAGES[lang](unitTestingTask);
                languages.current = lang
            }

            return languages.current;
        }

        languages[lang] = options;
        languages.current = lang;
        return languages.current;
    };

    // Let's create English language
    lang('en', {
        _months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
        months(date) {
            return this._months[date.getMonth()];
        },
        _monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
        monthsShort(date) {
            return this._monthsShort[date.getMonth()];
        },
        weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
        weekdaysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        weekdaysMin: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        meridiem(hours, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        }
    });

    /**
     * Creates formatting function. Basically just curry over unitTestingTask.
     *
     * @return {Function} Readied formatting function with one argument — date.
     */
    const createFormatter = format => date => {
        const f = format[unitTestingTask.lang()] || format['default'] || format;
        return unitTestingTask(f, date);
    };

    /**
     * Predefined formatters storage.
     *
     * @type {Object}
     */
    const formatters = unitTestingTask._formatters = {};

    /**
     * Creates formatting function and files it under `unitTestingTask.formatters[name]`
     * Using is just `unitTestingTask('myformat')`
     *
     * @param {String} name
     * @param {String|Object} format
     *
     * @example
     * ```js
     * unitTestingTask.register('longDate', 'd MMMM');
     * unitTestingTask.register('longDateAndTime', {
     *   'en': 'MMMM d, h:mma',
     *   'default': 'd MMMM, HH:mm'
     * });
     * ```
     *
     * @return {Function} Readied formatting function with one argument — date.
     */
    const register = unitTestingTask.register = (name, format) => {
        formatters[name] = createFormatter(format);
        return formatters[name];
    };

    /**
     * Return list of custom formats
     *
     * @return {Array}
     */
    unitTestingTask.formatters = () => Object.keys(unitTestingTask._formatters);

    // Let's create some basic formats
    register('ISODate', 'YYYY-MM-dd');
    register('ISOTime', 'hh:mm:ss');
    register('ISODateTime', 'YYYY-MM-ddThh:mm:ss');
    register('ISODateTimeTZ', 'YYYY-MM-ddThh:mm:ssZ');

    return unitTestingTask;
};

export default testTask;