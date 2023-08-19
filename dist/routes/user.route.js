"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const userRoutes = express_1.default.Router();
userRoutes.get('/', user_controller_1.default.getAllUsers);
userRoutes.get('/:id', user_controller_1.default.getIdUser);
exports.default = userRoutes;
