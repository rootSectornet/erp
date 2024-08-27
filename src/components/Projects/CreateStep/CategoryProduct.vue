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
          
        </template>
      </v-list-item>
    </v-list>
    <Product v-else :category="selectedCategory" @back="clearSelection" />
  </div>
</template>
  
<script lang="ts">
import { defineComponent,computed,ref, onMounted } from 'vue'
import { useProductStore } from '../../../stores/products';
import { CategoryProduct } from '../../../models/categoryProduct';
export default defineComponent({
    setup(){
        const productStore = useProductStore();
        const categorys = computed(() => productStore.listCategorys);
        const products = computed(() => productStore.listProducts);
        productStore.searchProducts("");
        const selectedCategory = ref<CategoryProduct | null>(null);
        const selectCategory = (idCategory: CategoryProduct) => {
          selectedCategory.value = idCategory;
          productStore.fetchProduct(idCategory.id);
        };
        const clearSelection = () => {
          productStore.searchProducts("");
          selectedCategory.value = null;
        };

        onMounted(()=>{
          productStore.fetchAll();
        })

        return {
            categorys,
            products,
            selectedCategory,
            selectCategory,
            clearSelection
        }
    }
})
</script>