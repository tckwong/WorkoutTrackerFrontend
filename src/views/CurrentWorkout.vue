<template>
    <div id="currWorkoutContainer">
        <div class="header">
            <img @click="$router.push({name: 'WorkoutSplit'})" src="@/assets/homeIcon.png">
        </div>
        <CurrentWorkoutChild v-for="(exercise, index) in allExerciseData" 
        :key="exercise.exerciseId"
        :index="index"
        :exerciseIdP="exercise.exerciseId"
        :exerciseNameP="exercise.exerciseName"
        :repsP="exercise.reps"
        :setsP="exercise.sets"
        :weightP="exercise.weight"
        :workoutTitleP="exercise.workoutTitle"
        :userIdP="exercise.userId"
        :collapsedVisible="exercise.collapsedVisible"
        :stateCurrent="exercise.stateCurrent"
        :length="allExerciseData.length"
        @notifyParentDeleteExercise="retrieveExercises"
        @notifyChangeFocusNext="changeFocusNext"
        @notifyChangeFocusPrev="changeFocusPrev"
        />
        <!-- Workout Timer -->
        <div id="timer">
            <h1>{{ hours }}:{{minutes}}:{{ seconds }}</h1>
        </div>

        <div class="bottomMenu">
            <button @click="abortWorkout" class="abortBtn">ABORT WORKOUT</button>
            <button @click="changeState" class="finishBtn">FINISH WORKOUT</button>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import CurrentWorkoutChild from '@/components/CurrentWorkoutChild.vue'

    export default {
        name: 'WorkoutTemplate',
        components: {
            CurrentWorkoutChild
        },
        data: () => {
            return {
                allExerciseData : [],
                exerciseRow : {},
                workoutId : null,
                stateCurrent : false,
                userToken : null,
                storeData: [],
                storeJSON : [],
                userId : null,
                showNavbar: true,
                lastScrollPosition: 0,
                newExerciseName: null,
                // Variables for added exercises
                addedExerciseIndex : 0,
                allNewExerciseData : [],
                // timer variables
                startTime: "00:00:00",
                end: null,
                currentTime : null,
                timeDiff : null,
                days : null,
                hours : null,
                minutes : null,
                seconds : null,
            }
        },
        computed: {
            getExerciseData: function() {
                return this.$store.state.currWorkoutData
            },
            getStartTime() {
                return this.$store.state.workoutSessionStartTime
            }
        },
        methods: {
            showModal() {
                this.$refs['my-modal'].show()
            },
            changeFocusNext(childIndex) {
                this.allExerciseData[childIndex].collapsedVisible = false;
                this.allExerciseData[childIndex+1].collapsedVisible = true;
            },
            changeFocusPrev(childIndex) {
                this.allExerciseData[childIndex].collapsedVisible = false;
                this.allExerciseData[childIndex-1].collapsedVisible = true;
            },
            retrieveExercises() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/current-workout`,
                    method: 'GET',
                    params : {
                        "workoutId" : this.$route.params.workout
                    }
                }).then((response) => {
                    this.allExerciseData = response.data;

                    for (let i=0; i<this.allExerciseData.length; i++){
                        if (i == 0) {
                            this.allExerciseData[i].collapsedVisible = true;
                        }else{
                            this.allExerciseData[i].collapsedVisible = false;
                        }
                    }   

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            changeState() {
                this.stateCurrent = !this.stateCurrent;
                this.$store.commit('updateState', this.stateCurrent)
                setTimeout(this.finishWorkout, 300);
            },
            abortWorkout() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/workout-session`,
                    method: 'DELETE',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    data : {
                        "loginToken" : this.userToken,
                        "userId" : this.userId
                    }
                }).then(() => {
                    this.$router.push({ name: 'WorkoutSplit' });
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            finishWorkout() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/current-workout`,
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    // Children emits all data to this component through the store
                    data : JSON.stringify(this.$store.state.currWorkoutData)
                    
                }).then(() => {
                    this.updateExerciseTemplate();

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            updateExerciseTemplate() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/exercises`,
                    method: 'POST',
                    headers : {
                        'Content-Type': 'application/json'
                    },
                    data : JSON.stringify(this.$store.state.currWorkoutData)
                    
                }).then(() => {
                    this.endWorkoutSession();
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
                    this.$router.push({ name: 'WorkoutHistory' });
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            getMyCookies() {
                const getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                this.userId = getCookie.userId;
            },
            updateTime() {
                var startTime = localStorage.getItem("sessionStartTime");
                this.currentTime = startTime;

                setInterval(() => {
                var today2 = new Date();
                this.timeDiff = Math.abs(today2 - this.currentTime);
                this.calcTime(this.timeDiff);
                }, 1000);
            },
            calcTime(dist) {
                // Time calculations for days, hours, minutes and seconds
                var d = Math.floor(dist / (1000 * 60 * 60 * 24));
                var h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
                var s = Math.floor((dist % (1000 * 60)) / 1000);
                
                this.days = this.checkTime(d);
                this.hours = this.checkTime(h);
                this.minutes = this.checkTime(m);
                this.seconds = this.checkTime(s);
            },
            checkTime: function(i) {
                // add zero in front of numbers < 10
                if (i < 10) {
                    i = "0" + i
                }  
                return i;
            }
        },
        created() {
            this.getMyCookies();
        },
        async mounted() {
            await this.retrieveExercises();
            this.updateTime();
            
        },
    }
