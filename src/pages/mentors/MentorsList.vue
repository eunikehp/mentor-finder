<template>
    <section>FILTER</section>
    <section>
        <div class="controls">
            <button>Refresh</button>
            <router-link to="/register">Register as Mentor</router-link>
        </div>
        <ul v-if="hasMentors">
            <mentor-item 
            v-for="mentor in filteredMentors" 
            :key="mentor.id"
            :id="mentor.id"
            :first-name="mentor.firstName"
            :last-name="mentor.lastName"
            :rate="mentor.hourlyRate"
            :areas="mentor.areas"></mentor-item>
        </ul>
        <h3 v-else>No mentors found.</h3>
    </section>
</template>
 
<script>
import MentorItem from '@/components/mentors/MentorItem.vue';

export default {
  components: { MentorItem },
    computed: {
        filteredMentors() {
            return this.$store.getters['mentors/mentors']; //namespaced/getters
        },
        hasMentors(){
            return this.$store.getters['mentors/hasMentors']
        }
    }
}</script>


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