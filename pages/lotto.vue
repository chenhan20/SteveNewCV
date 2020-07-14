<template>
  <v-row>
    <v-btn>start</v-btn>
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
    }
    // dialog: false,
  }),
  methods: {
    addToDo() {
      // this.dialog = true;
      // this.toDoList.push({
      //   checkbox: false,
      //   text: "ccc"
      // });
    }
  }
};
</script>
