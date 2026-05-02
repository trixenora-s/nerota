'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { CreditCard, Truck, Calendar, Clock, MapPin, User, Phone } from 'lucide-react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || '';
const makeApiUrl = (endpoint: string) => {
  const cleanedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (!apiBaseUrl) return cleanedEndpoint;
  return apiBaseUrl.endsWith('/api') ? `${apiBaseUrl}${cleanedEndpoint}` : `${apiBaseUrl}/api${cleanedEndpoint}`;
};

interface Address {
  id: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  isDefault: boolean;
}

interface PaymentDetails {
  method: 'card' | 'upi' | 'netbanking';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  upiId?: string;
  bankName?: string;
}

export default function CheckoutPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { cart, clearCart } = useStore();

  const [step, setStep] = useState<'address' | 'payment' | 'review' | 'confirmation'>('address');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({ method: 'card' });
  const [eventDetails, setEventDetails] = useState({
    date: '',
    time: '',
    instructions: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 ? 0 : 299;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    if (cart.length === 0) {
      router.push('/cart');
      return;
    }

    // Mock addresses - in real app, fetch from API
    setAddresses([
      {
        id: '1',
        name: 'John Doe',
        phone: '+91 98765 43210',
        addressLine1: '123 Main Street',
        addressLine2: 'Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        landmark: 'Near Central Mall',
        isDefault: true
      }
    ]);
  }, [session, cart, router]);

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId);
  };

  const handlePaymentChange = (field: keyof PaymentDetails, value: string) => {
    setPaymentDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleEventDetailsChange = (field: string, value: string) => {
    setEventDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = async () => {
    if (!selectedAddress) {
      alert('Please select a delivery address');
      return;
    }

    setIsProcessing(true);

    try {
      // Create order
      const orderResponse = await fetch(makeApiUrl('/orders'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: session?.user?.id,
          items: cart,
          totalAmount: subtotal,
          discountAmount: 0,
          finalAmount: total,
          paymentMethod: paymentDetails.method,
          deliveryAddress: addresses.find(addr => addr.id === selectedAddress),
          eventDate: eventDetails.date,
          eventTime: eventDetails.time,
          specialInstructions: eventDetails.instructions
        })
      });

      if (!orderResponse.ok) throw new Error('Order creation failed');

      const { order } = await orderResponse.json();

      // Process payment
      const paymentResponse = await fetch(makeApiUrl('/payments/process'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          amount: total,
          paymentMethod: paymentDetails.method,
          cardDetails: paymentDetails.method === 'card' ? {
            number: paymentDetails.cardNumber,
            expiry: paymentDetails.expiryDate,
            cvv: paymentDetails.cvv
          } : undefined
        })
      });

      if (!paymentResponse.ok) throw new Error('Payment failed');

      const paymentResult = await paymentResponse.json();

      if (paymentResult.success) {
        setOrderId(order.id);
        clearCart();
        setStep('confirmation');
      } else {
        alert(paymentResult.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Order processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200 text-center">
            <h1 className="text-4xl font-semibold text-slate-900">Please sign in to continue</h1>
            <Link href="/login" className="mt-8 inline-flex rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200 text-center">
            <h1 className="text-4xl font-semibold text-slate-900">Your cart is empty</h1>
            <Link href="/" className="mt-8 inline-flex rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-900">Checkout</h1>
          <p className="mt-2 text-slate-600">Complete your event decoration order</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-4">
              {['address', 'payment', 'review', 'confirmation'].map((stepName, index) => (
                <div key={stepName} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step === stepName ? 'bg-purple-600 text-white' :
                    ['address', 'payment', 'review', 'confirmation'].indexOf(step) > index ? 'bg-green-600 text-white' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 3 && <div className={`w-12 h-0.5 ${
                    ['address', 'payment', 'review', 'confirmation'].indexOf(step) > index ? 'bg-green-600' : 'bg-slate-200'
                  }`} />}
                </div>
              ))}
            </div>

            {/* Address Step */}
            {step === 'address' && (
              <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Select Delivery Address</h2>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      onClick={() => handleAddressSelect(address.id)}
                      className={`rounded-2xl border-2 p-6 cursor-pointer transition ${
                        selectedAddress === address.id ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="font-semibold">{address.name}</span>
                            {address.isDefault && (
                              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">Default</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Phone className="w-4 h-4" />
                            <span className="text-slate-600">{address.phone}</span>
                          </div>
                          <p className="mt-2 text-slate-700">
                            {address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}<br />
                            {address.city}, {address.state} - {address.pincode}
                            {address.landmark && <br />}{address.landmark && `Landmark: ${address.landmark}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setStep('payment')}
                  disabled={!selectedAddress}
                  className="mt-6 w-full rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white disabled:bg-slate-300 hover:bg-purple-700 transition"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Payment Details</h2>

                {/* Payment Method Selection */}
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    {['card', 'upi', 'netbanking'].map((method) => (
                      <button
                        key={method}
                        onClick={() => handlePaymentChange('method', method)}
                        className={`flex-1 rounded-2xl border-2 p-4 text-center transition ${
                          paymentDetails.method === method ? 'border-purple-500 bg-purple-50' : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <CreditCard className="w-6 h-6 mx-auto mb-2" />
                        <span className="text-sm font-semibold capitalize">{method}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Form */}
                {paymentDetails.method === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentDetails.cardNumber || ''}
                        onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentDetails.expiryDate || ''}
                          onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={paymentDetails.cvv || ''}
                          onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentDetails.method === 'upi' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">UPI ID</label>
                    <input
                      type="text"
                      placeholder="yourname@upi"
                      value={paymentDetails.upiId || ''}
                      onChange={(e) => handlePaymentChange('upiId', e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                    />
                  </div>
                )}

                {paymentDetails.method === 'netbanking' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bank Name</label>
                    <select
                      value={paymentDetails.bankName || ''}
                      onChange={(e) => handlePaymentChange('bankName', e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                    >
                      <option value="">Select Bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                    </select>
                  </div>
                )}

                <button
                  onClick={() => setStep('review')}
                  className="mt-6 w-full rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
                >
                  Continue to Review
                </button>
              </div>
            )}

            {/* Review Step */}
            {step === 'review' && (
              <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
                <h2 className="text-2xl font-semibold text-slate-900 mb-6">Review Your Order</h2>

                {/* Event Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Event Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Event Date</label>
                      <input
                        type="date"
                        value={eventDetails.date}
                        onChange={(e) => handleEventDetailsChange('date', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Event Time</label>
                      <input
                        type="time"
                        value={eventDetails.time}
                        onChange={(e) => handleEventDetailsChange('time', e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Special Instructions</label>
                    <textarea
                      placeholder="Any special requirements or notes..."
                      value={eventDetails.instructions}
                      onChange={(e) => handleEventDetailsChange('instructions', e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-200 outline-none h-24"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.productId} className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-semibold text-slate-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-200 mt-4 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                  className="mt-6 w-full rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white disabled:bg-slate-300 hover:bg-purple-700 transition"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            )}

            {/* Confirmation Step */}
            {step === 'confirmation' && (
              <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">Order Confirmed!</h2>
                <p className="text-slate-600 mb-6">Your event decoration order has been placed successfully.</p>
                <div className="bg-slate-50 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-slate-600">Order ID: <span className="font-semibold text-slate-900">{orderId}</span></p>
                </div>
                <div className="space-y-3">
                  <Link
                    href={`/orders/${orderId}`}
                    className="block w-full rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
                  >
                    View Order Details
                  </Link>
                  <Link
                    href="/"
                    className="block w-full rounded-3xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">{item.title} × {item.quantity}</span>
                    <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}