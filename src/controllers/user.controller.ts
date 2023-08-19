import { Request, Response} from 'express';
import { db } from "../config/db.connection";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const userAllQuery = `
            SELECT
                *
            FROM User;
        `;

        const userAllResult = await db.query(userAllQuery);
        res.status(200).json(userAllResult[0]);
    } catch (error) {
        console.error('Error result:', error);
        res.status(500).send('Error');
    }
}

const getIdUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;

    try {
        const userInfoQuery = `
        SELECT
            u.id,
            u.name,
            u.address,
            COALESCE(SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END), 0) -
            COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) AS balance,
            COALESCE(SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END), 0) AS expense
        FROM User u
        LEFT JOIN Transaction t ON u.id = t.user_id
        WHERE u.id = ?
        GROUP BY u.id, u.name, u.address;
    `;
        const userResult: Array<any> = await db.query(userInfoQuery, [userId]);

        if (userResult.length === 0) {
            res.status(404).send('User ID not found');
        } else {
            res.json(userResult[0]);
        }
    } catch (error) {
        res.status(500).send('Failed get user ID information');
    }
}

const userController = { getAllUsers, getIdUser };
export default userController;