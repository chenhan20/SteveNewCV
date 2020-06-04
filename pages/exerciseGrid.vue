<template>
  <v-app>
    <h1>{{ message }}</h1>
    <div class="board">
      <div class="wrapper">
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
        <span class="plot"></span>
      </div>
      <div id="garden" class style>
        <div class="treatment carrot" style="grid-column-start: span 5">
          <div class="bg"></div>
        </div>
      </div>
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
.board {
  position: sticky;
  top: 1em;
  width: 50vw;
  height: 50vw;
  min-width: 300px;
  min-height: 300px;
  max-width: calc(100vh - 2em);
  max-height: calc(100vh - 2em);
  overflow: hidden;
  border: 12px solid #6d5720;
  border-radius: 12px;
  .wrapper {
    display: grid;
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: 20% 20% 20% 20% 20%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .plot {
      z-index: 50;
      background: none;
      box-shadow: inset 2px 2px 0 rgba(255, 255, 255, 0.05),
        inset -2px -2px 0 #665235;
    }
  }
}
</style>