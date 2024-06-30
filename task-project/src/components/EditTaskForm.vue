<script lang="ts">
import { defineComponent, watch } from "vue";
import type { Task } from "@/types/types";
import { editTask } from "../services/TaskService";

export default defineComponent({
  props: {
    task: {
      type: Object as () => Task | null,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        heading: "",
        content: "",
      } as Task,
    };
  },
  watch: {
    task: {
      immediate: true,
      handler(newTask) {
        this.formData = { ...newTask };
      },
    },
  },
  methods: {
    async EditTask() {
      await editTask(this.formData, this.formData.id);
      this.$emit("task-edited");
      this.formData.heading = "";
      this.formData.content = "";
    },
  },
});
</script>

<template>
  <div>
    <form @submit.prevent="EditTask" class="form" method="post">
      <div class="input-container">
        <label for="heading">Heading</label>
        <input
          v-model="formData.heading"
          type="text"
          name="heading"
          id="heading"
        />
      </div>
      <div class="input-container">
        <label for="content">Content</label>
        <textarea
          v-model="formData.content"
          type="text"
          name="content"
          id="content"
          rows="10"
        ></textarea>
      </div>
      <div class="form-button-container">
        <button class="btn btn-edit-task">Edit task</button>
        <button @click="$emit('canceled')" class="btn btn-cancel">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.input-container {
  display: flex;
  flex-direction: column;
  text-transform: capitalize;
}
.input-container > input {
  padding: 0.5rem;
}
.input-container > input:focus,
.input-container > textarea:focus {
  outline: none;
}
.form-button-container {
  display: flex;
  justify-content: end;
  gap: 1rem;
}
.btn-edit-task {
  background-color: rgb(207, 169, 0);
  color: white;
  padding: 0.5rem;
  width: fit-content;
}
.btn-edit-task:hover {
  background-color: rgb(122, 120, 24);
}

.btn-cancel {
  background-color: rgb(255, 65, 65);
  color: white;
  padding: 0.5rem;
  width: fit-content;
}
.btn-cancel:hover {
  background-color: rgb(122, 24, 24);
}
</style>
