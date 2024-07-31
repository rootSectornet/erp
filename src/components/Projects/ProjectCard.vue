<template>
    <v-card
      class="mx-auto"
      link
    >
      <div class="px-3 d-flex py-2 justify-space-between">
        <div class="">
          <p class="fs-14"><b>{{ project.projectNo }}</b></p>
          <p class="fs-12 text-muted"><i>{{ project.name }}</i></p>
        </div>
        <div>
          <v-menu
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ props }">
                <v-icon size="18" v-bind="props" icon="mdi-dots-vertical" class="mx-1"></v-icon>
              </template>

              <v-list>
                <v-list-item>
                  <v-list-item-title>Download</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </div>
      </div>
      <div class="d-flex py-3 px-2 justify-space-between text-primary">
        <TextWithIcon icon="mdi-cash" :text="`${toRupiah(project.amount)}`"/>
        <TextWithIcon icon="mdi-clock-time-seven-outline" :text="`${project.duration} days`"/>
      </div>
      <div class="d-flex px-2">
      </div>
      <v-divider></v-divider>
  
      <v-card-actions class="d-flex">
          <v-chip
            :color="ProjectStatusChip[project.type].color"
          >
            <TextWithIcon icon="mdi-clock-time-seven-outline" :text="`${moment(project.survey_date).format('LL')}`"/>
          </v-chip>
      </v-card-actions>
    </v-card>
  </template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {ProjectItem,ProjectStatusChip} from '../../models/project'
import {toRupiah} from '../../helpers/currency'
import {toCapitalized} from '../../helpers/helper'
import TextWithIcon from '../Atoms/TextWithIcon.vue';
import moment from 'moment';
export default defineComponent({
  props: {
    project: {
      type: {} as PropType<ProjectItem>,
      required: true
    }
  },
  components : {
    TextWithIcon
  },
  setup(){
    return {
      toRupiah,
      toCapitalized,
      ProjectStatusChip,
      moment
    }
  }
})
</script>