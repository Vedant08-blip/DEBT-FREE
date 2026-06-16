export const formatCurrency = (amount, customCurrency = null) => {
  let currency = 'INR';
  let locale = 'en-IN';

  // Read preferred currency from localStorage if not explicitly supplied
  if (customCurrency) {
    currency = customCurrency;
  } else {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo && userInfo.currency) {
        currency = userInfo.currency;
      }
    } catch {
      // Ignore errors
    }
  }

  // Adjust locale depending on currency
  if (currency === 'USD') {
    locale = 'en-US';
  } else if (currency === 'EUR') {
    locale = 'en-IE';
  } else {
    locale = 'en-IN';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};
