<template>
  <div class="px-3">
    <CardStep v-for="step in sortedProductSteps" :key="step.id" :step="step"/>
    <v-fab
          key="mdi-plus"
          color="green"
          icon="mdi-plus"
          class="mb-4"
          location="bottom center"
          size="64"
          absolute
          app
          appear
          width="0px !important"
          @click="openAdd"
    ></v-fab>
    <DialogAddStep v-if="showAdd" :show="showAdd" @close="closeAdd"/>
  </div>
</template>
  


<script lang="ts">
  import { computed, defineComponent,ref } from 'vue';
  import { useProductStore } from '../../../stores/products';
  export default defineComponent({
    setup(){
      const productStore = useProductStore();
      const sortedProductSteps = computed(() => {
        return [...(productStore.product.productSteps || [])].sort((a, b) => a.rank - b.rank);
      });
      const showAdd = ref(false);
      const closeAdd = ()=>{
        showAdd.value = false
      }
      const openAdd = ()=>{
        showAdd.value = true
      } 
      return {
          closeAdd,
          showAdd,
          openAdd,
          sortedProductSteps
      }
    }
  });
  </script>
  