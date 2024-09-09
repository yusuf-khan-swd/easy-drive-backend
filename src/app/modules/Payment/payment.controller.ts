import { Request, Response } from 'express';
import { PaymentService } from './payment.service';

const confirmation = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.query;

    const result = await PaymentService.confirmation(transactionId as string);

    res.send(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
      error,
    });
  }
};

export const PaymentController = {
  confirmation,
};
