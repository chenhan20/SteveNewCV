<template>
  <v-card
    max-width="450"
    class="mx-auto"
  >
    <v-toolbar
      color="cyan"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Steve ToDoList</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list>
      <v-list-item-group>
        <v-list-item
          v-for="(toDo, i) in toDoList"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title v-text="toDo.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    head: {
      title: 'SteveChuang ToDoList',
      meta: [
        { hid: 'og:image', property: 'og:image', content: 'https://cdn.pixabay.com/photo/2016/03/09/10/37/light-bulb-1246043_1280.jpg' },
      ]
    },
    toDoList: [
      {
        text: 'aaaa'
      },
      {
        text: 'bbbb'
      }
    ]
  })
};
</script>
