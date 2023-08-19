"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./user.route"));
const transaction_route_1 = __importDefault(require("./transaction.route"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send("This is a simple mbanking REST API project using Express.js, MySql and TypeScript. Explore using method GET, POST, PUT, PATCH or DELETE.");
});
routes.use('/user', user_route_1.default);
routes.use('/transaction', transaction_route_1.default);
exports.default = routes;
