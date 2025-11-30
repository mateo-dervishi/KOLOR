'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import { Product, Size, ProductColor } from '@/types';
import { Button } from '../ui/Button';

interface AddToCartButtonProps {
  product: Product;
  selectedSize: Size | null;
  selectedColor: ProductColor | null;
  quantity?: number;
}

export function AddToCartButton({
  product,
  selectedSize,
  selectedColor,
  quantity = 1,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useUIStore((state) => state.showToast);

  const canAdd = product.inStock && selectedSize && selectedColor;

  const handleAddToCart = async () => {
    if (!canAdd || !selectedSize || !selectedColor) return;

    setIsAdding(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    addItem(product, selectedSize, selectedColor, quantity);
    showToast('Added to bag', 'success');

    setIsAdding(false);
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handleAddToCart}
        disabled={!canAdd}
        isLoading={isAdding}
        fullWidth
        size="lg"
      >
        {!product.inStock
          ? 'Sold Out'
          : !selectedSize
          ? 'Select Size'
          : !selectedColor
          ? 'Select Color'
          : 'Add to Bag'}
      </Button>

      {/* Wishlist Button */}
      <Button variant="outline" fullWidth size="lg">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        Add to Wishlist
      </Button>
    </div>
  );
}

