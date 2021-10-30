<template>
    <div>
        <WorkoutTemplateChild v-for="exercise in exerciseList" 
        :key="exercise.exerciseId"
        :exerciseId="exercise.exerciseId"
        :exerciseName="exercise.exerciseName"
        :reps="exercise.reps"
        :sets="exercise.sets"
        :weight="exercise.weight"
        />
        <router-link class="routerLink" :to="{ name: 'CurrentWorkout', params: { workout: workoutId }}"><b-button variant="outline-success">START WORKOUT</b-button></router-link>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import WorkoutTemplateChild from '@/components/WorkoutTemplateChild.vue'

    export default {
        name: 'WorkoutTemplate',
        components: {
            WorkoutTemplateChild
        },
        data: () => {
            return {
                workoutId : null,
                exerciseList : [],
                exerciseObj : {},
            }
        },
        methods: {
            retrieveExercises() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/exercises`,
                    method: 'GET',
                    params : {
                        "workoutId" : this.$route.params.workout
                    }
                }).then((response) => {
                    this.workoutId = this.$route.params.workout
                    for (let i=0; i<response.data.length; i++){
                        this.exerciseObj = {
                            exerciseName : response.data[i].exerciseName,
                            sets : response.data[i].sets,
                        }
                        this.exerciseList.push(this.exerciseObj)
                    }
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                const getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
            },
        },
        async mounted() {
            await this.retrieveExercises();
            this.getMyCookies();
        },
    }
</script>

<style lang="scss" scoped>
    .addExerciseBtn {
	box-shadow:inset 0px 1px 0px 0px #f7c5c0;
	background:linear-gradient(to bottom, #fc8d83 5%, #e4685d 100%);
	background-color:#fc8d83;
	border-radius:6px;
	border:1px solid #d83526;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #b23e35;
    }
    .addExerciseBtn:hover {
        background:linear-gradient(to bottom, #e4685d 5%, #fc8d83 100%);
        background-color:#e4685d;
    }
    .addExerciseBtn:active {
        position:relative;
        top:1px;
    }
</style>