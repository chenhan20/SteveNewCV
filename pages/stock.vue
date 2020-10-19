<template>
  <!-- <h1>{{ head.title }}</h1> -->
  <v-container>
    <v-row>
      <v-col cols="12" md="2" v-for="(stock, i) in stockData" :key="i">
        <v-card height="100" class="ma-3" tile>
          <v-card-title>{{ stock.symbol }}</v-card-title>
          <v-divider light></v-divider>
          <v-alert
            :value="true"
            :type="`${stock.chg.indexOf('+') != -1 ? 'green' : 'red'} `"
            elevation="3"
            class="ma-0"
          >
           {{ stock.price }} 
            <v-chip
              :color="`lighten-4`"
              class="ml-6 right"
              label
            >
            {{stock.chg}}
            </v-chip>
          </v-alert>
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
    // this.stockData = testData.response.filter(stock => stock.country == 'united-states');
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

// const testData = {"status":true,"code":200,"msg":"Successfully","response":[{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"119.19","high":"120.41","low":"118.80","chg":"+0.17","chg_percent":"0.14%","dateTime":"2020-10-19 14:21:08","symbol":"AAPL","country":"united-states","id":"15"},{"price":"83.33","high":"84.65","low":"82.93","chg":"+0.16","chg_percent":"0.19%","dateTime":"2020-10-19 14:21:17","symbol":"AMD","country":"united-states","id":"85"},{"price":"70.03","high":"70.03","low":"70.03","chg":"-1.65","chg_percent":"-2.3%","dateTime":"2020-10-05 06:00:00","symbol":"AMD","country":"germany","id":"113650"},{"price":"264.27","high":"268.50","low":"263.69","chg":"-1.66","chg_percent":"-0.62%","dateTime":"2020-10-19 14:20:43","symbol":"FB","country":"united-states","id":"112"},{"price":"4659.00","high":"4680.00","low":"4652.00","chg":"-1.11","chg_percent":"-0.02%","dateTime":"2020-10-19 14:03:10","symbol":"MSFT","country":"mexico","id":"120849"},{"price":"2520.00","high":"2533.00","low":"2515.07","chg":"-0.17","chg_percent":"-0.01%","dateTime":"2020-10-19 14:03:13","symbol":"AAPL","country":"mexico","id":"107838"},{"price":"5631.00","high":"5749.00","low":"5607.27","chg":"0.00","chg_percent":"0%","dateTime":"2020-10-16 19:59:55","symbol":"FB","country":"mexico","id":"120927"},{"price":"193.53","high":"193.53","low":"193.15","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"AAPL","country":"switzerland","id":"113976"},{"price":"29.00","high":"29.00","low":"29.00","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"AMD","country":"switzerland","id":"113990"},{"price":"185.26","high":"185.82","low":"185.26","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"FB","country":"switzerland","id":"114064"},{"price":"130.56","high":"130.56","low":"130.56","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"MSFT","country":"switzerland","id":"114126"},{"price":"1780.00","high":"1780.00","low":"1753.00","chg":"+13.44","chg_percent":"0.76%","dateTime":"2020-10-19 14:03:10","symbol":"AMD","country":"mexico","id":"120940"},{"price":"1760.000","high":"1760.000","low":"1760.000","chg":"-1.250","chg_percent":"-0.07%","dateTime":"2020-10-19 16:00:00","symbol":"AMD","country":"mexico","id":"121237"}],"info":{"server_time":"2020-10-19 14:29:34 UTC","credit_count":1}}

</script>

<style lang="scss" scoped>
</style>
