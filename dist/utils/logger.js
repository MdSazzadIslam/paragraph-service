"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressWinston = __importStar(require("express-winston"));
const winston = __importStar(require("winston"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const logFormat = winston.format.printf((info) => {
    if (process.env.NODE_ENV === "development")
        return `[${info.timestamp}] ${info.level}: ${info.message}`;
    return `[${info.timestamp}] ${JSON.stringify(info.meta)} ${info.level}: ${info.message}`;
});
expressWinston.requestWhitelist.push("body");
const logger = expressWinston.logger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ level: "info", filename: `./logs/app.log` }),
        new winston.transports.File({
            level: "error",
            filename: `./logs/errors.log`,
        }),
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston.format.json(), logFormat),
    meta: true,
    expressFormat: true,
    colorize: true,
});
exports.default = logger;
//# sourceMappingURL=logger.js.map