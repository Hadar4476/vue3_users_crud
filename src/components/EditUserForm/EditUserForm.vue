<template>
  <div class="edit-user-form">
    <span class="title">Edit user</span>
    <form v-if="userToEdit" @submit.prevent="onEditUser">
      <CustomInput
        inputId="name"
        inputName="name"
        inputType="name"
        :inputValue="userToEdit.name"
        inputLabel="Name"
        :inputError="errors.nameValueError"
        @onInputChange="onInputChange"
      />
      <CustomInput
        inputId="email"
        inputName="email"
        inputType="email"
        :inputValue="userToEdit.email"
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
    name: "edit-user-form",
    components: {
      CustomInput,
    },
    props: {
      userId: {
        type: String,
      },
    },
    data() {
      return {
        userToEdit: null,
        errors: {
          nameValueError: "",
          emailValueError: "",
        },
      };
    },
    created() {
      const userToEdit = this.users.find((u) => u.id === this.userId);

      this.userToEdit = { ...userToEdit };
    },
    methods: {
      onInputChange({ target }) {
        const { name, value } = target;

        this.userToEdit[name] = value;

        if (this.errors[`${name}ValueError`]) {
          this.errors[`${name}ValueError`] = "";
        }
      },
      async onEditUser() {
        try {
          const headers = { Authorization: `Bearer ${this.currentUser.token}` };

          const response = (
            await axios.patch(
              `users/${this.userId}`,
              { name: this.userToEdit.name, email: this.userToEdit.email },
              { headers }
            )
          ).data;

          this.editUser(response);
          this.onCloseModal();
        } catch (error) {
          if (error && error.response) {
            const { message } = error.response.data;

            message.split(",").forEach((text) => {
              const lowerCaseText = text.toLowerCase();
              const isNameError = lowerCaseText.includes("name");
              const isEmailError = lowerCaseText.includes("email");

              if (isNameError) {
                this.errors.nameValueError = this.generateInputErrorMessage(
                  text,
                  "name"
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
  .edit-user-form {
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
