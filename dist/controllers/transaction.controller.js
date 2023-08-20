"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../config/db.connection");
const response_handler_1 = require("../utils/response.handler");
const postTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, amount, user_id } = req.body;
    try {
        const postTransactionQuery = `
            INSERT INTO Transaction (user_id, type, amount)
            VALUES (?, ?, ?);
        `;
        yield db_connection_1.db.query(postTransactionQuery, [user_id, type, amount]);
        (0, response_handler_1.sendSuccessResponse)(res, 200, { id: user_id });
    }
    catch (error) {
        (0, response_handler_1.sendErrorResponse)(res, 500, 'Failed adding transaction');
    }
});
const putTransactionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = parseInt(req.params.id);
    const { type, amount, user_id } = req.body;
    try {
        const updateTransactionQuery = `
            UPDATE Transaction
            SET type = ?, amount = ?, user_id = ?
            WHERE id = ?;
        `;
        yield db_connection_1.db.query(updateTransactionQuery, [type, amount, user_id, transactionId]);
        (0, response_handler_1.sendSuccessResponse)(res, 200, { id: transactionId });
    }
    catch (error) {
        (0, response_handler_1.sendErrorResponse)(res, 500, 'Failed updating transaction');
    }
});
const deleteTransactionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = parseInt(req.params.id);
    try {
        const deleteTransactionQuery = `
            DELETE FROM Transaction
            WHERE id = ?;
        `;
        yield db_connection_1.db.query(deleteTransactionQuery, [transactionId]);
        (0, response_handler_1.sendSuccessResponse)(res, 200, { id: transactionId });
    }
    catch (error) {
        (0, response_handler_1.sendErrorResponse)(res, 500, 'Failed deleting transaction');
    }
});
const transactionController = { postTransaction, putTransactionId, deleteTransactionId };
exports.default = transactionController;
