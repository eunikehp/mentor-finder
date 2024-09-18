<template>
  <section>
    <mentor-filter @change-filter="setFilters"></mentor-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button v-if="!isMentor" link to="/register">Register as Mentor</base-button> <!-- button will show if user is not a mentor-->
      </div>
      <ul v-if="hasMentors">
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
import MentorFilter from "@/components/mentors/MentorFilter.vue";

export default {
  components: { MentorItem, BaseCard, BaseButton, MentorFilter },
  data(){
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      }
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
      return this.$store.getters["mentors/hasMentors"];
    },
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    }
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