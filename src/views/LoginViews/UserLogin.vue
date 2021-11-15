<template>
    <section>
        <div>
            <h1 class="heading">LOG IN</h1>
            <b-form class="formContainer" inline>
                <label class="sr-only">email</label>
                <b-form-input
                class="w-80"
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

                <b-form-checkbox 
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="status"
                    value="checked"
                    unchecked-value="not_checked"
                    
                    >Remember me</b-form-checkbox>
                <button class="generalBtn" @click="loginUser">Log In</button>
            </b-form>
        </div>
        
        
    </section> 
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
export default {

    name: 'UserLogin',
    data: () => {
            return {
                password: null,
                email: null,
                status: 'not_checked'
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
                console.log(response);
                console.log("working?");
                if (this.status === 'not_checked') {
                    cookies.set('loginData', response.data, 0);
                }else {
                    cookies.set('loginData', response.data, '7d');
                }
                this.$router.push({ name: 'WorkoutSplit' });
                
            }).catch((error) => {
                console.error("There was an error with your api request: " + error);
            })
        },
    }
}   
</script>
<style lang="scss" scoped>

    section > div {
        height: 100vh;
        }
        .formContainer {
        padding-left: 10vw;
            padding-right:10vw;
        }
        .heading {
        text-align: center;
        padding-top: 10vh;
        padding-bottom:5vh;
        }
        .buttons {
        float: right;
        margin-top: 20px;
        }

    .buttons:nth-child(2) {
    margin-right: 10px;
    }
    .generalBtn{
        margin-top: 10px;
    }
    @media only screen and (min-width:700px) {
    .formContainer {
        padding-left: 20vw;
        padding-right:20vw;
    }
  }
  @media only screen and (min-width:1000px) {
    .formContainer {
      padding-left: 30vw;
      padding-right:30vw;
  }
  }
</style>
