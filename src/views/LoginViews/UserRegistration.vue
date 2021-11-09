<template>
  <section>
    <div>
      <h1 class="heading">USER REGISTRATION</h1>
      <b-form class="formContainer">
          <b-form-group
            id="inputGroup"
            label="Email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-col
              sm="auto">
              <b-form-input
                id="input1"
                v-model="email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-col>
          </b-form-group>
    
        <b-form-group id="inputGroup" label="Username:" label-for="input-2">
          <b-form-input
            id="input1"
            v-model="username"
            placeholder="Enter username"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="inputGroup" label="Password:" label-for="input-2">
          <b-form-input
            id="input1"
            v-model="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>
        <div id="buttonContainer">
          <b-button class="buttons" @click="registerUser" type="submit" variant="primary">Submit</b-button>
          <b-button @click="gobacktoLogin" class="buttons" variant="danger">Go Back</b-button>
        </div>
        
      </b-form>
    </div>
  </section>
</template>

<script>
import axios from "axios"
import '../../css/general.scss'

export default {
    name: "UserRegistration",
    data: () => {
            return {
                email: '',
                username: '',
                password: '',
                
            }
    },
    methods: {
        registerUser() {
            axios.request({
                url: `${process.env.VUE_APP_BASE_DOMAIN}/api/users`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                data: {
                    "email" : this.email,
                    "username" : this.username,
                    "password" : this.password
                }
            }).then((response) => {
                console.log(response)
                this.$router.push({ name: 'Login' });
                
            }).catch((error) => {
                console.error("There was an error with your api request: " + error);
            })
        },
        gobacktoLogin() {
          this.$router.push({ name: 'Login' });
        }
    }
};

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
</style>