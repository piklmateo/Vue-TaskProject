<script lang="ts">
import TaskCard from "./TaskCard.vue";
import NewTaskForm from "./NewTaskForm.vue";
import { fetchTasks } from "../services/TaskService";
import type { Task } from "../types/types";
import EditTaskForm from "./EditTaskForm.vue";

export default {
  components: {
    NewTaskForm,
    TaskCard,
    EditTaskForm,
  },
  data() {
    return {
      tasks: [] as Task[],
      showNewTaskForm: false,
      showEditTaskForm: false,
      taskToEdit: null as Task | null,
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const fetchedTasks = await fetchTasks();
        this.tasks = fetchedTasks;
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    },

    handleTaskDeleted(id: number) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    toggleNewTaskForm() {
      this.showNewTaskForm = !this.showNewTaskForm;
    },
    toggleEditTaskForm(task: Task) {
      this.taskToEdit = task;
      this.showEditTaskForm = !this.showEditTaskForm;
    },
    async handleTaskAdded() {
      await this.fetchTasks();
      this.showNewTaskForm = false;
    },
    async handleTaskEdited() {
      await this.fetchTasks();
      this.showEditTaskForm = false;
      this.taskToEdit = null;
    },
  },
};
</script>

<template>
  <div class="nes">
    <section class="task-dashboard">
      <div class="new-task-button-container">
        <button
          :class="!showNewTaskForm ? 'btn-open' : 'btn-close'"
          @click="toggleNewTaskForm"
        >
          <img
            :src="!showNewTaskForm ? '/assets/plus.svg' : '/assets/minus.svg'"
            alt="toggle-icon"
            width="40"
            height="40"
          />
        </button>
      </div>
      <NewTaskForm
        v-if="showNewTaskForm"
        @task-added="handleTaskAdded"
        @canceled="toggleNewTaskForm"
      />
      <EditTaskForm
        v-if="showEditTaskForm"
        :task="taskToEdit"
        @task-edited="handleTaskEdited"
        @canceled="toggleEditTaskForm"
      />
      <div class="task-grid">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :task="task"
          @task-deleted="handleTaskDeleted"
          @edit-task="toggleEditTaskForm"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.task-dashboard {
  margin: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.new-task-button-container {
  display: flex;
  justify-content: end;
}
.task-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.btn-close {
  border: none;
  background-color: red;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.btn-close:hover {
  background-color: rgb(255, 97, 97);
}

.btn-open {
  border: none;
  background-color: green;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  padding: 0;
  margin: 0;
  cursor: pointer;
}

.btn-open:hover {
  background-color: rgb(74, 133, 74);
}

@media (min-width: 600px) {
  .task-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .task-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1150px) {
  .task-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1350px) {
  .task-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
