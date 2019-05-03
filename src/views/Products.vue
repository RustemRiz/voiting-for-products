<template>
    <div class="products">
        <h1>Products</h1>
            <ModalProductForm v-if="user && user.isAdmin"/>
            <Product 
                v-for="product in products"
                :key="product.id" 
                :id="product.id" 
                :title="product.title" 
                :amount="product.amount" 
                :price="product.price"
            />
    </div>
</template>
<script>
import Product from '../components/Product';
import ModalProductForm from '../components/ModalProductForm';

export default {
    name: 'Products',
    components: {
        Product,
        ModalProductForm
    },
    computed: {
        products() {
            return this.$store.state.products;
        },
        user() {
            return this.$store.state.currentUser;
        }
    },
    created() {
        this.$store.dispatch('getProducts');
    }
 
}
</script>

<style scoped>
</style>
