<template>
  <v-container>
    <p class="text-sm-h3 text-h4 text-center">My Stockwatchlist</p>
    <v-row>
      <v-flex xs12 sm6 d-flex>
        <v-select
          v-model="selectSymbolList"
          :items="defaultSymbolList"
          label="Watch List"
          multiple
          chips
        >
          <template v-slot:selection="{ item, index }">
            <v-chip v-if="index <= 7">
              <span>{{ item }}</span>
            </v-chip>
            <span
              v-if="index === 7"
              class="grey--text caption"
            >(+{{ selectSymbolList.length - 7 }} others)</span>
          </template>
        </v-select>
      </v-flex>
      <v-flex xs12 sm6 class="pa-3">
        <v-row>
          <v-flex sm2 xs4>
            <v-btn class="ma-5" @:click="reloadStockData" color="success" fab>
              <v-icon>mdi-reload</v-icon>
            </v-btn>
          </v-flex>
          <v-flex sm10 xs8>
            <v-switch inset class="ma-5 pa-4"  color="pink lighten-1" v-model="useTestData">
              <template v-slot:label>
                <span class="text-sm-h5 font-weight-black pink--text">
                  {{useTestData ? '使用測試資料': '使用API取得資料'}}
                </span>
              </template>
            </v-switch>
          </v-flex>
        </v-row>
      </v-flex>
    </v-row>
    <v-row>
      <v-col class="ma-0 pa-0" cols="12" xl="3" md="4" v-for="(stock, i) in stockData" :key="i">
        <v-card class="" >
          <!-- <v-card-title class="headline font-weight-black">{{
            stock.symbol
          }}
          </v-card-title> -->
            <v-alert
              dark
              class="ma-1 pa-0 font-weight-black"
            >
            <v-row class="pa-0 ma-0">
              <v-col class="text-left ma-0 pa-4" cols='4' sm='4' xs='4'>
                <p class="headline font-weight-black">{{
                  stock.symbol
                }}
                </p>
              </v-col>
              <v-col class="text-center pa-0" cols='4' sm='4' xs='4'>
                <v-chip class="ma-1 headline" label large>
                  {{ stock.price }}
                </v-chip>
              </v-col>
              <v-col class="text-center pa-0" cols='4' sm='4' xs='4'>
                <v-chip
                  :color="`${getStockColor(stock.chg)} `"
                  v-on:click="showPercent = !showPercent"
                  class="ma-1 headline"
                  label
                  large
                >
                  {{
                    showPercent
                      ? converter(stock.chg_percent)
                      : converter(stock.chg)
                  }}
                </v-chip>
              </v-col>
            </v-row>
            </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>



<script>
import { createStore } from "vuex";
import axios from 'axios';

export default {
  data: () => ({
    head: {
      title: "STOCK",
    },
    stockData: [],
    selectSymbolList : defaultSymbolList,
    defaultSymbolList : defaultSymbolList,
    showPercent: true,
    useTestData: true
  }),
  created: function () {
    // `this` points to the vm instance
  },
  methods: {
    converter : function(stockchangeNum) {
      const parseNum = parseFloat(stockchangeNum);
      let converterNum = stockchangeNum;
      if(parseNum > 0 && stockchangeNum.indexOf("+") == -1){
        converterNum= '+' + stockchangeNum;
      }
      return converterNum;
    },
    getStockColor :function (chg){
      let color = "";
      if(chg.indexOf("+") != -1){
        color='green';
      }else if(chg.indexOf("-") != -1){
        color='red';
      } else{
        color = '#555555';
      }
      return color;
    },
    reloadStockData : function() {
      if(this.useTestData){
        console.log('testData')
        this.stockData = testData.response.filter(stock => stock.country == 'united-states');
      }else{
        console.log('realData')
       axios
         .get(`https://fcsapi.com/api-v2/stock/latest?access_key=${access_key}&symbol=${this.selectSymbolList.join()}`)
         .then(response => {
           console.log(response.data)
           if(response.data.msg == "Successfully"){
               //因為會回傳墨西哥的資料  所以需要先filter
               this.stockData = response.data.response.filter(stock => stock.country == 'united-states');
               console.log(this.stockData);
           }   
       });
      }
    }
  },
  //不知道為啥小post一直call不過去  先暫時用get
   mounted () {
     this.reloadStockData();
  }
};

