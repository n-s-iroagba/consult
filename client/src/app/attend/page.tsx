'use client'
import React, { useState } from 'react';
import {
 ExternalLink, AlertCircle,
 X
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  endDate?: string;
  location: string;
  price: number;
  currency: string;
  category: string;
  level: string;
  duration: string;
  capacity: number;
  enrolled: number;
  instructor: string;
  rating: number;
  description: string;
  highlights: string[];
  featured: boolean;
}

interface CryptoWallet {
  address: string;
  symbol: string;
  name: string;
}

interface PaymentDetails {
  crypto: Record<string, CryptoWallet>;
  bank: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    swiftCode: string;
    routingNumber: string;
  };
}

const EventsPaymentSystem = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(  {
      id: 1,
      title: "Enterprise Security Leadership Summit 2024",
      date: "2024-09-25",
      time: "09:00 AM",
      endDate: "2024-09-26",
      location: "Eko Hotel & Suites, Lagos",
      price: 250000,
      currency: "NGN",
      category: "Executive Summit",
      level: "Executive",
      duration: "2 Days",
      capacity: 200,
      enrolled: 156,
      instructor: "Dr. Sarah Johnson & Panel",
      rating: 4.9,
      description: "Strategic cybersecurity leadership for C-suite executives and senior management. Learn to build security culture, manage risk, and drive organizational security transformation.",
      highlights: [
        "Executive Security Strategy Development",
        "Board-Level Risk Communication",
        "Security ROI & Budget Optimization",
        "Crisis Leadership & Incident Management",
        "Regulatory Compliance Frameworks"
      ],
      featured: true
    },);
  const [showPayment, setShowPayment] = useState(true);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'crypto'>('bank');
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  // Payment form states
  const [paymentStep, setPaymentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
  });
  const [copiedWallet, setCopiedWallet] = useState('');

