<template>
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
            <v-btn
                icon
                @click="show = !show"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
          </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    show: false,
    locations: [
      {
        title: "蘭嶼(Lanyu)",
        src: "/steveCvImage_01.jpg",
        width: 500,
        imageHeight: 300
      },
      {
        title: "福岡(Fukuoka)",
        src: "/steveCvImage_02.jpg",
        width: 500,
        imageHeight: 300
      },
      {
        title: "沖繩(Okinawa)",
        src: "/steveCvImage_03.jpg",
        width: 500,
        imageHeight: 300
      }
    ]
  })
};
</script>
