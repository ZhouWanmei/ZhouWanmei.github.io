import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/layouts";

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: "/",
      name: "Login",
      component: () => import("@/views/login/index"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("@/views/register/index"),
    },
    {
      path: "/roleManage",
      component: Layout,
      children: [
        {
          path: "/roleManage",
          name: "RoleManage",
          component: () => import("@/views/userInfo/roleManage"),
          meta: {
            title: "角色管理"
          }
        },
      ],
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/404")
    },
    
  ]
})




