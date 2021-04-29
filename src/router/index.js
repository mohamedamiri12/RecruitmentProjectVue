import Vue from "vue";
import Router from "vue-router";

// Containers
const TheContainer = () => import("@/containers/TheContainer");

// Views
const Dashboard = () => import("@/views/Dashboard");

// Users
const Users = () => import("@/views/users/Users2");
const User = () => import("@/views/users/User");
const UserProfile = () => import("@/views/users/UserProfile");

// Admin
const AdminProfile = () => import("@/views/Administrators/AdminProfile");

// Clients
const Clients = () => import("@/views/clients/Clients");
const Client = () => import("@/views/clients/Client");
const ClientProfile = () => import("@/views/clients/ClientProfile");

//Candidates 
const Candidates = () => import("@/views/candidates/Candidates");
const Candidate = () => import("@/views/candidates/Candidate");
const CandidateProfile = () => import("@/views/candidates/CandidateProfile");

// Registration
const Login = () => import("@/views/registration/signIn");
const Register = () => import("@/views/registration/signUp");

Vue.use(Router);

let router = new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode
  linkActiveClass: "active",
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes(),
});

function configRoutes() {
  return [
    {
      path: "/",
      redirect: "/dashboard",
      name: "Home",
      component: TheContainer,
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
          meta: {
            requiresAuth: true,
            is_admin : true
          }
        },
        {
          path: "dash/profile",
          name: "AdminProfile",
          component: AdminProfile,
          meta: {
            requiresAuth: true,
            is_admin : true
          }
        },
        {
          path: "dash/users",
          meta: {
            requiresAuth: true,
            is_admin : true,
            label: "Users"
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              name: "Users",
              component: Users,
            },
            {
              path: ":id",
              meta: {
                label: "User Details",
              },
              name: "User",
              component: User,
              children: [
                {
                  path: "edit",
                  name: "Profile",
                  component: UserProfile,
                },
              ],
            },
          ],
        },
        {
          path: "dash/clients",
          meta: {
            requiresAuth: true,
            is_admin : true,
            label: "Clients"
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              name: "Clients",
              component: Clients,
            },
            {
              path: ":id",
              meta: {
                label: "Client Details",
              },
              name: "Client",
              component: Client,
              children: [
                {
                  path: "edit",
                  name: "Profile",
                  component: ClientProfile,
                },
              ],
            },
          ],
        },
        // Cnadidate Route
        {
          path: "dash/candidates",
          meta: {
            requiresAuth: true,
            is_admin : true,
            label: "Candidates"
          },
          component: {
            render(c) {
              return c("router-view");
            },
          },
          children: [
            {
              path: "",
              name: "Candidates",
              component: Candidates,
            },
            {
              path: ":id",
              meta: {
                label: "Candidate Details",
              },
              name: "Candidate",
              component: Candidate,
              children: [
                {
                  path: "edit",
                  name: "Profile",
                  component: CandidateProfile,
                },
              ],
            },
          ],
        }
      ]
    },
    /**
     *  Route For Registration & Login
     */
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        guest: true
      }
    },
  ];
}

/**
 *  Function to check Authentification before Routing
 */

 router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
      if (localStorage.getItem('token') == null) {
          next({
              path: '/login',
              params: { nextUrl: to.fullPath }
          })
      } else {
          let admin = JSON.parse(localStorage.getItem('admin'))
          if(to.matched.some(record => record.meta.is_suspended)) {
              if(admin.is_suspended == 1){
                  next()
              }
              else{
                  next({ name: 'Login'})
              }
          }else {
              next()
          }
      }
  } else if(to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('token') == null){
          next()
      }
      else{
          next({ name: 'Dashboard'})
      }
  }else {
      next()
  }
})


export default router;
