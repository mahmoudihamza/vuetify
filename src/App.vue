<template>
  <v-app>
    <Navbar></Navbar>
    

    <v-content class="grey lighten-5">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components:{Navbar},

};
</script>
