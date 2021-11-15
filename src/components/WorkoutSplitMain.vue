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
        <!-- Active Workout shows up when an active workout-session is valid -->
        <section class="banner">
            <label for="menu-control" class="hamburger" v-if="activeWorkoutToggle">
                <img src="@/assets/notificationIcon.png" alt="Notification icon for active workout session"/>
            </label>
            
            <input type="checkbox" id="menu-control" class="menu-control">
            <aside class="sidebar">
                
                <div class="sidebar__menu">
                    <p>Active Session</p>
                    <a @click="resumeWorkout">Resume Workout</a>
                    <a @click="endWorkoutSession">End Workout</a>
                </div>
                
                <label for="menu-control" class="sidebar__close"></label>
        
            </aside>
        </section>


        <!-- Adding a bottom nav -->
        <div class="bottomNavContainer">
            <ul>
                <li><img v-b-modal.modal-menu @click="showModal" src="@/assets/plusIcon.png">
                    <b-modal ref="my-modal" id="modal-menu" centered title="Name Your Workout" @ok="createWorkout">
                        <input v-model="newWorkoutTitle" type="text">
                    </b-modal>
                </li>
                <li><img @click="$router.push({name: 'WorkoutHistory'})" src="@/assets/historyIcon.png"></li>
                <li><img @click="$router.push({name: 'Progress'})" src="@/assets/progression.png"></li>
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
                    document.getElementById("menu-control").checked = false;
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
            await this.getMyCookies();
            this.retrieveUsers();
        },
        
    }
</script>

<style lang="scss" scoped>
    .template-container {
        margin-bottom:10vh;
    }

    .activeWorkoutContainer {
        position: fixed;
        top:0;
        right:0;
        margin-bottom: 10vh;
        border: 1px solid grey;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        .generalBtn {
            font-size:1rem;
        }
    }
    .dropdown {
        position: fixed;
        top:5vh;
        right:0;
    }
    h2 {
        color: #e06a1c;
        font-weight: 800;
        text-align: center;
        padding: 10px 0;
    }


    img {
        max-width: 100%;
        bottom: -14px;
        position: relative;
        }

        .card {
        position: absolute;
        bottom: 5%;
        right: 5%;
        text-align: center;
        color: #272243;
        width: 100%;
        background: #fff;
        border-radius: 10px;
        box-shadow: 0 0 20px 20px rgba(0,0,0,0.03);
        width: 320px;
        overflow: hidden;
        animation: updown 3s ease 6;

        &::before {
        content: "";
        border-width: 20px;
        border-color: transparent;
        border-style: solid;
        border-left-color: rgba(255,255,255, 0.9);
        border-left-width: 30px;
        display: block;
        position: absolute;
        top: 55%;
        left: 50%;
        z-index: 2;
        transform: translatex(calc(-50% + 15px));
        filter: drop-shadow(5px 5px 4px #000);
        pointer-events: none;
    }

    @keyframes updown {
        0%, 50%, 100% {
        transform: translatey(0);
        }
        20% {
        transform: translatey(5px);
        }
        25% {
        transform: translatey(-20px);
        }
        30% {
        transform: translatey(20px);
        }
        35% {
        transform: translatey(-5px);
        }
    }
    }

    .hamburger {
    position: absolute;
    left: 30px;
    top: 18px;
    display: flex;
    height: 20px;
    width: 24px;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    z-index: 1;
    }

    .sidebar {
    height: 28vh;
    width: 200px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    transform: translatex(-100%);
    transition: transform 0.4s ease-in-out;
    
    //   close button
    &__close {
        position: absolute;
        top: 40%;
        right: -30px;
        background: #fff;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        box-shadow: 0 0 20px 20px rgba(0,0,0,0.03);
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translatex(-100%);
        cursor: pointer;
        transition: transform 0.4s ease-in-out 0.2s;
        
        &::before, &::after {
            content: "";
            height: 2px;
            background: #898989;
            width: 24px;
            display: block;
            position: absolute;
        }
        
        &::after {
            transform: rotate(90deg);
        }
    }
    
    &__menu { //& means sidebar__menu
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: center;
        font-size: 36px;
        margin-top: 40px;
        margin-bottom: 40px;
        color: #898989;
        
        a {
            font-size: 1.2rem;
            color: orange;
            text-decoration: none;
            transform: translatex(-80%);
            transition: transform 0.4s ease-in-out;
            cursor: pointer;

            //   Line animation
            &::before {
                content: "";
                height: 2px;
                background: #898989;
                width: 70px;
                position: absolute;
                bottom: -2px;
                left: 0;
                transform: translatex(-50%);
                opacity: 0;
                transition: transform 0.4s ease-in-out, opacity 0.4s linear;
            }
            &:hover {
            &::before {
                transform: translatex(0);
                opacity: 1;
                }
            }
            
            @for $i from 1 through 3 {
            &:nth-child(#{$i}) {
                transition-delay: $i * 0.05s;
                }
            }
        }
    }
}
        .menu-control {
        display: none;

        &:checked {
        & + .sidebar {
            transform: translatex(0);
        }

        & + .sidebar .sidebar__close {
            transform: translatex(0) rotate(45deg);
        }

        & + .sidebar .sidebar__menu a {
            transform: translatex(0);
        }
    }
}
</style>