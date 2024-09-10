import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const initiatePayment = async (paymentData: Record<string, unknown>) => {
  try {
    const response = await axios.post(process.env.PAYMENT_URL!, {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      tran_id: paymentData.transactionId,
      success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}&amount=${paymentData.totalCost}`,
      fail_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}&amount=${paymentData.totalCost}`,
      cancel_url: 'http://localhost:3000/',
      amount: paymentData.totalCost,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: paymentData.customerName,
      cus_email: paymentData.customerEmail,
      cus_add1: paymentData.customerAddress,
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'N/A',
      cus_phone: paymentData.customerPhone,
      type: 'json',
    });

    // console.log(response);
    return response.data;
  } catch (error) {
    throw new Error('Payment initiation failed!');
  }
};

export const verifyPayment = async (tnsId: string) => {
  try {
    const response = await axios.get(process.env.PAYMENT_VERIFY_URL!, {
      params: {
        store_id: process.env.STORE_ID,
        signature_key: process.env.SIGNATURE_KEY,
        request_id: tnsId,
        type: 'json',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Payment validation failed!');
  }
};
