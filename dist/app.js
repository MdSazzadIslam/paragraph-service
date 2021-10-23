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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const logger_1 = __importDefault(require("./utils/logger"));
const index_1 = require("./routes/index");
const connectDB_1 = __importDefault(require("./db/connectDB"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.routes = new index_1.Routes();
        this.setMiddleWare();
        this.routes.routes(this.app);
        this.connectDatabase();
        /**
         * This is used for testing purpose only
         */
        this.app.get("/", (req, res) => {
            res.send("API is running\n");
        });
    }
    /**
     * loading all middlewares
     */
    setMiddleWare() {
        this.app.use(logger_1.default);
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
    }
    /**
     * connecting to database
     */
    connectDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = process.env.MONGO_URI;
            yield (0, connectDB_1.default)({ db });
        });
    }
}
exports.App = App;
exports.default = new App().app;
//# sourceMappingURL=app.js.map