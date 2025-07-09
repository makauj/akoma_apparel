import { convertCurrency } from '../../src/utils/convertCurrency';

describe('Currency Conversion Utility', () => {
  it('converts KES to UGX', () => {
    expect(convertCurrency(1000, 'UGX')).toBeCloseTo(2.7);
  });
  it('converts KES to NGN', () => {
    expect(convertCurrency(1000, 'NGN')).toBeCloseTo(8);
  });
  it('converts KES to RWF', () => {
    expect(convertCurrency(1000, 'RWF')).toBeCloseTo(9);
  });
  it('converts KES to TZS', () => {
    expect(convertCurrency(1000, 'TZS')).toBeCloseTo(4.5);
  });
  it('converts KES to UGX', () => {
    expect(convertCurrency(1000, 'UGX')).toBeCloseTo(2.7);
  });
  it('converts KES to ZAR', () => {
    expect(convertCurrency(1000, 'ZAR')).toBeCloseTo(67);
  });
});
