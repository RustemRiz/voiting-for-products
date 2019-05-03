<template>
    <v-card class="comments mx-3" color="grey lighten-4">
        <v-card-title>
            <p class="ma-2">
                <strong>User: </strong> 
                {{userName}} 
                <span v-if="rate">
                    <strong>Rate: </strong> 
                    {{rate}}
                </span>
            </p>
            <v-btn v-if="user && user.isAdmin" color="primary" @click="deleteComment" class="ma-2">Delete Comment</v-btn>
        </v-card-title>
        <v-card-text>
            <p>Comment : {{comment}}</p>
        </v-card-text>
    </v-card>
</template>
<script>
import ModalCommentForm from './ModalCommentForm';

export default {
    name: 'Comment',
    props: [
        'id',
        'comment' ,
        'rate',
        'userName',
        'product_id'  
    ],
    computed: {
        user() {
            return this.$store.state.currentUser;
        }
    },
    methods: {
        deleteComment() {
            this.$store.dispatch('deleteComment', { id: this.id, product_id: this.product_id });
        }
    }
}
</script>

<style>

</style>
