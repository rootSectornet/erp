<template>
  <div v-if="project">
    <div class="customer-section my-5 mx-4">
      <div class="d-flex justify-space-between align-center">
        <TextWithIcon icon="mdi mdi-account" text="Customer" />
        <v-text-field
          v-model="project.customer.name"
          label="Customer Name"
          hide-details
          dense
          solo
        ></v-text-field>
      </div>
      <!-- phone number awal -->
      <v-divider class="my-3"></v-divider>
      <div class="d-flex justify-space-between align-center">
        <TextWithIcon icon="mdi mdi-phone" text="Phone" />
        <v-text-field
          v-model="project.customer.phone"
          label="Phone Number"
          hide-details
          dense
          solo
        ></v-text-field>
      </div>
      <!-- phone number akhir -->

      <!-- address awal -->
      <v-divider class="my-3"></v-divider>
      <div class="d-flex justify-space-between align-center">
        <TextWithIcon icon="mdi mdi-map-marker" text="Address" />
        <v-text-field
          v-model="project.customer.address"
          label="Address"
          hide-details
          dense
          solo
          class="flex-grow-1"
        ></v-text-field>
      </div>
      <!-- address akhir -->

      <!-- Product awal -->
      <v-divider class="my-5"></v-divider>
      <v-expansion-panels>
        <v-expansion-panel title="Produk yang di pesan">
          <v-expansion-panel-text>
            <v-list lines="one">
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="project.product.name"
                    label="Nama Produk"
                    hide-details
                    dense
                    solo
                  ></v-text-field>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!-- Product akhir -->

        <v-expansion-panel class="my-3" title="Material yang digunakan">
          <v-expansion-panel-text>
            <v-list lines="two">
              <v-list-item class="mx-1 pl-0 ml-0">
                <!-- Nama Material awal -->
                <v-list-item-content
                  v-for="material in project.material_names"
                  :key="material.id"
                >
                  <v-text-field
                    v-model="material.name"
                    label="Nama Material"
                    hide-details
                    dense
                    solo
                  ></v-text-field>
                </v-list-item-content>
                <!-- Nama Material akhir -->

                <!-- Ukuran awal -->
                <v-list-item-action>
                  <v-text-field
                    v-model="besiHoleLength"
                    label="Panjang"
                    hide-details
                    dense
                    solo
                    class="length-field"
                  ></v-text-field>
                </v-list-item-action>
                <p class="text-red">Rp 50.000 / meter + Rp 5.000</p>
                <!-- Ukuran akhir -->
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <!-- tenaga kerja awal -->
        <v-expansion-panel title="Tenaga Kerja">
          <v-expansion-panel-text>
            <v-list-item-action>
              <v-text-field
                v-model="namaTenagaKerja"
                hide-details
                dense
                solo
                class="length-field"
              ></v-text-field>
            </v-list-item-action>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!-- tenaga kerja akhir -->

        <v-expansion-panel title="Perhitungan total biaya" class="my-3">
          <v-expansion-panel-text>
            <v-list lines="one">
              <v-list-item title="120000+134444" subtitle="Total"></v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
      <div class="d-flex justify-content-between mt-5">
        <v-btn color="blue" class="mr-auto">Simpan</v-btn>
        <v-btn color="blue" class="ml-auto">Negosiasi</v-btn>
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

export default defineComponent({
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
