<template>
    <section>
        <div>
            <h3>{{exerciseNameP}}</h3>
            <b-collapse :visible="collapsedVisible ? true : false" accordion="my-accordion" role="tabpanel">
                <b-card
                    header-text-variant="white"
                    header-tag="header"
                    header-bg-variant="dark"
                    style="max-width: 100vw;"
                >
                <b-col sm="12" md="12" lg="10">
                    <b-card-title class="cardHeading">
                        <button :class="{isVisible : isActive}" id="PreviousBtn" @click="notifyChangeFocusPrev" class="generalBtn">Prev</button>
                        <h4>{{ storeInfo.exerciseName }}</h4>
                        <button :class="{isVisibleNext : isActiveNext}" @click="notifyChangeFocusNext" class="generalBtn">Next</button>
                    </b-card-title>
                </b-col>
                <div class="grid-container">
                    <p>Reps:</p>
                    <p>Sets:</p>
                    <p>Weight(lbs):</p>
                    <b-col class="inputBoxWidth" sm="2">
                        <b-row>
                            <b-form-input type="number" id="inline-form" v-model="storeInfo.reps" placeholder="0" :min="0"></b-form-input>
                            <button @click="incrementRepsBy1" class="incrementbtn1">+1</button>
                            <button :disabled="disableRepsBtn" @click="decrementRepsBy1" class="incrementbtn1">-1</button>
                        </b-row>
                    </b-col>

                    <b-col class="inputBoxWidth" sm="2">
                        <b-row>
                            <b-form-input type="number" v-model="storeInfo.sets" placeholder="0" min="0"></b-form-input>
                            <button @click="incrementSetsBy1" class="incrementbtn1">+1</button>
                            <button :disabled="disableSetsBtn" @click="decrementSetsBy1" class="incrementbtn1">-1</button>
                        </b-row>
                    </b-col>
                    <b-col class="inputBoxWidth" sm="2">
                        <b-row>
                            <b-form-input type="number" v-model="storeInfo.weight" placeholder="0" :min="0"></b-form-input>
                            <button @click="incrementWeightBy5" class="incrementbtn1">+5</button>
                            <button :disabled="disableWeightBtn" @click="decrementWeightBy5" class="incrementbtn1">-5</button>
                        </b-row>
                    </b-col>
                </div>
                </b-card>
            </b-collapse>

        </div>
    </section>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'

    export default {
        name: 'CurrentWorkoutChild',
        props: {
            index : Number,
            workoutTitleP : String,
            exerciseIdP : Number,
            exerciseNameP : String,
            repsP : Number,
            setsP : Number,
            weightP : Number,
            userIdP : Number,
            collapsedVisible : Boolean,
            length : Number
        },

        data: () => {
            return {
                allExerciseData : [],
                exerciseRow : {},
                workoutId : null,
                userToken : null,
                isActive : false,
                isActiveNext : false,

                storeInfo : {
                    workoutId: null,
                    exerciseId: null,
                    userId: null,
                    loginToken: null,
                    exerciseName: null,
                    reps: 1,
                    sets: 1,
                    weight: 1,
                },
            }
        },
        computed: {
            getCurrState() {
                return this.$store.state.currentState
            },
            // Disables the increment button when these variables are value 0
            disableRepsBtn() {
                return this.storeInfo.reps===0
            },
            disableSetsBtn() {
                return this.storeInfo.sets===0
            },
            disableWeightBtn() {
                return this.storeInfo.weight===0
            },
        },
        methods: {
            notifyChangeFocusPrev() {
                this.$emit('notifyChangeFocusPrev',this.index);
            },
            notifyChangeFocusNext() {
                this.$emit('notifyChangeFocusNext',this.index);
            },
            expandAccordian() {
                this.myAccordianState = true
            },
            collapseAccordian() {
                this.myAccordianState = false
            },
            deleteExercise() {
                axios.request({
                    url: `${process.env.VUE_APP_BASE_DOMAIN}/api/exercises`,
                    method: 'DELETE',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    data: {
                        "loginToken" : this.userToken,
                        "exerciseId" : this.exerciseId,
                    }
                }).then(() => {
                    this.$emit('notifyParentDeleteExercise');

                }).catch((error) => {
                    console.error("There was an error: " +error);
                })
            },
            addDataToStore() {
                this.$store.dispatch('loadCurrItems',this.storeInfo);
            },
            initialData() {
                this.storeInfo = {
                    workoutId : this.$route.params.workout,
                    title : this.workoutTitleP,
                    exerciseId : this.exerciseIdP,
                    loginToken : this.userToken,
                    exerciseName : this.exerciseNameP,
                    reps : this.repsP,
                    sets : this.setsP,
                    userId : this.userIdP,
                    weight : this.weightP
                }
            },
            incrementRepsBy1() {
                this.storeInfo.reps ++
            },
            decrementRepsBy1() {
                this.storeInfo.reps --
            },
            incrementSetsBy1() {                
                this.storeInfo.sets ++
            },
            decrementSetsBy1() {
                this.storeInfo.sets --
            },
            incrementWeightBy5() {
                this.storeInfo.weight +=5
            },
            decrementWeightBy5() {
                this.storeInfo.weight -=5
            },
            getMyCookies() {
                var getCookie = cookies.get('loginData');
                this.userToken = getCookie.loginToken;
                
            },
            checkIndex() {
                this.index === 0 ? this.isActive = true : this.isActive = false;
            },
            checkIndexNext() {
                this.index === this.length-1 ? this.isActiveNext = true : this.isActiveNext = false;
            }
        },
        mounted() {
            this.getMyCookies();
            this.initialData();
            this.checkIndex();
            this.checkIndexNext();
            
        },
        watch: {
            getCurrState () {
                this.addDataToStore();
            },
            expandAccordian() {
                console.log("watcher fired");
                if(this.index === 0){
                    this.isActive = true;
                }
            },
        }
    }
