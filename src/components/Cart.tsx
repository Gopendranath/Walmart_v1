import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { removeFromCart, quantityIncrement, quantityDecrement, clearCart } from '../store/cartSlice'
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle,
  Heart,
  Star,
  CreditCard,
  Truck,
  Shield,
  Tag
} from 'lucide-react'
import { Link } from 'react-router-dom'

const ITEMS_PER_PAGE = 5;

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)
  const dispatch = useDispatch()
  const [page, setPage] = useState(1);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const totalPages = Math.ceil(cartItems.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedItems = cartItems.slice(startIdx, endIdx);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id))
    // Adjust page if current page becomes empty
    if (paginatedItems.length === 1 && page > 1) {
      setPage(page - 1)
    }
  }

  const handleQuantityChange = (id: string, type: 'inc' | 'dec') => {
    if (type === 'inc') {
      dispatch(quantityIncrement(id))
    } else {
      dispatch(quantityDecrement(id))
    }
  }

  const subtotal = cartItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsCheckingOut(true)
    
    // Simulate checkout process
    setTimeout(() => {
      dispatch(clearCart())
      setCheckoutSuccess(true)
      setPage(1)
      setIsCheckingOut(false)
    }, 2000)
  }

  const handleClearCart = () => {
    dispatch(clearCart())
    setShowClearConfirm(false)
    setPage(1)
  }


  useEffect(() => { 
    document.title = `Cart | ${cartItems.length} items`
  },[])

  // Success state
  if (checkoutSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your purchase. We'll send you a confirmation email shortly.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Order processing started</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Estimated delivery: 3-5 business days</span>
              </div>
            </div>
            <button 
              onClick={() => setCheckoutSuccess(false)}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-8">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
              <ShoppingCart className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Shopping
            </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden">
              {/* Cart header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Cart Items</h2>
                  {cartItems.length > 0 && (
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>

              {/* Items list */}
              <div className="p-6">
                <div className="space-y-6">
                  {paginatedItems.map((item: any) => (
                    <div key={item.id} className="group relative">
                      <div className="flex gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-600/50 transition-all duration-300">
                        {item.image && (
                          <div className="relative">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-20 h-20 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow" 
                            />
                            <button className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <Heart className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500">4.8 (124 reviews)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex flex-col items-end gap-4">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          
                          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 shadow-sm">
                            <button
                              onClick={() => handleQuantityChange(item.id, 'dec')}
                              disabled={item.quantity <= 1}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 'inc')}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPage(i + 1)}
                          className={`w-10 h-10 rounded-xl font-medium transition-all ${
                            page === i + 1
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Next
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600 dark:text-green-400">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600 dark:text-blue-400">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Truck className="w-4 h-4 text-green-500" />
                  <span>{shipping === 0 ? 'Free shipping included' : 'Free shipping on orders over $100'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Tag className="w-4 h-4 text-purple-500" />
                  <span>30-day return policy</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0 || isCheckingOut}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Proceed to Checkout
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>

        {/* Clear cart confirmation modal */}
        {showClearConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Clear Cart</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to remove all items from your cart?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearCart}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart