// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";

// Additional Routes
const customRoutes = [
  {
    path: "/projects/:projectNo",
    name: "ProjectDetail",
    component: () => import("../components/Projects/ProjectDetail.vue"), // Pastikan jalur ini benar
    props: true,
  },
  {
    path: "/negosiasi",
    name: "Negosiasi",
    component: () => import("../components/Projects/Negosiasi.vue"), // Tambahkan rute ini
    props: true,
  },
  {
    path: "/project/:projectNo/unduh",
    name: "UnduhPdf",
    component: () => import("../components/Projects/UnduhPdf.vue"), // Tambahkan rute ini
    props: true,
  },
  {
    path: "/project/:projectNo/EstimasiDetail",
    name: "EstimasiDetail",
    component: () => import("../components/Projects/EstimasiDetail.vue"), // Tambahkan rute ini
    props: true,
  },
  {
    path: "/edit-project/:projectNo",
    name: "EditProjectDetail",
    component: () => import("../components/Projects/EditProjectDetail.vue"), // Tambahkan rute ini
    props: true,
  },
  {
    path: "/jadwal",
    name: "Jadwal",
    component: () => import("../components/Projects/Jadwal.vue"), // Tambahkan rute ini
    props: true,
  },
  {
    path: "/HasilJadwal",
    name: "HasilJadwal",
    component: () => import("../components/Projects/HasilJadwal.vue"), // Tambahkan rute ini
    props: true,
  },
  {
    path: '/project/waiting-survey/create',
    name: 'CreateWaitingSurvey',
    component: () => import("../components/Projects/Create.vue"), // Tambahkan rute ini
    props: true,
  },
  {
    path: '/project/estimasi/create',
    name: 'CreateEstimasi',
    component: () => import("../components/Projects/createEstimasi.vue"), // Tambahkan rute ini
    props: true,
  }
  

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routesArray) => {
    return setupLayouts([...routesArray, ...customRoutes]);
  },
});

export default router;
