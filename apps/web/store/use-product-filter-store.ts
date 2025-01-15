import { create } from 'zustand'

interface ProductFilterStoreProps {
  values: {
    categoryIds: string[];
    sizeIds: string[];
    colorIds: string[];
  }
  setValues: (key:string, value:string[]) => void;
}

export const useProductFilterStore = create<ProductFilterStoreProps>()((set) => ({
  values: {
    categoryIds: [],
    sizeIds: [],
    colorIds: [],
  },
  setValues: (key:string, value:string[]) => set(state => ({
    values: {
      ...state.values,
      [key]: value
    }
  }))
}))
