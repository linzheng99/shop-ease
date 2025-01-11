import { create } from 'zustand'

interface ProductModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProductModal = create<ProductModalProps>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
