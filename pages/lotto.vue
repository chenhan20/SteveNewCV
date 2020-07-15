<template>
  <v-row class="lottoRow">
    <v-col cols="12">
      <v-row justify="space-around">
        <h3>Lotto Produce</h3>
      </v-row>
      <v-row justify="space-around">
        <v-sheet :elevation="elevation" :color="color" :tile="tile">
          <template v-for="(lottoNumber,index) in generalList">
            <v-chip :ripple="false" :key="index">{{ lottoNumber }}</v-chip>
          </template>
          <template v-for="(lottoNumber,index) in specialList">
            <v-chip color="warning" :ripple="false" :key="index">{{ lottoNumber }}</v-chip>
          </template>
        </v-sheet>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row justify="space-around">
        <v-btn @click="getLottoNumber">
          Start
          <v-icon right>mdi-dice-6</v-icon>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    head: {
      title: "Lotto Lotto ",
      meta: [
        {
          hid: "og:image",
          property: "og:image",
          content: ""
        }
      ]
    },
    elevation: 4,
    general: {
      min: 1,
      max: 38,
      lottoNum: 6
    },
    special: {
      min: 1,
      max: 8,
      lottoNum: 1
    },
    generalList: [],
    specialList: []
  }),
  methods: {
    getLottoNumber: function(event) {
      this.generalList = getLottoNumberList(this.general);
      this.specialList = getLottoNumberList(this.special);
    }
  }
};

function getLottoNumberList(setting) {
  let origin = new Set();
  while (origin.size < setting.lottoNum) {
    origin.add(Math.floor(Math.random() * setting.max) + setting.min);
  }
  return Array.from(new Set(origin));
}
</script>

<style lang="scss" scoped>
.lottoRow span {
  margin: 10px;
}
.lottoNumber {
}
</style>
