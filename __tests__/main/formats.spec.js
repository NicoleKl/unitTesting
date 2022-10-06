import testTask from '../../unitTestingTaskES6';
import timezonedDate from 'timezoned-date';

const testFunction = testTask();
const timezoned = timezonedDate;

const originDate = 'September 22, 2022 14:25:53';
let testDate;

beforeEach(() => {
  testDate = new Date(originDate);
});

describe('should return correct year formats', () => {
  test('YYYY format should be 2022', () => {
    expect(testFunction('YYYY', testDate)).toEqual('2022');
  });

  test('YYYY format should be 2022', () => {
    testDate.setYear(1997);
    expect(testFunction('YYYY', testDate)).toEqual('1997');
  });

  test('YY format should be 22', () => {
    expect(testFunction('YY', testDate)).toEqual('22');
  });

  test('YY format should be 75', () => {
    testDate.setYear(1975);
    expect(testFunction('YY', testDate)).toEqual('75');
  });
});

describe('should return correct month formats', () => {
  test('MMMM format should be full month name', () => {
    expect(testFunction('MMMM', testDate)).toEqual('September');
  });

  test('MMM format should be short month name', () => {
    expect(testFunction('MMM', testDate)).toEqual('Sep');
  });

  test('MM format should be two digits if less than 10', () => {
    expect(testFunction('MM', testDate)).toEqual('09');
  });

  test('MM format should be two digits if more than 10', () => {
    testDate.setMonth(11);
    expect(testFunction('MM', testDate).length).toBe(2);
  });

  test('M format should be 9', () => {
    expect(testFunction('M', testDate)).toEqual('9');
  });

  test('M format should be one digit if less than 10', () => {
    testDate.setMonth(11);
    expect(testFunction('M', testDate).length).toBe(2);
  });
});

describe('should return correct day formats', () => {
  test('DDD format should be Thursday', () => {
    expect(testFunction('DDD', testDate)).toEqual('Thursday');
  });

  test('DD format should be Thu', () => {
    expect(testFunction('DD', testDate)).toEqual('Thu');
  });

  test('D format should be Th', () => {
    expect(testFunction('D', testDate)).toEqual('Th');
  });

  test('dd format should be 22', () => {
    expect(testFunction('dd', testDate)).toEqual('22');
  });

  test('dd format should be two digits if less than 10', () => {
    testDate.setDate(1);
    expect(testFunction('dd', testDate).length).toBe(2);
  });

  test('d format should be 22', () => {
    expect(testFunction('d', testDate)).toEqual('22');
  });

  test('d format should be one digit if less than 10', () => {
    testDate.setDate(1);
    expect(testFunction('d', testDate).length).toBe(1);
  });
});

describe('should return correct time formats', () => {
  test('HH format should be 14', () => {
    expect(testFunction('HH', testDate)).toEqual('14');
  });

  test('H format should be 14', () => {
    expect(testFunction('H', testDate)).toEqual('14');
  });

  test('H format should be one digit if less than 10', () => {
    testDate.setHours(1);
    expect(testFunction('H', testDate).length).toBe(1);
  });

  test('hh format should be 02', () => {
    expect(testFunction('hh', testDate)).toEqual('02');
  });

  test('hh format should be 12', () => {
    testDate.setHours(12);
    expect(testFunction('hh', testDate)).toEqual('12');
  });

  test('h format should be 2', () => {
    expect(testFunction('h', testDate)).toEqual('2');
  });

  test('h format should be 12', () => {
    testDate.setHours(12);
    expect(testFunction('h', testDate)).toEqual('12');
  });

  test('mm format should be 25', () => {
    expect(testFunction('mm', testDate)).toEqual('25');
  });

  test('mm format should be two digits if less than 10', () => {
    testDate.setMinutes(3);
    expect(testFunction('mm', testDate).length).toBe(2);
  });

  test('m format should be 25', () => {
    expect(testFunction('m', testDate)).toEqual('25');
  });

  test('m format should be one digit if less than 10', () => {
    testDate.setMinutes(3);
    expect(testFunction('m', testDate)).toEqual('3');
  });

  test('ss format should be 53', () => {
    expect(testFunction('ss', testDate)).toEqual('53');
  });

  test('ss format should be two digits if less than 10', () => {
    testDate.setSeconds(5);
    expect(testFunction('ss', testDate).length).toBe(2);
  });

  test('s format should be 53', () => {
    expect(testFunction('s', testDate)).toEqual('53');
  });

  test('ff format should be three digits', () => {
    testDate.setMilliseconds(3);
    expect(testFunction('ff', testDate).length).toBe(3);
  });

  test('ff format should be three digits', () => {
    testDate.setMilliseconds('98');
    expect(testFunction('ff', testDate)).toEqual('098');
  });

  test('f format should be three digits if more than 99', () => {
    testDate.setMilliseconds(123);
    expect(testFunction('f', testDate).length).toBe(3);
  });

  test('f format should be two digits if less than 100', () => {
    testDate.setMilliseconds(99);
    expect(testFunction('f', testDate)).toEqual('99');
  });

  test('f format should be one digit if less than 10', () => {
    testDate.setMilliseconds(6);
    expect(testFunction('f', testDate).length).toBe(1);
  });
});

describe('should return correct meridiem formats', () => {
  test('A format should be PM', () => {
    expect(testFunction('A', testDate)).toEqual('PM');
  });

  test('a format should be pm', () => {
    expect(testFunction('a', testDate)).toEqual('pm');
  });

  test('A format should be AM if it is less than 12 hours', () => {
    testDate.setHours(2);
    expect(testFunction('A', testDate)).toEqual('AM');
  });

  test('a format should be am if it is less than 12 hours', () => {
    testDate.setHours(2);
    expect(testFunction('a', testDate)).toEqual('am');
  });
});

describe('should return correct timezones formats', () => {
  const timezoneBehindUTC = timezoned.makeConstructor(480);
  const timezoneAheadUTC = timezoned.makeConstructor(-180);

  test('ZZ format should be correct timezone ISO format', () => {
    let timezoneDate = new timezoneBehindUTC();
    expect(testFunction('ZZ', timezoneDate)).toEqual('+0800');
  });

  test('ZZ format should be correct timezone ISO format', () => {
    let timezoneDate = new timezoneAheadUTC();
    expect(testFunction('ZZ', timezoneDate)).toEqual('-0300');
  });

  test("Z format should be extended format that contains ':'", () => {
    expect(testFunction('Z', testDate)).toContain(':');
  });
});

describe('should return correct registered formats', () => {
  test('ISODate registered format should be YYYY-MM-dd', () => {
    expect(testFunction('ISODate', testDate)).toEqual('2022-09-22');
  });

  test('ISOTime registered format must be hh:mm:ss', () => {
    expect(testFunction('ISOTime', testDate)).toEqual('02:25:53');
  });

  test('ISODateTime registered format must be YYYY-MM-ddThh:mm:ss', () => {
    expect(testFunction('ISODateTime', testDate)).toEqual(
      '2022-09-22T02:25:53'
    );
  });
});

describe('should create new custom format', () => {
  let customFormats = testFunction.formatters();
  testFunction.register('newFormat', 'MM-DD-YY');
  let updatedFormats = testFunction.formatters();

  test('should add new format', () => {
    expect(updatedFormats.length - customFormats.length).toBe(1);
  });

  test('newFormat should return MM-DD-YY', () => {
    expect(testFunction('newFormat', testDate)).toEqual('09-Thu-22');
  });
});
