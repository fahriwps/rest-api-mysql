import { Request, Response } from 'express';
import { db } from "../config/db.connection";

const postTransaction = async (req: Request, res: Response): Promise<void> => {
    const { type, amount, user_id } = req.body;

    try {
        const postTransactionQuery = `
            INSERT INTO Transaction (user_id, type, amount)
            VALUES (?, ?, ?);
        `;

        await db.query(postTransactionQuery, [user_id, type, amount]);
        res.json({ id: user_id });
    } catch (error) {
        res.status(500).send('Failed adding transaction');
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
        res.json({ id: transactionId });
    } catch (error) {
        res.status(500).send('Failed updating transaction');
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
        res.json({ id: transactionId });
    } catch (error) {
        res.status(500).send('Failed deleting transaction');
    }
}

const transactionController = { postTransaction, putTransactionId, deleteTransactionId };
export default transactionController;