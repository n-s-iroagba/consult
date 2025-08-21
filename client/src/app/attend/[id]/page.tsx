'use client'
import React, { useEffect, useState } from 'react';
import {
 ExternalLink, AlertCircle,
 
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api'; // adjust path
import { CryptoWallet, Bank, Event } from '@/types/types';

const EventsPaymentSystem = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'crypto'>('bank');
  const [cryptoCurrency, setCryptoCurrency] = useState('');
  const [selectWalletAddress, setSelectAddress] = useState<CryptoWallet | null>(null);
  const [addresses, setAddresses] = useState<CryptoWallet[]>([]);
  const [paymentDetails, setPaymentDetails] = useState<Bank | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  // Payment form states
  const [paymentStep, setPaymentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAllData = async () => {
      try {
        setLoading(true);

        const [eventRes, cryptoRes, bankRes] = await Promise.all([
          api.get<Event>(`/event/${id}`),
          api.get<CryptoWallet[]>('/crypto'), 
          api.get<Bank>('/bank'),
        ]);

        setSelectedEvent(eventRes.data);
        setAddresses(cryptoRes.data);
        setPaymentDetails(bankRes.data);

      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  // Filter addresses based on selected cryptocurrency
  const getWalletForCurrency = (currency: string): CryptoWallet | null => {
    const wallet = addresses.find(addr => addr.name.toLowerCase() === currency.toLowerCase());
    return wallet || null;
  };

  // Update selected wallet when currency changes
  useEffect(() => {
    if (cryptoCurrency && addresses.length > 0) {
      const wallet = getWalletForCurrency(cryptoCurrency);
      setSelectAddress(wallet);
    }
  }, [cryptoCurrency, addresses, getWalletForCurrency]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.country) {
      alert('Please fill in all required fields');
      return;
    }

    if (paymentStep === 1) {
      setPaymentStep(2);
    }
  };

  const submit = async () => {
    try {
      setSubmitting(true);
      
      const payload = {
        eventId: selectedEvent?.id,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        country: formData.country,
        paymentMethod,
        ...(paymentMethod === 'crypto' ? {
          cryptoCurrency,
          selectWalletAddress,
        } : {
          paymentDetails
        })
      };

      await api.post('/payment-instructions', payload);
      
      // Handle success - you might want to show a success message or redirect
      console.log('Payment instructions sent successfully');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to process payment instructions. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
const submitPayment = async () => {
  await submit();
  setPaymentStep(3);
}
const submitCryptoPayment = async (address: string) => {
  await submit();
  copyToClipboard(address);
  setPaymentStep(3);
}
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Address copied to clipboard!');
      await submit();
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      alert('Failed to copy address. Please copy manually.');
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(price);
  };

  const resetPaymentForm = () => {
    setPaymentStep(1);
    setSelectedEvent(null);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      country: '',
    });
    setCryptoCurrency('');
    setSelectAddress(null);
    setPaymentMethod('bank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="w-16 h-16 border-4 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-inter">
   
      {/* Payment Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 rounded-2xl text-slate-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white">Event Registration</h2>
                  <p className="text-slate-400">{selectedEvent.title}</p>
                </div>
            <button
    onClick={() => router.push('/')}
    className="bg-slate-700 text-white px-4 py-2 rounded-xl hover:bg-slate-600 transition-colors"
  >
    Back
  </button>
              </div>

              {/* Step 1: Personal Info */}
              {paymentStep === 1 && (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* First/Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white/80 backdrop-blur-sm text-slate-900"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white/80 backdrop-blur-sm text-slate-900"
                      required
                    />
                  </div>

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white/80 backdrop-blur-sm text-slate-900"
                    required
                  />

                  {/* Country */}
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white/80 backdrop-blur-sm text-slate-900"
                    required
                  >
                    <option value="" disabled>
                      Select Country
                    </option>
                    <option value="UNITED STATES">United States</option>
                    <option value="UNITED KINGDOM">United Kingdom</option>
                    <option value="CANADA">Canada</option>
                    <option value="AUSTRALIA">Australia</option>
                    <option value="GERMANY">Germany</option>
                    <option value="FRANCE">France</option>
                 
            
                  </select>

                  {/* Payment Method */}
                  <select
                    value={paymentMethod}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
                      setPaymentMethod(e.target.value as 'bank' | 'crypto')
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white/80 backdrop-blur-sm text-slate-900"
                    required
                  >
                    <option value="bank">Bank Transfer</option>
                    <option value="crypto">Cryptocurrency</option>
                  </select>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-slate-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition-transform"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {/* Step 2: Payment Method */}
              {paymentStep === 2 && (
                <div className="space-y-6">
                  {/* Crypto Flow */}
                  {paymentMethod === "crypto" && (
                    <div className="space-y-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow">
                      {/* Currency Select */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Select Cryptocurrency</label>
                        <select
                          value={cryptoCurrency}
                          onChange={(e) => setCryptoCurrency(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-white text-slate-900"
                        >
                          <option value="">Choose currency</option>
                          {addresses.map((wallet) => (
                            <option key={wallet.id} value={wallet.name}>
                              {wallet.name.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Wallet Address & Copy */}
                      {cryptoCurrency && selectWalletAddress && (
                        <div className="space-y-2">
                          <p className="text-gray-700 font-medium">Wallet Address:</p>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              readOnly
                              value={selectWalletAddress.address}
                              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 outline-none text-slate-900"
                            />
                            <button
                              type="button"
                              disabled={submitting}
                              onClick={() => submitCryptoPayment(selectWalletAddress.address)}
                              className="bg-gradient-to-r from-cyan-500 to-slate-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
                            >
                              {submitting ? 'Copying...' : 'Copy'}
                            </button>
                          </div>
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                            <p className="text-sm text-slate-800">
                              <strong>Amount to send:</strong> {formatPrice(Number(selectedEvent.price), 'USD')} worth of {cryptoCurrency.toUpperCase()}
                            </p>
                            <p className="text-sm text-slate-600 mt-2">
                              Send the exact amount to this address. Your booking will be confirmed after payment is verified.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bank Transfer Flow */}
                  {paymentMethod === 'bank' && (
                    <>
                      <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow">
                        <p className="text-gray-700 mb-4">
                          Click the button below to get bank transfer details for your payment.
                        </p>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">
                            <strong>Amount:</strong> {formatPrice(Number(selectedEvent.price), 'USD')}
                          </p>
                        </div>
                      </div>

                      <div className="mt-8">
                        <button
                          disabled={submitting}
                          onClick={() => submitPayment()}
                          className="w-full bg-gradient-to-r from-cyan-500 to-slate-600 text-white py-4 rounded-xl font-semibold hover:scale-105 flex items-center justify-center transition-transform disabled:opacity-50"
                        >
                          {submitting ? 'Getting Payment Details...' : 'Get Payment Details'}
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </button>
                      </div>
                    </>
                  )}

                  <div className="flex space-x-4">
                    <button 
                      onClick={() => setPaymentStep(1)} 
                      className="flex-1 bg-slate-700 text-white py-3 rounded-xl hover:bg-slate-600 transition-colors"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Bank Details & Confirmation */}
              {paymentStep === 3 && paymentMethod === 'bank' && paymentDetails && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white">Bank Transfer Details</h3>
                  <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                    <div className="text-slate-400 space-y-2">
                      <div><strong>Bank Name:</strong> {paymentDetails.bankName}</div>
                      <div><strong>Account Name:</strong> {paymentDetails.accountName}</div>
                      <div><strong>Account Number:</strong> {paymentDetails.accountNumber}</div>
                      <div><strong>SWIFT Code:</strong> {paymentDetails.swiftCode}</div>
                      <div><strong>Routing Number:</strong> {paymentDetails.routingNumber}</div>
                      <div><strong>Amount:</strong> <span className="text-white">{formatPrice(Number(selectedEvent.price), 'USD')}</span></div>
                    </div>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
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
                    <button 
                      onClick={() => setPaymentStep(2)} 
                      className="flex-1 bg-slate-700 text-white py-3 rounded-xl hover:bg-slate-600 transition-colors"
                    >
                      Back
                    </button>
                    <button 
                      onClick={resetPaymentForm} 
                      className="flex-1 bg-cyan-600 text-white py-3 rounded-xl hover:scale-105 transition-transform"
                    >
                      I&apos;ve Made Payment
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