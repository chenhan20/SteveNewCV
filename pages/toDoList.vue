<template>
  <v-card max-width="450" class="mx-auto">
    <v-toolbar color="cyan" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Steve ToDoList</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="addToDo">
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list>
      <v-list-item-group>
        <v-list-item v-for="(toDo, i) in toDoList" :key="i">
          <v-list-item-content>
            <v-list-item-title v-text="toDo.text"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-checkbox color="deep-purple accent-4"
             v-model="toDo.active"
             :true-value="toDo.text"
             :input-value="toDo.active">
             </v-checkbox>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <!-- <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span>Dialog 3</span>
          <v-spacer></v-spacer>
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, i) in items" :key="i" @click="() => {}">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </v-card>
</template>

<script>
export default {
  data: () => ({
    head: {
      title: "SteveChuang ToDoList",
      meta: [
        {
          hid: "og:image",
          property: "og:image",
          content:
            "https://cdn.pixabay.com/photo/2016/03/09/10/37/light-bulb-1246043_1280.jpg"
        }
      ]
    },
    // dialog: false,
    toDoList: [
      {
        active: true,
        text: "aaaa"
      },
      {
        active: false,
        text: "bbbb"
      }
    ]
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
