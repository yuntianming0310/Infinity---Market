import { create } from 'zustand'

type ProductItem = {
  id: string
  name: string
  price: number
  quantity: number
  imageCover: string
}

type CartActions = {
  addProduct: (item: ProductItem) => void
  removeProduct: (id: ProductItem['id']) => void
  clearCart: () => void
}

interface CartState {
  products: ProductItem[]
  actions: CartActions
}

const useCartStore = create<CartState>(set => ({
  products: [],

  actions: {
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
  },
}))

export const useProducts = () => useCartStore(state => state.products)

export const useCartActions = () => useCartStore(state => state.actions)

// export const useAddProduct = () =>
//   useCartStore(state => state.actions.addProduct)

// export const useRemoveProduct = () =>
//   useCartStore(state => state.actions.removeProduct)

// export const useClearCart = () => useCartStore(state => state.actions.clearCart)
