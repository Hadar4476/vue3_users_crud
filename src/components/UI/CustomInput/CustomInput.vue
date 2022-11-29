<template>
  <div :class="{ 'custom-input': true, 'input-error': inputError }">
    <label v-if="inputLabel" :for="inputId || inputName"
      >{{ inputLabel }}:</label
    >
    <select
      v-if="inputType === 'select'"
      :id="inputId || inputName"
      :name="inputName"
      :value="inputValue"
      size="1"
      @change="emitOnInputChange($event)"
    >
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <input
      v-else
      :id="inputId || inputName"
      :name="inputName"
      :type="inputType"
      :value="inputValue"
      @input="emitOnInputChange($event)"
    />
    <span v-if="inputError" class="error">{{ inputError }}</span>
  </div>
</template>

<script>
  export default {
    name: "custom-input",
    props: {
      inputId: {
        type: String,
      },
      inputName: {
        type: String,
      },
      inputType: {
        type: String,
      },
      inputValue: {
        type: String,
        default: () => "",
      },
      inputLabel: {
        type: String,
      },
      inputError: {
        type: String,
        default: () => "",
      },
      options: {
        type: Array,
      },
    },
    methods: {
      emitOnInputChange(event) {
        this.$emit("onInputChange", event);
      },
    },
  };
</script>

<style lang="scss" scoped>
  .custom-input {
    display: flex;
    flex-direction: column;

    select,
    input {
      margin-top: 14px;
      height: 42px;
      border-radius: 4px;
      padding: 0 10px;
      border: 1px solid $color-gray;
    }

    select,
    option {
      text-transform: capitalize;
    }

    .error {
      margin-top: 11px;
      color: $color-secondary;
    }
  }

  .input-error {
    select,
    input {
      border-color: $color-secondary;
    }
  }
</style>
