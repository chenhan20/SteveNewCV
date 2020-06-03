<template>
  <v-app>
    <h1>{{ message }}</h1>
    <div class="wrapper">
      <div class="box a">a</div>
      <div class="box b">b</div>
      <div class="box c">c</div>
      <div class="box d">d</div>
      <div class="box e">e</div>
      <div class="box f">f</div>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      message: "Exercise grid"
    };
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-gap: 10px;
  background-color: #fff;
  color: #444;
  .box {
    background-color: #444;
    color: #fff;
    border-radius: 5px;
    padding: 20px;
    font-size: 150%;
  }
  .a {
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }
}
</style>