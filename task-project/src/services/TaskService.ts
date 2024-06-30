import type { Task } from "@/types/types";

const API = import.meta.env.VITE_JSON_SERVER_API;

export const fetchTasks = async () => {
  try {
    const res = await fetch(API, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const addTask = async (task: Task) => {
  try {
    if (!task || !task.heading || !task.content) {
      alert("Please enter a valid task");
      return;
    }

    console.log("Adding task:", task);
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!res.ok) {
      alert("Error while adding task");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const editTask = async (task: Task, id: number) => {
  try {
    if (!task || !task.heading || !task.content) {
      alert("Please enter a valid task");
      return;
    }

    console.log("Editing task:", task);
    const res = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!res.ok) {
      alert("Error while adding task");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};

export const removeTask = async (id: number) => {
  try {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!res.ok) {
      alert("Error while removing task");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};
