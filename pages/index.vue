<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <div class="text-center">
        <img
          src="/steveNewImage.png"
        >
      </div>
        <blockquote class="blockquote">
          <footer>
          <div>Make one</div>
          <div>problem solver</div>
          <div>creater</div>
          <div>innovator</div>
          <div>not a programmer</div>
            <small>
              <em>&mdash;Joma Tech</em>
            </small>
          </footer>
      </blockquote>
      <v-card>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
