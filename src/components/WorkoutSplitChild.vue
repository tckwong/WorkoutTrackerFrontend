<template>
    <section>
        <div id="workout-container">
            <router-link class="routerLink" :to="{ name: 'WorkoutTemplate', params: { workout: workoutId }}">
                <h2 class="workout_deets">{{ title }}</h2>
                <p>Created on: {{ created_on }}</p>
            </router-link>
            <div class="dropdown" style="float:right;">
                
                <button class="dropbtn">...</button>
                
                <div class="dropdown-content">
                    <a @click="showModal">Edit Workout Name</a>
                    <b-modal ref="update_modal" id="modal-center" centered title="Edit Workout Name" @ok="updateWorkoutName">
                        <input v-model="updatedTitle" type="text">
                    </b-modal>
                    <a @click="deleteWorkout">Delete Workout</a>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'

    export default {
        name: 'WorkoutSplitChild',

        data: () => {
            return {
                exerciseList : [],
                exerciseLine : {},
                userToken : null,
                updatedTitle : null,
            }
        },
        props: {
            workoutId : Number,
            title : String,
            created_on : String,
            userId : Number
        },
        methods: {
            showModal() {
                this.$refs['update_modal'].show()
            },
            updateWorkoutName() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workouts`,
                    method: 'PATCH',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken" : this.userToken,
                        "workoutId" : this.workoutId,
                        "workoutTitle" : this.updatedTitle,
                        "userId" : this.userId,
                    }
                }).then(() => {
                    this.$emit('notifyParentDeleteWorkout');

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            deleteWorkout() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workouts`,
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken" : this.userToken,
                        "workoutId" : this.workoutId,
                    }
                }).then(() => {
                    this.$emit('notifyParentDeleteWorkout');

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
            },
        },
        mounted() {
            this.getMyCookies();
        },
    }
</script>

<style lang="scss" scoped>
    .dropbtn {
    background-color: #ad784d;
    color: white;
    padding: 16px;
    font-size: 16px;
    height:100%;
    width:8vw;
    min-width: 2vw;
    border: none;
    cursor: pointer;
    }

    .dropdown {
    position: relative;
    display: inline-block;
    }

    .dropdown-content {
    display: none;
    position: absolute;
    right: 8vw;
    top:0;
    background-color: #f9f9f9;
    min-width: 180px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    }

    .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    }

    .dropdown-content a:hover {background-color: #c4b39a;}

    .dropdown:hover .dropdown-content {
    display: block;
    }

.dropdown:hover .dropbtn {
    background-color: #c77218;
}

    #workout-container {
        display: grid;
        grid-template-columns: 1fr .05fr;
        border-bottom: 2px solid white;
    }
    p {
        color: white;
    }
    .routerLink {
        text-decoration: none;
        color: rgb(255, 255, 255);
        font-weight: bold;
        font-size: 1.2rem;

        .workout_deets {
            padding-left: 2vw;
            font-weight: 600;
            color: #e06a1c;
        }
    }
    .routerLink > p:nth-child(2) {
            font-size: 1rem;
            padding-left: 4vw;
            font-weight: 100;
    }
    #removeIcon {
        cursor: pointer;
        width: 60px;
    }
    #dropdown-right {
        color: theme-color('danger');
        b-dropdown-item{
            background: theme-color('danger');
        }
    }
    b-dropdown {
        background: theme-color('danger');
    }
</style>