import cors from 'cors';
import express from 'express';
import path from 'path';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app = express();

// Parser
app.use(express.json());
app.use(cors());

// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

// Application route
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
