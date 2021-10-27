<template>
    <div>
        <Header/>
        <Dashboard/>
    </div> 
</template>

<script>
import Dashboard from '@/components/Dashboard.vue'
import Header from '@/components/Header.vue'
    export default {
        name: 'DashboardView',
        components: {
            Header,
            Dashboard
        },

    }   
</script>
