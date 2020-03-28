<template>
  <v-container class="mt-4">
    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="mb-5"
      ></v-text-field>
    <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="designation"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">New Product</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <!-- <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.id" label="Dessert id"></v-text-field>
                  </v-col> -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.designation" label="Description"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.prix_achat" label="Price Selling"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.prix_vente" label="Price Baying"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.tva" label="Tva"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.famille" label="Famille"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil-outline
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  <v-snackbar
    color="green"
    v-model="snackbarsaved"
    :timeout="timeout"
  >
    the Item was added Succesfuly
  </v-snackbar>
    <v-snackbar
    v-model="snackbaredited"
    :timeout="timeout"
  >
    the Item was edited Succesfuly
  </v-snackbar>
    <v-snackbar
    color="red"
    v-model="snackbardeleted"
    :timeout="timeout"
  >
    the Item was deleted Succesfuly
  </v-snackbar>

  </v-container>
  
</template>
<script>
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'
export default {
  id: 'Products',
  data: () => ({
    snackbarsaved: false,
    snackbaredited:false,
    snackbardeleted:false,
    timeout:2000,
    search: '',
      dialog: false,
      headers: [
        {
          text: 'Id',
          align: 'left',
          sortable: false,
          value: 'id',
        },
        { text: 'Description', value: 'designation' },
        { text: 'Price Selling', value: 'prix_achat' },
        { text: 'Price Baying', value: 'prix_vente' },
        { text: 'Tva', value: 'tva' },
        { text: 'Famiile', value: 'famille' },
        { text: 'Actions', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        designation: '',
        prix_achat: 0,
        prix_vente: 0,
        tva: 0,
        famille:0,
      },
      defaultItem: {
        id: 0,
        designation: '',
        prix_achat: 0,
        prix_vente: 0,
        tva: 0,
        famille:0
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
       axios.get('/products')
                .then(response => {
                     this.desserts=response.data
                })
                .catch(error => {
                    console.log(error)
                })
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        axios.delete('/products/'+item.id)
        .then(
          confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1),
          this.snackbardeleted=true

        )
        
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          axios.patch('/products/'+this.editedItem.id,{
            designation:this.editedItem.designation,
            prix_achat:this.editedItem.prix_achat,
            prix_vente:this.editedItem.prix_vente,
            tva:this.editedItem.tva,
            famille:this.editedItem.famille})
            .then(
              this.snackbaredited=true,
              Object.assign(this.desserts[this.editedIndex], this.editedItem)

            )
          
        } else {
          axios.post('/products',{
            designation:this.editedItem.designation,
            prix_achat:this.editedItem.prix_achat,
            prix_vente:this.editedItem.prix_vente,
            tva:this.editedItem.tva,
            famille:this.editedItem.famille


          }).then(
            this.desserts.push(this.editedItem),
            this.snackbarsaved=true,

          ).catch(error=>{
            console.log(error);
          })
          
        }
        this.close()
      },
    },
 
  
}
</script>
