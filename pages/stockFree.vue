<template>
  <!-- <h1>{{ head.title }}</h1> -->
  <v-container>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>
import { createStore } from "vuex";
import axios from 'axios'

export default {
  data: () => ({
    head: {
      title: "STOCK",
    },
    stockData: [],
  }),
  created: function () {
  },
  methods: {
  },
   mounted () {
  }
};

const symbolList = [ "NKE", "ORCL", "WORK", "PTON", "SNE",  "WMT",  "CRM",  "LMT",  "VFC",  "ASML", 
  "GPRO", "DIS",  "COST", "AMZN", "FB",  "ZM",  "SPOT", "NVDA", "INTC", "AMD",
  "BRK-B", "GOOG", "AAPL", "UBER","TSM", "UMC", "MU", "TSLA","NFLX"];

</script>

<style lang="scss" scoped>
</style>
