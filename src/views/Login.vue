<template>
    <body>
        <section>
            <div class="desktopGrid">
                <div class="flexContainer">
                    <img id="logo" src="@/assets/logo.png"/>
        
                    <b-button @click="directToRegistrationPage" class="loginButton" pill variant="outline-danger">SIGN-UP</b-button>
                    <b-button @click="directToLoginPage" class="loginButton bottomBtn" pill variant="outline-danger">LOG IN</b-button>
                </div>
                <img id="loginImg" src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1075&q=80" alt="gymBackgroundImage">
            </div>
            
        </section>
    </body>
</template>

<script>
import '../css/general.scss'
    export default {
        name: 'Login',
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
                this.$router.push({ name: 'UserLogin' });
            },
            directToRegistrationPage() {
                this.$router.push({ name: 'UserRegistration' });
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
        width: 95vw;
        height: 100vh;
        
        #logo {
        justify-self: center;
        align-self: center;
        width:90%
        }
    }
    .loginButton {
        width: 80vw;
        align-self: center;
        margin-bottom: 20px;
    }
    #loginImg {
        display:none;
    }

    @media only screen and (min-width: 700px) {
        #logo {
        justify-self: center;
        align-self: center;
        width:50%;
        }
        .loginButton {
            width: 60vw;
            align-self: center;
            margin-bottom: 20px;
        }
    }
    @media only screen and (min-width: 1000px) {
        .desktopGrid {
            display: grid;
            grid-template-columns: .8fr 1fr;
            justify-content: center;
            align-content: center;
        }
        .flexContainer {
            display: block;
            width: 100%;
            height: 100vh;
            margin-left: 15%;
            #logo {
            justify-self: center;
            align-self: center;
            width:60%;
            margin-left: auto;
            margin-right: auto;
            }
        }
        .loginButton {
            width: 60%;
            align-self: center;
            margin-bottom: 20px;
        }
        #loginImg {
            display:block;
            width: 100%;
            height: 100%;
        }
    }
</style>