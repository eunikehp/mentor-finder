<template>
  <section>
    <mentor-filter @change-filter="setFilters"></mentor-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline" @click="loadMentors">Refresh</base-button>
        <base-button v-if="!isMentor && !isLoading" link to="/register">Register as Mentor</base-button> <!-- button will show if user is not a mentor-->
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasMentors">
        <mentor-item
          v-for="mentor in filteredMentors"
          :key="mentor.id"
          :id="mentor.id"
          :first-name="mentor.firstName"
          :last-name="mentor.lastName"
          :rate="mentor.hourlyRate"
          :areas="mentor.areas"
        ></mentor-item>
      </ul>
      <h3 v-else>No mentors found.</h3>
    </base-card>
  </section>
</template>
 
<script>
import MentorItem from "@/components/mentors/MentorItem.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseSpinner from "@/components/ui/BaseSpinner.vue";
import MentorFilter from "@/components/mentors/MentorFilter.vue";

export default {
  components: { MentorItem, BaseCard, BaseButton, MentorFilter, BaseSpinner },
  data(){
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: false,
    }
  },
  computed: {
    //check if user is already a mentor. 
    isMentor(){
      return this.$store.getters['mentors/isMentor'];
    },
    filteredMentors() {
      const mentors = this.$store.getters["mentors/mentors"]; //namespaced/getters
      return mentors.filter(mentor => {  //only show mentors that match the filter
        if (this.activeFilters.frontend && mentor.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && mentor.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && mentor.areas.includes('career')) {
          return true;
        }
        return false;
      })
    },
    hasMentors() {
      return this.$store.getters["mentors/hasMentors"] && !this.isLoading; 
      // to tell list of mentors disappears if we are loading has mentor
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadMentors(){
      this.isLoading = true;
      await this.$store.dispatch('mentors/loadMentors'); //namespace/actions
      this.isLoading = false
    }
  },
  created() {
    this.loadMentors();

  }
};
</script>


<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>