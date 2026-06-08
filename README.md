# Kanban Board

A responsive Kanban Board built with HTML, CSS, and Vanilla JavaScript that allows users to create, organize, move, and delete tasks using drag-and-drop functionality.

The project simulates a lightweight task management system where tasks can move through different workflow stages: **To Do**, **In Progress**, and **Done**.

---

## Live Demo

🔗 Live Demo: Coming Soon

---

## Features

### Task Management

* Create new tasks with title and description
* Delete tasks instantly
* Unique task identification using `crypto.randomUUID()`
* Dynamic task rendering

### Drag & Drop Workflow

* Move tasks between columns
* Visual drop indicators while dragging
* Automatic board state updates
* Real-time column count updates

### Local Storage Persistence

* Tasks remain available after page refresh
* Board state is stored in browser Local Storage
* Automatic synchronization between UI and stored data

### User Experience

* Modal-based task creation
* Auto-resizing textarea
* Toast notifications for actions
* Clean dark-themed interface
* Interactive hover effects and transitions

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (ES6+)
* Local Storage API
* Drag and Drop API
* UUID Generation (`crypto.randomUUID()`)

---

## Project Structure

```text
kanban-board/
│
├── Screenshots/
│   ├── board-view.png
│   ├── create-task.png
│   └── drag-drop.png
│
├── index.html
├── style.css
├── script.js
├── README.md
└── LICENSE
```

---

## How It Works

### Creating Tasks

Users can create tasks through a modal form.

Each task contains:

* Unique ID
* Title
* Description

New tasks are automatically added to the **To Do** column.

---

### Drag and Drop System

The application uses the native HTML Drag and Drop API.

Workflow:

1. Drag a task card.
2. Drop it into another column.
3. Board state updates.
4. Local Storage updates.
5. UI re-renders automatically.

---

### State Management

The board data is maintained using a centralized object structure:

```javascript
{
    toDo: [],
    inProgress: [],
    done: []
}
```

This object acts as the single source of truth for the application.

---

## Challenges Faced

### 1. Implementing Drag and Drop Functionality

The most challenging part of this project was implementing drag-and-drop interactions between columns.

While moving tasks visually was straightforward, ensuring that the underlying board data structure updated correctly after every drop required careful handling of task IDs, task references, and column state updates.

I also had to ensure that Local Storage remained synchronized whenever a task was moved between workflow stages.

### 2. Managing Dynamic Textarea Resizing

Another challenge was creating a textarea that automatically expands as users type longer descriptions.

Initially, the textarea would grow correctly but would not shrink properly when content was removed.

To solve this, I reset the height before recalculating the scroll height and implemented a maximum height limit with scroll support to maintain a consistent modal layout.

### 3. Maintaining Modal Layout Stability

As task descriptions became longer, the modal layout could become inconsistent.

I adjusted height calculations and overflow behavior to ensure that large descriptions remained usable without breaking the overall interface design.


---

## Key Learnings

Through this project I practiced:

* DOM Manipulation
* Event Handling
* State Management
* Local Storage
* Drag and Drop API
* Dynamic UI Rendering
* JavaScript Objects and Arrays
* CRUD Operations
* Responsive Layout Design

---

## Future Improvements

Planned enhancements:

* Edit existing tasks
* Task priorities
* Due dates
* Search and filtering
* Light/Dark mode toggle
* Task categories
* Mobile-specific drag interactions

---

## Screenshots

### Main Board

![Main Board](screenshots/board-view.png)

### Create Task Modal

![Create Task Modal](screenshots/create-task.png)

### Drag and Drop Workflow

![Drag and Drop](screenshots/drag-drop.png)

---

## Author

Hritik Srivastava

Frontend Development Learning Project
