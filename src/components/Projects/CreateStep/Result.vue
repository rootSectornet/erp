<template>
  <div class="customer-section mx-4">
    <div class="d-flex justify-space-between">
      <TextWithIcon icon="mdi mdi-account" text="Customer" />
      <p><strong>Tedi Susanto</strong></p>
    </div>
    <v-divider class="my-3"></v-divider>
    <div class="d-flex justify-space-between">
      <TextWithIcon icon="mdi mdi-phone" text="Phone" />
      <p><strong>089693786637</strong></p>
    </div>
    <v-divider class="my-3"></v-divider>
    <div class="">
      <TextWithIcon icon="mdi mdi-phone" text="Address" />
      <p class="ml-4 pl-4">
        Jl. Kemang Raya Perumahan Kencana Loka BIntaro magar tika jaya no 14 |
        DEPOK
      </p>

      <v-divider class="my-5"></v-divider>
      <v-expansion-panels>
        <v-expansion-panel title="Produk yang di pesan">
          <v-expansion-panel-text>
            <v-list lines="one">
              <v-list-item
                title="Category"
                subtitle="Canopy yoyo "
              ></v-list-item>
              <v-list-item
                title="Nama Produk"
                subtitle="Canopy yoyo "
              ></v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel class="my-3" title="Material yang digunakan">
          <v-expansion-panel-text>
            <v-list lines="two">
              <v-list-item
                class="mx-1 pl-0 ml-0"
                key=""
                title=""
                variant="plain"
              >
                <template v-slot:subtitle>
                  <p class="">Besi Hole 2x5cm</p>
                  <p class="text-red">Rp 50.000 / meter + Rp 5.000</p>
                </template>
                <template v-slot:prepend> </template>
                <template v-slot:append>
                  <v-btn
                    color="blue-darken-4"
                    icon="mdi-information"
                    variant="text"
                    >2 METER</v-btn
                  >
                </template>
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="Tenaga Kerja">
          <v-expansion-panel-text>
            <v-list lines="one">
              <v-list-item
                title="Tukang nyemen"
              ></v-list-item>
              <v-list-item
                title="Tukang Palu"
              ></v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel title="Perhitungan total biaya" class="my-3">
          <v-expansion-panel-text>
            <v-list lines="one">
              <v-list-item
                title="120000+134444"
                subtitle="Total"
              ></v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-col cols="12" md="4" sm="6">
          <v-btn rounded="xs" size="x-large" color="blue-darken-4" block>Cetak</v-btn>
        </v-col>

      </v-expansion-panels>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  // Komponen Vue di sini
 
});
</script>
