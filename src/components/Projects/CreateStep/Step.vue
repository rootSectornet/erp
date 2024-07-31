<template>
  <div class="px-3">
    
    <SummaryCard :totalCost="totalCoststep?.toString()" :title="`Step & ${totalDuration} Hari Pengerjaan`" :total="sortedProjectSteps.length"/>
    <v-divider class="my-2"></v-divider>
    <CardStep v-for="step in sortedProjectSteps" :key="step.id" :step="step"/>
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
  import { computed, defineComponent,ref,onMounted } from 'vue';
  import { useProductStore } from '../../../stores/products';
  import { useProjectStore } from '../../../stores/projects';
  export default defineComponent({
    setup(){
      const productStore = useProductStore();

      const projectStore = useProjectStore();

      onMounted(()=>{
        productStore.fetchProductsteps(productStore.product.id)
        
      })


      const sortedProjectSteps = computed(() => {
        return [...(projectStore.listProjectSteps || [])].sort((a, b) => a.rank - b.rank);
      });
      const totalCoststep = computed(()=>{
        return projectStore.listProjectSteps?.reduce((total,step)=>{
          return Number(total) + Number(step.totalCost)
        },0)
      })
      
      const totalDuration = computed(()=>{
        return projectStore.listProjectSteps?.reduce((total,step)=>{
          return Number(total) + Number(step.duration)
        },0)
      })
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
          sortedProjectSteps,
          totalCoststep,
          totalDuration
      }
    }
  });
  </script>
  