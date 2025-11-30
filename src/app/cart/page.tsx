'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { products } from '@/data/products';

export default function CartPage() {
  const { items, getTotal, getItemCount, clearCart, removeItem, updateQuantity } = useCartStore();
  const total = getTotal();
  const itemCount = getItemCount();
  const shipping = total >= 150 ? 0 : 10;

  const recommendedProducts = products.slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-16 pb-32 text-center max-w-md mx-auto"
          >
            <h1 className="font-display text-huge mb-8">YOUR BAG</h1>
            <p className="font-mono text-[11px] tracking-widest text-grey-mid mb-8">
              YOUR BAG IS EMPTY
            </p>
            <Link href="/shop">
              <button className="btn btn-filled">
                START SHOPPING
              </button>
            </Link>
          </motion.div>

          {/* Recommendations */}
          <section className="border-t border-grey-dark pt-16">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-display text-4xl">YOU MIGHT LIKE</h2>
              <Link
                href="/shop"
                className="font-mono text-[11px] tracking-widest text-grey-light hover:text-white transition-colors"
              >
                VIEW ALL
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {recommendedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="group">
                  <div className="aspect-[3/4] bg-charcoal overflow-hidden mb-4">
                    <img
                      src={p.images[0].url}
                      alt={p.name}
                      className="w-full h-full object-cover grayscale-hover"
                    />
                  </div>
                  <h3 className="font-mono text-[11px] tracking-wider text-white group-hover:text-grey-light transition-colors">
                    {p.name.toUpperCase()}
                  </h3>
                  <p className="font-mono text-[11px] text-grey-mid mt-1">
                    ${p.price}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="pt-16 pb-12"
        >
          <p className="font-mono text-[10px] tracking-widest text-grey-mid mb-2">
            001
          </p>
          <h1 className="font-display text-huge">YOUR BAG</h1>
          <p className="font-mono text-[11px] tracking-widest text-grey-mid mt-4">
            {itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Items */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="border-t border-grey-dark">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="flex gap-6 py-6 border-b border-grey-dark"
                >
                  {/* Image */}
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="w-28 h-36 bg-charcoal overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link href={`/product/${item.product.slug}`}>
                        <h3 className="font-mono text-[12px] tracking-wider text-white hover:text-grey-light transition-colors">
                          {item.product.name.toUpperCase()}
                        </h3>
                      </Link>
                      <p className="font-mono text-[11px] text-grey-mid mt-1">
                        {item.size} / {item.color.name}
                      </p>
                    </div>

                    <div className="flex items-end justify-between">
                      {/* Quantity */}
                      <div className="flex items-center border border-grey-dark">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center text-grey-light hover:text-white transition-colors"
                        >
                          −
                        </button>
                        <span className="w-10 text-center font-mono text-[11px] text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center text-grey-light hover:text-white transition-colors"
                        >
                          +
                        </button>
                      </div>

                      {/* Price & Remove */}
                      <div className="text-right">
                        <p className="font-mono text-[12px] text-white">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="font-mono text-[10px] tracking-widest text-grey-mid hover:text-kolor-red transition-colors mt-1"
                        >
                          REMOVE
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <Link
                href="/shop"
                className="font-mono text-[11px] tracking-widest text-grey-light hover:text-white transition-colors"
              >
                ← CONTINUE SHOPPING
              </Link>
              <button
                onClick={clearCart}
                className="font-mono text-[10px] tracking-widest text-grey-mid hover:text-kolor-red transition-colors"
              >
                CLEAR BAG
              </button>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <div className="border border-grey-dark p-6">
              <h2 className="font-display text-2xl mb-6">ORDER SUMMARY</h2>

              {/* Promo Code */}
              <div className="mb-6 pb-6 border-b border-grey-dark">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="PROMO CODE"
                    className="flex-1 bg-transparent border border-grey-dark px-3 py-2 font-mono text-[11px] text-white placeholder:text-grey-mid focus:outline-none focus:border-white transition-colors"
                  />
                  <button className="btn">
                    APPLY
                  </button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-grey-light">SUBTOTAL</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-grey-light">SHIPPING</span>
                  <span className="text-white">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {total < 150 && (
                  <p className="font-mono text-[10px] text-kolor-orange">
                    ADD ${(150 - total).toFixed(2)} FOR FREE SHIPPING
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center py-4 border-t border-grey-dark mb-6">
                <span className="font-mono text-[11px] tracking-widest text-grey-light">TOTAL</span>
                <span className="font-display text-3xl text-white">
                  ${(total + shipping).toFixed(2)}
                </span>
              </div>

              <Link href="/checkout">
                <button className="w-full py-4 bg-white text-black font-mono text-[11px] tracking-widest hover:bg-kolor-orange transition-colors">
                  CHECKOUT
                </button>
              </Link>

              <p className="font-mono text-[9px] text-grey-mid text-center mt-4">
                SECURE CHECKOUT • 30-DAY RETURNS
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
