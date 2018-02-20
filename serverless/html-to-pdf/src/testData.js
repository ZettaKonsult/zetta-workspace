export default {
  createdAt: Date.now(),
  daysToPay: 30,
  companyCustomer: {
    firstName: 'Fredrik',
    lastName: 'Palmquist',
    company: 'Zetta Konsult',
    address: 'Kämnärsvägen 23F',
    email: 'fiddep@telia.com',
    zipcode: '22646',
    city: 'Lund',
    mobile: '0709-394595',
    VAT: 'SE910504003501',
    bank: {
      name: 'Swedbank',
      address: ' ',
      giro: '650-4773',
    },
  },
  recipient: {
    firstName: 'Kund Fredrik',
    lastName: 'Palmquist',
    address: 'Kämnärsvägen 23F',
    zipcode: '22646',
    city: 'Lund',
    company: 'Kung företag',
  },
  invoiceRows: [
    {
      interval: 1,
      price: 550,
      description: 'Hej! Detta är en rad',
    },
    {
      interval: 2,
      price: 550,
      description: 'Hej! Detta är en annan rad',
    },
    {
      interval: 3,
      price: 550,
      description: `Hejdå! Detta är slut på rader och det kommer inte komma
         fler om du har tur. Men måste skriva en massa mer för att se hur grid hanterar väldigt långa stängar. Det är ju trevligt att tempalte strings hanterar enter så att de inte gör något om man vill dela upp strängen.
         Softwrap i vscode hjälper också till!`,
    },
  ],
  tax: 1.25,
};
