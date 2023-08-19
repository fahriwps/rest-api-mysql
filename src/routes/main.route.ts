import express, {Request, Response} from 'express';
import userRoutes from "./user.route";
import transactionRoutes from "./transaction.route";

const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
    res.send("This is a simple mbanking REST API project using Express.js, MySql and TypeScript. Explore using method GET, POST, PUT, PATCH or DELETE.");
});

routes.use('/user', userRoutes);
routes.use('/transaction', transactionRoutes);

export default routes;