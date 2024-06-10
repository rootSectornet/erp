<template>
  <div>
    <v-list v-if="!selectedCategory" lines="one">
      <v-list-subheader inset>Categorys</v-list-subheader>

      <v-list-item
        class="px-3 mx-3"
        v-for="category in categorys"
        :key="category.id"
        :title="category.name"
        variant="flat"
        :link="true"
        @click="selectCategory(category)"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi mdi-label-variant"></v-icon>
        </template>
        <template v-slot:append>
          <v-btn
            color="blue-darken-4"
            icon="mdi-information"
            variant="text"
          >{{ countProducst(category.id) }}</v-btn>
        </template>
      </v-list-item>
    </v-list>
    <Product v-else :category="selectedCategory" @back="clearSelection" />
  </div>
</template>
  
<script lang="ts">
import { defineComponent,computed,ref } from 'vue'
import { useProductStore } from '../../../stores/products';
import { CategoryProduct } from '../../../models/categoryProduct';
export default defineComponent({
    setup(){
        const productStore = useProductStore();
        const categorys = computed(() => productStore.listCategorys);
        const products = computed(() => productStore.listProducts);
        productStore.searchProducts("");
        const countProducst = (idCategory:number)=>{
          return products.value.filter((e)=>e.idCategory==idCategory).length
        }
        const selectedCategory = ref<CategoryProduct | null>(null);
        const selectCategory = (idCategory: CategoryProduct) => {
          selectedCategory.value = idCategory;
        };
        const clearSelection = () => {
          productStore.searchProducts("");
          selectedCategory.value = null;
        };
        return {
            categorys,
            products,
            countProducst,
            selectedCategory,
            selectCategory,
            clearSelection
        }
    }
})
</script>