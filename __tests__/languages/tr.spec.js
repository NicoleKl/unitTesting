import testTask from '../../unitTestingTaskES6';

const testFunction = testTask();

const originDate = 'September 22, 2022 14:25:53';
let testDate;

beforeEach(() => {
  testDate = new Date(originDate);
  testFunction.lang('tr');
});

afterAll(() => {
  testFunction.lang('en');
});

describe('should use turkish language', () => {
  test('should return turkish months in nominative', () => {
    'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'
      .split('_')
      .forEach((month, index) => {
        testDate.setMonth(index);
        expect(testFunction('MMMM', testDate)).toEqual(month);
      });
  });

  test('should return turkish months shortly', () => {
    'Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara'
      .split('_')
      .forEach((month, index) => {
        testDate.setMonth(index);
        expect(testFunction('MMM', testDate)).toEqual(month);
      });
  });

  test('should return turkish days fully', () => {
    'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'
      .split('_')
      .forEach((day, index) => {
        testDate.setDate(18 + index);
        expect(testFunction('DDD', testDate)).toEqual(day);
      });
  });

  test('should return turkish days shortly', () => {
    'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_').forEach(function (day, index) {
      testDate.setDate(18 + index);
      expect(testFunction('DD', testDate)).toEqual(day);
    });
  });
});
