<template>
  <v-app>
    <Navbar></Navbar>
    

    <v-content class="grey lighten-5">
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/footer'

export default {
  name: 'App',
  components:{Navbar,Footer},

};
</script>
