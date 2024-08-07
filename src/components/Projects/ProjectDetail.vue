<template>
  <div v-if="project" class="customer-section my-5 mx-4 project-detail">
    <div class="d-flex justify-space-between">
      <TextWithIcon icon="mdi mdi-account" text="Customer" />
      <p>
        <strong>{{ project.customer.name }}</strong>
      </p>
    </div>
    <v-divider class="my-3"></v-divider>
    <div class="d-flex justify-space-between">
      <TextWithIcon icon="mdi mdi-phone" text="Phone" />
      <p>
        <strong>{{ project.customer.phone }}</strong>
      </p>
    </div>
    <v-divider class="my-3"></v-divider>
    <div>
      <TextWithIcon icon="mdi mdi-map-marker" text="Address" />
      <p class="ml-4 pl-4">{{ project.customer.address }}</p>

      <v-divider class="my-5"></v-divider>
      <v-expansion-panels>
        <v-expansion-panel title="Produk yang di pesan">
          <v-expansion-panel-text>
            <v-list lines="one">
              <v-list-item
                title="Nama Produk"
                :subtitle="project.product.name"
              ></v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel class="my-3" title="Material yang digunakan">
          <v-expansion-panel-text>
            <v-list lines="two">
              <v-list-item
                v-for="material in project.material_names"
                :key="material.id"
                class="mx-1 pl-0 ml-0"
                :title="material.name"
                variant="plain"
              >
                <template v-slot:subtitle>
                  <p>{{ material.name }}</p>
                  <p class="text-red">
                    {{ material.price }} / {{ material.unit }} +
                    {{ material.customPrice }}
                  </p>
                </template>
                <template v-slot:append>
                  <v-btn
                    color="blue-darken-4"
                    icon="mdi-information"
                    variant="text"
                    >{{ material.qty }}</v-btn
                  >
                </template>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="Tenaga Kerja">
          <v-expansion-panel-text>
            <v-list lines="one">
              <v-list-item
                v-for="worker in project.workers"
                :key="worker.id"
                :title="worker.name"
              ></v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="Perhitungan total biaya" class="my-3">
          <v-expansion-panel-text>
            <v-list lines="one">
              <v-list-item
                :title="project.total_cost"
                subtitle="Total"
              ></v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <div class="d-flex justify-content-between mt-5">
        <div class="mr-auto">
          <router-link
            :to="{
              name: 'EditProjectDetail',
              params: { projectNo: project.projectNo },
            }"
          >
            <v-btn color="blue">Edit</v-btn>
          </router-link>
        </div>
        <div class="ml-auto">
          <router-link :to="{ name: 'Negosiasi' }">
            <v-btn color="blue">Negosiasi</v-btn>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import TextWithIcon from "../Atoms/TextWithIcon.vue";

export default defineComponent({
  components: {
    TextWithIcon,
  },
  setup() {
    const route = useRoute();
    const project = ref<any>(null);

    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/projects/${route.params.projectNo}`
        );
        project.value = response.data.data.data; // Access the 'data.data' object
        console.log("Project Data:", project.value); // Logging project data
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    onMounted(() => {
      fetchProject();
    });

    return {
      project,
    };
  },
});
</script>

<style scoped>
.fs-14 {
  font-size: 14px;
}
.fs-12 {
  font-size: 12px;
}
.text-red {
  color: red;
}
</style>
