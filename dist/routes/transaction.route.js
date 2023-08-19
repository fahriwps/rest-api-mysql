"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = __importDefault(require("../controllers/transaction.controller"));
const transactionRoutes = express_1.default.Router();
transactionRoutes.post('/', transaction_controller_1.default.postTransaction);
transactionRoutes.put('/:id', transaction_controller_1.default.putTransactionId);
transactionRoutes.delete('/:id', transaction_controller_1.default.deleteTransactionId);
exports.default = transactionRoutes;
