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
            <div v-if="activeWorkoutToggle">
                <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                    <b-row no-gutters>
                    <b-col md="6">
                
                    </b-col>
                    <b-col md="6">
                        <b-card-body title="Active Workout">
                        <b-card-text>
                            <button @click="resumeWorkout">Resume Workout</button>
                            <button @click="endWorkoutSession">Cancel Workout</button>
                        </b-card-text>
                        </b-card-body>
                    </b-col>
                    </b-row>
                </b-card>
            </div>
            <!-- Adding a bottom nav -->
            <div class="bottomNavContainer">
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
                modalShow: false,
                activeWorkoutToggle : false,
                userIdResume : null,
                
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
                    this.checkforSession();
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
            checkforSession() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-session`,
                    method: 'GET',
                    params : {
                        "userId" : this.userId
                    }
                    
                }).then((response) => {
                    if (response.data != "") {
                        this.activeWorkoutToggle = true;
                    }
                
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            resumeWorkout() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-session`,
                    method: 'GET',
                    params : {
                        'userId' : this.userIdResume
                    }
                    }).then((response) => {
                        this.$router.push({ name: 'CurrentWorkout',params: { workout: response.data.workoutId } });
                    }).catch((error) => {
                        console.error("There was an error: " +error);
                    })

                    },
            endWorkoutSession() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-session`,
                    method: 'DELETE',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        'userId' : this.userId
                    }
                    
                }).then(() => {
                    this.activeWorkoutToggle = false;
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
                    this.userIdResume = getCookie.userId;
                    this.userEmail = getCookie.email;
                }
            },
        },
        async mounted() {
            await this.retrieveUsers();
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

</style>