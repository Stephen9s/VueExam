import md5 from 'md5';
import { pick } from 'lodash';
export default {
    state: {
        bank: []
    },
    getters: {
        getAvailableExams: state => {
            return state.bank;
        },
        getExamByName: (state) => (examName) => {
            return state.bank.filter(exam => exam.examName === examName);
        },
        getExamByHash: (state) => (hash) => {
            return state.bank.filter(exam => exam.hash === hash);
        },
        examCount: (state, getters) => {
            return getters.getAvailableExams.length;
        }
    },
    mutations: {
        pushExamToBank (state, exam) {
            let hash = md5(JSON.stringify(exam));
            Vue.set(exam, 'hash', hash);
            console.log(exam);
            state.bank.push(exam);
        },
        unloadAllExams (state) {
            var r = confirm("Remove all loaded exams?");
            if (r) {
                state.bank = [];
            }
        },
        unloadExam (state, examName) {
            //delete state.bank.hash;
        }
    }
}