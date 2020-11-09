<template>
  <v-responsive :aspect-ratio="16/9">
    <v-row class="lottoRow">
      <v-col cols="12">
        <v-row justify="space-around"></v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="mx-auto" color="#26c6da" dark max-width="600">
          <v-card-title>
            <v-icon large left>mdi-emoticon-poop</v-icon>
            <span class="title font-weight-light">Lotto</span>
          </v-card-title>
          <v-card-text class="headline font-weight-bold">
            <template v-for="lottoNumber in generalList">
              <v-chip :ripple="false" :key="lottoNumber">{{ lottoNumber }}</v-chip>
            </template>
            <template v-for="lottoNumber in specialList">
              <v-chip :ripple="false" :key="lottoNumber" color="warning" >{{ lottoNumber }}</v-chip>
            </template>
          </v-card-text>
          <v-card-actions>
            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img class="elevation-6" src="/coffinDance.jpg"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>Steve Chuang</v-list-item-title>
              </v-list-item-content>
              <v-btn @click="getLottoNumber">
                Start
                <v-icon right>mdi-dice-6</v-icon>
              </v-btn>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="mx-auto" color="brown darken-1" dark max-width="600">
          <v-card-title>
            <v-icon large left>mdi-emoticon-tongue</v-icon>
            <span class="title font-weight-light">Lotto Setting</span>
          </v-card-title>
          <v-card-text class="headline font-weight-bold">
            <v-row justify="center">
              <v-col cols="12" md="8">
                <v-select
                  :items="lottoSpecies"
                  item-text="friendlyName"
                  label="choice lotto Species"
                  outlined
                ></v-select>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="general.min"
                  label="起始號碼"
                ></v-text-field>
                <v-text-field
                  v-model="special.min"
                  label="起始號碼"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="general.max"
                  label="終止號碼"
                ></v-text-field>
                <v-text-field
                  v-model="special.max"
                  label="終止號碼"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions></v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-responsive>

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
          content: "樂透號碼產生威力彩券SteveChuang"
        }
      ]
    },
    elevation: 4,
    lottoSpecies:[{
        friendlyName : "威力彩",
        general: {
          min: 1,
          max: 38,
          lottoQuantity: 6
        },
        special: {
          min: 1,
          max: 8,
          lottoQuantity: 1
        },
    }],
    general: {
      min: 1,
      max: 38,
      lottoQuantity: 6
    },
    special: {
      min: 1,
      max: 8,
      lottoQuantity: 1
    },
    generalList: [0, 0, 0, 0, 0, 0],
    specialList: [0]
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
  while (origin.size < setting.lottoQuantity) {
    origin.add(Math.floor(Math.random() * setting.max) + setting.min);
  }
  return Array.from(new Set(origin));
}
</script>

<style lang="scss" scoped>
body {
  font-family: "Lobster", cursive;
  .lottoRow span {
    margin: 10px;
  }
}
</style>
