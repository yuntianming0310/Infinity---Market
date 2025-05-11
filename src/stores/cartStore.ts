import { create } from 'zustand'

type ProductItem = {
  product: {
    category: string
    createdAt: string
    description: string
    imageCover: string
    images: string[]
    isFeatured: boolean
    name: string
    price: number
    tags: string[]
    __v: number
    _id: string
  }
  quantity: number
  updatedAt?: string
}

interface CartState {
  products: ProductItem[]
  setProducts: (products: ProductItem[]) => void
  addProduct: (item: ProductItem) => void
  removeProduct: (id: string) => void
  updateProductQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const useCartStore = create<CartState>(set => ({
  products: [],

  setProducts(products: ProductItem[]) {
    const sortedProducts = products
      .slice()
      .sort(
        (a, b) =>
          new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime()
      )

    return set({ products: sortedProducts })
  },

  addProduct(item) {
    return set(state => {
      const isExist = state.products.find(
        el => el.product._id === item.product._id
      )

      if (isExist) {
        return {
          products: state.products.map(el =>
            el.product._id === item.product._id
              ? { ...el, quantity: el.quantity + item.quantity }
              : el
          ),
        }
      }

      return { products: [...state.products, item] }
    })
  },

  removeProduct(id) {
    return set(state => ({
      products: state.products.filter(item => item.product._id !== id),
    }))
  },

  updateProductQuantity(id, quantity) {
    return set(state => ({
      products: state.products.map(item =>
        item.product._id === id ? { ...item, quantity } : item
      ),
    }))
  },

  clearCart() {
    return set({ products: [] })
  },
}))

export const useCartProducts = () => useCartStore(state => state.products)

export const useCartActions = () => {
  const setProducts = useCartStore(state => state.setProducts)
  const addProduct = useCartStore(state => state.addProduct)
  const removeProduct = useCartStore(state => state.removeProduct)
  const updateProductQuantity = useCartStore(
    state => state.updateProductQuantity
  )
  const clearCart = useCartStore(state => state.clearCart)

  return {
    setProducts,
    addProduct,
    removeProduct,
    updateProductQuantity,
    clearCart,
  }
}
