<template>
    <div> 
        <Header/>
        <LoginPage/>
    </div> 
</template>

<script>
    import Header from '@/components/Header.vue'
    import LoginPage from '@/components/LoginPage.vue'

    export default {
        name: 'LoginView',
        components: {
            Header,
            LoginPage,
        },
        methods: {

        }
    }   
</script>
