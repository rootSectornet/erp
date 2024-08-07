<template>
  <v-card @click="$emit('click')" class="d-flex flex-column mb-3">
    <div class="d-flex flex-row justify-space-between px-3 py-2">
      <div>
        <p class="fs-14">
          <b>{{ project.projectNo }}</b>
        </p>
        <p class="fs-12 text-muted">
          <i>{{ project.name }}</i>
        </p>
      </div>
      <div>
        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-icon
              size="18"
              v-bind="props"
              icon="mdi-dots-vertical"
              class="mx-1"
            ></v-icon>
          </template>
          <v-list>
            <router-link :to="{ name: 'UnduhPdf', params: { projectNo: project.projectNo } }" class="text-decoration-none">
              <v-list-item>
                <v-list-item-title class="text-primary">Download</v-list-item-title>
              </v-list-item>
            </router-link>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="d-flex py-3 px-2 justify-space-between text-primary">
      <TextWithIcon icon="mdi-cash" :text="toRupiah(project.amount)" />
      <TextWithIcon
        icon="mdi-clock-time-seven-outline"
        :text="`${project.duration} days`"
      />
    </div>
    <v-divider></v-divider>
    <v-card-actions class="d-flex">
      <v-chip :color="ProjectStatusChip[project.type].color">
        <TextWithIcon
          icon="mdi-clock-time-seven-outline"
          :text="moment(project.survey_date).format('LL')"
        />
      </v-chip>
    </v-card-actions>

    <!-- Tempatkan ProjectDetail di sini untuk render saat mengunduh PDF -->
    <div ref="projectDetailRef" style="display: none;">
      <ProjectDetail :project="project" />
    </div>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, nextTick } from "vue";
import { ProjectItem, ProjectStatusChip } from "../../models/project";
import { toRupiah } from "../../helpers/currency";
import TextWithIcon from "../Atoms/TextWithIcon.vue";
import moment from "moment";
import ProjectDetail from "@/components/Projects/ProjectDetail.vue";

export default defineComponent({
  name: "ProjectCard",
  props: {
    project: {
      type: Object as PropType<ProjectItem>,
      required: true,
    },
  },
  components: {
    TextWithIcon,
    ProjectDetail,
  },
  setup(props) {
    const projectDetailRef = ref(null);

    // Fungsi untuk mengunduh PDF
    const downloadPDF = async () => {
      await nextTick(); // Tunggu sampai render selesai
      const element = projectDetailRef.value;
      if (!element) {
        console.error("ProjectDetail element not found");
        return;
      }

      // Logging the project data and element
      console.log("Project Data in ProjectDetail:", props.project);
      console.log("Element for PDF:", element.innerHTML);

      const opt = {
        margin: 1,
        filename: `project_${Date.now()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Tambahkan penundaan sementara
      setTimeout(() => {
        html2pdf().from(element).set(opt).save();
      }, 2000); // Penundaan 2 detik
    };

    return {
      toRupiah,
      ProjectStatusChip,
      moment,
      projectDetailRef,
      downloadPDF,
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

</style>
