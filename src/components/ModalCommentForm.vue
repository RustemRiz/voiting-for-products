<template>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on" class="mx-3">
            Add Comment
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Comment</span>
        </v-card-title>
        <v-card-text>
            <v-form @submit="onSubmit">
                <v-radio-group v-model="rate">
                    <v-layout row justify-start>
                        <v-radio
                            v-for="i in 5"
                            :key="i"
                            :label="`${i}`"
                            :value="i"
                            class="mb-1"
                        ></v-radio>
                    </v-layout>
                </v-radio-group>
                 <v-textarea
                    solo
                    label="Comment"
                    v-model="comment"
                    ></v-textarea>
            </v-form> 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="onSubmit">
              Add
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'ModalCommentForm',
    props: ['product_id'],
    data() {
        return {
            dialog: false,
            rate: null,
            comment: ''
        }
    }, 
    methods: {
        onSubmit() {
            let comment = { 
                rate: this.rate,
                comment: this.comment
            };
            this.$store.dispatch('addComment', { comment, product_id: this.product_id });
            this.dialog = false;
        }
    }

}
</script>

<style>

</style>