</script>

<style lang="scss" scoped>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: .2fr 1fr;
        justify-content: center;
        width: 100vw;

        p {
            display: inline-block;
        }
        .generalBtn {
            height: 40px;
            grid-column: 4/5;
            grid-row: 1/3;
            align-self: center;
        }
        
    }
    #inputBox {
        display: inline-block;
        button{
            display: inline-block;
            padding-left: 5px;
            margin-left: 5px;
        }
    }
    .inputBoxWidth {
        width: 50px;
    }
    h3 {
        margin-left: 5px;
        color: rgb(202, 195, 195);
        padding: 20px 0;
    }

    // Increment counter buttons
    .incrementbtn1 {
        box-shadow:inset 0px 1px 0px 0px #ffffff;
        background:linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
        background-color:#ffffff;
        border-radius:6px;
        border:1px solid #dcdcdc;
        display:inline-block;
        cursor:pointer;
        color:#666666;
        padding:6px 24px;
        text-decoration:none;
        text-shadow:0px 1px 0px #ffffff;
    }
    .incrementbtn1:hover {
        background:linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
        background-color:#f6f6f6;
        }
        .incrementbtn1:active {
        position:relative;
        top:1px;
    }
    .cardHeading {
        display: grid;
        grid-template-columns: .3fr 1fr .3fr;
        width: 100%;
        justify-content: center;
        align-content: center;

        h4 {
            display: inline-block;
            text-align: center;
        }
    }
    .isVisible {
        opacity: 0%;
        pointer-events: none;
    }
    .isVisibleNext {
        opacity: 0%;
        pointer-events: none;
    }
    @media only screen and (min-width:700px) {
        section {
            margin-left: 15vw;
            margin-right: 15vw;

        }
        .grid-container {
            width: 80vw;
        }
    }

    
</style>