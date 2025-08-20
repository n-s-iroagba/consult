import { Request, Response } from 'express';
import Event from './Event';
import BankDetails from './Bank';
import CryptoWallet from './CryptoWallet';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendPaymentInstructions = async (req: Request, res: Response) => {
  try {
    const { email, paymentType, cryptoSymbol } = req.body;

    if (!email || !paymentType) {
      return res.status(400).json({ message: 'Email and paymentType are required' });
    }

    let mailContent = '';

    if (paymentType === 'crypto') {
      if (!cryptoSymbol) {
        return res.status(400).json({ message: 'cryptoSymbol is required for crypto payments' });
      }

      const wallet = await CryptoWallet.findOne({ where: { symbol: cryptoSymbol } });
      if (!wallet) {
        return res.status(404).json({ message: 'Crypto wallet not found' });
      }

      mailContent = `
        <h2>Crypto Payment Instructions</h2>
        <p>Please send the payment to the following wallet:</p>
        <ul>
          <li><strong>Currency:</strong> ${wallet.name} (${wallet.symbol})</li>
          <li><strong>Wallet Address:</strong> ${wallet.address}</li>
        </ul>
        <p>Once the payment is confirmed, your registration will be completed.</p>
      `;
    } else if (paymentType === 'bank') {
      const bank = await BankDetails.findOne(); // Get first bank record or add logic to select one
      if (!bank) {
        return res.status(404).json({ message: 'Bank details not found' });
      }

      mailContent = `
        <h2>Bank Transfer Instructions</h2>
        <p>Please make the payment to the following bank account:</p>
        <ul>
          <li><strong>Bank Name:</strong> ${bank.bankName}</li>
          <li><strong>Account Name:</strong> ${bank.accountName}</li>
          <li><strong>Account Number:</strong> ${bank.accountNumber}</li>
          <li><strong>SWIFT Code:</strong> ${bank.swiftCode}</li>
          <li><strong>Routing Number:</strong> ${bank.routingNumber}</li>
        </ul>
        <p>Once the payment is confirmed, your registration will be completed.</p>
      `;
    } else {
      return res.status(400).json({ message: 'Invalid paymentType' });
    }

    await transporter.sendMail({
      from: `"CyberGuard Pro" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Payment Instructions',
      html: mailContent,
    });

    return res.status(200).json({ message: 'Payment instructions sent successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to send payment instructions', error: err });
  }
};
// Create
export const createEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event', details: err });
  }
};

// Read all
export const getEvents = async (_req: Request, res: Response) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events', details: err });
  }
};

// Read one
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch event', details: err });
  }
};

// Update
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    await event.update(req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event', details: err });
  }
};

// Delete
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    await event.destroy();
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event', details: err });
  }
};


// --- Crypto Wallets ---
export const getCryptoWallets = async (_req: Request, res: Response) => {
  try {
    const wallets = await CryptoWallet.findAll();
    res.json(wallets);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch crypto wallets', details: err });
  }
};

export const createCryptoWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await CryptoWallet.create(req.body);
    res.status(201).json(wallet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create crypto wallet', details: err });
  }
};

export const updateCryptoWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await CryptoWallet.findByPk(req.params.id);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    await wallet.update(req.body);
    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update crypto wallet', details: err });
  }
};

export const deleteCryptoWallet = async (req: Request, res: Response) => {
  try {
    const wallet = await CryptoWallet.findByPk(req.params.id);
    if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
    await wallet.destroy();
    res.json({ message: 'Wallet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete crypto wallet', details: err });
  }
};

// --- Bank Details ---
export const getBankDetails = async (_req: Request, res: Response) => {
  try {
    const banks = await BankDetails.findAll();
    res.json(banks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bank details', details: err });
  }
};

export const createBankDetails = async (req: Request, res: Response) => {
  try {
    const bank = await BankDetails.create(req.body);
    res.status(201).json(bank);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create bank details', details: err });
  }
};

export const updateBankDetails = async (req: Request, res: Response) => {
  try {
    const bank = await BankDetails.findByPk(req.params.id);
    if (!bank) return res.status(404).json({ error: 'Bank details not found' });
    await bank.update(req.body);
    res.json(bank);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update bank details', details: err });
  }
};

export const deleteBankDetails = async (req: Request, res: Response) => {
  try {
    const bank = await BankDetails.findByPk(req.params.id);
    if (!bank) return res.status(404).json({ error: 'Bank details not found' });
    await bank.destroy();
    res.json({ message: 'Bank details deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bank details', details: err });
  }
};
