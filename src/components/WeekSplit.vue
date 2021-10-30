<template>
    <div>
        <b-button @click="addBtnTgl = !addBtnTgl" variant="danger">ADD WORKOUT</b-button>
        <input v-if="addBtnTgl" type="text" v-model="newWorkoutTitle">
        <b-button @click="createWorkout" v-if="addBtnTgl" variant="outline-primary">Add</b-button>
        <Workout v-for="workout in allWorkoutData" 
        :key="workout.workoutId"
        :workoutId="workout.workoutId"
        :title="workout.title"
        :created_on="workout.created_on"
        :completed="workout.completed"
        :completed_on="workout.completed_on"
        :userId="workout.userId"
        @notifyParentDeleteWorkout="retrieveWorkouts"
        />
        <h2>Current Workout</h2>
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
                newWorkoutObj: {
                    workoutId : null,
                    title : null,
                    created_on : null,
                    completed : null,
                    completed_on : null,
                    userId : null,
                },
                workoutTitle: null,
                workoutList: null,
                userEmail: null,
                userToken: null,
                userId: null,
                addBtnTgl : false,
                newWorkoutTitle: null,
                
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
                        "title" : this.newWorkoutTitle,
                    }
                }).then((response) => {
                    this.newWorkoutObj = {
                        workoutId : response.data.workoutId,
                        title : response.data.title,
                        created_on : response.data.created_on,
                        completed : response.data.completed,
                        completed_on : response.data.completed_on,
                        userId : response.data.userId,
                        }
                    this.allWorkoutData.push(this.newWorkoutObj);
                    this.clearData();

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            clearData() {
                this.newWorkoutObj = "";
                this.newWorkoutTitle = "";
                this.addBtnTgl = false;
            },
            getMyCookies() {
                const getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.userEmail = getCookie.email;
            },
        },
        mounted() {
            this.retrieveUsers();
            this.getMyCookies();
            
        },
        
    }
</script>

<style lang="scss" scoped>

</style>