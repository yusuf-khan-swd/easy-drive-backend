const createOrder = async (payload: any) => {
  const { user, car, booking, totalCost } = payload;

  const transactionId = `TXN-${Date.now()}`;

  const orderData = {
    user,
    car,
    booking,
    totalCost,
    status: 'Pending',
    paymentStatus: 'Pending',
    transactionId,
  };
  console.log(orderData);

  // const order = new Order(orderData);

  // await order.save();

  // const paymentData = {
  //   transactionId,
  //   totalCost,
  //   customerName: user?.name,
  //   customerEmail: user?.email,
  //   customerPhone: user?.phone,
  //   customerAddress: user?.address,
  // };

  // // Payment
  // const paymentSession = await initiatePayment(paymentData);
  // console.log({ paymentSession });

  // return paymentSession;
};

export const orderService = {
  createOrder,
};
