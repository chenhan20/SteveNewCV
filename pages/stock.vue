<template>
    <h1>{{ head.title }}</h1>
</template>

<script>
import {createStore} from 'vuex'

export default {
  data: () => ({
    head: {
      title: "STOCK",
    }
  }),
    created: function () {
    // `this` points to the vm instance
    console.log('a is: ')
  },
  methods: {
    getStock: function(event) {
        
    }
  }
};

</script>

<style lang="scss" scoped>
</style>
