<template>
    <v-container
     fluid
     class="fbxContainer">
      <div class="fbxTitle text-center text-uppercase">{{head.title}}</div>
      <h3 class="white--text text-center ">Freightos Baltic Index</h3>
      <v-col
        cols="12"
        offset-xl="4"
        xl="4"
        class="py-2 text-center"
      >
        <v-btn-toggle
          v-model="toggle_one"
          shaped
          mandatory
        >
          <v-btn @click="reloadFbxData">reload
            <v-icon>mdi-reload</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-row>
        <v-col class="" offset-xl="2" xl="4" xs="12">
          <v-col xl="9" offset-xl="3" v-for="(fbxTicker, i) in fbxTickerList" :key="i">
            <v-row class="frFyey">
              <v-col cols="5" class="">
                <div class="code">{{fbxTicker.ticker}}</div>
                <div class="lane">{{getFbxTickerName(fbxTicker.ticker)}} to</div>
                <div class="lane">{{getFbxTickerName2(fbxTicker.ticker)}}</div>
              </v-col>
              <v-col cols="4" class="graph">
                  <div v-bind:class="getFbxTickerClassName(fbxTicker.ticker)"></div>
              </v-col>
              <v-col cols="3" class="text-center">
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
              </v-col>
            </v-row>
          </v-col>
        </v-col>
        <v-col xl="3" xs="12">
          <v-data-table
              :headers="tableHeaders"
              :items="fbxList"
              :items-per-page="50"
              class="elevation-1"
              :loading="myloadingvariable" 
              loading-text="Loading... Please wait"
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
      title: "FBX PRICES",
    },
    myloadingvariable: true,
    toggle_one: 0,
    fbxTicketHardCode:{
        'FBX':{
          lane_1: 'Global Container Index',
          lane_2: '',
          imageClassName: 'gvWRqt'
        },
        'FBX01':{
          lane_1: 'China/East Asia',
          lane_2: 'North America West Coast',
          imageClassName: 'kESNYy'
        },
        'FBX02':{
          lane_1: 'North America West Coast ',
          lane_2: 'China/East Asia',
          imageClassName: 'dOuNZP'
        },
        'FBX03':{
          lane_1: 'China/East Asia ',
          lane_2: 'North America East Coast',
          imageClassName: 'fCiQOa'
        },
        'FBX04':{
          lane_1: 'North America East Coast ',
          lane_2: 'China/East Asia',
          imageClassName: 'gcYSfq'
        },
        'FBX11':{
          lane_1: 'China/East Asia',
          lane_2: 'North Europe',
          imageClassName: 'dgODLO'
        },
        'FBX12':{
          lane_1: 'North Europe',
          lane_2: 'China/East Asia',
          imageClassName: 'iQKRmn'
        },
        'FBX13':{
          lane_1: 'China/East Asia',
          lane_2: 'Mediterranean',
          imageClassName: 'icERNP'
        },
        'FBX14':{
          lane_1: 'Mediterranean',
          lane_2: 'China/East Asia',
          imageClassName: 'hnJQFB'
        },
        'FBX21':{
          lane_1: 'North America East Coast',
          lane_2: 'North Europe',
          imageClassName: 'jUhwpc'
        },
        'FBX22':{
          lane_1: 'North Europe',
          lane_2: 'North America East Coast',
          imageClassName: 'bvDJPL'
        },
        'FBX24':{
          lane_1: 'Europe',
          lane_2: 'South America East Coast',
          imageClassName: 'hmkyPu'
        },
        'FBX26':{
          lane_1: 'Europe ',
          lane_2: ' South America West Coast',
          imageClassName: 'cLTcEG'
        },
        
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
      this.reloadFbxData();
    // `this` points to the vm instance
  },
  methods: {
    getFbxTickerName(name) {
      let tickerName = "";
      if(this.fbxTicketHardCode[name] !== undefined){
          tickerName = this.fbxTicketHardCode[name].lane_1;
      }
      return tickerName;
    },
    getFbxTickerName2(name) {
      let tickerName = "";
      if(this.fbxTicketHardCode[name] !== undefined){
          tickerName = this.fbxTicketHardCode[name].lane_2;
      }
      return tickerName;
    },
    getFbxTickerClassName(name) {
      let tickerName = "";
      if(this.fbxTicketHardCode[name] !== undefined){
          tickerName = this.fbxTicketHardCode[name].imageClassName;
      }
      return tickerName;
    },
    reloadFbxData() {
      this.myloadingvariable = true;
      axios
        .get(`/stock/getFBX`)
        .then((response) => {
            if (response.status === 200) {
              let fbxData = response.data.indexPoints;
              let ticker = response.data.ticker;
              this.fbxList = fbxData.sort((a, b) => (a.indexDate > b.indexDate) ? -1 : 1);
              this.fbxTickerList = ticker;
              this.myloadingvariable = false;
          }
        })
        .catch(() => {});
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
body {
    font-family: "Open Sans", sans-serif;
    .fbxContainer{
        background-color: rgb(24, 30, 57);
        font-size: 0.8rem;
        font-weight: 700;
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
            background: linear-gradient(to right, rgba(0, 147, 238, 0.5), rgba(39, 217, 116, 0.5));
            padding: 10px;
            margin-bottom: 10px;
            height: 120px;
            cursor: pointer;
            transition: all 250ms ease-out 0s;
            color: white;
            text-decoration: none;
            &:hover {
              background: rgb(29, 36, 64);
            }
            .gvWRqt {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: 0px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .kESNYy {
              background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
              background-position: -100px 0px;
              background-size: cover;
              width: 100px;
              height: 67px;
              margin-top: -5px;
            }
            .dOuNZP {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -200px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .fCiQOa {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -300px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .gcYSfq {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -400px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .dgODLO {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -500px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .iQKRmn {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -600px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .icERNP {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -700px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .hnJQFB {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -800px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .jUhwpc {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -900px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .bvDJPL {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -1000px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .hmkyPu {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -1100px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
            .cLTcEG {
                background-image: url(https://fbx.freightos.com/charts/mini/sprite.png);
                background-position: -1200px 0px;
                background-size: cover;
                width: 100px;
                height: 67px;
                margin-top: -5px;
            }
        }
    }
}
</style>
