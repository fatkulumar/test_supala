import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import DataComponent from '../components/DataComponent.vue'
import { describe, it, expect } from 'vitest'

describe('DataComponent.vue', () => {
  it('renders message prop correctly', () => {
    const pinia = createPinia() 
    const wrapper = mount(DataComponent, {
      props: {
        message: 'Data Product',
      },
      global: {
        plugins: [pinia],
      },
    })

    expect(wrapper.text()).toContain('Data Product')
  })
})
