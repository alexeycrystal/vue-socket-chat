import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthLogin from "../components/auth/AuthLogin";
import AuthRegistration from "../components/auth/AuthRegistration";
import ChatBlock from "../components/chat/ChatBlock";

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    {path: '/login', name: 'login', component: AuthLogin},
    {path: '/registration', name: 'registration', component: AuthRegistration},
    {
      path: '/chat', name: 'chat', component: ChatBlock, children: [],
    }
  ],
});
