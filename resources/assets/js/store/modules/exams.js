export default {
    state: {
        bank: []
    },
    getters: {
        getAvailableExams: state => {
            return state.bank;
        }
    },
    mutations: {
        pushExamToBank (state, exam) {
            state.bank.push(exam);
        },
        unloadAllExams (state) {
            var r = confirm("Remove all loaded exams?");
            if (r) state.bank = [];
        }
    }
}