import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import CatsView from "@/views/CatsView.vue";
import CatView from "@/views/CatView.vue";
import LoginView from "@/views/LoginView.vue";
import RandomCatView from "@/views/RandomCatView.vue";
import CatForm from "@/views/AddCatForm.vue";
import DeleteCatForm from "@/views/DeleteCatForm.vue";
import EditCatForm from "@/views/EditCatForm.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cats",
    name: "cats-view",
    component: CatsView,
  },
  {
    path: "/cat/:id",
    name: "cat",
    component: CatView,
  },
  {
    path: "/choose-for-me",
    name: "random-cat",
    component: RandomCatView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/cats/add",
    name: "addCat",
    component: CatForm,
  },
  {
    path: "/cats/edit",
    name: "editCat",
    component: EditCatForm,
  },
  {
    path: "/cats/delete",
    name: "deleteCat",
    component: DeleteCatForm,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
