<template>
    <div class="d-flex px-2">
        <v-icon :icon="icon" class="mx-1"></v-icon>
        <p>{{ text }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    icon: {
      type: String as PropType<string>,
      required: true
    },
    text: {
      type: String as PropType<string>,
      required: true
    }
  }
})
</script>