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


</script>

<style lang="scss" scoped>
</style>
