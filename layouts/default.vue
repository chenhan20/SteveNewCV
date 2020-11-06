<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      src="/background_01.jpg"
      fixed
      app
      temporary
      dark
    >
      <v-img :aspect-ratio="16/9" src="/navImage.jpg">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="headline">Steve Chuang</div>
            <div class="subtitle-1">a0911558945@gmail.com</div>
          </v-flex>
        </v-layout>
      </v-img>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-container fluid class="pa-0 pink lighten-5">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>SteveChuang &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-account',
          title: 'Introduction',
          to: '/'
        },
        {
          icon: 'mdi-tooltip-image',
          title: 'Travel',
          to: '/travel'
        },
        {
          icon: 'mdi-chart-line',
          title: 'Stock',
          to: '/stock'
        },
        {
          icon: 'mdi-dice-1',
          title: 'Lotto',
          to: '/lotto'
        },
        {
          icon: 'mdi-format-list-checks',
          title: 'ToDoList',
          to: '/toDoList'
        },
        {
          icon: 'mdi-account-group',
          title: 'Celebrity',
          to: '/celebrity'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'exerciseGrid',
          to: '/exerciseGrid'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'SteveChuang',
    }
  }
}

</script>
<style lang="scss" scoped>
</style>