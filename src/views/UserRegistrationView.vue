<template>
  <div>
    <div>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Username:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="username"
            placeholder="Enter username"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>
        <b-button @click="registerUser" type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
    name: "UserRegistrationView",
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
                this.$router.push({ name: 'LoginView' });
                
            }).catch((error) => {
                console.error("There was an error with your api request: " + error);
            })
        },
    }
};

</script>

<style lang="scss" scoped>

</style>