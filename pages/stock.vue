<template>
    
</template>

<script>
import {createStore} from 'vuex'

export default {
  data: (store) => ({
    head: {
      title: "Stock",
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
