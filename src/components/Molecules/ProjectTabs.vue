<template>
  <v-tabs v-model="currentItem" fixed-tabs color="primary" class="position-sticky">
    <v-tab
      v-for="item in items"
      :key="item.key"
      :text="item.title"
      :value="item.key"
    ></v-tab>
  </v-tabs>
  <v-tabs-window v-model="currentItem">
    <v-tabs-window-item
      v-for="item in items"
      :key="item.key"
      :value="item.key"
    >
      <v-card flat>
        <v-card-text>
          <!-- Render dynamic component -->
          <component :is="item.content"></component>
        </v-card-text>
      </v-card>
    </v-tabs-window-item>
  </v-tabs-window>
</template>

<script>
import { markRaw } from 'vue';
import Ongoing from '../Projects/Ongoing.vue';

export default {
  data() {
    return {
      currentItem: 'ongoing',
      items: [
        { title: "On-going", key: "ongoing", content: Ongoing },
        { title: "Done", key: "done", content: Ongoing }
      ]
    };
  },
  components: {
    Ongoing: markRaw(Ongoing)
  }
};
</script>
