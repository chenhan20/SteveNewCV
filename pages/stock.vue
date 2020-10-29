<template>
  <v-container>
    <p class="text-sm-h3 text-h4 text-center">Steve Stock Portfolios</p>
    <v-card dark class="pa-5 my-5 grey darken-2" elevation="2" outlined shaped>
      <v-card-title>
        <v-icon left> mdi-wrench-outline </v-icon>
        <span class="title font-weight-light">Setting</span>
      </v-card-title>
      <v-card-actions>
        <v-row>
          <v-flex xs12 sm5>
            <v-select
              v-model="selectSymbolList"
              :items="defaultSymbolList"
              label="Watch List"
              multiple
              chips
            >
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index <= 4">
                  <span>{{ item }}</span>
                </v-chip>
                <span v-if="index === 4" class="caption"
                  >(+{{ selectSymbolList.length - 4 }} others)</span
                >
              </template>
            </v-select>
          </v-flex>
          <v-flex xs12 sm3 class="mx-6">
            <v-switch inset class="ma-5" color="" v-model="useTestData">
              <template v-slot:label>
                <span class="text-sm-h5 text-h5 font-weight-black">
                  {{ useTestData ? "使用測試資料" : "使用API取得資料" }}
                </span>
              </template>
            </v-switch>
          </v-flex>
          <v-flex xs12 sm3 class="text-right">
            <v-btn class="my-4" @click="reloadStockData" fab>
              <v-icon>mdi-reload</v-icon>
            </v-btn>
            <v-btn-toggle
              center
              mandatory
              v-model="showTypeToggle"
              borderless
              class=""
            >
              <v-btn value="Table">
                <span class="hidden--and-down">Table</span>
                <v-icon right> mdi-format-align-left </v-icon>
              </v-btn>
              <v-btn value="Block">
                <span class="hidden--and-down">Block</span>
                <v-icon right> mdi-table </v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-flex>
        </v-row>
      </v-card-actions>
    </v-card>
    <v-slide-x-reverse-transition hide-on-leave>
      <v-data-table
        :headers="tableHeaders"
        :items="stockData"
        :items-per-page="15"
        v-show="showTypeToggle == 'Table'"
        dark
      >
        <template>
        </template>
      </v-data-table>
    </v-slide-x-reverse-transition>
    <v-slide-y-transition hide-on-leave>
      <v-row v-show="showTypeToggle == 'Block'">
        <v-col
          class="ma-0 pa-0"
          cols="12"
          xl="3"
          md="4"
          v-for="(stock, i) in stockData"
          :key="i"
        >
            <v-card hover class="ma-1" >
              <v-alert dark color="black" class="ma-0 pa-3 font-weight-black">
                <v-row class="pa-0 ma-0">
                  <v-col class="" cols="4" sm="4" xs="4">
                    <v-chip color="black" class="headline" label large>
                      {{ stock.symbol }}
                    </v-chip>
                  </v-col>
                  <v-col class="text-right px-0" cols="8" sm="8">
                    <v-chip class="headline mx-0 pa-2" label large>
                      {{ stock.price }}
                    </v-chip>
                    <v-chip
                      :color="`${getStockColor(stock.chg)} `"
                      v-on:click="showPercent = !showPercent"
                      class="headline mx-0 pa-2"
                      label
                      large
                    >
                      <v-icon>
                        {{ getArrow(stock.chg) }}
                      </v-icon>
                      {{ converterChg(stock) }}
                    </v-chip>
                  </v-col>
                </v-row>
              </v-alert>
            </v-card>
        </v-col>
      </v-row>
    </v-slide-y-transition>
  </v-container>
</template>



<script>
import { createStore } from "vuex";
import axios from "axios";

