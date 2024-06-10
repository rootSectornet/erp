<template>
    <div>
      <v-app-bar :elevation="0" color="primary" density="compact" class="position-fixed">
        <template v-slot:prepend>
          <v-app-bar-nav-icon variant="text" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        </template>
        <v-app-bar-title>{{ appBarTitle }}</v-app-bar-title>
      </v-app-bar>
      <Drawer />
    </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, PropType } from 'vue'
  import { useDrawerStore } from '../../stores/drawer';
  
  export default defineComponent({
    props: {
      appBarTitle: {
        type: String as PropType<string>,
        required: true
      }
    },
    setup(props) {
      const drawerStore = useDrawerStore()
      const isDrawerOpen = computed(() => drawerStore.status);
      const toggleDrawer = () => {
        drawerStore.hideShow(!drawerStore.status);
      };
      return {
        isDrawerOpen,
        toggleDrawer
      }
    }
  })
  </script>
  