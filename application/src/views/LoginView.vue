<template>
    <NavigationComponent />
    <form name="login-form" >
      <div>
        <label for="username">Username: </label>
        <input id="username" type="text" />
      </div>
      <div >
        <label for="password">Password: </label>
        <input id="password" type="password" />
      </div>
      <button type="submit">
        Login
      </button>
    </form>
</template>

<script>
import NavigationComponent from "@/components/NavigationComponent.vue";

export default {
  name: "LoginView",
  components: { NavigationComponent }
}
  

</script>