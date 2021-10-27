<template>
    <body>
        <section>
            <div class="flexContainer">
                <img id="logo" src="@/assets/logo.png"/>
                <b-button class="loginButton" pill variant="outline-danger">SIGN-UP</b-button>
                <b-button @click="directToLoginPage" class="loginButton" pill variant="outline-danger">LOG IN</b-button>
            </div>
        </section>
    </body>
</template>

<script>
    import '../css/general.scss'
    export default {
        name: 'LoginPage',
        components: {
            
        },
        data: () => {
            return {
              
            }
        },
        computed: {
            validation() {
            return this.email.length > 0 && this.email.length < 20
            },
        },
        methods: {
            directToLoginPage() {
                 this.$router.push({ name: 'UserLoginView' });
            },
            directToRegistrationPage() {
                 this.$router.push({ name: 'UserLoginView' });
            },
        },

    }
</script>

<style lang="scss" scoped>

    .flexContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        width: 100vw;
        height: 100vh;
        
        #logo {
        justify-self: center;
        align-self: center;
        }
    }
    .loginButton {
        width: 80vw;
        align-self: center;
        margin-bottom: 20px;
    }

</style>