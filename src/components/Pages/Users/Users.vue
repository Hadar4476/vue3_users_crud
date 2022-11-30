<template>
  <div class="users-page">
    <span class="title">Users</span>
    <button class="add-user-btn" @click="onDisplayAddUserForm"
      >Create User</button
    >
    <table>
      <thead>
        <tr>
          <th widt="10%">#</th>
          <th>Email</th>
          <th>Name</th>
          <th>Role</th>
          <th>Email verified</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td class="bold">{{ index + 1 }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td class="capitalize">{{ user.role }}</td>
          <td>{{ user.isEmailVerified ? "Yes" : "No" }}</td>
          <td class="td-actions">
            <div v-if="!isMobile" class="actions">
              <button
                v-if="currentUser.id !== user.id"
                class="delete-btn"
                @click="onDeleteUser(user.id)"
                >Delete</button
              >
              <button class="edit-btn" @click="onDisplayEditUserForm(user.id)"
                >Edit</button
              >
            </div>
            <div v-else class="actions">
              <img
                v-if="currentUser.id !== user.id"
                class="icon"
                :src="deleteIcon"
                alt="delete-icon"
                @click="onDeleteUser(user.id)"
              />
              <img
                class="icon"
                :src="editIcon"
                alt="edit-icon"
                @click="onDisplayEditUserForm(user.id)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal v-if="shouldDisplayModal" @closeModal="closeModal">
      <AddUserForm v-if="modalActionType === 'add'" @closeModal="closeModal" />
      <EditUserForm v-else :userId="userToEditId" @closeModal="closeModal" />
    </Modal>
  </div>
</template>

<script>
  import Modal from "../../UI/Modal/Modal.vue";
  import AddUserForm from "../../AddUserForm/AddUserForm.vue";
  import EditUserForm from "../../EditUserForm/EditUserForm.vue";

  import deleteIcon from "../../../assets/images/delete-icon.png";
  import editIcon from "../../../assets/images/edit-icon.png";

  export default {
    name: "users-page",
    components: {
      Modal,
      AddUserForm,
      EditUserForm,
    },
    data() {
      return {
        shouldDisplayModal: false,
        modalActionType: "",
        userToEditId: "",
        deleteIcon,
        editIcon,
      };
    },
    async created() {
      await this.initUsers();
    },
    methods: {
      openModal() {
        this.shouldDisplayModal = true;
      },
      closeModal() {
        this.shouldDisplayModal = false;
      },
      onDisplayAddUserForm() {
        this.openModal();
        this.userToEditId = "";
        this.modalActionType = "add";
      },
      onDisplayEditUserForm(userId) {
        this.openModal();
        this.userToEditId = userId;
        this.modalActionType = "edit";
      },
      onDeleteUser(userId) {
        this.deleteUser(userId);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .users-page {
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    margin: 0 auto;
    max-width: 1120px;

    .add-user-btn {
      width: 125px;
      height: 39px;
      color: $color-white;
      background-color: $color-primary;
      border-radius: 4px;
      border: none;
      align-self: flex-end;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
    }

    table {
      border-collapse: collapse;
      margin-top: 18px;
      border-top: 1px solid $color-gray;

      tr {
        border-bottom: 1px solid $color-gray;
      }

      td,
      th {
        font-size: 12px;
        text-align: unset;
        color: $color-black;
        height: 40px;
      }

      th,
      .bold {
        font-weight: 800;
      }

      .capitalize {
        text-transform: capitalize;
      }

      tbody {
        .actions {
          justify-content: flex-end;
        }

        .delete-btn {
          background-color: $color-secondary;
          color: $color-white;
        }

        .edit-btn {
          background-color: $color-primary;
          color: $color-white;
        }

        .icon {
          cursor: pointer;
          width: 16px;
          height: 16px;
        }
      }
    }

    @media (min-width: 768px) {
      table {
        td,
        th {
          font-size: 16px;
          height: 52px;
          padding: 0 16px;
        }
      }
    }

    @media (min-width: 1024px) {
      table {
        td,
        th {
          padding: 0 43px;
        }
      }
    }
  }
</style>