</script>

<style lang="scss" scoped>
    #currWorkoutContainer {
        margin-bottom: 15vh;
    }
    .header {
        background:linear-gradient(to bottom, #282121, #3f3939 50%);
        img {
            height: 80px;
            display:block;
            margin-left: auto;
            margin-right: auto;
            cursor: pointer;
        }
    }
    div > button {
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Arial;
        font-size:15px;
        font-weight:bold;
        padding:6px 24px;
        margin-left: 10px;
        text-decoration:none;
    }
    
    .addExerciseBtn {
	box-shadow:inset 0px 1px 0px 0px #f7c5c0;
	background:linear-gradient(to bottom, #fc8d83 5%, #e4685d 100%);
	background-color:#fc8d83;
	border-radius:6px;
	border:1px solid #d83526;
	text-shadow:0px 1px 0px #b23e35;
    }
    .addExerciseBtn:hover {
        background:linear-gradient(to bottom, #e4685d 5%, #fc8d83 100%);
        background-color:#e4685d;
    }

    .finishBtn {
        box-shadow:inset 0px 1px 0px 0px #f7c5c0;
        background:linear-gradient(to bottom, #329404 5%, #85ddaa 100%);
        background-color:#fc8d83;
        border-radius:6px;
        border:1px solid #00ff6a;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-weight:bold;
        padding:6px 15px;
        margin-left: 10px;
        text-decoration:none;
        text-shadow:0px 1px 0px #b23e35;
        
    .finishBtn:hover {
        background:linear-gradient(to bottom, #cdebbf 5%, #7cdd8c 100%);
        background-color:#1cc254;
        }
    }
    .abortBtn {
        box-shadow:inset 0px 1px 0px 0px #f7c5c0;
        background:linear-gradient(to bottom, #f05f1c 5%, #ff0909 100%);
        background-color:#fc8d83;
        border-radius:6px;
        border:1px solid #db8504;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-weight:bold;
        padding:6px 10px;
        margin-left: 10px;
        text-decoration:none;
        text-shadow:0px 1px 0px #b23e35;
    }
    #timer {
        display:block;
        margin-left: auto;
        margin-right: auto;
        h1 {
            font-size: 6rem;
            text-align: center;
            padding-top: 10vh;
        }
    }

    .bottomMenu {
        display: grid;
        grid-template-columns: 1fr 1fr;
        position:fixed;
        width:100vw;
        height:10vh;
        position: fixed;
        bottom:0;
        background-color: #282121;
        border: 1px solid #e28445;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
    }
        
        
    @media only screen and (min-width:700px) {

    }
        
</style>