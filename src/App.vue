<template>
  <div class="app">
    <TheHeader />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import TheHeader from "./components/TheHeader/TheHeader.vue";

  export default {
    name: "app",
    components: {
      TheHeader,
    },
    async created() {
      const user = localStorage.getItem("user");

      if (user) {
        this.loginUser(JSON.parse(user));
        this.$router.push("/users");
      } else {
        this.$router.push("/auth/login");
      }
    },
  };
</script>

<style lang="scss">
  @import "assets/scss/global.scss";

  .app {
    main {
      padding-top: 32px;
    }

    .title {
      color: $color-black;
      font-size: 32px;
      font-weight: bold;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 26px;
      border-top: 1px solid $color-gray;
      padding-top: 29px;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    button {
      cursor: pointer;
      border: none;
      height: 39px;
      width: fit-content;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 600;
      padding: 0 16px;
    }
  }
</style>
