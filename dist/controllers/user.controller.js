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
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAllQuery = `
            SELECT
                *
            FROM User;
        `;
        const userAllResult = yield db_connection_1.db.query(userAllQuery);
        res.status(200).json(userAllResult[0]);
    }
    catch (error) {
        console.error('Error result:', error);
        res.status(500).send('Error');
    }
});
const getIdUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const userResult = yield db_connection_1.db.query(userInfoQuery, [userId]);
        if (userResult.length === 0) {
            res.status(404).send('User ID not found');
        }
        else {
            res.json(userResult[0]);
        }
    }
    catch (error) {
        res.status(500).send('Failed get user ID information');
    }
});
const userController = { getAllUsers, getIdUser };
exports.default = userController;
