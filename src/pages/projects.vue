<template>
    <div>
        <Appbar :appBarTitle="'Project Management'"/>
        
        <v-overlay
          v-model="loading"
          class="align-center justify-center"
          :close-on-back="false"
          :close-on-content-click="false"
        >
          <v-progress-circular
            color="primary"
            size="64"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
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
        <ProjectTabs/>
        <Create/>
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
      const loading = computed(()=>{
        return projectStore.projectLoading
      })
      return {
        toggleCreate,
        loading
      }
    }
  })
  </script>
  