import testTask from '../../unitTestingTaskES6';

const testFunction = testTask();

const originDate = 'September 22, 2022 14:25:53';
let testDate;

beforeEach(() => {
  testDate = new Date(originDate);
  testFunction.lang('cs');
});

afterAll(() => {
  testFunction.lang('en');
});

describe('czech language', () => {
  test('czech format of meridiem before 12', () => {
    testDate.setHours(3);
    expect(testFunction('A', testDate)).toEqual('dopoledne');
  });

  test('czech format of meridiem after 12', () => {
    testDate.setHours(13);
    expect(testFunction('A', testDate)).toEqual('odpoledne');
  });

  test('czech months in nominative', () => {
    'leden_únor_březen_duben_květen_červen_červenec_září_říjen_listopad_prosinec'
      .split('_')
      .forEach((month, index) => {
        testDate.setMonth(index);
        expect(testFunction('MMMM', testDate)).toEqual(month);
      });
  });

  test('czech months in accusative', () => {
    'ledna_února_března_dubna_května_června_července_září_října_listopadu_prosince'
      .split('_')
      .forEach((month, index) => {
        testDate.setMonth(index);
        expect(testFunction('d MMMM', testDate)).toEqual(`22 ${month}`);
      });
  });

  test('czech months shortly nominative', () => {
    'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'
      .split('_')
      .forEach((month, index) => {
        testDate.setMonth(index);
        expect(testFunction('MMM', testDate)).toEqual(month);
      });
  });

  test('czech months shortly accusative', () => {
    'led_úno_bře_dub_kvě_čvn_čvc_srp_zář_říj_lis_pro'
      .split('_')
      .forEach((month, index) => {
        testDate.setMonth(index);
        expect(testFunction("d MMM", testDate)).toEqual(`22 ${month}`);
      });
  });

  test('czech days fully', () => {
    'neděle_pondělí_úterý_středa_čtvrtek_pátek_sobota'
      .split('_')
      .forEach((day, index) => {
        testDate.setDate(18 + index);
        expect(testFunction('DDD', testDate)).toEqual(day);
      });
  });

  test('czech days shortly', () => {
    'ne_po_út_stř_čt_pá_so'.split('_').forEach(function (day, index) {
      testDate.setDate(18 + index);
      expect(testFunction('DD', testDate)).toEqual(day);
    });
  });
});
