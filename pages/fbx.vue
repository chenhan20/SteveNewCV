<template>
    <v-container
     fluid
     class="fbxContainer">
      <div class="fbxTitle text-center text-uppercase">{{head.title}}</div>
      <v-row>
        <v-col class="" offset-xl="2" xl="4">
          <v-col offset-xl="4" v-for="(fbxTicker, i) in fbxTickerList" :key="i">
            <div class="frFyey">
              <div class="">
                <div class="code">{{fbxTicker.ticker}}</div>
                <div class="lane">Global Container Index</div>
              </div>
              <div class="graph">
                  <div class="gvWRqt"></div>
              </div>
              <div class="">
                  <div class="">{{parseFloat(fbxTicker.value).toFixed(2)}}</div>
                  <span class="">
                      <svg v-if="fbxTicker.change>0" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 -4 10 14">
                        <path fill="#AEF1CB" fill-rule="nonzero" d="M0 5h3.75v5h2.5V5H10L5 0z"></path>
                      </svg>
                      <svg v-else-if="fbxTicker.change<0" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 -4 10 14">
                        <path fill="#5BB1E7" fill-rule="nonzero" d="M10 5H6.25V0h-2.5v5H0l5 5z"></path>
                      </svg>
                      {{parseFloat(fbxTicker.change).toFixed(2)}}%
                  </span>
              </div>
            </div>
          </v-col>
        </v-col>
        <v-col xl="2" xs="12">
          <v-data-table
              :headers="tableHeaders"
              :items="fbxList"
              :items-per-page="50"
              class="elevation-1"
              dark
          >
              <template> </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    head: {
      title: "FBX DAILY PRICES",
    },
    fbxList: [],
    fbxTickerList: [],
        tableHeaders: [
      {
        text: "日期",
        align: "left",
        sortable: true,
        value: "indexDate",
      },
      {
        text: "指數",
        align: "left",
        sortable: true,
        value: "value",
      },
    ]
  }),
  created: function () {
    axios
      .get(`/stock/getFBX`)
      .then((response) => {
          if (response.status === 200) {
            let fbxData = response.data.indexPoints;
            this.fbxList = fbxData.sort((a, b) => (a.indexDate > b.indexDate) ? -1 : 1);
            this.fbxTickerList = response.data.ticker;
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
body {
    font-family: "Open Sans", sans-serif;
    .fbxContainer{
        background-color: rgb(24, 30, 57);
        .fbxTitle{
            font-size: 34px;
            font-weight: bold;
            line-height: 41px;
            color: white;
            padding-bottom: 15px;
        }
        .frFyey{
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            border-radius: 4px;
            box-sizing: border-box;
            background: linear-gradient(to right, rgba(0, 147, 238, 0.41), rgba(39, 217, 116, 0.41));
            padding: 10px;
            margin-bottom: 10px;
            height: 80px;
            cursor: pointer;
            transition: all 250ms ease-out 0s;
            width: 378px;
            color: white;
            text-decoration: none;
            .gvWRqt {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: 0px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
        }
    }
}
</style>
