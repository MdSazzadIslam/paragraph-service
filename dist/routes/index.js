"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const contentRoute_1 = require("./contentRoute");
/**
 * Init Express REST routes
 * @returns {void}
 */
class Routes {
    constructor() {
        this.prefix = "/api/v1/contentpass";
    }
    routes(app) {
        app.use(this.prefix, new contentRoute_1.ContentRoute().router);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=index.js.map