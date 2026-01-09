# Kanban Board Assignment

React implementation of a Trello-style Kanban board using local state management only.

This project focuses on state modeling, immutability, and predictable UI updates using React functional components and hooks.

---

## Features

- Add tasks to any column
- Edit task titles
- Delete tasks
- Move tasks between columns (Backlog → In Progress → Done)
- Task count displayed per column
- Trello-inspired UI
- Local state only (no Redux, no backend)

---

## Columns

- Backlog
- In Progress
- Done

Each column maintains its own list of tasks.

---
![Kanban Board UI](./Screenshot%20(124).png)

## State Management

The entire board is stored in a single React state object.

```js
{
  columns: {
    backlog: { title: "Backlog", tasks: [] },
    inProgress: { title: "In Progress", tasks: [] },
    done: { title: "Done", tasks: [] }
  }
}



