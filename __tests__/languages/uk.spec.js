import testTask from '../../unitTestingTaskES6';

const testFunction = testTask();

const originDate = 'September 22, 2022 14:25:53';
let testDate;

beforeEach(() => {
    testDate = new Date(originDate);
    testFunction.lang('uk');
});

afterAll(() => {
    testFunction.lang('en'); 
});

describe('should use ukrainian language', () => {
  test('ukrainian format of meridiem before 4', () => {
    testDate.setHours(3);
    expect(testFunction('A', testDate)).toEqual('ночі');
  });

  test('should return ukrainian format of meridiem before 12', () => {
    testDate.setHours(6);
    expect(testFunction('A', testDate)).toEqual('ранку');
  });

  test('should return ukrainian format of meridiem before 17', () => {
    expect(testFunction('A', testDate)).toEqual('дня');
  });

  test('should return ukrainian format of meridiem after 17', () => {
    testDate.setHours(18);
    expect(testFunction('A', testDate)).toEqual('вечора');
  });

  test('should return ukrainian months in nominative', () => {
    'січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень'
      .split('_')
      .forEach((month, index) => {
        testDate.setMonth(index);
        expect(testFunction('MMMM', testDate)).toEqual(month);
      });
  });

  test('ukrainian months in accusative', () => {
    'січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня'
      .split('_')
      .forEach((month, index) => {
        testDate.setMonth(index);
        expect(testFunction('d MMMM', testDate)).toEqual(`22 ${month}`);
      });
  });

  test('ukrainian months shortly', () => {
    'січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд'
      .split('_')
      .forEach((month, index) => {
        testDate.setMonth(index);
        expect(testFunction('MMM', testDate)).toEqual(month);
      });
  });

  test('ukrainian days fully nominative', () => {
    'понеділок_вівторок_середа_четвер_п’ятниця_субота_неділя'
      .split('_')
      .forEach((day, index) => {
        testDate.setDate(19 + index);
        expect(testFunction('DDD', testDate)).toEqual(day);
      });
  });

  test('ukrainian days fully accusative', () => {
    'понеділок_вівторок_середа_четвер_п’ятниця_субота_неділя'
      .split('_')
      .forEach((day, index) => {
        testDate.setDate(19 + index);
        expect(testFunction('DDD', testDate)).toEqual(day);
      });
  });

  test('ukrainian days shortly', () => {
    'пн_вт_ср_чт_пт_сб_нд'.split('_').forEach(function (day, index) {
      testDate.setDate(19 + index);
      expect(testFunction('DD', testDate)).toEqual(day);
    });
  });
});