export default {
  data: () => ({
    head: {
      title: "STOCK",
    },
    stockData: [],
    selectSymbolList: defaultSymbolList,
    defaultSymbolList: defaultSymbolList,
    showPercent: true,
    useTestData: true,
    showTypeToggle: "Block",
    tableHeaders: [
      {
        text: "股名",
        align: "left",
        sortable: false,
        value: "symbol",
      },
      {
        text: "股價",
        align: "left",
        sortable: false,
        value: "price",
      },
      {
        text: "漲跌",
        align: "left",
        sortable: false,
        value: "chg",
      },
      {
        text: "漲跌幅(%)",
        align: "left",
        sortable: false,
        value: "chg_percent",
      },
      {
        text: "最低",
        align: "left",
        sortable: false,
        value: "low",
      },
      {
        text: "最高",
        align: "left",
        sortable: false,
        value: "high",
      },
      {
        text: "國家",
        align: "left",
        sortable: false,
        value: "country",
      },
      {
        text: "更新時間",
        align: "left",
        sortable: false,
        value: "dateTime",
      },
    ],
  }),
  created: function () {
    // `this` points to the vm instance
  },
  methods: {
    converterChg (stockData) {
      let converterNum = this.showPercent
        ? stockData.chg_percent
        : stockData.chg;
      converterNum = converterNum.replaceAll("-", "").replaceAll("+", "");
      return converterNum;
    },
    getArrow (chg) {
      let mdiName = "";
      if (chg.indexOf("+") != -1) {
        mdiName = "mdi-chevron-double-up";
      } else if (chg.indexOf("-") != -1) {
        mdiName = "mdi-chevron-double-down";
      } else {
        mdiName = "mdi-cat";
      }
      return mdiName;
    },
    getStockColor (chg) {
      let color = "";
      if (chg.indexOf("+") != -1) {
        color = "green";
      } else if (chg.indexOf("-") != -1) {
        color = "red";
      } else {
        color = "#555555";
      }
      return color;
    },
    reloadStockData() {
      if (this.useTestData) {
        console.log(
          "***********************  use testData "
        );
        this.stockData = testData.response.filter(
          (stock) => stock.country == "united-states"
        );
      } else {
        console.log(
          "***********************  use realData "
        );
        axios
          .get(
            `https://fcsapi.com/api-v2/stock/latest?access_key=${access_key}&symbol=${this.selectSymbolList.join()}`
          )
          .then((response) => {
            console.log(response.data);
            if (response.data.msg == "Successfully") {
              //因為會回傳墨西哥的資料  所以需要先filter
              this.stockData = response.data.response.filter(
                (stock) => stock.country == "united-states"
              );
              console.log(this.stockData);
            }
          });
      }
    },
  },
  //不知道為啥小post一直call不過去  先暫時用get
  mounted() {
    this.reloadStockData();
  },
};

//#region defaultData 
const access_key='EW4ByaDKhCt5hVSjgIVtyc0C1NJTleIGpAnwIlHKLWyc2nFATj';
const defaultSymbolList = [ "NKE", "ORCL", "WORK", "PTON", "SNE",  "WMT",  "CRM",  "LMT",  "VFC",  "ASML", 
  "GPRO", "DIS",  "COST", "AMZN", "FB",  "ZM",  "SPOT", "NVDA", "INTC", "AMD",
  "BRK-B", "GOOG", "AAPL", "UBER","TSM", "UMC", "MU", "TSLA","NFLX"];
