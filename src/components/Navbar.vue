<template>
  <nav>
    <v-app-bar flat app >
      <v-app-bar-nav-icon v-if="loggedIn" class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Todo</span>
        <span>Ninja</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  v-if="!loggedIn" text color="grey" router to="/register">
        <span>Register</span>
        <v-icon right>mdi-register</v-icon>
      </v-btn>
      <v-btn  v-if="!loggedIn" text color="grey" router to="/login">
        <span>Login</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
      <v-btn v-if="loggedIn" text color="grey" router to="/logout">
        <span>logOut</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" v-if="loggedIn" class="cyan lighten-2">

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          router :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    
  </nav>
</template>
<script>
export default {
    data(){
        return{
            drawer :false,
            token:localStorage.getItem('access_token') || null,
            items: [
              { title: 'Dashboard', icon: 'mdi-view-dashboard',route:'/' },
              { title: 'Products', icon: 'mdi-image',route:'/products' },
              { title: 'Categories', icon: 'mdi-help-box',route:'/categories' },
              { title: 'Team', icon: 'mdi-account-group',route:'/team' },
        ],
        right: null,
            
        }
    },
    computed:{
      loggedIn(){
        
        console.log(this.token)
        if(this.token!==null)
        {
          return 1
        }
        else{
          return 0
        }
        //return this.token!==null
        
        
      }
    }
    
    
}
</script>