<script lang="ts" setup>
import Shape from './Partials/Shape.vue';
import { useDataStore } from '../stores/useDataStore';
import { useCartStore } from '../stores/useCartStore';
import type { IData } from '../types/IData';
import IconCart from '../components/Partials/IconCart.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const props = defineProps({
  message: {
    type: String,
    required: false
  }
});

useDataStore().fetchData();

const notifySuccess = (message: string): Promise<void> => {
  toast.success(message, {
    autoClose: 1000,
  });
  return Promise.resolve(); 
}

const notifyError = (message: string): Promise<void> => {
  toast.error(message, {
    autoClose: 1000,
  });
  return Promise.resolve();
}

const addCart = ((item :IData): Promise<void>=> {
  const data =  useCartStore().addItemToCart(item)
  if(data) {
    notifySuccess("Berhasil Ditambahkan")
  }else{
    notifyError("Sudah Ditambahkan")
  }
  return Promise.resolve();
})

function checkContainCartProduct(productId: number): boolean {
  const existingItem = useCartStore().checkIdProduct(productId);
  if (existingItem) {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <div class="flex justify-center bg-purple-50 w-auto">
    {{ useCartStore().cartItems.length }}
    <router-link to="/cart">
      <IconCart class="cursor-pointer" />
    </router-link>
  </div>
  <h1 class="text-center font-bold mt-3">{{ props.message }}</h1>
  <div class="flex flex-wrap justify-around">
    <div v-for="item, index in useDataStore().data" :key="index" class="bg-blue-500 p-4 m-2 text-white">
      <Shape>
        <template #image>
          <img :src="item.image" alt="Kota Impian" class="w-full h-48 object-cover rounded-lg mb-4" />
        </template>
        <template #title>
          {{ item.title }}
        </template>
        <template #price>
          ${{ item.price }}
        </template>
        <template #description>
          {{ item.description }}
        </template>
        <template #buttonCheckout>
          <button @click="addCart(item)"
            class="w-full py-2 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors cursor-pointer" :class="{ 'bg-red-500': checkContainCartProduct(item.id), 'bg-blue-500': !checkContainCartProduct(item.id) }">
            {{ checkContainCartProduct(item.id) == true ? 'Hapus' : 'Checkout' }}
          </button>
        </template>
      </Shape>
    </div>
  </div>
</template>