import { readFileSync } from 'fs';
import { join } from 'path';
import { PAYMENT_STATUS } from '../../constants/global';
import { Booking } from '../Booking/booking.model';
import { Order } from '../Order/order.model';
import { verifyPayment } from './payment.utils';

const confirmation = async (transactionId: string, amount = '0') => {
  const verifyResponse = await verifyPayment(transactionId);
  // console.log(verifyResponse);

  let message = '';
  let statusClass = '';
  let icon = '';
  const date = new Date().toLocaleDateString();

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    const order = await Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus: PAYMENT_STATUS.Paid },
      { new: true },
    );

    await Booking.findByIdAndUpdate(order?.booking, {
      paymentStatus: PAYMENT_STATUS.Paid,
    });

    message = 'Successfully Paid!';
    statusClass = 'success';
    icon = '&#10004;'; // Checkmark icon
  } else {
    const order = await Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus: PAYMENT_STATUS.Failed },
      { new: true },
    );

    await Booking.findByIdAndUpdate(order?.booking, {
      paymentStatus: PAYMENT_STATUS.Failed,
    });

    message = 'Payment Failed!';
    statusClass = 'failure';
    icon = '&#10060;'; // Cross icon
  }

  // const filePath = join(__dirname, '../../../view/confirmation.html');
  // let template = readFileSync(filePath, 'utf-8');

  // template = template.replace('{{message}}', message);

  // return template;

  // eslint-disable-next-line no-undef
  const filePath = join(__dirname, '../../../../public/confirmation.html'); // Update your HTML file path
  let template = readFileSync(filePath, 'utf-8');

  // Replace the template variables
  template = template.replace('{{message}}', message);
  template = template.replace('{{statusClass}}', statusClass);
  template = template.replace('{{icon}}', icon);
  template = template.replace('{{transactionId}}', transactionId);
  template = template.replace('{{amount}}', amount);
  template = template.replace('{{date}}', date);

  return template;
  // return `<h1>Payment ${status}</h1>`;
};

export const PaymentService = {
  confirmation,
};
