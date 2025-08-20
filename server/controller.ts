import { Request, Response } from 'express';
import Event from './Event';
import BankDetails from './Bank';
import CryptoWallet from './CryptoWallet';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Attendant from './Attendant';
import { Op } from 'sequelize';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});





// Server function to handle payment instructions
export const sendPaymentInstructions = async (req:Request, res:Response) => {
  try {
    const { 
      email, 
      paymentMethod, 
      cryptoCurrency, 
      eventId,
      firstName,
      lastName 
    } = req.body;

    // Validate required fields
    if (!email || !paymentMethod) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and payment method are required' 
      });
    }

    // Get event details
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }

    let mailContent = '';
    let subject = '';

    if (paymentMethod === 'crypto') {
      if (!cryptoCurrency) {
        return res.status(400).json({ 
          success: false, 
          message: 'Cryptocurrency type is required for crypto payments' 
        });
      }

      const wallet = await CryptoWallet.findOne({ 
        where: { symbol: cryptoCurrency } 
      });
      
      if (!wallet) {
        return res.status(404).json({ 
          success: false, 
          message: 'Crypto wallet not found' 
        });
      }

      subject = `Payment Instructions for ${event.title}`;
      mailContent = generateCryptoEmail(firstName, event, wallet);

    } else if (paymentMethod === 'bank') {
      const bank = await BankDetails.findOne();
      if (!bank) {
        return res.status(404).json({ 
          success: false, 
          message: 'Bank details not found' 
        });
      }

      subject = `Payment Instructions for ${event.title}`;
      mailContent = generateBankEmail(firstName, event, bank);
    } else {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid payment method' 
      });
    }

    // Send email
    await transporter.sendMail({
      from: `"Elijah Klitz Cyber Consultancy Events" <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: mailContent,
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Payment instructions sent successfully' 
    });

  } catch (error) {
    console.error('Error sending payment instructions:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to send payment instructions' 
    });
  }
};

// Email template generators
function generateCryptoEmail(firstName:string, event:Event, wallet:CryptoWallet) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; }
        .content { padding: 20px; background: #f9f9f9; border-radius: 0 0 10px 10px; }
        .highlight { background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #0ea5e9; margin: 15px 0; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        .button { display: inline-block; padding: 10px 20px; background: #0ea5e9; color: white; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Elijah Klitz Cyber Consultancy</h1>
      </div>
      <div class="content">
        <h2>Hello ${firstName},</h2>
        <p>Thank you for registering for <strong>${event.title}</strong>. Please complete your payment using the cryptocurrency instructions below:</p>
        
        <div class="highlight">
          <h3>Payment Details</h3>
          <p><strong>Event:</strong> ${event.title}</p>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Amount:</strong> $ ${event.price}</p>
          <p><strong>Cryptocurrency:</strong> ${wallet.name} (${wallet.symbol})</p>
          <p><strong>Wallet Address:</strong> <code>${wallet.address}</code></p>
        </div>
        
        <p><strong>Important:</strong> Please send the exact amount to the wallet address above. After we confirm your payment, you will receive a confirmation email with event access details.</p>
        
        <p>If you have any questions, please contact our support team at events@ Klitz Cyber Securitypro.com.</p>
        
        <p>Best regards,<br>The Elijah Klitz Cyber Consultancy Team</p>
      </div>
      <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; 2024 Elijah Klitz Cyber Consultancy. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
}

function generateBankEmail(firstName:string, event:Event, bank:BankDetails) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { color: white; margin: 0; }
        .content { padding: 20px; background: #f9f9f9; border-radius: 0 0 10px 10px; }
        .highlight { background: #fff; padding: 15px; border-radius: 5px; border-left: 4px solid #0ea5e9; margin: 15px 0; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
        .button { display: inline-block; padding: 10px 20px; background: #0ea5e9; color: white; text-decoration: none; border-radius: 5px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Elijah Klitz Cyber Consultancy</h1>
      </div>
      <div class="content">
        <h2>Hello ${firstName},</h2>
        <p>Thank you for registering for <strong>${event.title}</strong>. Please complete your payment using the bank transfer instructions below:</p>
        
        <div class="highlight">
          <h3>Bank Transfer Details</h3>
          <p><strong>Event:</strong> ${event.title}</p>
          <p><strong>Date:</strong> ${event.date}</p>
          <p><strong>Amount:</strong> $ ${event.price}</p>
          <p><strong>Bank Name:</strong> ${bank.bankName}</p>
          <p><strong>Account Name:</strong> ${bank.accountName}</p>
          <p><strong>Account Number:</strong> ${bank.accountNumber}</p>
          <p><strong>SWIFT Code:</strong> ${bank.swiftCode}</p>
          ${bank.routingNumber ? `<p><strong>Routing Number:</strong> ${bank.routingNumber}</p>` : ''}
        </div>
        
        <p><strong>Important:</strong> Please include your name and event title in the transfer reference. After we confirm your payment, you will receive a confirmation email with event access details.</p>
        
        <p>If you have any questions, please contact our support team at events@ Klitz Cyber Securitypro.com.</p>
        
        <p>Best regards,<br>The Elijah Klitz Cyber Consultancy Team</p>
      </div>
      <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
        <p>&copy; 2024 Elijah Klitz Cyber Consultancy. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
}

// CRUD for Events
export const createEvent = async (req: Request, res: Response) => {
  console.log('createEvent called with body:', req.body);
  try {
    const event = await Event.create(req.body);
    console.log('Event created:', event);
    res.status(201).json(event);
  } catch (err) {
    console.error('Failed to create event:', err);
    res.status(500).json({ error: 'Failed to create event', details: err });
  }
};

export const getEvents = async (_req: Request, res: Response) => {
  console.log('getEvents called');
  try {
    const events = await Event.findAll();
    console.log('Fetched events count:', events.length);
    res.json(events);
  } catch (err) {
    console.error('Failed to fetch events:', err);
    res.status(500).json({ error: 'Failed to fetch events', details: err });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  console.log('getEventById called with id:', req.params.id);
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      console.log('Event not found:', req.params.id);
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error('Failed to fetch event:', err);
    res.status(500).json({ error: 'Failed to fetch event', details: err });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  console.log('updateEvent called with id:', req.params.id, 'body:', req.body);
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      console.log('Event not found:', req.params.id);
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.update(req.body);
    console.log('Event updated:', event);
    res.json(event);
  } catch (err) {
    console.error('Failed to update event:', err);
    res.status(500).json({ error: 'Failed to update event', details: err });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  console.log('deleteEvent called with id:', req.params.id);
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      console.log('Event not found:', req.params.id);
      return res.status(404).json({ error: 'Event not found' });
    }
    await event.destroy();
    console.log('Event deleted:', req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Failed to delete event:', err);
    res.status(500).json({ error: 'Failed to delete event', details: err });
  }
};

// --- Crypto Wallets ---
export const getCryptoWallets = async (_req: Request, res: Response) => {
  console.log('getCryptoWallets called');
  try {
    const wallets = await CryptoWallet.findAll();
    console.log('Fetched wallets count:', wallets.length);
    res.json(wallets);
  } catch (err) {
    console.error('Failed to fetch crypto wallets:', err);
    res.status(500).json({ error: 'Failed to fetch crypto wallets', details: err });
  }
};

export const createCryptoWallet = async (req: Request, res: Response) => {
  console.log('createCryptoWallet called with body:', req.body);
  try {
    const wallet = await CryptoWallet.create(req.body);
    console.log('Crypto wallet created:', wallet);
    res.status(201).json(wallet);
  } catch (err) {
    console.error('Failed to create crypto wallet:', err);
    res.status(500).json({ error: 'Failed to create crypto wallet', details: err });
  }
};

export const updateCryptoWallet = async (req: Request, res: Response) => {
  console.log('updateCryptoWallet called with id:', req.params.id, 'body:', req.body);
  try {
    const wallet = await CryptoWallet.findByPk(req.params.id);
    if (!wallet) {
      console.log('Wallet not found:', req.params.id);
      return res.status(404).json({ error: 'Wallet not found' });
    }
    await wallet.update(req.body);
    console.log('Crypto wallet updated:', wallet);
    res.json(wallet);
  } catch (err) {
    console.error('Failed to update crypto wallet:', err);
    res.status(500).json({ error: 'Failed to update crypto wallet', details: err });
  }
};

export const deleteCryptoWallet = async (req: Request, res: Response) => {
  console.log('deleteCryptoWallet called with id:', req.params.id);
  try {
    const wallet = await CryptoWallet.findByPk(req.params.id);
    if (!wallet) {
      console.log('Wallet not found:', req.params.id);
      return res.status(404).json({ error: 'Wallet not found' });
    }
    await wallet.destroy();
    console.log('Crypto wallet deleted:', req.params.id);
    res.json({ message: 'Wallet deleted successfully' });
  } catch (err) {
    console.error('Failed to delete crypto wallet:', err);
    res.status(500).json({ error: 'Failed to delete crypto wallet', details: err });
  }
};

// --- Bank Details ---
export const getBankDetails = async (_req: Request, res: Response) => {
  console.log('getBankDetails called');
  try {
    const banks = await BankDetails.findAll();
    console.log('Fetched bank details count:', banks.length);
    res.json(banks);
  } catch (err) {
    console.error('Failed to fetch bank details:', err);
    res.status(500).json({ error: 'Failed to fetch bank details', details: err });
  }
};

export const createBankDetails = async (req: Request, res: Response) => {
  console.log('createBankDetails called with body:', req.body);
  try {
    const bank = await BankDetails.create(req.body);
    console.log('Bank details created:', bank);
    res.status(201).json(bank);
  } catch (err) {
    console.error('Failed to create bank details:', err);
    res.status(500).json({ error: 'Failed to create bank details', details: err });
  }
};

export const updateBankDetails = async (req: Request, res: Response) => {
  console.log('updateBankDetails called with id:', req.params.id, 'body:', req.body);
  try {
    const bank = await BankDetails.findByPk(req.params.id);
    if (!bank) {
      console.log('Bank details not found:', req.params.id);
      return res.status(404).json({ error: 'Bank details not found' });
    }
    await bank.update(req.body);
    console.log('Bank details updated:', bank);
    res.json(bank);
  } catch (err) {
    console.error('Failed to update bank details:', err);
    res.status(500).json({ error: 'Failed to update bank details', details: err });
  }
};

export const deleteBankDetails = async (req: Request, res: Response) => {
  console.log('deleteBankDetails called with id:', req.params.id);
  try {
    const bank = await BankDetails.findByPk(req.params.id);
    if (!bank) {
      console.log('Bank details not found:', req.params.id);
      return res.status(404).json({ error: 'Bank details not found' });
    }
    await bank.destroy();
    console.log('Bank details deleted:', req.params.id);
    res.json({ message: 'Bank details deleted successfully' });
  } catch (err) {
    console.error('Failed to delete bank details:', err);
    res.status(500).json({ error: 'Failed to delete bank details', details: err });
  }
};


// Read Operations

// Get all attendants
export const getAllAttendants = async (req: Request, res: Response): Promise<void> => {
  try {
    const attendants = await Attendant.findAll();
    res.status(200).json(attendants);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching attendants',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get attendant by ID
export const getAttendantById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const attendant = await Attendant.findByPk(id);
    
    if (!attendant) {
      res.status(404).json({
        success: false,
        message: 'Attendant not found'
      });
      return;
    }

    res.status(200).json(attendant);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching attendant',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};



// Update attendant by ID
export const updateAttendant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    // Check if attendant exists
    const attendant = await Attendant.findByPk(id);
    if (!attendant) {
      res.status(404).json({
        success: false,
        message: 'Attendant not found'
      });
      return;
    }

    // Validate required fields
    if (!firstName || !lastName || !email) {
      res.status(400).json({
        success: false,
        message: 'All fields (firstName, lastName, email) are required'
      });
      return;
    }

    // Check if email is already taken by another attendant
    const existingAttendant = await Attendant.findOne({
      where: {
        email,
        id: { [Op.ne]: id } // Exclude current attendant from check
      }
    });

    if (existingAttendant) {
      res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
      return;
    }

    // Update attendant
    await attendant.update({
      firstName,
      lastName,
      email
    });

    res.status(200).json(attendant);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating attendant',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};


// Delete attendant by ID
export const deleteAttendant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if attendant exists
    const attendant = await Attendant.findByPk(id);
    if (!attendant) {
      res.status(404).json({
        success: false,
        message: 'Attendant not found'
      });
      return;
    }

    // Delete attendant
    await attendant.destroy();

    res.status(200).json({
      success: true,
      message: 'Attendant deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting attendant',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
