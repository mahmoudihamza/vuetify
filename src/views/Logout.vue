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
        const tokenStorage = localStorage.getItem('access_token')
        //console.log(tokenStorage);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' +tokenStorage
        
            axios.post('/logout')
          .then(response=>{
              console.log(response)
              
              localStorage.removeItem('access_token')
              this.$router.push({name:'Login'})
          })


        
    }
}
</script>