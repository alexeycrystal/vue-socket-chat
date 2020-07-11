import Vue from 'vue';
import VueRouter from 'vue-router';

import {store} from "../store";

import AuthLogin from "../components/auth/AuthLogin";
import AuthRegistration from "../components/auth/AuthRegistration";
import ChatBlock from "../components/chat/ChatBlock";

import middlewarePipeline from "./middlewarePipeline";
import guest from "./middleware/guest";
import auth from "./middleware/auth";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: AuthLogin,
      meta: {
        middleware: [
          guest
        ]
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: AuthRegistration
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatBlock,
      children: [],
      meta: {
        middleware: [
          auth
        ]
      },
    }
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })

})

export default router;
