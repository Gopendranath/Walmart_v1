import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateOrderStatus, type OrderItem } from "../store/orderSlice";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import type { RootState } from "@/store";
import { 
  Package, 
  Search,
  Calendar, 
  MapPin, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock,
  Star,
  RotateCcw,
  Eye,
  Download,
  ChevronDown,
  ChevronUp
} from "lucide-react";

type FilterType = 'all' | 'pending' | 'shipped' | 'delivered' | 'cancelled';
type SortType = 'newest' | 'oldest' | 'price-high' | 'price-low';

const OrdersPage: React.FC = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState<SortType>('newest');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const handleStatusChange = (
    id: string,
    status: "pending" | "shipped" | "delivered" | "cancelled"
  ) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      const matchesSearch = order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.trackingNumber?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || order.orderStatus === filterStatus;
      return matchesSearch && matchesFilter;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.orderDate || '').getTime() - new Date(a.orderDate || '').getTime();
        case 'oldest':
          return new Date(a.orderDate || '').getTime() - new Date(b.orderDate || '').getTime();
        case 'price-high':
          return (b.price * b.quantity) - (a.price * a.quantity);
        case 'price-low':
          return (a.price * a.quantity) - (b.price * b.quantity);
        default:
          return 0;
      }
    });
  }, [orders, searchTerm, filterStatus, sortBy]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.orderStatus === 'pending').length,
    shipped: orders.filter(o => o.orderStatus === 'shipped').length,
    delivered: orders.filter(o => o.orderStatus === 'delivered').length,
    cancelled: orders.filter(o => o.orderStatus === 'cancelled').length,
  };

  if (!orders.length) {
    return (
      <div className="p-8 text-center min-h-screen flex flex-col items-center justify-center">
        <Package className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">No orders yet</h2>
        <p className="text-gray-500 mb-6">When you place your first order, it will appear here.</p>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          My Orders
        </h1>
        
        {/* Order Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
            <div className="text-2xl font-bold text-gray-900">{orderStats.total}</div>
            <div className="text-sm text-gray-600">Total Orders</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
            <div className="text-2xl font-bold text-yellow-800">{orderStats.pending}</div>
            <div className="text-sm text-yellow-600">Pending</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
            <div className="text-2xl font-bold text-blue-800">{orderStats.shipped}</div>
            <div className="text-sm text-blue-600">Shipped</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
            <div className="text-2xl font-bold text-green-800">{orderStats.delivered}</div>
            <div className="text-sm text-green-600">Delivered</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
            <div className="text-2xl font-bold text-red-800">{orderStats.cancelled}</div>
            <div className="text-sm text-red-600">Cancelled</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders or tracking numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterType)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Orders</option>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortType)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredAndSortedOrders.map((order: OrderItem) => (
          <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(order.orderStatus)}`}>
                    {getStatusIcon(order.orderStatus)}
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </div>
                  <span className="text-sm text-gray-500">Order #{order.id}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  {expandedOrder === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={order.image}
                  alt={order.title}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 truncate">{order.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                    <div>Quantity: {order.quantity}</div>
                    <div>Price: ${(order.price * order.quantity).toFixed(2)}</div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Ordered: {order.orderDate}
                    </div>
                    {order.trackingNumber && (
                      <div>Tracking: {order.trackingNumber}</div>
                    )}
                  </div>
                  
                  {/* Expanded Details */}
                  {expandedOrder === order.id && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      {order.shippingAddress && (
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                          <div>
                            <div className="font-medium text-sm">Shipping Address</div>
                            <div className="text-sm text-gray-600">{order.shippingAddress}</div>
                          </div>
                        </div>
                      )}
                      
                      {order.estimatedDelivery && order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-gray-500" />
                          <div className="text-sm">
                            <span className="font-medium">Estimated Delivery: </span>
                            <span className="text-gray-600">{order.estimatedDelivery}</span>
                          </div>
                        </div>
                      )}
                      
                      {order.deliveredDate && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <div className="text-sm">
                            <span className="font-medium">Delivered on: </span>
                            <span className="text-gray-600">{order.deliveredDate}</span>
                          </div>
                        </div>
                      )}
                      
                      {order.cancelledDate && (
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <div className="text-sm">
                            <span className="font-medium">Cancelled on: </span>
                            <span className="text-gray-600">{order.cancelledDate}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 sm:items-end">
                  {order.orderStatus === "pending" && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleStatusChange(order.id, "shipped")}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Ship Order
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleStatusChange(order.id, "cancelled")}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </>
                  )}
                  
                  {order.orderStatus === "shipped" && (
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(order.id, "delivered")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Delivered
                    </Button>
                  )}
                  
                  {order.orderStatus === "delivered" && (
                    <>
                      <Button size="sm" variant="outline">
                        <Star className="w-4 h-4 mr-2" />
                        Review
                      </Button>
                      <Button size="sm" variant="outline">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reorder
                      </Button>
                    </>
                  )}
                  
                  <Button size="sm" variant="ghost">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  
                  <Button size="sm" variant="ghost">
                    <Download className="w-4 h-4 mr-2" />
                    Invoice
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedOrders.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No orders found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;