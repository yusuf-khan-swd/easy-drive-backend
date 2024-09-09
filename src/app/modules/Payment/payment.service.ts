import { readFileSync } from 'fs';
import { join } from 'path';
import orderModel from '../Order/order.model';
import { verifyPayment } from './payment.utils';

const confirmation = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  // console.log(verifyResponse);

  let message = '';
  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await orderModel.findOneAndUpdate(
      { transactionId },
      { paymentStatus: 'Paid' },
    );
    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  // const filePath = join(__dirname, '../../../view/confirmation.html');
  // let template = readFileSync(filePath, 'utf-8');

  // template = template.replace('{{message}}', message);

  // return template;

  // eslint-disable-next-line no-undef
  const filePath = join(__dirname, '../../../../public/confirmation.html'); // Update your HTML file path
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
  // return `<h1>Payment ${status}</h1>`;
};

export const PaymentService = {
  confirmation,
};
