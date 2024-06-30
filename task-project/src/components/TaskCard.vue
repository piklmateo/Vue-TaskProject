<script lang="ts">
import { defineComponent } from "vue";
import { removeTask } from "@/services/TaskService";
import type { Task } from "@/types/types";

export default defineComponent({
  props: {
    task: {
      type: Object as () => Task,
      required: true,
    },
  },
  methods: {
    async deleteTask(id: number) {
      try {
        await removeTask(id);
        this.$emit("task-deleted", id);
      } catch (error) {
        console.error("Error removing task: ", error);
      }
    },
  },
});
</script>

<template>
  <div class="task-card">
    <div class="task-heading-container">
      <h1>{{ task.heading }}</h1>
    </div>
    <div class="task-content-container">
      <p>{{ task.content }}</p>
    </div>
    <div class="task-buttons-container">
      <button @click="$emit('edit-task', task)" class="btn btn-edit">
        Edit
      </button>
      <button @click="deleteTask(task.id)" class="btn btn-delete">
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #2d2d2d;

  margin: 0 auto;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.task-heading-container {
  border-bottom: 1px solid black;
  padding: 0.5rem;
}

.task-content-container {
  padding: 0.5rem;
  flex-grow: 1;
}

.task-buttons-container {
  display: flex;
  justify-content: end;
  align-items: end;
  padding: 0.5rem;
  gap: 0.5rem;
  border-top: 1px solid #2d2d2d;
}

.btn-update {
  background-color: rgb(160, 160, 20);
  color: white;
}

.btn-delete {
  background-color: rgb(173, 52, 52);
  color: #fff;
}

.btn-delete:hover {
  background-color: rgb(124, 20, 20);
  color: #fff;
}

.btn-edit {
  background-color: rgb(170, 167, 9);
  color: #fff;
}

.btn-edit:hover {
  background-color: rgb(97, 89, 18);
  color: #fff;
}
</style>
