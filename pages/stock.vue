<template>
  <!-- <h1>{{ head.title }}</h1> -->
  <v-container>
    <v-row>
      <v-col cols="12" md="2" v-for="(stock, i) in stockList" :key="i">
        <v-card height="150" tile>
          <v-card-title>{{ stock.name }}</v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="headline font-weight-bold red--text">{{ stock.price }} (0.00%)</v-card-text>
        </v-card>
      </v-col>
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
    stockList: [],
  }),
  created: function () {
    // `this` points to the vm instance
    console.log("a is: ");
    this.stockList = stockData.stockList;
  },
  methods: {
    getStock: function (event) {},
  },
   mounted () {
    axios
      .post('https://fcsapi.com/api-v2/stock/latest', getStockData)
      .then(response => (console.log(response)))
  }
};

const access_key='';

const getStockData = {
  symbol:[
    'NKE','AAPL'
  ],
  access_key:'',
}

const stockData = {
  stockList: [
    { name: "NKE", price: 129.27 },
    { name: "ORCL", price: 61.11 },
    { name: "WORK", price: 32.57 },
    { name: "PTON", price: 131.74 },
    { name: "SNE", price: 74.36  },
    { name: "WMT", price: 145.7 },
    { name: "CRM", price: 268.74 },
    { name: "LMT", price: 389.43 },
    { name: "VFC", price: 76.26 },
    { name: "ASML", price: 404.81 },
    { name: "GPRO", price: 6.77 },
    { name: "DIS", price: 128.11 },
    { name: "COST", price: 381.04 },
    { name: "AMZN", price: 3454.5 },
    { name: "FB", price: 277.78 },
    { name: "ZM", price: 509.1 },
    { name: "SPOT", price: 264.32 },
    { name: "NVDA", price: 572.68 },
    { name: "INTC", price: 54.37 },
    { name: "AMD", price: 84.96 },
    { name: "BRK-B", price: 210.97 },
    { name: "GOOG", price: 1581.04 },
    { name: "AAPL", price: 121.76 },
    { name: "UBER", price: 35.84 },
    { name: "TSM", price: 89.31 },
    { name: "UMC", price: 5.55 },
    { name: "MU", price: 52.03 },
    { name: "TSLA", price: 456.33 },
    { name: "NFLX", price: 568.41 },
  ],
};
</script>

<style lang="scss" scoped>
</style>
