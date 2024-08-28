<template>
    <v-text-field
      append-inner-icon="mdi-magnify"
      density="compact"
      label="Search"
      v-model="search"
      variant="outlined"
      rounded
    ></v-text-field>
    <CardEstimasi 
      v-for="item in filteredItems" 
      :key="item.projectNo" 
      :project="item" 
      class="mb-3"
    />
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { useProjectStore } from '../../stores/projects';
  import CardEstimasi from './CardEstimasi.vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    components: {
        CardEstimasi
    },
    setup() {
      const projectStore = useProjectStore();
      const router = useRouter();
      const search = ref<string>('');
  
      const items = computed(() => projectStore.listProjects);
  
      const filteredItems = computed(() => {
        return items.value.filter(item => 
          item.name.toLowerCase().includes(search.value.toLowerCase())
        );
      });
    
      onMounted(() => {
        projectStore.fetchByType('OFFERING', 0, 10);
      });
  
      return {
        items,
        filteredItems,
        search
      };
    },
  });
  </script>
  