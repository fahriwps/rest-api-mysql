import { Request, Response } from 'express';
import { db } from "../config/db.connection";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.handler";

const postTransaction = async (req: Request, res: Response): Promise<void> => {
    const { type, amount, user_id } = req.body;

    try {
        const postTransactionQuery = `
            INSERT INTO Transaction (user_id, type, amount)
            VALUES (?, ?, ?);
        `;

        await db.query(postTransactionQuery, [user_id, type, amount]);
        sendSuccessResponse(res, 200, { id: user_id });
    } catch (error) {
        sendErrorResponse(res, 500, 'Failed adding transaction');
    }
}

const putTransactionId = async (req: Request, res: Response): Promise<void> => {
    const transactionId: number = parseInt(req.params.id);
    const { type, amount, user_id } = req.body;

    try {
        const updateTransactionQuery = `
            UPDATE Transaction
            SET type = ?, amount = ?, user_id = ?
            WHERE id = ?;
        `;

        await db.query(updateTransactionQuery, [type, amount, user_id, transactionId]);
        sendSuccessResponse(res, 200, { id: transactionId });
    } catch (error) {
        sendErrorResponse(res, 500, 'Failed updating transaction');
    }
}

const deleteTransactionId = async (req: Request, res: Response): Promise<void> => {
    const transactionId: number = parseInt(req.params.id);
    try {
        const deleteTransactionQuery = `
            DELETE FROM Transaction
            WHERE id = ?;
        `;

        await db.query(deleteTransactionQuery, [transactionId]);
        sendSuccessResponse(res, 200, { id: transactionId });
    } catch (error) {
        sendErrorResponse(res, 500, 'Failed deleting transaction');
    }
}

const transactionController = { postTransaction, putTransactionId, deleteTransactionId };
export default transactionController;
