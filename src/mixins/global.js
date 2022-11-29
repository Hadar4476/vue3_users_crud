import { mapGetters, mapActions } from "vuex";

const mixin = {
  data() {
    return {
      windowWidth: window.innerWidth,
    };
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth;
    };
  },
  computed: {
    ...mapGetters({
      currentUser: "getCurrentUser",
      users: "getUsers",
    }),
    isMobile() {
      return this.windowWidth < 768;
    },
  },
  methods: {
    ...mapActions([
      "loginUser",
      "initUsers",
      "addUser",
      "editUser",
      "deleteUser",
    ]),
    generateInputErrorMessage(text, field) {
      const capitalizedField =
        field.charAt(0).toUpperCase() + field.slice(1).toLowerCase();

      const errorMessage = text
        .toLowerCase()
        .replace(field, "")
        .replace(/\"/g, "")
        .replace(/\\/g, "")
        .trim();

      return `${capitalizedField} ${errorMessage}`;
    },
  },
};

export default mixin;
