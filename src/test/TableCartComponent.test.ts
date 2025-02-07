import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import TableCartComponent from '../components/TableCartComponent.vue'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCartStore } from '../stores/useCartStore'

vi.mock('@/stores/cart', () => ({
  useCartStore: vi.fn(() => ({
    removeItemFromCart: vi.fn(), // Mock fungsi removeItemFromCart
  })),
}))

describe('TableCartComponent.vue', () => {
  let pinia
  let cartStore: ReturnType<typeof useCartStore>

  beforeEach(() => {
    pinia = createPinia()
    setActivePinia(pinia)
    cartStore = useCartStore()
  })

  it('renders component', () => {
    cartStore.cartItems = [
      { id: 1, title: 'Burger', price: 50000, category: 'Food', description: 'Delicious burger', image: 'burger.jpg', rating: {rate:1, count: 1} },
      { id: 2, title: 'Pizza', price: 80000, category: 'Food', description: 'Cheesy pizza', image: 'pizza.jpg', rating: {rate:1, count: 1} },
    ]
    cartStore.totalPrice = 130000
    cartStore.removeItemFromCart(1, 50000)
    const wrapper = mount(TableCartComponent, {
      props: {
        menu: ['No', 'Title', 'Price', 'Description', 'Action'],
        data: [
          {
            id: 1,
            title: 'Burger',
            price: '50000',
            category: 'Food',
            description: 'Delicious burger',
            image: 'burger.jpg',
            rating: {rate:3.9, count: 120},
          },
          {
            id: 2,
            title: 'Pizza',
            price: '80000',
            category: 'Food',
            description: 'Cheesy pizza',
            image: 'pizza.jpg',
            rating: {rate:3.9, count: 120},
          },
        ],
        totalPrice: 130000,
      },
    })

    const headers = wrapper.findAll('th').map((th) => th.text())
    // menu
    expect(headers).toEqual(['No', 'Title', 'Price', 'Description', 'Action'])
    // data
    expect(wrapper.text()).toContain('Burger')
    expect(wrapper.text()).toContain('Pizza')
    expect(wrapper.text()).toContain('50000')
    expect(wrapper.text()).toContain('80000')
    expect(wrapper.text()).toContain('Delicious burger')
    expect(wrapper.text()).toContain('Cheesy pizza')
    // totalPrice
    expect(wrapper.text()).toContain('130000')
    // cek data dihapus
    expect(cartStore.cartItems.length).toBe(1)
    expect(cartStore.cartItems.some(item => item.id === 1)).toBe(false)
    // perbarui totalPrice
    expect(cartStore.totalPrice).toBe(80000)
  })
})
