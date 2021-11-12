<template>
    <div>
        <div :class="{ 'navbar--hidden': !showNavbar }" class="navbar">
            <button v-scroll-reveal.reset="{ delay: 250 }" @click="addExercise" class="addExerciseBtn">ADD EXERCISE</button>
            <button v-scroll-reveal.reset="{ delay: 250 }" @click="changeState" class="finishBtn">FINISH WORKOUT</button>
            <button v-scroll-reveal.reset="{ delay: 250 }" @click="endWorkout" class="addExerciseBtn endWorkoutBtn">ABORT WORKOUT</button>
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
        :accordState="exercise.accordState"
        @notifyParentDeleteExercise="retrieveExercises"
        />
        <!-- Workout Timer -->
        <h2>{{ hours }}:{{minutes}}:{{ seconds }}</h2>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
import CurrentWorkoutChild from '@/components/CurrentWorkoutChild.vue'
import '../css/currentWorkoutStyle.scss'
// import moment from 'moment'

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
            onScroll () {
                // Get the current scroll position
                const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
                // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
                if (currentScrollPosition < 0) {
                return
                }
                this.showNavbar = currentScrollPosition < this.lastScrollPosition
                // Set the current scroll position as the last scroll position
                this.lastScrollPosition = currentScrollPosition
            },
            handleScroll () {
                if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                document.getElementById("navbar").style.top = "0";
                } else {
                document.getElementById("navbar").style.top = "-150px";
                }
            },
            retrieveExercises() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/current-workout`,
                    method: 'GET',
                    params : {
                        "workoutId" : this.$route.params.workout
                    }
                }).then((response) => {
                    // const accordianState = 
                    //     {
                    //         accordState : ""
                    //     };
                    for (let i=0; i<response.data.length; i++){
                        response.data[i].userId = this.userId;
                        if (i == 0) {
                            response.data[i].accordState = true;
                        }else{
                            response.data[i].accordState = false;
                        }
                    }
                    this.allExerciseData = response.data;
                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            addExercise() {
                this.exerciseRow = {
                    exerciseName: 'New Exercise',
                    reps : 1,
                    sets : 1,
                    weight : 1,
                    userId : this.userId,

                }
                this.allExerciseData.push(this.exerciseRow);
            },
            changeState() {
                this.stateCurrent = !this.stateCurrent;
                setTimeout(this.finishWorkout, 200);
            },
            endWorkout() {
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
                }).then((response) => {
                    console.log(response)
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
            window.addEventListener('scroll', this.onScroll)
            this.updateTime();
            
        },
        beforeDestroy () {
            window.removeEventListener('scroll', this.onScroll)
}
    }
</script>

<style lang="scss" scoped>

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
    position: fixed;
    top: 1px;
    right: 1px;
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
        top: 1px;
        right: 15vw;
        position: fixed;
        box-shadow:inset 0px 1px 0px 0px #f7c5c0;
        background:linear-gradient(to bottom, #329404 5%, #85ddaa 100%);
        background-color:#fc8d83;
        border-radius:6px;
        border:1px solid #00ff6a;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Arial;
        font-size:15px;
        font-weight:bold;
        padding:6px 24px;
        margin-left: 10px;
        text-decoration:none;
        text-shadow:0px 1px 0px #b23e35;
        
    .finishBtn:hover {
        background:linear-gradient(to bottom, #cdebbf 5%, #7cdd8c 100%);
        background-color:#1cc254;
        }
    }
    
    .endWorkoutBtn {
        top: 1px;
        right: 35vw;
    }
    .navbar {
        z-index:5;
        height: 60px;
        width: 100vw;
        background: hsl(200, 50%, 50%);
        position: fixed;
        top:-60px;
        box-shadow: 0 2px 15px rgba(71, 120, 120, 0.5);
        transform: translate3d(0, 0, 0);
        transition: 0.1s all ease-out;
        }
    .navbar.navbar--hidden {
        box-shadow: none;
        transform: translate3d(0, +100%, 0);
}

</style>