<template>
    <section>
        <div id="workout-container">
            <p><router-link class="routerLink" :to="{ name: 'WorkoutTemplate', params: { workout: workoutId }}">{{ workoutId }} Name: {{ title }} - Created: {{ created_on }} - Completion: {{ completed }}</router-link></p>
            <b-dropdown id="dropdown-right" right text=""  class="m-md-2">
                <b-dropdown-item @click="deleteWorkout">Delete</b-dropdown-item>
            </b-dropdown>
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
            completed : Number,
            completed_on : String,
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
    }
    p {
        color: white;
    }
    .routerLink {
    text-decoration: none;
    color: rgb(255, 255, 255);
    font-weight: bold;
    font-size: 1.2rem;

}
</style>