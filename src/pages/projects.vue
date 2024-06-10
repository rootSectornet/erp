<template>
    <div>
        <Appbar :appBarTitle="'Project Management'"/>
        <ProjectTabs/>
        <Create/>
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
          @click="toggleCreate"
        ></v-fab>
    </div>
  </template>
  
  <script lang="ts">
  import Appbar from '../components/Molecules/Appbar.vue';
  import ProjectTabs from '../components/Molecules/ProjectTabs.vue';
  import { useProjectStore } from '../stores/projects';
  import { computed, defineComponent } from 'vue'
  export default defineComponent({
    components:{
      Appbar,
      ProjectTabs
    },
    setup(){
      const projectStore = useProjectStore()
      const toggleCreate = () => {
        projectStore.toggleCreate(!projectStore.showCreate);
      };
      return {
        toggleCreate
      }
    }
  })
  </script>
  