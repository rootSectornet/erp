// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

// Additional Routes
const customRoutes = [
  {
    path: '/projects/:projectNo',
    name: 'ProjectDetail',
    component: () => import('../components/Projects/ProjectDetail.vue'), // Pastikan jalur ini benar
    props: true
  },
  {
    path: '/negosiasi',
    name: 'Negosiasi',
    component: () => import('../components/Projects/Negosiasi.vue'), // Tambahkan rute ini
    props: true
  },
  {
    path: '/project/:projectNo/unduh',
    name: 'UnduhPdf',
    component: () => import('../components/Projects/UnduhPdf.vue'), // Tambahkan rute ini
    props: true
  },
  {
    path: '/edit-project/:projectNo',
    name: 'EditProjectDetail',
    component: () => import('../components/Projects/EditProjectDetail.vue'), // Tambahkan rute ini
    props: true
  }
  
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: (routesArray) => {
    return setupLayouts([...routesArray, ...customRoutes])
  },
})

export default router
