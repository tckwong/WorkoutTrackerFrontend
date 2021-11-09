<template>
<section>
    <div class="wrapper">
        <div class="sidebar">
            <ul>
                <li><router-link class="navLink" to="/">Log In</router-link></li>
                <li><router-link class="navLink" to="/">Log Out</router-link></li>
                <!-- <li><router-link to="/DashboardView">Dashboard</router-link></li> -->
                <li><router-link to="/WorkoutView">Workout</router-link></li>
            </ul>
        </div>
    </div>
</section>
    
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import '../css/headerStyle.scss'
    export default {
        name: 'Header',
        methods: {
            logOutUser() {
                axios.request({
                    url: "https://tweeterproject.ml/api/login",
                    method: 'DELETE',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "username" : this.username,
                    }

                }).then(() => {
                    cookies.remove('loginData');
                    // this.$router.push({ name: 'LoginView' });
                }).catch((error) => { 
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.username = getCookie.username;
            }
        }
    }
</script>

<style scoped>

</style>