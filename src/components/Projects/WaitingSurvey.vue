<template>
    <v-text-field
      append-inner-icon="mdi-magnify"
      density="compact"
      label="Search"
      v-model="search"
      variant="outlined"
      rounded
    ></v-text-field>
    <ProjectCard 
      v-for="item in filteredItems" 
      :key="item.projectNo" 
      :project="item" 
      class="mb-3"
      @click="goToProjectDetail(item.projectNo)"
    />
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { useProjectStore } from '../../stores/projects';
  import ProjectCard from './ProjectCard.vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    components: {
      ProjectCard
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
  
      const goToProjectDetail = (projectNo: string) => {
        router.push({ name: 'ProjectDetail', params: { projectNo } });
      };
  
      onMounted(() => {
        projectStore.fetchByType('OFFERING', 0, 10);
      });
  
      return {
        items,
        filteredItems,
        search,
        goToProjectDetail
      };
    },
  });
  </script>
  