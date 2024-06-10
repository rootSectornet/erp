<template>
  <v-navigation-drawer v-model="isOpen" :location="'left'" temporary ref="drawerRef">
    <v-list density="compact" nav>
      <v-list-item v-for="item in items" :key="item.value" :prepend-icon="item.icon" :title="item.title" :value="item.value" @click="navigation(item.path)"></v-list-item>
    </v-list>
    <template v-slot:append>
      <div class="pa-2 font-size-10 text-center">
        <i>version : 1.0.0@alpha</i> 
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useDrawerStore } from '../../stores/drawer';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const drawerStore = useDrawerStore()
    const router = useRouter();
    const isOpen = computed({
      get(): boolean {
        return drawerStore.status
      },
      set(new_val: boolean) {
        drawerStore.hideShow(new_val)
      },
    })
    const items = [
      {
        active : true,
        title: 'Home',
        icon : 'mdi-view-dashboard',
        value: 'home',
        path:'/'
      },
      {
        active : false,
        title: 'Project Management',
        icon : 'mdi-nut',
        value: 'project',
        path:'projects'
      }
    ]
    const navigation = (path: string) => {
      router.push(path);
      drawerStore.hideShow(false);
    }
    return {
      isOpen,
      items,
      navigation
    }
  },
})
</script>
