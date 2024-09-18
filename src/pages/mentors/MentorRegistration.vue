<template>
  <section>
    <base-card>
      <h2>Register as a mentor now!</h2>
      <mentor-form @save-data="saveData"></mentor-form>
    </base-card>
  </section>
</template>

<script>
import MentorForm from '@/components/mentors/MentorForm.vue';

export default {
    components: {MentorForm},
    methods: {
      saveData(data) {
        this.$store.dispatch('mentors/addMentor', data);

        //go to next page
        this.$router.replace('/mentors') //same as push, but 'replace' we cant go back to page we came from afterward.
      }
    }
};
</script>