<template>
  <v-container class="">
    <v-row height="100%" class="">
      <v-col offset-xl="3" xl="3" xs="12">
        <v-img src="/steveNewImage_01.png" width="300" ></v-img>
      </v-col>
      <v-col xl="6" xs="12">
        <v-row>
          <v-col class="harderName">SteveChuang</v-col>
        </v-row>
        <v-row>
          <v-col class="headerPosition">FULL Stack WEB designer</v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-card dark v-for="(project, i) in projectData"
      :key="i"
      class="">
        <v-card-title>
        <v-icon> mdi-microsoft-windows </v-icon>
        <span class="title font-weight-light">{{project.friendlyname}}</span>
      </v-card-title>
        
      </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.harderName {
  font-family: "Caveat", cursive;
  font-size: 2.5em;
  padding: 5%;
}
.headerPosition {
  font-family: "Caveat", cursive;
  font-size: 2em;
}
</style>

<script>
import Logo from "~/components/Logo.vue"
import VuetifyLogo from "~/components/VuetifyLogo.vue"
import axios from "axios"

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => ({
    head: {
      title: "SteveCard",
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 'http-equiv': 'X-UA-Compatible', content:'ie=edge' },
        { property: 'og:title', content: 'steve Stock' },
        { property: 'og:description', content: 'Steve' },
        { property: 'og:site_name', content: 'Stock ' },
        { property: 'og:locale', content: 'zh_TW' },
        { property: 'og:image', content: '/steveCvImage_02.jpg' },
      ]
    },
    projectData:{},
  }),
  created: function () {
    axios.get(`/initHomeData`).then((response) => {
      console.log(response);
      if (response.status === 200) {
        this.projectData = response.data.projectData;
      }
    });
  }
};
</script>