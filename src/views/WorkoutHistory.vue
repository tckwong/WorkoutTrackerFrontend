<template>
    <section>
        <h1>YOUR WORKOUT HISTORY</h1>
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

        <div class="bottomNavContainer">
                <ul>
                    <li><img @click="$router.push({name: 'WorkoutSplit'})" src="@/assets/homeIcon.png"></li>
                    <li id="activePage"><img @click="$router.push({name: 'WorkoutHistory'})" src="@/assets/historyIcon.png"></li>
                    <li><img @click="$router.push({name: 'Progress'})" src="@/assets/progression.png"></li>
                    <li><img src="@/assets/logoutIcon.png"></li>
                </ul>
        </div>
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
                    console.log(this.completedWorkoutData);

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
    section {
        margin-bottom:5vh;
    }
    h1 {
        color: #e06a1c;
        padding:4vh 0;
        text-align:center;
    }

</style>