<script lang="ts" setup>
import { useCartStore } from '../stores/useCartStore';
import TableCartComponent from '../components/TableCartComponent.vue';
import { ref } from 'vue';

const menu = ref([
    'No',
    'Title',
    'Price',
    'Description',
    'Action',
]);
</script>

<template>
    <div>
        <TableCartComponent :menu=menu :data="useCartStore().cartItems" :totalPrice="useCartStore().totalPrice" />
    </div>
</template>