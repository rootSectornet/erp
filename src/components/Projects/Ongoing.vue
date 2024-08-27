
<template>
  <v-text-field
      append-inner-icon="mdi-magnify"
      density="compact"
      label="Search"
      v-model="search"
      variant="outlined"
      rounded
    ></v-text-field>
  <ProjectCard v-for="item in items" :key="item.projectNo" :project="item" class="mb-3"/>
</template>

<script lang="ts">
import { computed, defineComponent,onMounted,ref } from 'vue'
import {useProjectStore} from '../../stores/projects';
import ProjectCard from './ProjectCard.vue';

export default defineComponent({
components:{
ProjectCard
},
setup() {
const projectStore = useProjectStore()
const search = ref<string>('');
const items = computed(() => projectStore.listProjects);
onMounted(()=>{
projectStore.fetchByType('OFFERING',0,10);
})
return {
items,
search
}
},
})
</script>