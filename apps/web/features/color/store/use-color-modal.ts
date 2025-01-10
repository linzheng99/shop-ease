import { create } from 'zustand'

interface ColorModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useColorModal = create<ColorModalProps>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
