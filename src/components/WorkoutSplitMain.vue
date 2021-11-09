<template>
    <div>
        <div class="template-container">
            <h2>Your Workout Templates</h2>

            <WorkoutSplitChild v-for="workout in allWorkoutData" 
            :key="workout.workoutId"
            :workoutId="workout.workoutId"
            :title="workout.title"
            :created_on="workout.created_on"
            :completed="workout.completed"
            :completed_on="workout.completed_on"
            :userId="workout.userId"
            @notifyParentDeleteWorkout="retrieveWorkouts"
            />
        </div>
        <h2>Current Workout</h2>
            <b-button v-b-toggle href="#example-sidebar" @click.prevent>Toggle Sidebar</b-button>
            <div>
            
            <b-sidebar id="example-sidebar" title="Sidebar" shadow>
            <div class="px-3 py-2">
                Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </div>
            </b-sidebar>
            </div>
            <!-- Adding a bottom nav -->
            <div class="botton-nav-container">
                <ul>
                    <li><img v-b-modal.modal-center @click="showModal" src="@/assets/plusIcon.png">
                        <b-modal ref="my-modal" id="modal-center" centered title="Name Your Workout" @ok="createWorkout">
                        <input v-model="newWorkoutTitle" type="text">
                    </b-modal>
                    </li>
                    <li><img @click="$router.push({name: 'WorkoutHistory'})" src="@/assets/historyIcon.png"></li>
                    <li><img @click="logOutUser" src="@/assets/logoutIcon.png"></li>
                </ul>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import WorkoutSplitChild from './WorkoutSplitChild.vue'

    export default {
        name: 'WorkoutSplitMain',
        components: {
            WorkoutSplitChild
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
                newWorkoutTitle: null,
                modalShow: false
                
            }
        },
        methods: {
            showModal() {
                this.$refs['my-modal'].show()
            },
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

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            goToHistory() {
                this.$router.push({name: 'WorkoutHistory'});
            },
            logOutUser() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/login`,
                    method: 'DELETE',
                    headers : {
                        'X-Api-Key' : process.env.VUE_APP_API_KEY,
                    },
                    data : {
                        "loginToken" : this.userToken,
                    }

                }).then(() => {
                    cookies.remove('loginData');
                    this.$router.push({ name: 'Login' });
                }).catch((error) => { 
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                const getCookie = cookies.get('loginData');
                if (getCookie == null) {
                    this.$router.push({ name: 'Login' });
                }else {
                    
                    this.userToken = getCookie.loginToken;
                    this.userEmail = getCookie.email;
                }
            },
        },
        mounted() {
            this.retrieveUsers();
            this.getMyCookies();
            
        },
        
    }
</script>

<style lang="scss" scoped>
    h2 {
        color: #e06a1c;
        font-weight: 800;
        text-align: center;
        margin: 10px 0;
    }
    .template-container {
        border: 1px solid blue;
    }
    .collapsed > .when-open, .not-collapsed > .when-closed {
        display: none;
    }
    .bottom-nav-container {
        position:fixed;
        bottom: 0;
        left: 0;
        background-color: black;
    }
    ul {
        background-color: black;
        list-style-type: none;
        margin: 0;
        padding: 0;
        }

        li {
            display: inline;
            list-style-type: none;
            padding: 25px;
            border-bottom:none;
            margin-right: 5px;
            img {
                width:10vw;
                border-right: 1px solid grey;
                cursor:pointer;
                margin-right: 5px;
            }
        }
        


</style>