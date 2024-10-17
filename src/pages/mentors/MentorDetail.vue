<template>
  <div v-if="selectedMentor">
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>€{{ rate }}</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink" v-if=!$route.meta.hideButton @click="hideButton">Contact</base-button>
        </header> 
        <router-view></router-view> 
        <!-- where nested child will be rendered--> 
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>

export default {
  props: ["id", 'firstName', 'lastName'],
  data() {
    return {
      selectedMentor: null,
      showButton: true,
    };
  },
  methods: {
    async loadSelectedMentor() {
      await this.$store.dispatch('mentors/loadMentors', {
        forceRefresh: false,
      });

      this.selectedMentor = this.$store.getters["mentors/mentors"].find(
      (mentor) => mentor.id === this.id
      );
    },
    hideButton() {
      this.showButton = false;
    }
  },
  created() {
    this.loadSelectedMentor()
  },
  computed: {
    fullName() {
      return `${this.selectedMentor.firstName} ${this.selectedMentor.lastName}`;
    },
    contactLink() {
      return this.$route.path + "/contact";
    },
    rate() {
      return `${this.selectedMentor.hourlyRate}/hour`;
    },
    areas() {
      return this.selectedMentor.areas;
    },
    description() {
      return this.selectedMentor.description;
    },
  }
};
</script>