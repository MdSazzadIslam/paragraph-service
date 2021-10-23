"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundErrorHandler = void 0;
/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
function notFoundErrorHandler(req, res, next) {
    res.status(404).json({
        success: false,
        error: {
            code: 404,
            message: "Not found",
        },
    });
}
exports.notFoundErrorHandler = notFoundErrorHandler;
/**
 * Generic error response middleware
 *
 * @param  {object}   err
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
function errorHandler(err, req, res, next) {
    res.status(err.status).json({
        success: false,
        error: {
            code: err.code,
            message: err.message,
        },
    });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=apiErrorHandler.js.map