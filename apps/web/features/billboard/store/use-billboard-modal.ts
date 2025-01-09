import { create } from 'zustand'

interface BillboardModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useBillboardModal = create<BillboardModalProps>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
