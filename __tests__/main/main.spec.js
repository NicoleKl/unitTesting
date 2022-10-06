import testTask from '../../unitTestingTaskES6';

const testFunction = testTask();

const originDate = 'September 22, 2022 14:25:53';
let testDate;

beforeEach(() => {
  testDate = new Date(originDate);
  testFunction.lang('en');
});

describe('should return correct formats using all possible types of date', () => {
  test('should return correct format when date is a string', () => {
    testDate = 'December 25, 1997';
    expect(testFunction('ISODate', testDate)).toEqual('1997-12-25');
  });

  test('should return correct format when date is a number(milliseconds)', () => {
    testDate = testDate.getTime();
    expect(testFunction('ISODate', testDate)).toEqual('2022-09-22');
  });
});

describe('should throw error when input types are wrong', () => {
  test('when format input is not a string, should throw error', () => {
    try {
      expect(testFunction()).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Argument `format` must be a string');
    }
  });

  test('when date input is wrong, should throw error', () => {
    try {
      expect(testFunction('YYYY', true)).toBe(true);
    } catch (e) {
      expect(e.message).toBe(
        'Argument `date` must be instance of Date or Unix Timestamp or ISODate String'
      );
    }
  });

  test('when date input is undefined should return format of current date', () => {
    const currentDate = new Date();
    const [curYear, curMonth, curData] = [
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
    ];

    expect(testFunction('YYYY-M-d')).toEqual(
      `${curYear}-${curMonth}-${curData}`
    );
  });
});

describe('should use current landguage when non-existent language is set', () => {
    test('should use current(english) language', () => {
        testFunction.lang('non');
        expect(testFunction('MMMM', testDate)).toEqual('September');
    });
});
