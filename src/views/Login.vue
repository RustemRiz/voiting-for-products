<template>
    <v-card class="login">
        <v-card-text>
            <v-tabs>
                <v-tab key=1>Log in</v-tab>
                <v-tab key=2>Sign up</v-tab>
                <v-tab-item key="1">
                    <v-form @submit="onSubmitLogin">
                        <v-text-field
                            v-model="email"
                            type="email" 
                            label="E-mail"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            type="password"
                            label="Password"
                            required
                        ></v-text-field>
                        <v-btn type="submit">Log in</v-btn>
                    </v-form>   
                </v-tab-item>

                <v-tab-item key="2">
                    <v-form @submit="onSubmitSignUp">
                        <v-text-field
                            v-model="name"
                            type="text" 
                            label="Name"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="email"
                            type="email" 
                            label="E-mail"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="password"
                            type="password"
                            label="Password"
                            required
                        ></v-text-field>
                        <v-btn type="submit">Sign up</v-btn>
                    </v-form>   
                </v-tab-item>
            </v-tabs>
        </v-card-text>
    </v-card>
</template>
<script>
import Backend from '../services/backend.js';

const backend = new Backend();

export default {
    name: 'Login',
     data() { 
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        onSubmitLogin(e) {
            e.preventDefault();
            let data = {
                email: this.email,
                password: this.password
            };
            this.$store.dispatch('login', data)
                .then(() => {
                    this.$router.push('/');
                })
        },
        onSubmitSignUp(e) {
            e.preventDefault();
            let data = {
                username: this.name,
                email: this.email,
                password: this.password
            };
            backend.register(data)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                })
        }

    }
}
</script>

