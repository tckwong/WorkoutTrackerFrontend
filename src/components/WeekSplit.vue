<template>
    <div>
        <b-button variant="danger">+</b-button>
        <Workout v-for="workout in allWorkoutData" 
        :key="workout.workoutId"
        :title="workout.title"
        :created_on="workout.created_on"
        :completed="workout.completed"
        :completed_on="workout.completed_on"
        :userId="workout.userId"/>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import Workout from './Workout.vue'

    export default {
        name: 'WeekSplit',
        components: {
            Workout
        },
        data: () => {
            return {
                allWorkoutData: [],
                workoutTitle: null,
                workoutList: null,
                userEmail: null,
                userToken: null,
                userId: null,
                
            }
        },
        methods: {
            // Find the userId of logged in user. Then we retrieve all workouts for that user
            retrieveUsers() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/users`,
                    method: 'GET'
                    
                }).then((response) => {
                    const foundUser = response.data.filter(element => element.email === this.userEmail);
                    this.userId = foundUser[0].userId
                    this.retrieveWorkouts()
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            retrieveWorkouts() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workouts`,
                    method: 'GET',
                    params: {
                        userId: this.userId,
                    }
                }).then((response) => {
                    console.log(response)
                    this.allWorkoutData = response.data;
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            createWorkout() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workouts`,
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken" : this.userToken,
                        "title" : this.workoutTitle,
                    }
                }).then((response) => {
                    console.log(response)
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                const getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.userEmail = getCookie.email;
            },
        },
        
        mounted() {
            this.getMyCookies();
            this.retrieveUsers();
            
        },
        
    }
</script>

<style lang="scss" scoped>

</style>