const walletAddress =    {
      bitcoin: { 
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", 
        symbol: "BTC",
        name: "Bitcoin"
      },
      ethereum: { 
        address: "0x742c4B1c1A7f47d1A1A1A1A1A1A1A1A1A1A1A1A1", 
        symbol: "ETH",
        name: "Ethereum"
      },
      usdt: { 
        address: "TG3XXyEbCzLEBPrXL8zZJ1Y8vZZGXVVGXV", 
        symbol: "USDT",
        name: "Tether USD"
      },
      usdc: { 
        address: "0x742c4B1c1A7f47d1A1A1A1A1A1A1A1A1A1A1A1A2", 
        symbol: "USDC",
        name: "USD Coin"
      }
    }

  const paymentDetails = {
 
    bank: {
      bankName: "First Bank Nigeria",
      accountName: "CyberGuard Pro Limited",
      accountNumber: "3087654321",
      swiftCode: "FBNKNGLA",
      routingNumber: "011000015"
    }
  };

  const categories = ['All', 'Executive Summit', 'Technical Workshop', 'Certification Program', 'Workshop'];
  const countries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Egypt', 'Morocco', 'United States', 'United Kingdom', 'Canada', 'Other'];

  const handleApplyToAttend = (event: Event) => {
    setSelectedEvent(event);
    setShowPayment(true);
    setPaymentStep(1);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      country: '',
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentStep === 1) {
      setPaymentStep(2);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedWallet(type);
    setTimeout(() => setCopiedWallet(''), 2000);
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  const resetPaymentForm = () => {
    setShowPayment(false);
    setPaymentStep(1);
    setSelectedEvent(null);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      country: '',
    });
    setCopiedWallet('');
  };


  return (
    <div className="min-h-screen bg-black font-inter">
      {/* Header & Filters (unchanged) */}



      {/* Payment Modal */}
      {showPayment && selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 rounded-2xl max- text-slate-900 w-2xl  text-slate-900 w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">Event Registration</h2>
                  <p className="text-slate-400">{selectedEvent.title}</p>
                </div>
                <button onClick={resetPaymentForm} className="text-slate-400 hover:text-white">
                  <X className="h-6  text-slate-900 w-6" />
                </button>
              </div>

              {/* Step 1: Personal Info */}
             
             {paymentStep === 1 && (
       <form onSubmit={handleFormSubmit} className="space-y-6">
    {/* First/Last Name */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="First Name"
        className=" text-slate-900 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white/80 backdrop-blur-sm"
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        className=" text-slate-900 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white/80 backdrop-blur-sm"
        required
      />
    </div>

    {/* Email */}
    <input
      type="email"
      placeholder="Email Address"
      className=" text-slate-900 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white/80 backdrop-blur-sm"
      required
    />

    {/* Country */}
   <select
  className="text-slate-900 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white/80 backdrop-blur-sm"
  required
>
  <option value="" disabled selected>
    Select Country
  </option>
  <option value="us">United States</option>
  <option value="ng">Nigeria</option>
  <option value="uk">United Kingdom</option>
  <option value="ca">Canada</option>
  <option value="au">Australia</option>
  <option value="in">India</option>
  <option value="de">Germany</option>
  <option value="fr">France</option>
  <option value="br">Brazil</option>
</select>

 
   <select
  className="text-slate-900 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white/80 backdrop-blur-sm"
  required
  onChange={(e:any) => setPaymentMethod(e.target.value)}
>
  <option value="" disabled selected>
    Select Payment Method
  </option>
  <option value="bank">Bank Transfer</option>
  <option value="crypto">Crypto Currency</option>
 
</select>
    <button
      type="submit"
      className=" text-slate-900 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
    >
      Continue to Payment
    </button>
  </form>

              )}

              {/* Step 2: Payment Method */}
  {paymentStep === 2 && (
   <div className="space-y-6">
               {/* Payment Method Selection (Crypto or Bank) */}

 

    {/* Crypto Flow */}
    {paymentMethod === "crypto" && (
      <div className="space-y-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow">
        {/* Currency Select */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Cryptocurrency</label>
          <select
            value={cryptoCurrency}
            onChange={(e) => setCryptoCurrency(e.target.value)}
            className="text-slate-900 w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white"
          >
            <option value="">Choose currency</option>
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
            <option value="usdt">Tether (USDT)</option>
          </select>
        </div>

        {/* Wallet Address & Copy */}
        {cryptoCurrency && (
          <div className="space-y-2">
            <p className="text-gray-700 font-medium">Wallet Address:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={'abc123456'}
                className="flex-1 text-slate-900 px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 outline-none"
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText('abc123456')}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition-transform"
              >
                Copy
              </button>
            </div>
            <p className="text-sm text-gray-500">Send the exact amount to this address. Your booking will be confirmed after payment is verified.</p>
          </div>
        )}
    </div>
    )}


  


                  {paymentMethod === 'bank' && (
                    <>
                    <div className="mt-8">
                      <button
                        onClick={() => setPaymentStep(3)}
                        className=" text-slate-900 w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:scale-105 flex items-center justify-center transition-transform"
                      >
                        Get Payment Details
                        <ExternalLink className="ml-2 h-5  text-slate-900 w-5" />
                      </button>
                    </div>
                  
                  <div className="flex space-x-4">
                    <button onClick={() => setPaymentStep(1)} className="flex-1 bg-slate-700 text-white py-3 rounded-xl hover:bg-slate-600 transition-colors">
                      Back
                    </button>
                  </div>
                
                </>
              )}
            
          </div>
        )}

              {/* Step 3: Bank Details & Confirmation */}
              {paymentStep === 3 && paymentMethod === 'bank' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">Bank Transfer Details</h3>
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                    <div className="text-slate-400">
                      <div><strong>Bank Name:</strong> {paymentDetails.bank.bankName}</div>
                      <div><strong>Account Name:</strong> {paymentDetails.bank.accountName}</div>
                      <div><strong>Account Number:</strong> {paymentDetails.bank.accountNumber}</div>
                      <div><strong>SWIFT Code:</strong> {paymentDetails.bank.swiftCode}</div>
                      <div><strong>Routing Number:</strong> {paymentDetails.bank.routingNumber}</div>
                      <div><strong>Amount:</strong> <span className="text-white">{formatPrice(selectedEvent.price, selectedEvent.currency)}</span></div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="h-5  text-slate-900 w-5 text-yellow-400 mt-0.5" />
                    <div className="text-sm text-yellow-100">
                      <div className="font-semibold mb-1">Important Instructions:</div>
                      <ul className="space-y-1 text-yellow-200">
                        <li>• Transfer the exact amount shown above</li>
                        <li>• Include your email ({formData.email}) as a payment reference</li>
                        <li>• Payment posting may take 1–3 business days</li>
                        <li>• Keep transaction receipt for your records</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button onClick={() => setPaymentStep(2)} className="flex-1 bg-slate-700 text-white py-3 rounded-xl hover:bg-slate-600 transition-colors">
                      Back
                    </button>
                    <button onClick={resetPaymentForm} className="flex-1 bg-cyan-600 text-white py-3 rounded-xl hover:scale-105 transition-transform">
                      I've Made Payment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPaymentSystem;