const testData = {"status":true,"code":200,"msg":"Successfully","response":[{"price":"45.77","high":"46.41","low":"45.45","chg":"0.00","chg_percent":"-2.03%","dateTime":"2020-10-27 14:50:58","symbol":"INTC","country":"united-states","id":"4"},{"price":"124.00","high":"124.09","low":"123.43","chg":"-0.06","chg_percent":"-0.05%","dateTime":"2020-10-27 14:48:00","symbol":"DIS","country":"united-states","id":"6"},{"price":"57.30","high":"57.98","low":"57.14","chg":"-0.19","chg_percent":"-0.33%","dateTime":"2020-10-27 14:47:58","symbol":"ORCL","country":"united-states","id":"1145"},{"price":"116.10","high":"116.45","low":"114.54","chg":"+1.05","chg_percent":"0.91%","dateTime":"2020-10-27 14:50:58","symbol":"AAPL","country":"united-states","id":"15"},{"price":"3244.99","high":"3259.50","low":"3212.26","chg":"+37.95","chg_percent":"1.18%","dateTime":"2020-10-27 14:47:41","symbol":"AMZN","country":"united-states","id":"56"},{"price":"371.47","high":"372.49","low":"369.48","chg":"+0.76","chg_percent":"0.2%","dateTime":"2020-10-27 14:47:05","symbol":"COST","country":"united-states","id":"60"},{"price":"533.52","high":"536.65","low":"527.77","chg":"+7.87","chg_percent":"1.5%","dateTime":"2020-10-27 14:50:51","symbol":"NVDA","country":"united-states","id":"74"},{"price":"311.40","high":"313.00","low":"307.75","chg":"+2.10","chg_percent":"0.68%","dateTime":"2020-10-27 14:48:51","symbol":"ASML","country":"netherlands","id":"69177"},{"price":"73.19","high":"73.90","low":"72.96","chg":"-0.56","chg_percent":"-0.76%","dateTime":"2020-10-27 14:47:01","symbol":"VFC","country":"united-states","id":"1157"},{"price":"362.46","high":"367.98","low":"362.00","chg":"-6.09","chg_percent":"-1.65%","dateTime":"2020-10-27 14:47:29","symbol":"LMT","country":"united-states","id":"1163"},{"price":"142.78","high":"143.14","low":"141.97","chg":"+0.62","chg_percent":"0.44%","dateTime":"2020-10-27 14:47:58","symbol":"WMT","country":"united-states","id":"18"},{"price":"77.41","high":"77.65","low":"76.97","chg":"+1.21","chg_percent":"1.59%","dateTime":"2020-10-27 14:52:46","symbol":"SNE","country":"united-states","id":"1979"},{"price":"52.00","high":"52.31","low":"51.56","chg":"-0.14","chg_percent":"-0.27%","dateTime":"2020-10-27 14:50:59","symbol":"MU","country":"united-states","id":"81"},{"price":"79.39","high":"82.37","low":"78.20","chg":"-2.84","chg_percent":"-3.45%","dateTime":"2020-10-27 14:52:57","symbol":"AMD","country":"united-states","id":"85"},{"price":"247.92","high":"251.62","low":"245.95","chg":"+5.94","chg_percent":"2.45%","dateTime":"2020-10-27 14:47:41","symbol":"CRM","country":"united-states","id":"1324"},{"price":"128.97","high":"129.45","low":"128.52","chg":"+0.60","chg_percent":"0.47%","dateTime":"2020-10-27 14:47:49","symbol":"NKE","country":"united-states","id":"29"},{"price":"485.90","high":"490.01","low":"482.94","chg":"-2.34","chg_percent":"-0.48%","dateTime":"2020-10-27 14:47:36","symbol":"NFLX","country":"united-states","id":"90"},{"price":"426.91","high":"430.50","low":"420.10","chg":"+6.63","chg_percent":"1.58%","dateTime":"2020-10-27 14:47:42","symbol":"TSLA","country":"united-states","id":"101"},{"price":"3211.35","high":"3260.00","low":"3164.45","chg":"-46.90","chg_percent":"-1.44%","dateTime":"2020-10-27 09:59:59","symbol":"ORCL","country":"india","id":"63647"},{"price":"70.03","high":"70.03","low":"70.03","chg":"-1.65","chg_percent":"-2.3%","dateTime":"2020-10-05 06:00:00","symbol":"AMD","country":"germany","id":"113650"},{"price":"303.45","high":"303.45","low":"303.45","chg":"+1.65","chg_percent":"0.55%","dateTime":"2020-10-05 06:00:00","symbol":"COST","country":"germany","id":"113698"},{"price":"39.83","high":"39.83","low":"39.83","chg":"-0.12","chg_percent":"-0.31%","dateTime":"2020-10-05 06:08:00","symbol":"MU","country":"germany","id":"113713"},{"price":"119.66","high":"119.66","low":"119.66","chg":"-0.94","chg_percent":"-0.78%","dateTime":"2020-10-05 06:08:00","symbol":"WMT","country":"germany","id":"113819"},{"price":"282.08","high":"282.49","low":"276.34","chg":"+4.97","chg_percent":"1.79%","dateTime":"2020-10-27 14:50:55","symbol":"FB","country":"united-states","id":"112"},{"price":"5.630","high":"5.740","low":"5.600","chg":"+0.110","chg_percent":"1.99%","dateTime":"2020-10-27 14:41:57","symbol":"UMC","country":"united-states","id":"9961130"},{"price":"950.00","high":"970.00","low":"950.00","chg":"-25.58","chg_percent":"-2.62%","dateTime":"2020-10-27 14:29:57","symbol":"INTC","country":"mexico","id":"120848"},{"price":"2590.02","high":"2590.02","low":"2577.00","chg":"+0.02","chg_percent":"0%","dateTime":"2020-10-27 14:29:57","symbol":"DIS","country":"mexico","id":"120852"},{"price":"2425.00","high":"2430.00","low":"2390.01","chg":"+25.25","chg_percent":"1.05%","dateTime":"2020-10-27 14:29:41","symbol":"AAPL","country":"mexico","id":"107838"},{"price":"67709.78","high":"67709.78","low":"67600.00","chg":"+761.41","chg_percent":"1.14%","dateTime":"2020-10-27 14:29:59","symbol":"AMZN","country":"mexico","id":"120865"},{"price":"3004.30","high":"3004.30","low":"3004.30","chg":"+39.30","chg_percent":"1.33%","dateTime":"2020-10-27 14:30:00","symbol":"WMT","country":"mexico","id":"120876"},{"price":"86.65","high":"87.22","low":"86.00","chg":"-0.08","chg_percent":"-0.09%","dateTime":"2020-10-27 14:52:56","symbol":"TSM","country":"united-states","id":"6608"},{"price":"368.36","high":"370.54","low":"366.73","chg":"+0.87","chg_percent":"0.24%","dateTime":"2020-10-27 14:50:10","symbol":"ASML","country":"united-states","id":"119"},{"price":"3210.00","high":"3258.00","low":"3165.65","chg":"-43.65","chg_percent":"-1.34%","dateTime":"2020-10-27 09:58:34","symbol":"ORCL","country":"india","id":"65205"},{"price":"1595.45","high":"1597.84","low":"1583.20","chg":"+5.00","chg_percent":"0.31%","dateTime":"2020-10-27 14:50:15","symbol":"GOOG","country":"united-states","id":"124"},{"price":"9.55","high":"9.55","low":"9.20","chg":"+0.15","chg_percent":"1.6%","dateTime":"2020-10-27 09:36:00","symbol":"WORK","country":"thailand","id":"97765"},{"price":"6.39","high":"6.49","low":"6.37","chg":"-0.04","chg_percent":"-0.62%","dateTime":"2020-10-27 14:47:37","symbol":"GPRO","country":"united-states","id":"5534"},{"price":"89.30","high":"92.00","low":"89.00","chg":"-1.97","chg_percent":"-2.16%","dateTime":"2020-10-27 10:29:45","symbol":"AMZN","country":"pakistan","id":"109451"},{"price":"5814.76","high":"5945.00","low":"5770.41","chg":"+19.02","chg_percent":"0.33%","dateTime":"2020-10-27 14:29:58","symbol":"FB","country":"mexico","id":"120927"},{"price":"193.53","high":"193.53","low":"193.15","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"AAPL","country":"switzerland","id":"113976"},{"price":"29.00","high":"29.00","low":"29.00","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"AMD","country":"switzerland","id":"113990"},{"price":"1852.14","high":"1856.94","low":"1851.53","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"AMZN","country":"switzerland","id":"113992"},{"price":"197.78","high":"197.78","low":"197.78","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"ASML","country":"switzerland","id":"113994"},{"price":"135.42","high":"136.85","low":"135.42","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"DIS","country":"switzerland","id":"114046"},{"price":"185.26","high":"185.82","low":"185.26","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"FB","country":"switzerland","id":"114064"},{"price":"5.48","high":"5.48","low":"5.48","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"GPRO","country":"switzerland","id":"114083"},{"price":"47.68","high":"47.68","low":"47.68","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"INTC","country":"switzerland","id":"114105"},{"price":"345.00","high":"345.00","low":"345.00","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"LMT","country":"switzerland","id":"114116"},{"price":"38.05","high":"38.05","low":"38.05","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"MU","country":"switzerland","id":"114127"},{"price":"358.70","high":"358.70","low":"358.70","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"NFLX","country":"switzerland","id":"114133"},{"price":"81.90","high":"82.03","low":"81.90","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"NKE","country":"switzerland","id":"114135"},{"price":"159.00","high":"160.00","low":"157.76","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"NVDA","country":"switzerland","id":"114138"},{"price":"55.30","high":"55.30","low":"55.30","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"ORCL","country":"switzerland","id":"114141"},{"price":"216.32","high":"219.84","low":"214.42","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"TSLA","country":"switzerland","id":"114197"},{"price":"107.68","high":"107.68","low":"107.68","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"WMT","country":"switzerland","id":"114219"},{"price":"1645.02","high":"1716.99","low":"1631.01","chg":"-68.46","chg_percent":"-4%","dateTime":"2020-10-27 14:29:44","symbol":"AMD","country":"mexico","id":"120940"},{"price":"7746.00","high":"7746.00","low":"7742.00","chg":"0.00","chg_percent":"0%","dateTime":"2020-10-26 19:59:53","symbol":"COST","country":"mexico","id":"120967"},{"price":"33180.18","high":"33500.00","low":"33145.00","chg":"0.00","chg_percent":"0%","dateTime":"2020-10-26 19:59:57","symbol":"GOOG","country":"mexico","id":"121009"},{"price":"150.00","high":"150.00","low":"150.00","chg":"+0.00","chg_percent":"0%","dateTime":"2020-10-16 14:45:02","symbol":"GPRO","country":"mexico","id":"121011"},{"price":"7692.00","high":"7692.00","low":"7692.00","chg":"0.00","chg_percent":"0%","dateTime":"2020-10-26 19:20:20","symbol":"LMT","country":"mexico","id":"121035"},{"price":"1087.13","high":"1115.00","low":"1081.70","chg":"0.00","chg_percent":"0%","dateTime":"2020-10-26 19:59:48","symbol":"MU","country":"mexico","id":"121054"},{"price":"10197.00","high":"10197.00","low":"10197.00","chg":"+3.00","chg_percent":"0.03%","dateTime":"2020-10-27 14:30:00","symbol":"NFLX","country":"mexico","id":"121057"},{"price":"2685.00","high":"2747.28","low":"2665.01","chg":"0.00","chg_percent":"0%","dateTime":"2020-10-26 19:59:48","symbol":"NKE","country":"mexico","id":"121058"},{"price":"11140.00","high":"11140.00","low":"10971.01","chg":"+168.92","chg_percent":"1.54%","dateTime":"2020-10-27 14:30:01","symbol":"NVDA","country":"mexico","id":"121061"},{"price":"1211.97","high":"1211.97","low":"1195.00","chg":"0.00","chg_percent":"0%","dateTime":"2020-10-26 19:59:51","symbol":"ORCL","country":"mexico","id":"121064"},{"price":"8890.00","high":"8970.00","low":"8796.74","chg":"+93.26","chg_percent":"1.06%","dateTime":"2020-10-27 14:29:59","symbol":"TSLA","country":"mexico","id":"121093"},{"price":"5170.000","high":"5300.000","low":"5170.000","chg":"+120.000","chg_percent":"2.38%","dateTime":"2020-10-27 14:29:53","symbol":"CRM","country":"mexico","id":"121141"},{"price":"288.62","high":"289.84","low":"285.27","chg":"+3.66","chg_percent":"1.28%","dateTime":"2020-10-27 14:41:58","symbol":"SPOT","country":"united-states","id":"9961085"},{"price":"1645.000","high":"1649.000","low":"1645.000","chg":"-80.330","chg_percent":"-4.66%","dateTime":"2020-10-27 16:00:00","symbol":"AMD","country":"mexico","id":"121237"},{"price":"8970.000","high":"8970.000","low":"8970.000","chg":"+151.770","chg_percent":"1.72%","dateTime":"2020-10-27 16:00:00","symbol":"TSLA","country":"mexico","id":"121266"},{"price":"34.44","high":"35.70","low":"34.31","chg":"-1.05","chg_percent":"-2.96%","dateTime":"2020-10-27 14:41:43","symbol":"UBER","country":"united-states","id":"9961127"},{"price":"521.60","high":"531.54","low":"513.75","chg":"+3.81","chg_percent":"0.74%","dateTime":"2020-10-27 14:50:59","symbol":"ZM","country":"united-states","id":"6508"},{"price":"28.14","high":"28.38","low":"27.87","chg":"+0.39","chg_percent":"1.39%","dateTime":"2020-10-27 14:41:31","symbol":"WORK","country":"united-states","id":"9961079"},{"price":"44.82","high":"45.10","low":"43.89","chg":"0.00","chg_percent":"0%","dateTime":"2020-02-05 05:06:23","symbol":"UBER","country":"switzerland","id":"114258"},{"price":"121.27","high":"122.50","low":"118.51","chg":"+3.17","chg_percent":"2.68%","dateTime":"2020-10-27 14:47:52","symbol":"PTON","country":"united-states","id":"5740"},{"price":"730.00","high":"761.90","low":"730.00","chg":"-38.83","chg_percent":"-5.05%","dateTime":"2020-10-27 14:27:49","symbol":"UBER","country":"mexico","id":"121970"}],"info":{"server_time":"2020-10-27 14:55:32 UTC","credit_count":1,"_t":"2020-10-27 14:55:32 UTC"}}
// #endregion

</script>

<style lang="scss" scoped>
.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
}

.v-application--wrap {
    min-height: 100vh;
    justify-content: center;
}
</style>
