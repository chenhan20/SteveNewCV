<template>
  <v-container>
    <v-row>
      <v-col v-for="(location, i) in locations" :key="i">
        <v-card class :max-width="location.width">
          <v-img
            class="white--text align-end"
            :height="location.imageHeight"
            :src="location.src"
          >
          <!-- <v-card-title v-text="location.title"></v-card-title> -->
          </v-img>
          <v-list>
            <v-card-title v-text="location.title"></v-card-title>
            <!-- <v-card-title>{{ location.title }}</v-card-title> -->
          </v-list>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  icon
                  @click="location.showDetail = !location.showDetail"
                >
                  <v-icon>{{ location.showDetail ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
              <div v-show="location.showDetail">
                <v-divider></v-divider>
                <v-card-text>
                  {{ location.detailText }}
                </v-card-text>
              </div>
            </v-expand-transition>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    head: {
      title: 'SteveChuang Travel List',
      meta: [
        { hid: 'og:image', property: 'og:image', content: '/steveCvImage_02.jpg' },
      ]
    },
    locations: [
      {
        title: "蘭嶼(Lanyu)",
        src: "/steveCvImage_01.jpg",
        width: 500,
        imageHeight: 300,
        showDetail: false,
        detailText: "2020/05/26~2020/05/30"
      },
      {
        title: "福岡(Fukuoka)",
        src: "/steveCvImage_02.jpg",
        width: 500,
        imageHeight: 300,
        showDetail: false,
        detailText: "2019/11/26~2020/05/30"
      },
      {
        title: "沖繩(Okinawa)",
        src: "/steveCvImage_03.jpg",
        width: 500,
        imageHeight: 300,
        showDetail: false,
        detailText: "2019/05/26~2020/05/30"
      }
    ]
  })
};
</script>
