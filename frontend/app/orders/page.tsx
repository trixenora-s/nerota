'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Calendar, CreditCard, Truck, Eye } from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  items: any[];
  totalAmount: number;
  finalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  eventDate: string;
}

export default function OrdersPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    // Mock orders data - in real app, fetch from API
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'ORD-1703123456789-ABC12',
        items: [
          { title: 'Elegant Centerpiece Set', quantity: 2 },
          { title: 'Crystal Chandelier', quantity: 1 }
        ],
        totalAmount: 13500,
        finalAmount: 13500,
        status: 'confirmed',
        paymentStatus: 'completed',
        createdAt: '2024-12-20T10:30:00Z',
        eventDate: '2024-12-25'
      },
      {
        id: '2',
        orderNumber: 'ORD-1702987654321-DEF34',
        items: [
          { title: 'Floral Arrangements', quantity: 5 },
          { title: 'Table Linens', quantity: 10 }
        ],
        totalAmount: 8750,
        finalAmount: 8750,
        status: 'processing',
        paymentStatus: 'completed',
        createdAt: '2024-12-18T14:20:00Z',
        eventDate: '2024-12-30'
      }
    ];

    setOrders(mockOrders);
    setLoading(false);
  }, [session, router]);

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
                <div className="h-32 bg-slate-200 rounded-2xl"></div>
                <div className="h-32 bg-slate-200 rounded-2xl"></div>
              </div>
            </div>
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
        <div className="mb-8">
          <h1 className="text-4xl font-semibold text-slate-900">My Orders</h1>
          <p className="mt-2 text-slate-600">Track and manage your event decoration orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 shadow-xl shadow-slate-200 text-center">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">No orders yet</h2>
            <p className="text-slate-600 mb-6">Start planning your perfect event with our decoration services.</p>
            <Link href="/" className="inline-flex rounded-3xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">Order #{order.orderNumber}</h3>
                    <p className="text-slate-600 mt-1">
                      Placed on {new Date(order.createdAt).toLocaleDateString()} •
                      Event on {new Date(order.eventDate).toLocaleDateString()}
                    </p>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Items</p>
                      <p className="font-semibold text-slate-900">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Total Amount</p>
                      <p className="font-semibold text-slate-900">₹{order.finalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Event Date</p>
                      <p className="font-semibold text-slate-900">{new Date(order.eventDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      {order.items.slice(0, 2).map((item, index) => (
                        <span key={index}>
                          {item.title} × {item.quantity}
                          {index < Math.min(order.items.length - 1, 1) && ', '}
                        </span>
                      ))}
                      {order.items.length > 2 && ` +${order.items.length - 2} more`}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Link>
                      {order.status === 'confirmed' && (
                        <button className="inline-flex items-center gap-2 rounded-3xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition">
                          <Truck className="w-4 h-4" />
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
