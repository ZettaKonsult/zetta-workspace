export default async () => {
  const resp = await fetch(
    'https://checkout-test.adyen.com/services/PaymentSetupAndVerification/v32/setup',
    {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'X-API-Key':
          'AQEnhmfuXNWTK0Qc+iSKl3Asps+URphYAYeB/1nJuMJWqVUZbzshJhkiEMFdWw2+5HzctViMSCJMYAc=-fg1S0P17eBnHSTXY4X8shVse2HLsJFwwSVeK2zqpO70=-JKtDmA43TeAr2aG9',
        'Content-Type': 'application/json',
      },
    }
  );
  const response = await resp.json();

  return response;
};

//TODO fetch this from db or frontend in someway

const data = {
  amount: {
    currency: 'sek'.toUpperCase(),
    value: '17408',
  },
  reference: 'Your order number',
  merchantAccount: 'ZettaKonsultSE',
  shopperReference: 'john@test.com',
  channel: 'Web',
  html: true,
  origin: 'http://localhost:3000',
  returnUrl: 'http://localhost:3000/checkout/result',
  countryCode: 'SE',
  shopperLocale: 'sv_SE',
};
