<template>
<section>
    <div class="wrapper">
        <div class="sidebar">
            <ul>
                <li><router-link class="navLink" to="/">Log In</router-link></li>
                <li><router-link to="/DashboardView">Dashboard</router-link></li>
                <li><router-link to="/WorkoutView">Workout</router-link></li>
                
                <!-- <li><router-link class="navLink" to="/Dashboard">Dashboard</router-link></li> -->
            </ul>
        </div>
    </div>
</section>
    
</template>

<script>
import '../css/headerStyle.scss'
    export default {
        name: 'Header'
    }
</script>

<style scoped>

</style>