import testTask from '../../unitTestingTaskES6';

const testFunction = testTask();

const originDate = 'September 22, 2022 14:25:53';
let testDate;

beforeEach(() => {
  testDate = new Date(originDate);
  testFunction.lang('tt');
});

afterAll(() => {
  testFunction.lang('en');
});

describe('tatar language', () => {
    test('tatar months in nominative', () => {
        'гыйнвар_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'
        .split('_')
        .forEach((month, index) => {
            testDate.setMonth(index);
            expect(testFunction('MMMM', testDate)).toEqual(month);
        });
    });

    test('tatar months shortly', () => {
        'гыйнв_фев_мар_апр_май_июнь_июль_авг_сен_окт_ноя_дек'
        .split('_')
        .forEach((month, index) => {
            testDate.setMonth(index);
            expect(testFunction('MMM', testDate)).toEqual(month);
        });
    });

    test('tatar days fully', () => {
        'якшәмбе_дүшәмбе_сишәмбе_чәршәмбе_пәнҗешәмбе_җомга_шимбә'
        .split('_')
        .forEach((day, index) => {
            testDate.setDate(18 + index);
            expect(testFunction('DDD', testDate)).toEqual(day);
        });
    });

    test('tatar days shortly', () => {
        'як_дш_сш_чш_пш_җм_шм'.split('_').forEach(function (day, index) {
        testDate.setDate(18 + index);
        expect(testFunction('DD', testDate)).toEqual(day);
        });
    });
});
