<template>
    <div>
        <div v-if="exam">
            <h1>{{ exam.name }}</h1>
            <hr>
            <button @click="getNextQuestion">Next Random</button>
            <p>Question: {{ currentQuestion.question }}</p>
            <p v-for="(answer, letter) in currentQuestion.answer_bank">{{ letter }}: {{ answer }}</p>
        </div>
        <div v-else>Exam not found.</div>
    </div>
</template>

<script>
    import { randomNoRepeats } from '../utils.js';
    export default {
        props: ['examHash'],
        data() {
            return {
                exam: false,
                currentQuestion: {}
            }
        },
        methods: {
            getRandomQuestion() {
                this.randomQuestionGenerator = randomNoRepeats(this.exam.questions);
                return this.randomQuestionGenerator();
            },
            getNextQuestion() {
                this.currentQuestion = this.getRandomQuestion();
            }
        },
        mounted() {
            let exam = this.$store.getters.getExamByHash(this.examHash);
            if (exam.length) {
                this.exam = exam[0];
                this.getNextQuestion();
            }

        }
    }
</script>