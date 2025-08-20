import express from 'express';
import { createBankDetails, createCryptoWallet, createEvent, deleteBankDetails, deleteCryptoWallet, deleteEvent, getBankDetails, getCryptoWallets, getEventById, getEvents, sendPaymentInstructions, updateBankDetails, updateCryptoWallet, updateEvent } from './controller';

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

export default router;


