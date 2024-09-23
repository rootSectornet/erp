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
    <div class="d-flex justify-space-between">
      <TextWithIcon icon="mdi mdi-gmail" text="Email" />
      <p>
        <strong>contoh@gmail.com</strong>
      </p>
    </div>
    <v-divider class="my-3"></v-divider>
    <div style="margin-left: 18px">
      <p><strong>Pesanan</strong></p>
      <p class="">xxxxxxxxxxx</p>
    </div>
    <v-divider class="my-3"></v-divider>
    <div style="margin-left: 18px">
      <p><strong>Total Biaya</strong></p>
      <p class="">xxxxxxxxxxx</p>
    </div>

    <v-divider class="my-3"></v-divider>
    <div style="margin-left: 18px">
      <p><strong>Alamat</strong></p>
      <p class="">{{ project.customer.address }}</p>
    </div>
    <v-divider class="my-3"></v-divider>
    <div class="d-flex justify-content-between" style="margin-top: 60px">
  <div class="mr-auto">
    <v-btn
      color="blue"
      style="font-size: 0.7em; padding: 7px"
      @click="dialog = true"
    >
      Batalkan
    </v-btn>

    <v-dialog v-model="dialog" max-width="400" persistent :style="{ top: '30%', transform: 'translateY(-50%)' }">

      <div class="text">
        <v-card>
          <v-card-title class="headline text-center">
            Konfirmasi Pembatalan Pesanan
          </v-card-title>

          <div class="d-flex justify-space-between w-100">
            <v-btn
              color="primary"
              style="font-size: 0.7em; padding: 7px; margin-left: 25px; margin-bottom: 10px;"
              @click="dialog = false"
            >
              Batal
            </v-btn>
            <v-btn
              color="primary"
              style="font-size: 0.7em; padding: 7px; margin-right: 25px; margin-bottom: 10px;"
              @click="confirmCancellation"
            >
              Konfirmasi
            </v-btn>
          </div>
        </v-card>
      </div>
    </v-dialog>
  </div>
  <div class="ml-auto">
    <router-link :to="{ name: 'Negosiasi' }">
      <v-btn color="blue" style="font-size: 0.7em; padding: 7px">
        Buat Jadwal
      </v-btn>
    </router-link>
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
  data() {
    return {
      dialog: false,
    };
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
  methods: {
    confirmCancellation() {
      this.dialog = false;
      // Tambahkan logika pembatalan pemesanan di sini
      console.log("Pemesanan dibatalkan");
    },
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
