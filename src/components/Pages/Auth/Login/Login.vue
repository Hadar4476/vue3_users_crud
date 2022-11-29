<template>
  <div class="login-page">
    <span class="title">Login</span>
    <form @submit.prevent="onLogin">
      <CustomInput
        inputId="email"
        inputName="email"
        inputType="email"
        :inputValue="email"
        inputLabel="Email"
        :inputError="errors.emailValueError"
        @onInputChange="onInputChange"
      />
      <CustomInput
        inputId="password"
        inputName="password"
        inputType="password"
        :inputValue="password"
        inputLabel="Password"
        :inputError="errors.passwordValueError"
        @onInputChange="onInputChange"
      />
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
  import axios from "../../../../my-axios";
  import CustomInput from "../../../UI/CustomInput/CustomInput.vue";

  export default {
    name: "login-page",
    components: {
      CustomInput,
    },
    data() {
      return {
        email: "",
        password: "",
        errors: {
          emailValueError: "",
          passwordValueError: "",
        },
      };
    },
    methods: {
      onInputChange({ target }) {
        const { name, value } = target;

        this[name] = value;

        if (this.errors[`${name}ValueError`]) {
          this.errors[`${name}ValueError`] = "";
        }
      },
      async onLogin() {
        try {
          const response = (
            await axios.post("auth/login", {
              email: this.email,
              password: this.password,
              name: this.name,
            })
          ).data;

          if (response.user && response.user.id) {
            const token = response.tokens.access.token;
            const user = { id: response.user.id, token };

            localStorage.setItem("user", JSON.stringify(user));
            this.loginUser(user);

            this.$nextTick(() => {
              this.$router.push("/users");
            });
          }
        } catch (error) {
          if (error && error.response) {
            const { message } = error.response.data;

            message.split(",").forEach((text) => {
              const isInvalidInfo = text === "Incorrect email or password";
              const isEmailError = text.toLowerCase().includes("email");
              const isPasswordError = text.toLowerCase().includes("password");

              if (isInvalidInfo) {
                this.errors.passwordValueError = text;
                return;
              }

              if (isPasswordError) {
                this.errors.passwordValueError = this.generateInputErrorMessage(
                  text,
                  "password"
                );
              }

              if (isEmailError) {
                this.errors.emailValueError = this.generateInputErrorMessage(
                  text,
                  "email"
                );
              }
            });
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .login-page {
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 0 16px;
    margin: 0 auto;
    max-width: 595px;

    button {
      background-color: $color-primary;
      color: $color-white;
    }

    @media (min-width: 595px) {
      padding: 0;
    }
  }
</style>
