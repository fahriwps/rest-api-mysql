import express, { Request, Response } from 'express';
import userRoutes from "./user.route";
import transactionRoutes from "./transaction.route";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.handler";

const routes = express.Router();

routes.get('/', (req: Request, res: Response): void => {
    try {
        sendSuccessResponse(res, 200, { status: 'Success', message: 'This is a simple mbanking REST API project using Express.js, MySql and TypeScript. Explore using method GET, POST, PUT, PATCH or DELETE.'});
    } catch (error) {
        sendErrorResponse(res, 500, 'Failed to access main endpoint');
    }
});

routes.use('/user', userRoutes);
routes.use('/transaction', transactionRoutes);

export default routes;