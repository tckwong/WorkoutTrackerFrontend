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
                @keydown.space.prevent
                v-model="email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-col>
          </b-form-group>
    
        <b-form-group id="inputGroup" label="Username:" label-for="input-2">
          <b-form-input
            id="input2"
            v-model="username"
            @keydown.space.prevent
            placeholder="Enter username"
            :state="nameStateUsrNme"
            required
          ></b-form-input>
          <b-form-invalid-feedback>Username must be between 4 and 14 characters long</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="inputGroup" label="Password:" label-for="input-2">
          <b-form-input
            id="input3"
            v-model="password"
            @keydown.space.prevent
            type="password"
            placeholder="Enter password"
            :state="pwState"
            required
          ></b-form-input>
          <b-form-invalid-feedback>Password must be between 4 and 12 characters long</b-form-invalid-feedback>
        </b-form-group>
        <div>
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
    computed: {
      nameStateUsrNme() {
        return this.username.length > 4 && this.username.length < 15 ? true : false
      },
      pwState() {
        return this.password.length > 4 && this.password.length < 13 ? true : false
      },
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
            }).then(() => {
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