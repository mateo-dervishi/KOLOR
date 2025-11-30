import { create } from 'zustand';

interface UIState {
  // Menu
  isMenuOpen: boolean;
  toggleMenu: () => void;
  openMenu: () => void;
  closeMenu: () => void;
  
  // Site entered state (for landing page)
  hasEntered: boolean;
  setHasEntered: (entered: boolean) => void;
  
  // Loading
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  
  // Toast notifications
  toast: ToastMessage | null;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
  
  // Cursor
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
  
  // Color reveal state
  colorRevealed: boolean;
  setColorRevealed: (revealed: boolean) => void;
}

type ToastType = 'success' | 'error' | 'info';
type CursorType = 'default' | 'pointer' | 'text' | 'drag' | 'hidden';

interface ToastMessage {
  message: string;
  type: ToastType;
  id: number;
}

export const useUIStore = create<UIState>((set, get) => ({
  // Menu
  isMenuOpen: false,
  toggleMenu: () => set({ isMenuOpen: !get().isMenuOpen }),
  openMenu: () => set({ isMenuOpen: true }),
  closeMenu: () => set({ isMenuOpen: false }),
  
  // Site entered
  hasEntered: false,
  setHasEntered: (entered) => set({ hasEntered: entered }),
  
  // Loading
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  
  // Toast
  toast: null,
  showToast: (message, type = 'info') => {
    const id = Date.now();
    set({ toast: { message, type, id } });
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      if (get().toast?.id === id) {
        set({ toast: null });
      }
    }, 3000);
  },
  hideToast: () => set({ toast: null }),
  
  // Cursor
  cursorType: 'default',
  setCursorType: (type) => set({ cursorType: type }),
  
  // Color reveal
  colorRevealed: false,
  setColorRevealed: (revealed) => set({ colorRevealed: revealed }),
}));
