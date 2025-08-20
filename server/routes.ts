import express from 'express';
import { createBankDetails, createCryptoWallet, createEvent, deleteAttendant, deleteBankDetails, deleteCryptoWallet, deleteEvent, getAllAttendants, getAttendantById, getBankDetails, getCryptoWallets, getEventById, getEvents, sendPaymentInstructions, updateAttendant, updateBankDetails, updateCryptoWallet, updateEvent } from './controller';

const router = express.Router();
router.post('/payment-instructions',sendPaymentInstructions)
router.post('/event', createEvent);
router.get('/event', getEvents);
router.get('/event/:id', getEventById);
router.put('/event/:id', updateEvent);
router.delete('/event/:id', deleteEvent);


// Crypto Wallets CRUD
router.get('/crypto', getCryptoWallets);
router.post('/crypto', createCryptoWallet);
router.put('/crypto/:id', updateCryptoWallet);
router.delete('/crypto/:id', deleteCryptoWallet);

// --- Bank Details Routes ---
router.get('/bank', getBankDetails);
router.post('/bank', createBankDetails);
router.put('/bank/:id', updateBankDetails);
router.delete('/bank/:id', deleteBankDetails)


router.get('/attendant', getAllAttendants);

// GET /api/attendants/:id - Get attendant by ID
router.get('/attendant/:id', getAttendantById);

// PUT /api/attendants/:id - Update attendant by ID
router.put('/attendant/:id', updateAttendant);

// DELETE /api/attendants/:id - Delete attendant by ID
router.delete('/attendant/:id', deleteAttendant);

export default router;


