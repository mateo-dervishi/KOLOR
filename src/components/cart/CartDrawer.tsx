'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, getTotal, getItemCount, clearCart, removeItem, updateQuantity } = useCartStore();
  const total = getTotal();
  const itemCount = getItemCount();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/80"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[111] w-full max-w-md bg-black border-l border-grey-dark flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-grey-dark">
              <div>
                <h2 className="font-display text-2xl text-white">BAG</h2>
                <p className="font-mono text-[10px] tracking-widest text-grey-mid mt-1">
                  {itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="font-mono text-[11px] tracking-widest text-grey-light hover:text-white transition-colors"
              >
                CLOSE
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="font-mono text-[11px] tracking-widest text-grey-mid mb-6">
                    YOUR BAG IS EMPTY
                  </p>
                  <button
                    onClick={onClose}
                    className="font-mono text-[11px] tracking-widest text-white hover:text-kolor-orange transition-colors underline"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex gap-4"
                    >
                      {/* Image */}
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={onClose}
                        className="w-20 h-24 bg-charcoal overflow-hidden flex-shrink-0"
                      >
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={onClose}
                        >
                          <h3 className="font-mono text-[11px] tracking-wider text-white truncate hover:text-grey-light transition-colors">
                            {item.product.name.toUpperCase()}
                          </h3>
                        </Link>
                        <p className="font-mono text-[10px] text-grey-mid mt-1">
                          {item.size} / {item.color.name}
                        </p>
                        <p className="font-mono text-[11px] text-white mt-1">
                          ${item.product.price}
                        </p>

                        {/* Quantity */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border border-grey-dark">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-grey-light hover:text-white transition-colors"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-mono text-[11px] text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-grey-light hover:text-white transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="font-mono text-[10px] tracking-widest text-grey-mid hover:text-kolor-red transition-colors"
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-grey-dark">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] tracking-widest text-grey-light">
                    SUBTOTAL
                  </span>
                  <span className="font-display text-2xl text-white">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="font-mono text-[10px] text-grey-mid mb-6">
                  SHIPPING CALCULATED AT CHECKOUT
                </p>
                <div className="space-y-3">
                  <Link href="/checkout" onClick={onClose}>
                    <button className="w-full py-4 bg-white text-black font-mono text-[11px] tracking-widest hover:bg-kolor-orange transition-colors">
                      CHECKOUT
                    </button>
                  </Link>
                  <Link href="/cart" onClick={onClose}>
                    <button className="w-full py-4 border border-grey-dark text-white font-mono text-[11px] tracking-widest hover:border-white transition-colors">
                      VIEW BAG
                    </button>
                  </Link>
                </div>
                <button
                  onClick={clearCart}
                  className="w-full mt-4 font-mono text-[10px] tracking-widest text-grey-mid hover:text-kolor-red transition-colors"
                >
                  CLEAR BAG
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
