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
            <v-alert dark color="#202020" class="ma-0 pa-3 font-weight-black">
              <v-row class="pa-0 ma-0">
                <v-col class="" cols="4" sm="4" xs="4">
                  <v-chip color="#202020" class="headline" label large>
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
    access_key: '',
    selectSymbolList: [],
    defaultSymbolList: [],
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
    axios
      .get(
        `/stock/initStockData`
      )
      .then((response) => {
        if(response.status===200){
          this.access_key = response.data.access_key;
          this.defaultSymbolList = response.data.symbolList;
          this.selectSymbolList = response.data.symbolList;
        }
      });
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
      let url = '/stock/getTestData';
      if (!this.useTestData) {
        url = `https://fcsapi.com/api-v2/stock/latest?access_key=${this.access_key}&symbol=${this.selectSymbolList.join()}`;
        console.log(
          "***********************  use realData "
        );
      }
      axios
        .get(
          url
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.msg == "Successfully") {
            //因為會回傳墨西哥的資料  所以需要先filter
            this.stockData = response.data.response.filter(
              (stock) => stock.country == "united-states"
            );
          }
        });
    },
  },
  //不知道為啥小post一直call不過去  先暫時用get
  mounted() {
    this.reloadStockData();
  },
};

</script>

<style lang="scss" scoped>
</style>
