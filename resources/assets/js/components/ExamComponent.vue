<template>
    <v-container fluid>
        <v-layout row wrap>
            <div v-if="exam">
                <div class="headline">{{ exam.name }}</div>
                <hr>
                <component v-bind:is="currentQuestionComponent" v-bind="currentQuestionProps" :key="currentQuestion.question"></component>
                <v-flex xs12>
                    <v-btn color="info" @click="checkAnswer">Submit</v-btn>
                    <v-btn color="warning" @click="getNextQuestion">Skip</v-btn>
                </v-flex>
            </div>
            <div class="headline" v-else>Exam not found.</div>
        </v-layout>
    </v-container>
</template>

<script>
    import { randomNoRepeats } from '../utils.js';
    import SingleChoiceQuestionComponent from './SingleChoiceQuestionComponent.vue';
    import MultipleChoiceQuestionComponent from './MultipleChoiceQuestionComponent.vue';

    export default {
        props: ['examHash'],
        components: {
            'single-choice-question-component': SingleChoiceQuestionComponent,
            'multiple-choice-question-component': MultipleChoiceQuestionComponent
        },
        data() {
            return {
                exam: false,
                currentQuestion: {},
                currentQuestionComponent: {},
                bus: new Vue()
            }
        },
        methods: {
            getRandomQuestion() {
                this.randomQuestionGenerator = randomNoRepeats(this.exam.questions);
                return this.randomQuestionGenerator();
            },
            getNextQuestion() {
                this.currentQuestion = this.getRandomQuestion();
                if (this.currentQuestion.multiple === true) this.currentQuestionComponent = 'multiple-choice-question-component';
                else if (this.currentQuestion.multiple === false) this.currentQuestionComponent = 'single-choice-question-component';
            },
            checkAnswer() {
                this.bus.$emit('checkAnswer');
            }
        },
        computed: {
            currentQuestionProps: function() {
                return { data: this.currentQuestion, bus: this.bus };
            }
        },
        mounted() {
            let exam = this.$store.getters.getExamByHash(this.examHash);
            if (exam.length) {
                this.exam = exam[0];
                this.getNextQuestion();
            }
            this.bus.$on('nextQuestion', this.getNextQuestion);
        }
    }
</script>