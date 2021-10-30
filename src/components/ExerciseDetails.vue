<template>
    <section>
        <b-card
            header-text-variant="white"
            header-tag="header"
            header-bg-variant="dark"
            style="max-width: 100vw;"
        >
        <b-card-title>{{exerciseName}}</b-card-title>
        <div class="grid-container">
            <p>Reps:</p>
            <p>Sets:</p>
            <p>Weight:</p>
            <p>Completed:</p>
            <b-col class="inputBoxWidth" sm="2">
                <b-form-input v-model="reps" placeholder="0"></b-form-input>
            </b-col>
            <b-col class="inputBoxWidth" sm="2">
                <b-form-input v-model="sets" placeholder="0"></b-form-input>
            </b-col>
            <b-col class="inputBoxWidth" sm="2">
                <b-form-input v-model="weight" placeholder="0"></b-form-input>
            </b-col>
            <b-form-checkbox
                id="checkbox-1"
                name="checkbox-1"
                value="accepted"
                size="lg"
                unchecked-value="not_accepted"
                >
            </b-form-checkbox>
            <!-- <b-card-text></b-card-text> -->
        </div>
        </b-card>
    </section>
</template>

<script>
    export default {
        name: 'ExerciseDetails',
        props: {
            exerciseId : Number,
            exerciseName : String,
            reps : Number,
            sets : Number,
            weight : Number,

        }
    }
</script>

<style lang="scss" scoped>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
    }
    .inputBoxWidth {
        width: 50px;
    }
    #checkbox-1 {
        width: 30px;
    }
    
</style>