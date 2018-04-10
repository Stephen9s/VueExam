<template>
    <v-container fluid>
        <v-layout row wrap>
            <div v-if="isInitialized">
                <div v-if="isStarted">
                    <div class="headline">{{ exam.name }}</div>
                    <hr>
                    <component v-bind:is="currentQuestionComponent" v-bind="currentQuestionProps" :key="currentQuestion.question"></component>
                    <v-flex xs12>
                        <v-btn color="info" @click="checkAnswer">Submit</v-btn>
                        <v-btn color="warning" @click="getNextQuestion">Skip</v-btn>
                    </v-flex>
                </div>
                <div v-else>
                    <v-btn color="success" @click="startExam">Start Exam</v-btn>
                </div>
            </div>
            <div class="headline" v-else>Exam not found.</div>
        </v-layout>
    </v-container>
</template>

<script>
    import { randomNoRepeats } from '../utils.js';
    import SingleChoiceQuestionComponent from './SingleChoiceQuestionComponent.vue';
    import MultipleChoiceQuestionComponent from './MultipleChoiceQuestionComponent.vue';
    import { examStates } from './ExamStates.js';

    export default {
        components: {
            'single-choice-question-component': SingleChoiceQuestionComponent,
            'multiple-choice-question-component': MultipleChoiceQuestionComponent
        },
        props: {
            examHash: {
                type: String,
                required: true
            },
            timed: {
                type: Number,
                default: 0,
                required: false
            },
            showAnswerOnIncorrect: {
                type: Boolean,
                default: false,
                required: false
            },
            showExplanation: {
                type: Boolean,
                default: false,
                required: false
            },
            trackIncorrectionQuestions: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        data() {
            return {
                exam: false,
                currentQuestion: {},
                currentQuestionComponent: {},
                bus: new Vue(),
                incorrectionQuestions: new Set(),
                examState: -1
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
            },
            addIncorrectQuestionHash(questionHash) {
                this.incorrectionQuestions.add(questionHash);
            },
            startExam() {
                this.examState = examStates.STARTED;
                this.getNextQuestion();
            }
        },
        computed: {
            currentQuestionProps: function() {
                return { data: this.currentQuestion, bus: this.bus };
            },
            isInitialized() {
                return this.examState >= examStates.INITIALIZED;
            },
            isStarted() {
                return this.examState >= examStates.STARTED;
            },
            isPaused() {
                return  this.examState === examStates.PAUSED;
            },
            isFinished() {
                return this.examState === examStates.FINISHED;
            }
        },
        mounted() {
            let exam = this.$store.getters.getExamByHash(this.examHash);
            console.log(exam);
            if (exam.length) {
                this.exam = exam[0]; 
                this.examState = examStates.INITIALIZED;

                this.bus.$on('startExam', this.startExam);
                this.bus.$on('endExam', this.endExam);
                this.bus.$on('pauseExam', this.pauseExam);
                this.bus.$on('nextQuestion', this.getNextQuestion);
                this.bus.$on('addIncorrectQuestionHash', this.addIncorrectQuestionHash);
            }
        }
    }
</script>