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
import WaitingSurvey from '../Projects/WaitingSurvey.vue';
import Estimasi from '../Projects/Estimasi.vue';

export default {
  data() {
    return {
      currentItem: 'estimasi', // Set default selected tab
      items: [
        { title: "Estimasi", key: "estimasi", content: Estimasi },
        { title: "Hasil Survey", key: "hasilSurvey", content: WaitingSurvey }
      ]
    };
  },
  components: {
    WaitingSurvey: markRaw(WaitingSurvey),
    Estimasi: markRaw(Estimasi)
  }
};
</script>
