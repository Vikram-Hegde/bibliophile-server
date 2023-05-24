"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const connectionURL = process.env.CONNECTION_URL;
const connectToDB = async () => {
    if (!connectionURL)
        throw new Error("Database connection failure");
    await mongoose_1.default.connect(connectionURL, { dbName: "bibliophile" });
};
exports.default = connectToDB;
