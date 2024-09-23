<template>
  <div
    style="font-size: 1.5em; margin-bottom: 30px; font-weight: 500"
    class="text-center mt-5"
  >
    Jadwal Pesanan
  </div>
  <div class="customer-section my-5 mx-4 project-detail">
    <div class="d-flex justify-space-between">
      <TextWithIcon icon="mdi mdi-account" text="Nama" />
      <p>
        <strong>xxxxxxxxxxx</strong>
      </p>
    </div>
    <v-divider class="my-3"></v-divider>
    <div class="d-flex justify-space-between">
      <TextWithIcon icon="mdi mdi-phone" text="Phone" />
      <p>
        <strong>xxxxxxxxxxx</strong>
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

    <v-divider class="my-3 mb-5"></v-divider>
    <div style="margin-left: 18px">
      <p><strong>Alamat</strong></p>
      <p class="">Jl xxxxxx</p>
    </div>
    <v-divider class="my-3"></v-divider>
    <v-card class="mt-5" style="background-color: wheat">
      <div class="mt-5 mb-3 mx-5">
        <p>Rabu, 26 Juni 2024</p>
        <div class="d-flex justify-space-between">
          <pb style="color: blue">15.00</pb>
        </div>
      </div>
    </v-card>
    <div class="d-flex justify-content-between" style="margin-top: 100px">
      <div class="mr-auto">
        <v-btn
          color="blue"
          style="font-size: 0.7em; padding: 7px"
          @click="dialog = true"
        >
          Batalkan
        </v-btn>
        <!-- dialog untuk dibatalkan awal -->
        <v-dialog
          v-model="dialog"
          max-width="400"
          persistent
          :style="{ top: '30%', transform: 'translateY(-50%)' }"
        >
          <div class="text">
            <v-card>
              <v-card-title class="headline text-center">
                Konfirmasi Pembatalan Pesanan
              </v-card-title>

              <div class="d-flex justify-space-between w-100">
                <v-btn
                  color="primary"
                  style="
                    font-size: 0.7em;
                    padding: 7px;
                    margin-left: 25px;
                    margin-bottom: 10px;
                  "
                  @click="dialog = false"
                >
                  Batal
                </v-btn>
                <v-btn
                  color="primary"
                  style="
                    font-size: 0.7em;
                    padding: 7px;
                    margin-right: 25px;
                    margin-bottom: 10px;
                  "
                  @click="confirmCancellation"
                >
                  Konfirmasi
                </v-btn>
              </div>
            </v-card>
          </div>
        </v-dialog>
        <!-- dialog untuk dibatalka akhir -->
      </div>
      <div class="ml-auto">
        <v-btn
          color="blue"
          style="font-size: 0.7em; padding: 7px"
          @click="dialogsimpan = true"
        >
          Simpan
        </v-btn>
        <!-- Dialog untuk di simpan -->
        <v-dialog
          v-model="dialogsimpan"
          max-width="400"
          persistent
          :style="{ top: '30%', transform: 'translateY(-50%)' }"
        >
          <v-card>
            <v-card-title class="headline text-center">
              Jadwal berhasil di simpan!
            </v-card-title>

            <v-card class="d-flex justify-space-between w-100">
              <v-btn
                color="primary"
                style="
                  font-size: 0.7em;
                  padding: 7px;
                  margin-left: 25px;
                  margin-bottom: 10px;
                "
                @click="dialog = false"
              >
                Lihat
              </v-btn>
              <v-btn
                color="primary"
                style="
                  font-size: 0.7em;
                  padding: 7px;
                  margin-right: 25px;
                  margin-bottom: 10px;
                "
                @click="dialogkirimform = true"
              >
                Kirim
              </v-btn>
            </v-card>
          </v-card>
        </v-dialog>
        <!-- dialog untuk di simpan akhir -->

        <!-- Dialog untuk kirim form awal -->
        <v-dialog
          v-model="dialogkirimform"
          max-width="400"
          persistent
          :style="{ top: '30%', transform: 'translateY(-50%)' }"
        >
          <v-card>
            <v-card-title class="headline">
              Kirim form melalui:
            </v-card-title>
            <hr />
            <div style="margin-left: 18px">
              <p class="my-2">xxxxxxxxxxx@gmail.com</p>
            </div>
            <v-divider class="my-3"></v-divider>
            <div style="margin-left: 18px">
              <p class="my-2">0852xxxxxxxxxxx</p>
            </div>
            <v-divider class="my-3"></v-divider>
            <v-card class="d-flex justify-end w-100">
              <v-btn
                color="primary"
                style="
                  font-size: 0.7em;
                  padding: 7px;
                  margin-right: 25px;
                  margin-bottom: 10px;
                "
                @click="confirmCancellation"
              >
                Kirim
              </v-btn>
            </v-card>
          </v-card>
        </v-dialog>
        <!-- dialog untuk dikirim form akhir -->
      </div>
    </div>
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
      dialogsimpan: false,
      dialogkirimform: false,
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
      this.dialogsimpan = false;
      this.dialogkirimform = false;

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
