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
    <!-- <v-card dark v-for="(project, i) in projectData"
      :key="i"
      class="">
        <v-card-title>
        <v-icon> mdi-microsoft-windows </v-icon>
        <span class="title font-weight-light">{{project.friendlyname}}</span>
      </v-card-title>
        
      </v-card> -->
    <v-row justify="space-around">
      <v-card width="800">
        <v-img
          height="200px"
          src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

            <v-toolbar-title class="title white--text pl-0">
              Messages
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
              color="white"
              icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-0">
            <v-avatar size="150">
              <img
                alt="user"
                src="/steveNewImage_01.png"
              >
            </v-avatar>
            <p class="ml-3 harderName">
               SteveChuang  
            </p>
            <p class="ml-3 headerPosition">
                FULL Stack WEB designer  
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            Today
          </div>

          <v-timeline
            align-top
            dense
          >
            <!-- <v-timeline-item
              v-for="message in messages"
              :key="message.time"
              :color="message.color"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ message.from }}</strong> @{{ message.time }}
                </div>
                <div>{{ message.message }}</div>
              </div>
            </v-timeline-item> -->
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
.harderName {
  font-family: "Caveat", cursive;
  font-size: 1.8em;
  padding: 5%;
}
.headerPosition {
  font-family: "Caveat", cursive;
  font-size: 1.5em;
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
    }).catch(() => {});
  }
};
</script>