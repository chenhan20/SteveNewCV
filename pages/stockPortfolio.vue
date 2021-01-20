<template>
  <!-- <h1>{{ head.title }}</h1> -->
  <v-container>
    <p class="text-xl-h6 text-center">Steve Stock Portfolios</p>
    <v-col
      class="ma-0 pa-0"
      cols="12"
      xl="3"
      md="4"
      v-for="(stock, i) in portfolioList"
      :key="i">
        <v-card
          class="d-inline-flex pa-3"
          outlined
          tile
        >
          <div>{{stock}}</div>
        </v-card>
      </v-col>
  </v-container>
</template>

<script>
import { createStore } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    head: {
      title: "StockPortfolio",
    },
    portfolioList: [],
  }),
  created: function () {
    axios
      .get(`/stock/getPortfolio`)
      .then((response) => {
        if (response.status === 200) {
          this.portfolioList = response.data.symbolList;
        }
      })
      .catch(() => {});
    // `this` points to the vm instance
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
</style>
