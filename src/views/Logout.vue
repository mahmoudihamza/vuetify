<template>
<div></div>
    
</template>
<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
export default {
    name:"Logout",
    data(){
        return{

        }
    },
    created(){
        this.$store.dispatch('destroyToken')
        .then(response=>{
            console.log(response)
            this.$router.push({name:'Login'})

        })
       
            
              
              
          


        
    }
}
</script>