<template>
<v-container class="ma-8">

    <v-card class="blue-grey lighten-4 pa-5">

    


  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

  <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>


    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>
 

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Login
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset 
    </v-btn>

  </v-form>
  </v-card>
  </v-container>
</template>
<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
export default {
    name:"Register",
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],

      show1: false,
        password: 'Password',
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
        },
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true;
          axios.post('/register',{
            name:this.name,
              email:this.email,
              password :this.password

          })
          .then(response=>{
              console.log(response)
              this.$router.push({name:'Login'})
              

          })
        }
      },
      reset () {
        this.$refs.form.reset()
      },

    },
    
}
</script>