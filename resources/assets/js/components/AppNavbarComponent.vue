<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">VueExam</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#/">Home <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/load">Load Exam</a>
          </li>
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Exams
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <div v-if="exams.length">
                  <a class="dropdown-item" href="#" v-for="exam in exams">{{ exam.name }}</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#" @click.prevent="unloadAllExams">Unload All Exams</a>
                </div>
                <div v-else>
                  <div class="dropdown-item">None</div>
                </div>
              </div>
          </li>
        </ul>
      </div>
  </nav>
</template>

<script>
    export default {
      computed: {
        exams() {
          return this.$store.getters.getAvailableExams;
        }
      },
      methods: {
        unloadAllExams() {
          this.$store.commit('unloadAllExams');
        }
      }
    }
</script>