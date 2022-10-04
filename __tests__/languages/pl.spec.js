import testTask from '../../unitTestingTaskES6';

const testFunction = testTask();

const originDate = 'September 22, 2022 14:25:53';
let testDate;

beforeEach(() => {
  testDate = new Date(originDate);
  testFunction.lang('pl');
});

afterAll(() => {
  testFunction.lang('en');
});

describe('polish language', () => {
    test('polish format of meridiem before 12', () => {
        testDate.setHours(3);
        expect(testFunction('A', testDate)).toEqual('rano');
    });

    test('polish format of meridiem after 12 should be empty', () => {
        testDate.setHours(13);
        expect(testFunction('A', testDate)).toEqual('');
    });

    test('polish months in nominative', () => {
        'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpeń_wrzesień_październik_listopad_grudzień'
        .split('_')
        .forEach((month, index) => {
            testDate.setMonth(index);
            expect(testFunction('MMMM', testDate)).toEqual(month);
        });
    });

    test('polish months in accusative', () => {
        'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_październik_listopada_grudnia'
        .split('_')
        .forEach((month, index) => {
            testDate.setMonth(index);
            expect(testFunction('d MMMM', testDate)).toEqual(`22 ${month}`);
        });
    });

    test('polish months shortly nominative', () => {
        'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'
        .split('_')
        .forEach((month, index) => {
            testDate.setMonth(index);
            expect(testFunction('MMM', testDate)).toEqual(month);
        });
    });

    test('polish months shortly accusative', () => {
        'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'
        .split('_')
        .forEach((month, index) => {
            testDate.setMonth(index);
            expect(testFunction("d MMM", testDate)).toEqual(`22 ${month}`);
        });
    });

    test('polish days fully', () => {
        'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'
        .split('_')
        .forEach((day, index) => {
            testDate.setDate(18+ index);
            expect(testFunction('DDD', testDate)).toEqual(day);
        });
    });

    test('polish days shortly', () => {
        'nie_pon_wt_śr_czw_pt_sb'.split('_').forEach(function (day, index) {
            testDate.setDate(18 + index);
            expect(testFunction('DD', testDate)).toEqual(day);
        });
    });
});
