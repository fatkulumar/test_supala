<script lang="ts" setup>
import IconTrash from '../components/Partials/IconTrash.vue';
import { useCartStore } from '../stores/useCartStore';

const props = defineProps({
    menu: {
        type: Array,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

</script>

<template>
    <div
        class="flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table class="w-full text-left table-auto min-w-max text-slate-800">
            <thead>
                <tr class="text-slate-500 border-b border-slate-300 bg-slate-50">
                    <th v-for="item, index in props.menu" :key="index" class="p-4">
                        <p class="text-sm leading-none font-normal">
                            {{ item }}
                        </p>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item, index in data" :key="index" class="hover:bg-slate-50">
                    <td class="p-4">
                        {{ index + 1 }}
                    </td>
                    <td class="p-4">
                        <p class="text-sm font-bold">
                            {{ item.title }}
                        </p>
                    </td>
                    <td class="p-4">
                        <p class="text-sm">
                            {{ item.price }}
                        </p>
                    </td>
                    <td class="p-4 w-72">
                        <p class="text-sm line-clamp-2">
                            {{ item.description }}
                        </p>
                    </td>
                    <td class="p-4">
                        <IconTrash @click="useCartStore().removeItemFromCart(item.id, item.price)" class="cursor-pointer" />
                    </td>
                </tr>
                <tr>
                    <td colspan="4" class="p-4">
                        <p class="text-sm">
                            Total : {{ props.totalPrice }}
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>