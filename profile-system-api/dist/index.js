"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routers_1 = __importDefault(require("./routers"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = (0, express_1.default)();
const PORT = 5080;
const ENV = process.env.NODE_ENV;
app.use(express_1.default.json({ limit: '6mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '6mb' }));
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use('/api', routers_1.default);
app.use((_, res) => res.send('this is the global page'));
app.listen(PORT, () => {
    console.log(`ENVIRONMENT: ${ENV}`);
    console.log(`This server is running on: 127.0.0.1:${PORT}`);
});
//# sourceMappingURL=index.js.map