const access_key='EW4ByaDKhCt5hVSjgIVtyc0C1NJTleIGpAnwIlHKLWyc2nFATj';
const defaultSymbolList = [ "NKE", "ORCL", "WORK", "PTON", "SNE",  "WMT",  "CRM",  "LMT",  "VFC",  "ASML", 
  "GPRO", "DIS",  "COST", "AMZN", "FB",  "ZM",  "SPOT", "NVDA", "INTC", "AMD",
  "BRK-B", "GOOG", "AAPL", "UBER","TSM", "UMC", "MU", "TSLA","NFLX"];
const testData = {"status":true,"code":200,"msg":"Successfully","response":[{"price":"219.87","high":"222.30","low":"219.70","chg":"0.00","chg_percent":"0.0%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"219.87","high":"222.30","low":"219.70","chg":"+0.21","chg_percent":"0.1%","dateTime":"2020-10-19 14:21:00","symbol":"MSFT","country":"united-states","id":"5"},{"price":"119.19","high":"120.41","low":"118.80","chg":"+0.17","chg_percent":"0.14%","dateTime":"2020-10-19 14:21:08","symbol":"AAPL","country":"united-states","id":"15"},{"price":"83.33","high":"84.65","low":"82.93","chg":"+0.16","chg_percent":"0.19%","dateTime":"2020-10-19 14:21:17","symbol":"AMD","country":"united-states","id":"85"},{"price":"70.03","high":"70.03","low":"70.03","chg":"-1.65","chg_percent":"-2.3%","dateTime":"2020-10-05 06:00:00","symbol":"AMD","country":"germany","id":"113650"},{"price":"264.27","high":"268.50","low":"263.69","chg":"-1.66","chg_percent":"-0.62%","dateTime":"2020-10-19 14:20:43","symbol":"FB","country":"united-states","id":"112"},{"price":"4659.00","high":"4680.00","low":"4652.00","chg":"-1.11","chg_percent":"-0.02%","dateTime":"2020-10-19 14:03:10","symbol":"MSFT","country":"mexico","id":"120849"},{"price":"2520.00","high":"2533.00","low":"2515.07","chg":"-0.17","chg_percent":"-0.01%","dateTime":"2020-10-19 14:03:13","symbol":"AAPL","country":"mexico","id":"107838"},{"price":"5631.00","high":"5749.00","low":"5607.27","chg":"0.00","chg_percent":"0%","dateTime":"2020-10-16 19:59:55","symbol":"FB","country":"mexico","id":"120927"},{"price":"193.53","high":"193.53","low":"193.15","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"AAPL","country":"switzerland","id":"113976"},{"price":"29.00","high":"29.00","low":"29.00","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"AMD","country":"switzerland","id":"113990"},{"price":"185.26","high":"185.82","low":"185.26","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"FB","country":"switzerland","id":"114064"},{"price":"130.56","high":"130.56","low":"130.56","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"MSFT","country":"switzerland","id":"114126"},{"price":"1780.00","high":"1780.00","low":"1753.00","chg":"+13.44","chg_percent":"0.76%","dateTime":"2020-10-19 14:03:10","symbol":"AMD","country":"mexico","id":"120940"},{"price":"1760.000","high":"1760.000","low":"1760.000","chg":"-1.250","chg_percent":"-0.07%","dateTime":"2020-10-19 16:00:00","symbol":"AMD","country":"mexico","id":"121237"}],"info":{"server_time":"2020-10-19 14:29:34 UTC","credit_count":1}}

</script>

<style lang="scss" scoped>
.switch_label {
   color: black
}
</style>
