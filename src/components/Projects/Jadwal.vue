<template>
  <v-row class="justify-center">
    <v-col cols="11">
      <div style="font-size: 1.5em; font-weight: 500;" class="text-center my-5">Buat Jadwal</div>
      <v-card>
        <v-date-picker
          v-model="date1"
          prepend-icon="$calendar"
          variant="solo"
          class="w-100 hide-default-content"
        ></v-date-picker>
        <div class="d-flex justify-space-between">
          <v-btn
            class="ml-5 mb-3"
            :class="{ selected: selectedTime === '10.00' }"
            @click="selectTime('10.00')"
            >10.00</v-btn
          >
          <v-btn
            class="mb-3"
            :class="{ selected: selectedTime === '13.00' }"
            @click="selectTime('13.00')"
            >13.00</v-btn
          >
          <v-btn
            class="mr-5 mb-3"
            :class="{ selected: selectedTime === '15.00' }"
            @click="selectTime('15.00')"
            >15.00</v-btn
          >
        </div>
      </v-card>
      <v-card class="mt-3">
        <div class="my-5 mx-5">
          <p>{{ formattedDate }}</p>
          <div class="d-flex justify-space-between">
            <p>{{ selectedTime }}</p>
            <v-btn color="primary" class="primary">Konfirmasi</v-btn>
          </div>
        </div>
      </v-card>

      <v-card class="text-center grey">
        <p v-if="formattedDate" class="my-3">Jadwal Telah Dibuat</p>
        <p v-else>
          Waktu tidak tersedia! <br />
          Silahkan pilih tanggal/jam lain
        </p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      selectedTime: null, // Waktu yang dipilih, defaultnya null
      date1: null, // Variabel untuk menyimpan nilai tanggal yang dipilih
      formattedDate: "", // Variabel untuk menyimpan tanggal yang diformat
    };
  },
  watch: {
    date1(newDate) {
      this.formattedDate = this.formatDate(newDate); // Panggil metode untuk memformat tanggal setiap kali nilai berubah
    },
  },
  methods: {
    selectTime(time: string) {
      this.selectedTime = time;
    },
    formatDate(date) {
      if (!date) return "";
      const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ];
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      const d = new Date(date);
      const dayName = days[d.getDay()];
      const day = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();
      return `${dayName}, ${day} ${month} ${year}`;
    },
  },
});
</script>

<style scoped>
.v-date-picker {
  width: 100% !important;
}
.selected {
  background-color: blue !important;
  color: white !important;
}
.grey {
  background-color: rgb(126, 122, 117);
  color: white;
  margin-top: 80px;
}
</style>
