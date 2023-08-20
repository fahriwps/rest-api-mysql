"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendErrorResponse = exports.sendSuccessResponse = void 0;
const sendSuccessResponse = (res, statusCode, data) => {
    res.status(statusCode).json(data);
};
exports.sendSuccessResponse = sendSuccessResponse;
const sendErrorResponse = (res, statusCode, message) => {
    res.status(statusCode).send(message);
};
exports.sendErrorResponse = sendErrorResponse;
