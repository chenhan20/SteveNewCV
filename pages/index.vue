<template>
  <v-row class="teal lighten-5">
    <v-col offset-xl="3" xl="3" xs="12">
      <v-img src="/steveNewImage.png" width="300"></v-img>
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
</template>

<style lang="scss" scoped>
// @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap");

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
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo
  }
};
</script>