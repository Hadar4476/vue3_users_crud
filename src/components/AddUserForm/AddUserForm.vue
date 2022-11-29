<template>
  <div class="add-user-form">
    <span class="title">Create user</span>
    <form @submit.prevent="onAddUser">
      <CustomInput
        inputId="name"
        inputName="name"
        inputType="name"
        :inputValue="name"
        inputLabel="Name"
        :inputError="errors.nameValueError"
        @onInputChange="onInputChange"
      />
      <CustomInput
        inputId="role"
        inputName="role"
        inputType="select"
        :inputValue="role"
        inputLabel="Role"
        :inputError="errors.roleValueError"
        :options="roleOptions"
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
        inputId="email"
        inputName="email"
        inputType="email"
        :inputValue="email"
        inputLabel="Email"
        :inputError="errors.emailValueError"
        @onInputChange="onInputChange"
      />
      <div class="actions">
        <button class="submit-btn" type="submit">Submit</button>
        <button class="cancel-btn" type="button" @click="onCloseModal"
          >Cancel</button
        >
      </div>
    </form>
  </div>
</template>

<script>
  import axios from "../../my-axios";

  import CustomInput from "../UI/CustomInput/CustomInput.vue";

  export default {
    name: "add-user-form",
    components: {
      CustomInput,
    },
    data() {
      return {
        name: "",
        role: "",
        roleOptions: ["user", "admin"],
        password: "",
        email: "",
        errors: {
          nameValueError: "",
          roleValueError: "",
          passwordValueError: "",
          emailValueError: "",
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
      async onAddUser() {
        try {
          const headers = { Authorization: `Bearer ${this.currentUser.token}` };

          const newUser = {
            name: this.name,
            role: this.role,
            password: this.password,
            email: this.email,
          };

          const response = (await axios.post("users", newUser, { headers }))
            .data;

          this.addUser(response);
          this.onCloseModal();
        } catch (error) {
          if (error && error.response) {
            const { message } = error.response.data;

            message.split(",").forEach((text) => {
              const isNameError = text.toLowerCase().includes("name");
              const isRoleError = text.toLowerCase().includes("role");
              const isPasswordError = text.toLowerCase().includes("password");
              const isEmailError = text.toLowerCase().includes("email");

              if (isNameError) {
                this.errors.nameValueError = this.generateInputErrorMessage(
                  text,
                  "name"
                );
              }

              if (isRoleError) {
                this.errors.roleValueError = this.generateInputErrorMessage(
                  text,
                  "role"
                );
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
      onCloseModal() {
        this.$emit("closeModal");
      },
    },
  };
</script>

<style lang="scss" scoped>
  .add-user-form {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    height: 100%;
    padding: 32px 16px;
    margin: 0 auto;
    max-width: 595px;
    background-color: $color-white;

    .submit-btn {
      background-color: $color-primary;
      color: $color-white;
    }

    .cancel-btn {
      background-color: $color-secondary;
      color: $color-white;
    }

    @media (min-width: 595px) {
      padding: 20px;
    }
  }
</style>
