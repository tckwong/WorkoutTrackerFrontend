<template>
<section>
    <div class="wrapper">
        <div>
            <img id="logo" src="@/assets/logo.png" alt="logo"/>
        </div>
    </div>
</section>
    
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'

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

<style lang="scss" scoped>
    #logo {
        display:block;
        position:relative;
        margin-left:auto;
        margin-right:auto;
        height: 250px;
    }
</style>