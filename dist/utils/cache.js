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
exports.Cache = void 0;
const redis_1 = require("redis");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
class Cache {
    constructor() {
        this.connect();
    }
    /**
     * Connect to Redis
     */
    connect() {
        try {
            this.client = (0, redis_1.createClient)({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
            });
            console.log("Successfully connected to Redis");
        }
        catch (err) {
            console.log(err);
        }
    }
    /**
     * Disconnect from Redis
     */
    disconnect() {
        this.client.end(true);
    }
    /**
     * Get object as instance of given type
     *
     * @param key Cache key
     * @returns Object
     */
    getObject(key) {
        return new Promise((resolve, reject) => {
            return this.client.get(key, (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data === null)
                    resolve(null);
                return resolve(JSON.parse(data));
            });
        });
    }
    /**
     * Store object
     *
     * @param key Cache Key
     * @param obj Object to store
     */
    setObject(key, obj) {
        this.client.set(key, JSON.stringify(obj), (err) => {
            if (err)
                console.error(err);
        });
    }
    /**
     * Get object as instance of given type and store if not existing in cache
     *
     * @param key Cache Key
     * @param fn Function to fetch data if not existing
     * @returns Object
     */
    getAndSetObject(key, fn) {
        return new Promise((resolve, reject) => {
            return this.client.get(key, (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    reject(err);
                }
                // Fetch from db and store in cache
                if (data === null) {
                    const fetched = yield fn();
                    this.setObject(key, fetched);
                    return resolve(fetched);
                }
                return resolve(JSON.parse(data));
            }));
        });
    }
    /**
     * Delete entry by key
     *
     * @param key Cache key
     */
    deleteByKey(key) {
        this.client.del(key);
    }
}
exports.Cache = Cache;
//# sourceMappingURL=cache.js.map