"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const apiErrorHandler_1 = require("./middlewares/apiErrorHandler");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
/**
 * An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined.
 * This prevents accessing variables within the IIFE idiom as well as polluting the global scope.
 * The primary reason to use an IIFE is to obtain data privacy.
 * Because JavaScript's var scopes variables to their containing function,
 * any variables declared within the IIFE cannot be accessed by the outside world.
 */
(() => {
    app_1.default.use(apiErrorHandler_1.errorHandler);
    app_1.default.use(apiErrorHandler_1.notFoundErrorHandler);
    const PORT = parseInt(process.env.PORT);
    app_1.default
        .listen(PORT, () => {
        console.log("##########################################################");
        console.log("#####               STARTING SERVER                  #####");
        console.log("##########################################################\n");
        console.log(`Server running → PORT ${PORT}`);
    })
        .on("error", e => {
        console.error(e);
    });
})();
//# sourceMappingURL=server.js.map