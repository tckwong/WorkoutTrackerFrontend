<template>
    <div class="container">
        <h4>{{ exerciseName }}</h4>
        <p>Reps: {{ reps }} x Sets: {{ sets }} x Weight: {{ weight }}</p>
    </div>
</template>

<script>
    export default {
        name: 'WorkoutHistoryExList',
        props: {
            exerciseName : String,
            reps : Number,
            sets : Number,
            weight : Number,
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        margin:5px;
        border: 1px white solid;
        h4 {
            margin-top: 4px;
            color: aliceblue;
        }
        p {
            font-size: 1.2rem;
            font-weight: 300;
        }
    }
</style>