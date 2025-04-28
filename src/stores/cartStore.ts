import { create } from 'zustand'

type ProductItem = {
  id: string
  name: string
  price: number
  quantity: number
  imageCover: string
}

interface CartState {
  products: ProductItem[]
  addProduct: (item: ProductItem) => void
  removeProduct: (id: ProductItem['id']) => void
  clearCart: () => void
}

const useCartStore = create<CartState>(set => ({
  products: [],

  addProduct(item) {
    return set(state => {
      const isExist = state.products.find(product => product.id === item.id)

      if (isExist) {
        return {
          products: state.products.map(product =>
            product.id === item.id
              ? { ...product, quantity: product.quantity + item.quantity }
              : product
          ),
        }
      }

      return { products: [...state.products, item] }
    })
  },

  removeProduct(id) {
    return set(state => ({
      products: state.products.filter(item => item.id !== id),
    }))
  },

  clearCart() {
    return set({ products: [] })
  },
}))

export const useCartProducts = () => useCartStore(state => state.products)

export const useCartActions = () => {
  const addProduct = useCartStore(state => state.addProduct)
  const removeProduct = useCartStore(state => state.removeProduct)
  const clearCart = useCartStore(state => state.clearCart)
  return { addProduct, removeProduct, clearCart }
}
