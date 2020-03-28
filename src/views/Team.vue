<template>
<v-container>
    <v-row>
      <v-col 
      sm="12" 
      md="6" 
      lg="4" 
      xl="2"
      v-for="person in team"
      :key="person.name"
      >
        <v-card class="text-sm-center ma-4 pa-4" >
          <v-responsive>
            <v-tooltip top>
              <template v-slot:activator="{on}">
                <v-avatar size="100" class="grey" v-on="on">
                <img :src="person.avatar">
                </v-avatar>

              </template>
                <span>{{person.name}}</span>
            </v-tooltip>
            
          </v-responsive>
          <v-card-text>
            <h1 class="subheading grey--text">{{person.name}}</h1>
            <p class="pt-4">{{person.role}}</p>

          </v-card-text>
          <v-card-actions>
            <v-btn text>
              <v-icon small left >mdi-message</v-icon>
              <span>Message</span>
            </v-btn>
            
          </v-card-actions>
          
        </v-card>
      </v-col>
    
      
    </v-row>
  </v-container>

    
</template> 
<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
export default {
    name:"Team",
    data(){

        return{ 
        team: [],
        }
    },
    created(){
        this.getTeams()

    },
    methods:{

        getTeams(){
            axios.get('/teams')
                .then(response => {
                     this.team =response.data
                })
                .catch(error => {
                    console.log(error)
                })

        }
    }
}
</script>