<template>
    <section>
        <div id="workout-container">
            <router-link class="routerLink" :to="{ name: 'WorkoutTemplate', params: { workout: workoutId }}">
                <h2 class="workout_deets">{{ title }}</h2>
                <p>Created on: {{ created_on }}</p>
            </router-link>
            <div>
                <img @click="deleteWorkout" id="removeIcon" src="@/assets/removeIcon.png">
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
            }
        },
        props: {
            workoutId : Number,
            title : String,
            created_on : String,
            userId : Number
        },
        methods: {
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
</style>