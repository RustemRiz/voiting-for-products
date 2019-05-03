<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" class="mx-3">
            {{id ? 'Edit Product' : 'Add Product'}}
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{id ? 'Edit Product' : 'Add New Product'}}</span>
        </v-card-title>
        <v-card-text>
            <v-form @submit="onSubmit">
                <v-text-field
                    type="text"  
                    v-model="newTitle" 
                    label="Title"
                    required
                ></v-text-field>
                <v-text-field
                    type="number" 
                    v-model="newPrice" 
                    label="Price"    
                    required
                ></v-text-field>
                <v-text-field
                    type="number" 
                    v-model="newAmount" 
                    label="Amount"
                    required
                ></v-text-field>
            </v-form> 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="onSubmit">
              {{id ? 'Save' : 'Add'}}
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
import Backend from '../services/backend.js';

const backend = new Backend();

export default {
    name: 'ModalProductForm',
    props: [
        'id',
        'title',
        'price',
        'amount'
    ],
    data() {
        return {
            dialog: false,
            newTitle: this.title || '',
            newPrice: this.price || 10,
            newAmount: this.amount || 1
        }
    }, 

    methods: {
        onSubmit() {
            let product = {
                title: this.newTitle,
                price: this.newPrice,
                amount: this.newAmount
            };
            if (this.id) {
                product.id = this.id;
                console.log(product);
                this.$store.dispatch('editProduct', product);
            } else {
                this.$store.dispatch('addProduct', product);
            }
            this.dialog = false;
        }
    }

}
</script>

<style>

</style>
