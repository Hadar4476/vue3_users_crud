<template>
  <div class="register-page">
    <span class="title">Register</span>
    <form @submit.prevent="onRegister">
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
      <CustomInput
        inputId="name"
        inputName="name"
        inputType="name"
        :inputValue="name"
        inputLabel="Name"
        :inputError="errors.nameValueError"
        @onInputChange="onInputChange"
      />
      <div class="checkbox-input">
        <input
          id="terms_of_use"
          name="termsOfUse"
          type="checkbox"
          :value="termsOfUse"
          v-model="termsOfUse"
        />
        <label
          :class="{ 'checkbox-error': errors.termsOfUseValueError }"
          for="terms_of_use"
          >I agree to the terms and use</label
        >
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
  import axios from "../../../../my-axios";
  import CustomInput from "../../../UI/CustomInput/CustomInput.vue";

  export default {
    name: "register-page",
    components: {
      CustomInput,
    },
    data() {
      return {
        email: "",
        password: "",
        name: "",
        termsOfUse: false,
        errors: {
          emailValueError: "",
          passwordValueError: "",
          nameValueError: "",
          termsOfUseValueError: "",
        },
      };
    },
    watch: {
      termsOfUse(val) {
        this.errors.termsOfUseValueError = val && "";
      },
    },
    methods: {
      onInputChange({ target }) {
        const { name, value } = target;

        this[name] = value;

        if (this.errors[`${name}ValueError`]) {
          this.errors[`${name}ValueError`] = "";
        }
      },
      async onRegister() {
        if (!this.termsOfUse) {
          this.errors.termsOfUseValueError = " ";
          return;
        }

        try {
          const response = (
            await axios.post("auth/register", {
              email: this.email,
              password: this.password,
              name: this.name,
            })
          ).data;

          if (response.user && response.user.id) {
            this.$router.push("/auth/login");
          }
        } catch (error) {
          if (error && error.response) {
            const { message } = error.response.data;

            message.split(",").forEach((text) => {
              const lowerCaseText = text.toLowerCase();
              const isEmailError = lowerCaseText.includes("email");
              const isPasswordError = lowerCaseText.includes("password");
              const isNameError = lowerCaseText.includes("name");

              if (isEmailError) {
                this.errors.emailValueError = this.generateInputErrorMessage(
                  text,
                  "email"
                );
              }

              if (isPasswordError) {
                this.errors.passwordValueError = this.generateInputErrorMessage(
                  text,
                  "password"
                );
              }

              if (isNameError) {
                this.errors.nameValueError = this.generateInputErrorMessage(
                  text,
                  "name"
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
  .register-page {
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

    .checkbox-input {
      display: flex;
      align-items: center;
      gap: 8px;

      input {
        width: 16px;
        height: 16px;
      }

      .checkbox-error {
        color: $color-secondary;
      }
    }

    @media (min-width: 595px) {
      padding: 0;
    }
  }
</style>
