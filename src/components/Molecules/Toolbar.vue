<template>
    <v-card>
      <v-toolbar
        color="deep-purple-accent-4"
      >
        <v-app-bar-nav-icon variant="text" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
  
        <v-toolbar-title>{{ appBarTitle }}</v-toolbar-title>
  
        <template v-slot:extension>
            <slot name="extension"></slot>
        </template>
      </v-toolbar>
      <Drawer />
    </v-card>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent, PropType, Slot } from 'vue'
  import { useDrawerStore } from '../../stores/drawer';
  
  export default defineComponent({
    props: {
        appBarTitle: {
            type: String as PropType<string>,
            required: true
        },
        extensionSlot: {
            type: Object as PropType<Slot>,
            default: () => ({})
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