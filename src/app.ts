import express from 'express';
import { Request, Response, NextFunction } from 'express';
import routes from './application/routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('', routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);
    res.status(500).json({ message: err?.message || 'Internal Server Error' });
});

export default app;
