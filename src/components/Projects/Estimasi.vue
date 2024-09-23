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
    <v-fab
          key="mdi-plus"
          color="green"
          icon="mdi-plus"
          class="mb-4 style"
          location="bottom center"
          size="64"
          absolute
          app
          appear
          width="0px !important"
          @click="toggleCreate"
          style="bottom: 0; left: 50%; transform: translateX(-50%); z-index: 1000;"
        ></v-fab>
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
  
      const toggleCreate = () => {
        projectStore.toggleCreate(!projectStore.showCreate);
      };
      const loading = computed(()=>{
        return projectStore.projectLoading
      });
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
        search,
        toggleCreate,
        loading
      };
    },
  });
  </script>
  
  <style scoped>
  .style{
    margin-top: 100px !important;
    position: absolute;
  }
  </style>