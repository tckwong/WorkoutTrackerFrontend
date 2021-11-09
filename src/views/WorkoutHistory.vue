<template>
    <section>
        <h1>Your Past Workouts</h1>
        <div id="history-container">
                <a href="#heading2" data-scroll>Go to Heading2</a>

            <p class="testp">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit aliquam nam eveniet quidem, saepe doloribus a aspernatur velit dolores, perspiciatis repudiandae veniam tenetur ea necessitatibus est dolorem, praesentium suscipit impedit.</p>
            <h2 id="heading2">Heading2</h2>
        </div>
        <WorkoutHistoryChild
            v-for="(data, index) in completedWorkoutData" 
            :key="index"
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
                completedWorkoutData: [],
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
                    console.log(response)
                    const consolidateObjects = response.data.filter(element => element.completed_workout_id === element.completed_workout_id);
                    console.log(consolidateObjects)
                    // this.completedWorkoutData = response.data;
        
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
    .testp {
        width:200px;
    }
    #history-container {
        margin-left: auto;
        margin-right: auto;
        border: 1px 1px 1px 1px;
        
    }
</style>