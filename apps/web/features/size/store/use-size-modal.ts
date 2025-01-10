import { create } from 'zustand'

interface SizeModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSizeModal = create<SizeModalProps>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
