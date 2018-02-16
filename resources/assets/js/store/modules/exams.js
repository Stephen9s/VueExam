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
            state.bank.push(exam);
        },
        unloadAllExams (state) {
            var r = confirm("Remove all loaded exams?");
            if (r) {
                state.bank = [];
            }
        },
        unloadExam (state, hash) {
            state.bank = _.reject(state.bank, { hash: hash});
        }
    },
    actions: {
        pushExamToBank ({commit, getters}, exam) {
            return new Promise((resolve, reject) => {
                let hash = md5(JSON.stringify(exam));
                let existingExam = getters.getExamByHash(hash);
                if (existingExam.length === 0) {
                    Vue.set(exam, 'hash', hash);
                    Vue.set(exam, 'metadata', {});
                    Vue.set(exam.metadata, 'question_count', exam.questions.length);
                    commit('pushExamToBank', exam);
                    resolve();
                } else {
                    reject('Exam already loaded.');
                }
            });
        },
        unloadAllExams({commit}) {
            commit('unloadAllExams');
        },
        unloadExam({commit}, hash) {
            return new Promise((resolve, reject) => {
                try {
                    commit('unloadExam', hash);
                    resolve('Exam deleted.');
                } catch (err) {
                    reject('Failed to delete.');
                }
            });
        }
    }
}