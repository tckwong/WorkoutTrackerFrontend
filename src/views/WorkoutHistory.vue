<template>
    <section>
        <h1>YOUR WORKOUT HISTORY</h1>
        <div id="history-container">

        </div>
        <WorkoutHistoryChild
            v-for="(data, index) in completedWorkoutData" 
            :key="index"
            :index="index"
            :completedAt="data.completedAt"
            :completedWorkoutId="data.completedWorkoutId"
            :exerciseName="data.exerciseName"
            :reps="data.reps"
            :sets="data.sets"
            :weight="data.weight"
            :workoutTitle="data.workoutTitle"
            :userId="data.userId"
        ></WorkoutHistoryChild>
    </section>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import WorkoutHistoryChild from '@/components/WorkoutHistoryChild.vue'

    export default {
        name: 'WorkoutHistory',
        components: {
            WorkoutHistoryChild
        },
        data: () => {
            return {
                userId : null,
                workoutObj : {},
                completedWorkoutData : [],
            }
        },
        methods: {
            retrieveWorkoutHistory() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-history`,
                    method: 'GET',
                    params : {
                        "userId" : this.userId,
                    }
                }).then((response) => {
                    for (const [index] of response.data.entries()) {
                
                        this.workoutObj = {
                            workoutTitle : response.data[index].workoutTitle[index],
                            completedAt : response.data[index].completedAt[index],
                            exerciseName : response.data[index].exerciseName,
                            reps : response.data[index].reps,
                            sets : response.data[index].sets,
                            weight : response.data[index].weight,
                        }
                        this.completedWorkoutData.push(this.workoutObj);
                    }

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                const getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.userId = getCookie.userId;
            },
        },
        mounted() {
            this.getMyCookies();
            this.retrieveWorkoutHistory();
        },
    }
</script>

<style lang="scss" scoped>
    h1 {
        color: #e06a1c;
    }

    #history-container {
        margin-left: auto;
        margin-right: auto;
        border: 1px 1px 1px 1px;
        
    }
</style>