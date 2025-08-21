"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.post('/payment-instructions', controller_1.sendPaymentInstructions);
router.post('/event', controller_1.createEvent);
router.get('/event', controller_1.getEvents);
router.get('/event/:id', controller_1.getEventById);
router.put('/event/:id', controller_1.updateEvent);
router.delete('/event/:id', controller_1.deleteEvent);
// Crypto Wallets CRUD
router.get('/crypto', controller_1.getCryptoWallets);
router.post('/crypto', controller_1.createCryptoWallet);
router.put('/crypto/:id', controller_1.updateCryptoWallet);
router.delete('/crypto/:id', controller_1.deleteCryptoWallet);
// --- Bank Details Routes ---
router.get('/bank', controller_1.getBankDetails);
router.post('/bank', controller_1.createBankDetails);
router.put('/bank/:id', controller_1.updateBankDetails);
router.delete('/bank/:id', controller_1.deleteBankDetails);
router.get('/attendant', controller_1.getAllAttendants);
// GET /api/attendants/:id - Get attendant by ID
router.get('/attendant/:id', controller_1.getAttendantById);
// PUT /api/attendants/:id - Update attendant by ID
router.put('/attendant/:id', controller_1.updateAttendant);
// DELETE /api/attendants/:id - Delete attendant by ID
router.delete('/attendant/:id', controller_1.deleteAttendant);
exports.default = router;
