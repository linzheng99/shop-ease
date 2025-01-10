import { create } from 'zustand'

interface CategoryModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCategoryModal = create<CategoryModalProps>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
