import orderModel from '../Order/order.model';
import { verifyPayment } from './payment.utils';

const confirmation = async (transactionId: string, status: string) => {
  const verifyResponse = await verifyPayment(transactionId);
  // console.log(verifyResponse);

  let result;
  let message = '';
  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    result = await orderModel.findOneAndUpdate(
      { transactionId },
      { paymentStatus: 'Paid' },
    );
    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  console.log({ result, message });

  // const filePath = join(__dirname, '../../../view/confirmation.html');
  // let template = readFileSync(filePath, 'utf-8');

  // template = template.replace('{{message}}', message);

  // return template;
  return `<h1>Payment ${status}</h1>`;
};

export const PaymentService = {
  confirmation,
};
