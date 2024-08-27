<template>
  <div v-if="projectReady" class="customer-section my-5 mx-4 project-detail">
    <div class="text-center mb-5">
      <h3 style="color: blue">Laporan Hasil Survey</h3>
    </div>
    <div class="mt-5 mb-3" justify="start">
      <h5>
        Nama Proyek: <span class="ms-3">{{ project.product.name }}</span>
      </h5>
      <h5>Tanggal Pengerjaan:</h5>
      <h5>
        Nama Pelanggan: <span class="ms-3">{{ project.customer.name }}</span>
      </h5>
      <h5>
        Alamat Pelanggan:
        <span class="ms-3">{{ project.customer.address }}</span>
      </h5>
      <h5>
        Nomor Telepon Pelanggan:
        <span class="ms-3">{{ project.customer.phone }}</span>
      </h5>
    </div>
    <hr />
    <!-- Material -->
    <h5 class="mt-3 mb-2">Material yang digunakan</h5>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama Material</th>
          <th>Jumlah</th>
          <th>Satuan</th>
          <th>Biaya Persatuan</th>
          <th>Total Biaya Material</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(material, index) in project.material_names"
          :key="material.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ material.name }}</td>
          <td>{{ material.qty }}</td>
          <td>{{ material.unit }}</td>
          <td>{{ material.price }}</td>
          <td>{{ material.qty * material.price }}</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>{{ totalBiayaMaterial }}</td>
        </tr>
      </tbody>
    </table>

    <hr />

    <!-- Tenaga Kerja -->
    <h5 class="mt-3 mb-2">Tenaga Kerja</h5>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Posisi</th>
          <th>Langkah Pekerjaan</th>
          <th>Jumlah Pekerja</th>
          <th>Biaya Perhari</th>
          <th>Total Biaya Tenaga Kerja</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Semen</td>
          <td>10</td>
          <td>sak</td>
          <td>50000</td>
          <td>500000</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>[Total]</td>
        </tr>
        <!-- Tambahkan baris lain sesuai kebutuhan -->
      </tbody>
    </table>
    <hr />

    <!-- Total Biaya -->
    <h5 class="mt-3 mb-2">Total Biaya</h5>
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Komponen Biaya</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Biaya Material</td>
          <td>{{ totalBiayaMaterial }}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Biaya Tenaga Kerja</td>
          <td></td>
        </tr>
        <tr>
          <td>3</td>
          <td>Biaya Transport</td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>[Total Biaya Keseluruhan]</td>
        </tr>
        <!-- Tambahkan baris lain sesuai kebutuhan -->
      </tbody>
    </table>
    <div class="d-flex justify-content-between mt-5">
      <!-- Tombol untuk mengunduh PDF -->
      <v-btn class="downloadButton" color="primary" @click="downloadPDF"
        ><h5>Download PDF</h5></v-btn
      >
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import TextWithIcon from "../Atoms/TextWithIcon.vue";
import html2pdf from "html2pdf.js";
import { ProjectItem } from "../../models/project";

export default defineComponent({
  components: {
    TextWithIcon,
  },
  setup() {
    const route = useRoute();
    const project = ref<ProjectItem | null>(null);
    const projectReady = ref(false);

    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/projects/${route.params.projectNo}`
        );
        project.value = response.data.data.data; // Access the 'data.data' object
        projectReady.value = true;
        console.log("Project Data:", project.value); // Logging project data
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    watch(
      () => project.value,
      (newProject) => {
        if (newProject && Object.keys(newProject).length > 0) {
          projectReady.value = true;
        }
      },
      { immediate: true }
    );

    const totalBiayaMaterial = computed(() => {
      if (!project.value) return 0;
      return project.value.material_names.reduce((total, material) => {
        return total + (material.qty * material.price);
      }, 0);
    });

    const downloadPDF = async () => {
      if (!projectReady.value || !project.value) {
        console.error("Project data is not ready");
        return;
      }
      const element = document.querySelector(".project-detail");
      if (!element) {
        console.error("ProjectDetail element not found");
        return;
      }

      // Sembunyikan tombol download
      // Tambahkan kelas untuk menyembunyikan tombol unduh
      const downloadButton = element.querySelector(".downloadButton");
      if (downloadButton) {
        downloadButton.classList.add("hidden");
      }

      const customerName = project.value.customer.name.replace(/\s+/g, "_");

      const opt = {
        margin: 1,
        filename: `${customerName}_project_${Date.now()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Menunggu sebentar sebelum mengunduh PDF
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Mengunduh PDF
      await html2pdf().from(element).set(opt).save();

      // Tampilkan kembali tombol download
      if (downloadButton) {
        downloadButton.style.display = "flex"; // Atur kembali ke tampilan flex
      }
    };

    onMounted(() => {
      fetchProject();
    });

    return {
      project,
      projectReady,
      downloadPDF,
      totalBiayaMaterial,
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
table {
  width: 100%;
  border-collapse: collapse;
  font-size: x-small;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #f1f1f1;
}
h5 {
  font-size: x-small;
}
hr {
  border: none; /* Menghilangkan border default */
  height: 1px; /* Mengatur tinggi garis */
  background-color: #ccc; /* Mengatur warna garis */
  margin-top: 15px;
}

/* Sembunyikan tombol download saat mencetak */
.hidden {
  display: none;
}
</style>
