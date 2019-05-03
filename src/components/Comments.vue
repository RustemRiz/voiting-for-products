<template>
    <v-card class="comments mt-3 pb-3">
        <v-card-title v-if="comments && comments.length">
            <h4>Comments</h4>
        </v-card-title>
        <ModalCommentForm v-if="user" :product_id="product_id"/>
        <v-card-text v-if="comments && comments.length">
            <Comment 
                v-for="comment in comments" 
                :key="comment.id"
                :id="comment.id" 
                :rate="comment.rate"
                :comment="comment.comment" 
                :userName="comment.user.username"
                :product_id="comment.product_id"
            />
        </v-card-text>
    </v-card>
</template>
<script>
import Comment from './Comment';
import ModalCommentForm from './ModalCommentForm';
import Backend from '../services/backend.js';

const backend = new Backend();

export default {
    name: 'Comments',
    components: {
        Comment,
        ModalCommentForm
    },
    props: ['product_id'],
    computed: {
        user() {
            return this.$store.state.currentUser;
        },
        comments() {
            return this.$store.state.comments[this.product_id];
        }
    },
    
}
</script>

<style>
</style>
