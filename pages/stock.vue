<template>
  <!-- <h1>{{ head.title }}</h1> -->
  <v-container>
    <v-row>
      <v-col cols="12" md="2" v-for="(stock, i) in stockData" :key="i">
        <v-card height="150" tile>
          <v-card-title>{{ stock.symbol }}</v-card-title>
          <v-divider light></v-divider>
          <v-card-text class="headline font-weight-bold red--text">{{ stock.price }} ({{stock.chg_percent}})</v-card-text>
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
    stockData: [],
  }),
  created: function () {
    // `this` points to the vm instance
    // this.stockList = stockData.stockList;
  },
  methods: {
  },
  //不知道為啥小post一直call不過去  先暫時用get
   mounted () {
    axios
      .get(`https://fcsapi.com/api-v2/stock/latest?access_key=${access_key}&symbol=${symbolList.join()}`)
      .then(response => {
        console.log(response.data)
        if(response.data.msg == "Successfully"){
            //因為會回傳墨西哥的資料  所以需要先filter
            this.stockData = response.data.response.filter(stock => stock.country == 'united-states');
            console.log(this.stockData);
        }   
    });
  }
};

const access_key='EW4ByaDKhCt5hVSjgIVtyc0C1NJTleIGpAnwIlHKLWyc2nFATj';

const symbolList = [ "NKE", "ORCL", "WORK", "PTON", "SNE",  "WMT",  "CRM",  "LMT",  "VFC",  "ASML", 
  "GPRO", "DIS",  "COST", "AMZN", "FB",  "ZM",  "SPOT", "NVDA", "INTC", "AMD",
  "BRK-B", "GOOG", "AAPL", "UBER","TSM", "UMC", "MU", "TSLA","NFLX"];

</script>

<style lang="scss" scoped>
</style>
