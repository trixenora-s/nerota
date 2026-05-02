'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Truck, Calendar, Clock, MapPin, CreditCard, Package, ArrowLeft } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  items: any[];
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  deliveryAddress: any;
  eventDate: string;
  eventTime: string;
  specialInstructions: string;
  createdAt: string;
}

export default function OrderDetailsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    if (!orderId) {
      router.push('/orders');
      return;
    }

    // Mock order data - in real app, fetch from API
    const mockOrder: Order = {
      id: orderId,
      orderNumber: 'ORD-1703123456789-ABC12',
      items: [
        {
          productId: '1',
          title: 'Elegant Centerpiece Set',
          price: 2500,
          quantity: 2,
          image: '/api/placeholder/150/150'
        },
        {
          productId: '2',
          title: 'Crystal Chandelier',
          price: 8500,
          quantity: 1,
          image: '/api/placeholder/150/150'
        }
      ],
      totalAmount: 13500,
      discountAmount: 0,
      finalAmount: 13500,
      status: 'confirmed',
      paymentMethod: 'card',
      paymentStatus: 'completed',
      deliveryAddress: {
        name: 'John Doe',
        phone: '+91 98765 43210',
        addressLine1: '123 Main Street',
        addressLine2: 'Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        landmark: 'Near Central Mall'
      },
      eventDate: '2024-12-25',
      eventTime: '18:00',
      specialInstructions: 'Please ensure all items are white and gold themed. Handle with care.',
      createdAt: '2024-12-20T10:30:00Z'
    };

    setOrder(mockOrder);
    setLoading(false);
  }, [session, orderId, router]);

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

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200">
              <div className="h-8 bg-slate-200 rounded-2xl mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded-2xl"></div>
                <div className="h-4 bg-slate-200 rounded-2xl w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded-2xl w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200 text-center">
            <h1 className="text-4xl font-semibold text-slate-900">Order not found</h1>
            <Link href="/orders" className="mt-8 inline-flex rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
              View All Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-emerald-100 text-emerald-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50 py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/orders" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Orders
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-semibold text-slate-900">Order Details</h1>
              <p className="mt-2 text-slate-600">Order #{order.orderNumber}</p>
            </div>
            <div className="flex gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                Payment {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Order Items</h2>
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex gap-6">
                    <div className="w-20 h-20 bg-slate-100 rounded-2xl flex-shrink-0"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <p className="text-slate-600 mt-1">Quantity: {item.quantity}</p>
                      <p className="font-semibold text-slate-900 mt-2">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Details */}
            <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Event Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-600">Event Date</p>
                    <p className="font-semibold text-slate-900">{new Date(order.eventDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-600">Event Time</p>
                    <p className="font-semibold text-slate-900">{order.eventTime}</p>
                  </div>
                </div>
              </div>
              {order.specialInstructions && (
                <div className="mt-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Special Instructions</h3>
                  <p className="text-slate-600 bg-slate-50 rounded-2xl p-4">{order.specialInstructions}</p>
                </div>
              )}
            </div>

            {/* Delivery Address */}
            <div className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Delivery Address</h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-900">{order.deliveryAddress.name}</p>
                  <p className="text-slate-600">{order.deliveryAddress.phone}</p>
                  <p className="text-slate-700 mt-2">
                    {order.deliveryAddress.addressLine1}{order.deliveryAddress.addressLine2 && `, ${order.deliveryAddress.addressLine2}`}<br />
                    {order.deliveryAddress.city}, {order.deliveryAddress.state} - {order.deliveryAddress.pincode}
                    {order.deliveryAddress.landmark && <br />}{order.deliveryAddress.landmark && `Landmark: ${order.deliveryAddress.landmark}`}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Order Summary */}
              <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center text-sm">
                      <span className="text-slate-600">{item.title} × {item.quantity}</span>
                      <span className="font-semibold">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₹{order.totalAmount.toLocaleString()}</span>
                  </div>
                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span>-₹{order.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₹{order.finalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Payment Information</h3>
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-600">Payment Method</p>
                    <p className="font-semibold text-slate-900 capitalize">{order.paymentMethod}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-600">Order Date</p>
                    <p className="font-semibold text-slate-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full rounded-3xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
                    Track Order
                  </button>
                  <button className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                    Download Invoice
                  </button>
                  <button className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}