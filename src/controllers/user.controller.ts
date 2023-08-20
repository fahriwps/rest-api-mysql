import { Request, Response} from 'express';
import { db } from "../config/db.connection";
import { sendErrorResponse, sendSuccessResponse } from "../utils/response.handler";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const userAllQuery = `
            SELECT
                *
            FROM User;
        `;

        const userAllResult = await db.query(userAllQuery);
        sendSuccessResponse(res, 200, userAllResult[0]);
    } catch (error) {
        sendErrorResponse(res, 500, 'Failed getting all users');
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
        sendSuccessResponse(res, 200, userResult[0]);
    } catch (error) {
        sendErrorResponse(res, 500, 'Failed getting user ID information');
    }
}

const userController = { getAllUsers, getIdUser };
export default userController;