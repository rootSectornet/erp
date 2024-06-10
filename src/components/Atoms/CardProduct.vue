<template>
    <v-card
      class="mx-4 my-3"
      :title="product.name"
      :variant="product.selected ? 'elevated' : 'outlined'"
      :color="product.selected ? 'indigo' : 'black'"
      link
      @click="selected(product)"
    >
    </v-card>
</template>
<script lang="ts">
    import { defineComponent, PropType } from 'vue'
    import { Product } from '../../models/product';
    import { useProductStore } from '../../stores/products';
    export default defineComponent({
    props: {
        product: {
            type: {} as PropType<Product>,
            required: true
        }
    },
    setup(){
        const productStore = useProductStore();
        const selected = (product : Product)=>{
            productStore.setSelectedProduct(product)
        }
        return {
            selected
        }
    }
    })
</script>