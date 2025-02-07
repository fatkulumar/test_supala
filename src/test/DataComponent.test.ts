import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import DataComponent from '../components/DataComponent.vue';
import { useDataStore } from '../stores/useDataStore';
import { useCartStore } from '../stores/useCartStore';
import { toast } from 'vue3-toastify';

vi.mock('vue3-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('DataComponent.vue', () => {
  let dataStore: ReturnType<typeof useDataStore>
  let cartStore: ReturnType<typeof useCartStore>

  beforeEach(() => {
    setActivePinia(createPinia());
    dataStore = useDataStore();
    cartStore = useCartStore();

    vi.spyOn(dataStore, 'fetchData').mockImplementation(() => Promise.resolve());
    vi.spyOn(cartStore, 'addItemToCart').mockImplementation(() => true);
    vi.spyOn(cartStore, 'checkIdProduct').mockImplementation(() => false);
  });

  it('renders prop', () => {
    const wrapper = mount(DataComponent, {
      props: {
        message: 'Data Product',
      },
    });
    expect(wrapper.text()).toContain('Data Product');
  });

  it('calls fetchData', () => {
    mount(DataComponent);
    expect(dataStore.fetchData).toHaveBeenCalled();
  });

  it('tambah item dan success toast', async () => {
    cartStore.addItemToCart.mockImplementation(() => true);
    const wrapper = mount(DataComponent);
    await wrapper.vm.addCart({ id: 1, title: 'Product 1' });
    expect(cartStore.addItemToCart).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Berhasil Ditambahkan', { autoClose: 1000 });
  });

  it('hapus item dari cart dan error toast', async () => {
    cartStore.addItemToCart.mockImplementation(() => false);
    const wrapper = mount(DataComponent);
    await wrapper.vm.addCart({ id: 1, title: 'Product 1' });
    expect(cartStore.addItemToCart).toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith('Dihapus', { autoClose: 1000 });
  });

  it('cek jika product sudah dalam keranjang', () => {
    cartStore.checkIdProduct.mockImplementation(() => true);
    const wrapper = mount(DataComponent);
    expect(wrapper.vm.checkContainCartProduct(1)).toBe(true);
  });
});
