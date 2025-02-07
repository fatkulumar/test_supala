<template>
  <div class="flex items-center justify-center bg-gray-100">
    <div
      class="bg-white rounded-lg p-6 w-80 shadow-lg transform transition-transform duration-300 hover:translate-y-[-5px]">
      
      <h2 class="text-2xl font-semibold text-gray-800 mb-4">
        <slot name="title"></slot>
      </h2>
      <slot name="image"></slot>
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
        <slot name="price"></slot>
      </h2>
      <p class="text-gray-600 text-sm mb-6">
        <slot name="description"></slot>
      </p>
      <slot name="buttonCheckout"></slot>
    </div>
  </div>
</template>