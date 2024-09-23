<template>
  <v-bottom-sheet v-model="showCreate" inset :fullscreen="true" close-on-back>
    <v-card class="">
      <v-card-text class="sticky-header">
        <div class="d-flex justify-space-between align-center">
          <v-btn variant="text" icon="mdi mdi-close" @click="showCreate = !showCreate"></v-btn>
          <h4>{{ capitalizeFirstLetter(product.name || "New Project") }}</h4>
        </div>
        <div class="d-flex justify-space-between align-center">
          <v-btn prepend-icon="mdi-chevron-left" variant="text" :disabled="indexActiveState == 0" @click="toggleStep(false)">
            <template v-slot:prepend>
              <v-icon color="secondary"></v-icon>
            </template>
            Back
          </v-btn>
         <p>{{ listCreateStep[indexActiveState].title }}</p>
          <v-btn append-icon="mdi-chevron-right" variant="text"  :disabled="indexActiveState == listCreateStep.length-1" @click="toggleStep(true)">
            <template v-slot:append>
              <v-icon color="secondary"></v-icon>
            </template>
            Next
          </v-btn>
        </div>
      </v-card-text>
      <div class="scrollable-content">   
        <keep-alive>
          <component v-bind:is="activeComponent"></component>
        </keep-alive>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue';
import { useProjectStore } from '../../stores/projects';
import { ProjectStateStep } from '../../models/project';
import { useProductStore } from '../../stores/products';

export default defineComponent({
  setup() {
    const projectStore = useProjectStore();
    const showCreate = computed({
      get(): boolean {
        return projectStore.show;
      },
      set(new_val: boolean) {
        projectStore.toggleCreate(new_val);
      },
    });

    const listCreateStep: ProjectStateStep[] = [
      {
        id: 1,
        key: "PRODUCT",
        title: "Pilih Product",
        component: defineAsyncComponent(() =>
          import('./CreateStep/CategoryProduct.vue')
        )
      },
      {
        id: 2,
        key: "MATERIAL",
        title: "Pilih Material",
        component: defineAsyncComponent(() =>
          import('./CreateStep/Material.vue')
        )
      },
      {
        id: 3,
        key: "STEP",
        title: "Step Pengerjaan",
        component: defineAsyncComponent(() =>
          import('./CreateStep/Step.vue')
        )
      },
      {
        id: 6,
        key: "RESULT",
        title: "Perkiraan Biaya Proyek",
        component: defineAsyncComponent(() =>
          import('./CreateStep/Result.vue')
        )
      }
    ];

    const indexActiveState = computed(() => projectStore.stateCreateActive);
    const activeComponent = computed(() => listCreateStep[indexActiveState.value].component);

    const toggleStep = (next: boolean) => {
      projectStore.setActiveCreateStep(next ? indexActiveState.value + 1 : indexActiveState.value - 1);
    };

    function capitalizeFirstLetter(str: string): string {
      return str.split(" ").map((v) => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()).join(" ")
    }

    const productStore = useProductStore();
    const product = computed(() => productStore.selectedProduct);

    return {
      showCreate,
      product,
      indexActiveState,
      listCreateStep,
      activeComponent,
      toggleStep,
      capitalizeFirstLetter
    };
  },
});
</script>
