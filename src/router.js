import { createRouter, createWebHistory } from 'vue-router';
import MentorDetail from './pages/mentors/MentorDetail.vue';
import MentorRegistration from './pages/mentors/MentorRegistration.vue';
import MentorsList from './pages/mentors/MentorsList.vue';
import ContactMentor from './pages/requests/ContactMentor.vue';
import RequestsReceived from './pages/requests/RequestsReceived.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/mentors' },
        { path: '/mentors', component: MentorsList },
        { path: '/mentors/:id', 
            component: MentorDetail, 
            props: true,
            children: [
            { path: 'contact', component: ContactMentor} // /mentors/m1/contact
        ]},
        { path: '/register', component: MentorRegistration },
        { path: '/requests', component: RequestsReceived },
        { path: '/:notFound(.*)', component: NotFound},
    ],
})

export default router;