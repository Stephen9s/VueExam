<template>
    <div>
        <div v-if="exam">
            <h1>{{ exam.name }}</h1>
            <hr>
            <div class="container">
                <component v-bind:is="currentQuestionComponent" v-bind="currentQuestionProps" :key="currentQuestion.question"></component>
            </div>
        </div>
        <div v-else>Exam not found.</div>
    </div>
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
            }
        },
        computed: {
            currentQuestionProps: function() {
                if (this.currentQuestionComponent === 'single-choice-question-component') {
                    return { data: this.currentQuestion, bus: this.bus };
                }
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