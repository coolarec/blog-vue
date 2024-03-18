import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/frame.vue"),
    meta: {
      breadcrumb: "Home",
    },
    children: [
      {
        path: "",
        name: "home1",
        component: () => import("../views/index.vue"),
        meta: {
          breadcrumb: "",
        },
      },
      {
        path: ":id",
        name: "Page",
        component: () => import("../views/index.vue"),
        meta: {
          breadcrumb: "{{ id }}",
        },
      },
      {
        path: "/links",
        component:()=>import('../components/friends.vue'),
        meta: {
          breadcrumb: "friends",
        },
      },
    ],
  },
  {
    path: "/page",
    name: "page",
    component: () => import("../views/frame.vue"),
    meta: {
      breadcrumb: "Home",
    },
    children: [
      {
        path: "",
        redirect: "/",
      },
      {
        path: ":id",
        name: "page1",
        component: () => import("../views/page.vue"),
        meta: {
          breadcrumb: "article-{{ id }}",
        },
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/admin.vue"),
    meta: { requiresAuth: true },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next(from);
    } else {
      // 如果用户已经登录，则继续导航
      next();
    }
  } else {
    // 如果不需要登录权限，则直接导航
    next();
  }
});
function isLoggedIn() {
  const cookies = Object.fromEntries(
    document.cookie.split("; ").map((cookie) => cookie.split("="))
  );
  const username = cookies["username"];
  return username !== undefined;
}

export default router;
