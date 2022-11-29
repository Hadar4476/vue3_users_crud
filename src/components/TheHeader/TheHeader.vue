<template>
  <header class="the-header">
    <span class="title">My App</span>
    <nav>
      <div v-if="!currentUser" class="auth-part">
        <router-link to="/auth/login">Login</router-link>
        <router-link to="/auth/register">Register</router-link>
      </div>
      <router-link v-else to="/users">Users</router-link>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "the-header",
  };
</script>

<style lang="scss" scoped>
  .the-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 60px;
    background-color: $color-primary;

    .title {
      color: $color-white;
      font-size: 23px;
    }

    nav {
      a {
        text-decoration: none;
        color: $color-white;
        font-weight: bold;
      }

      .auth-part {
        display: flex;
        align-items: center;
        gap: 10px;
      }
    }

    @media (min-width: 1440px) {
      padding: 0 32px;

      .title {
        margin: 0 130px;
      }

      nav {
        a {
          font-size: 23px;
        }

        .auth-part {
          gap: 52px;
        }
      }
    }
  }
</style>
