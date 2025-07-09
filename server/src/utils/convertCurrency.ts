type Currency = 'KES' | 'NGN' | 'RWF' | 'TZS' | 'UGX' | 'ZAR' | 'USD' | 'EUR';

type CurrencySymbol = {
  [key in Currency]: string;
};

const currencySymbols: CurrencySymbol = {
  KES: 'KSh',
  NGN: '₦',
  RWF: 'RF',
  TZS: 'TSh',
  UGX: 'USh',
  ZAR: 'R',
  USD: '$',
  EUR: '€',
};

const exchangeRates: { [key in Currency]: number } = {
  KES: 1,
  USD: 0.0075,
  EUR: 0.0069,
  NGN: 0.008,
  RWF: 0.009,
  TZS: 0.0045,
  UGX: 0.0027,
  ZAR: 0.067,
};

export const convertCurrency = (amountKES: number, targetCurrency: Currency): number => {
  const rate = exchangeRates[targetCurrency];
  return Number((amountKES * rate).toFixed(2));
}
