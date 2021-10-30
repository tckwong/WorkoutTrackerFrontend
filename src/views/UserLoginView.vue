<template>
    <section>
        <b-form inline>
            <label class="sr-only">email</label>
            <b-form-input
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="email address"
            v-model="email"
            ></b-form-input>
            <label for="text-password">Password</label>
            <b-form-input
            id="text-password"
            type="password" 
            v-model="password"
            aria-describedby="password-help-block"
            placeholder="password"
            ></b-form-input>
            <b-form-text id="password-help-block">
            Your password must be 8-20 characters long, contain letters and numbers, and must not
            contain spaces, special characters, or emoji.
            </b-form-text>

            <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">Remember me</b-form-checkbox>
            <b-button @click="loginUser" variant="primary">Save</b-button>
        </b-form>
        
    </section> 
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {

    name: 'UserLoginView',
    data: () => {
            return {
                password: null,
                email: null
            }
    },
    methods: {
        loginUser() {
            axios.request({
                url: `${process.env.VUE_APP_BASE_DOMAIN}/api/login`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                data: {
                    "email" : this.email,
                    "password" : this.password
                }

            }).then((response) => {
                console.log(response)
                cookies.set('loginData', response.data, { expires: 1 });
                this.$router.push({ name: 'WorkoutSplit' });
                
            }).catch((error) => {
                console.error("There was an error with your api request: " + error);
            })
        },
    }
}   
</script>
<style lang="scss" scoped>


</style>
