<template>
  <div class="my-5 mx-4">
    <div class="text-center mb-5">
      <h3>NEGOSIASI</h3>
      <h4>Perkiraan Biaya Proyek</h4>
    </div>
    <v-card class="pa-5 my-3">
      <!-- Daftar Biaya Material awal -->
      <div class="mb-2">
        <div class="d-flex justify-space-between">
          <h5>Total Biaya Material</h5>
          <v-list-item-title class="color-green">+Rp.0000</v-list-item-title>
        </div>
      </div>
      <v-divider class="my-5"></v-divider>
      <!-- Daftar Biaya Material akhir -->

      <!-- Daftar Biaya Karyawan awal -->
      <div class="mb-2">
        <div class="d-flex justify-space-between">
          <h5>Biaya Karyawan</h5>
          <v-list-item-title class="color-green">+Rp.0000</v-list-item-title>
        </div>
      </div>
      <v-divider class="my-5"></v-divider>
      <!-- Daftar Biaya Karyawan akhir -->

      <!-- Daftar Biaya Transport awal -->
      <div class="mb-2">
        <div class="d-flex justify-space-between">
          <h5>Biaya Transport</h5>
          <v-list-item-title class="color-green">+Rp.0000</v-list-item-title>
        </div>
      </div>
      <v-divider class="my-5"></v-divider>
      <!-- Daftar Biaya Transport akhir -->

      <!-- Daftar Biaya Proyek awal -->
      <div class="">
        <div class="d-flex justify-space-between">
          <h5>Total Modal Proyek</h5>
          <v-list-item-title class="color-green">+Rp.0000</v-list-item-title>
        </div>
      </div>
      <!-- Daftar Biaya Proyek akhir -->
    </v-card>


    <!-- Laba awal -->
    <div class="mb-2">
      <h3>Perkiraan laba</h3>
    </div>
    <!-- Laba akhir -->
    <v-card class="pa-5 my-3">
      <!-- Laba Perhari awal -->
      <div class="mb-2">
        <div class="d-flex justify-space-between">
          <h5>Laba Perhari</h5>
          <v-list-item-title class="color-green">+Rp.0000</v-list-item-title>
        </div>
      </div>
      <v-divider class="my-5"></v-divider>
      <!-- Laba Perhari akhir -->

      <!-- Duarasi awal -->
      <div class="mb-2">
        <div class="d-flex justify-space-between">
          <h5>Durasi Pengerjaan</h5>
          <v-list-item-title class="color-green">3 hari</v-list-item-title>
        </div>
      </div>
      <v-divider class="my-5"></v-divider>
      <!-- Duarasi akhir -->

      <!-- Keuntungan awal -->
      <div class="mb-2">
        <div class="d-flex justify-space-between">
          <h5>Kustom Keuntungan</h5>
          <v-list-item-title class="color-green">+Rp.0000</v-list-item-title>
        </div>
      </div>
      <v-divider class="my-5"></v-divider>
      <!-- Keuntungan akhir -->

      <!-- Biaya Proyek awal -->
      <div class="">
        <div class="d-flex justify-space-between">
          <h5>Total Biaya Proyek</h5>
          <v-list-item-title class="color-green">+Rp.0000</v-list-item-title>
        </div>
      </div>
      <v-divider class="my-5"></v-divider>
      <!-- Biaya Proyek akhir -->
      <!-- Pengajuan harga awal -->
      <div class="">
        <div class="d-flex justify-space-between">
          <h5>Harga yang diajukan</h5>
          <v-list-item-title class="color-green">+Rp.0000</v-list-item-title>
        </div>
      </div>
      <!-- Pengajuan harga akhir -->
    </v-card>

    <!--  -->
    <v-card class="pa-5 my-3">
      <!-- Duarasi awal -->
      <div class="mb-2">
        <div class="d-flex justify-space-between">
          <h5>Durasi Pengerjaan</h5>
          <v-list-item-title class="color-green">3 hari</v-list-item-title>
        </div>
      </div>
      <v-divider class="my-5"></v-divider>
      <div class="d-flex justify-content-between mt-5">
        <v-btn color="blue" class="mr-auto">Edit</v-btn>
        <v-btn color="blue" class="ml-auto">Simpan</v-btn>
      </div>
      <!-- Duarasi akhir -->

      
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      materials: [
        { name: "Besi Holo 2x5cm", price: 50000, unit: "meter" },
        { name: "Pasir 1 Truk", price: 750000, unit: "truk" },
      ],
      workers: [
        { name: "Tukang Batu", cost: 100000 },
        { name: "Tukang Kayu", cost: 120000 },
      ],
      transports: [
        { name: "Biaya Transportasi Material", cost: 150000 },
        { name: "Biaya Transportasi Alat", cost: 100000 },
      ],
      totalCost: 0,
    };
  },
  computed: {
    calculateTotalCost() {
      let materialCost = this.materials.reduce(
        (sum, item) => sum + item.price,
        0
      );
      let workerCost = this.workers.reduce((sum, item) => sum + item.cost, 0);
      let transportCost = this.transports.reduce(
        (sum, item) => sum + item.cost,
        0
      );
      return materialCost + workerCost + transportCost;
    },
  },
  methods: {
    editMaterial(material) {
      // Implementasikan logika edit material di sini
    },
    editWorker(worker) {
      // Implementasikan logika edit pekerja di sini
    },
    editTransport(transport) {
      // Implementasikan logika edit transportasi di sini
    },
  },
  mounted() {
    this.totalCost = this.calculateTotalCost;
  },
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.mb-4 {
  margin-bottom: 1.5rem;
}
.my-5 {
  margin: 3rem 0;
}
.color-green {
  color: green;
}
</style>
