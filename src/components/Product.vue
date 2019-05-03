<template>
    <v-card class="product ma-3">
        <v-card-title> 
            <h3>
                {{title}} Id: {{id}} 
            </h3>
        </v-card-title>
        <v-card-text>
            <p>Price : {{price}}</p>
            <p>Amount : {{amount}}</p>
        </v-card-text>
        <v-card-actions v-if="user && user.isAdmin">
            <ModalProductForm :id="id" :title="title" :price="price" :amount="amount"/>
            <v-btn color="primary" @click="deleteProduct">Delete Product</v-btn>
        </v-card-actions>
        <Comments v-if="id" :product_id="id"/>
    </v-card>
</template>
<script>
import Comments from './Comments';
import ModalProductForm from './ModalProductForm';

export default {
    name: 'Product',
    components: {
        Comments,
        ModalProductForm
    },
    props: [
        'id',
        'title',
        'price',
        'amount'
    ],
    computed: {
        user() {
            return this.$store.state.currentUser;
        }
    },
    methods: {
        deleteProduct() {
            this.$store.dispatch('deleteProduct', this.id);
        }
    }
}
</script>

<style>
</style>
