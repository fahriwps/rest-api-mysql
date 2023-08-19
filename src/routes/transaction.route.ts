import express from "express";
import transactionController from "../controllers/transaction.controller";

const transactionRoutes = express.Router();

transactionRoutes.post('/', transactionController.postTransaction);
transactionRoutes.put('/:id', transactionController.putTransactionId);
transactionRoutes.delete('/:id', transactionController.deleteTransactionId);

export default transactionRoutes;