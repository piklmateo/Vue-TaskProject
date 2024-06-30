<script lang="ts">
import type { Task } from "@/types/types";
import { addTask } from "../services/TaskService";

export default {
  data() {
    return {
      formData: {
        heading: "",
        content: "",
      } as Task,
    };
  },
  methods: {
    async AddNewTask() {
      await addTask(this.formData);
      this.$emit("task-added");
      this.formData.heading = "";
      this.formData.content = "";
    },
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="AddNewTask" class="form" method="post">
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
        <label for="content">content</label>
        <textarea
          v-model="formData.content"
          type="text"
          name="content"
          id="content"
          rows="10"
        ></textarea>
      </div>
      <div class="form-button-container">
        <button class="btn btn-add-task">Add task</button>
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
.btn-add-task {
  background-color: rgb(65, 65, 255);
  color: white;
  padding: 0.5rem;
  width: fit-content;
}

.btn-add-task:hover {
  background-color: rgb(24, 24, 122);
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
