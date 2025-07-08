import nodemailer from 'nodemailer';

(async () => {
  const testAccount = await nodemailer.createTestAccount();
  console.log('ETHEREAL_USER=' + testAccount.user);
  console.log('ETHEREAL_PASS=' + testAccount.pass);
})();
