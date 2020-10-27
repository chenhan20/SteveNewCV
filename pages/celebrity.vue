<template>
  <v-container fluid>
    <h3 class="display-3 text-center text-uppercase">{{head.title}}</h3>
    {{celebrityList}}
  </v-container>
</template>



<script>
import { createStore } from "vuex";
import axios from 'axios';

export default {
  data: () => ({
    head: {
      title: "celebrity",
      celebrityList:[
          {name:"Steve Jobs",SignatureImage:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Elon_Musk_Signature.svg/225px-Elon_Musk_Signature.svg.png",image:"",title:
            ["Founder, CEO, lead designer of SpaceX"
                ,"CEO, product architect of Tesla, Inc.",
                ,"Founder of The Boring Company and X.com (now PayPal)",
                ,"Co-founder of Neuralink, OpenAI, and Zip2",
                ,"Chairman of SolarCity"]
          ,motto:[""]},
          {name:"Elon Musk",SignatureImage:"/",image:"",title:[],motto:[]},
      ]
    },
  }),
  created: function () {
  },
  mounted () {
  }
};


</script>

<style lang="scss" scoped>
</style>
