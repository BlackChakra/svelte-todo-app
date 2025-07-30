<script>
  import { onMount } from 'svelte';
  import TodoList from './components/TodoList.svelte';
  import { todos } from './stores/todos.js';
  import { get } from 'svelte/store';

  let newTask = '';
  let priority = 'low'; // low, medium, high
  let darkMode = false;

  onMount(() => {
    darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) document.body.classList.add('dark');
  });

  function addTodo() {
    if (newTask.trim()) {
      todos.update(list => [...list, { text: newTask, completed: false, priority }]);
      newTask = '';
      priority = 'low';
    }
  }

  function toggleComplete(idx) {
    todos.update(list =>
      list.map((todo, i) => i === idx ? { ...todo, completed: !todo.completed } : todo)
    );
  }

  function deleteTodo(idx) {
    const item = document.getElementById(`todo-${idx}`);
    item.classList.add('slide-out');
    setTimeout(() => {
      todos.update(list => list.filter((_, i) => i !== idx));
    }, 300);
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') addTodo();
  }

  function toggleDarkMode() {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark', darkMode);
  }
</script>

<main class="min-h-screen bg-gray-100 flex flex-col items-center justify-start pt-16 transition-colors dark:bg-gray-900">
  <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md transition-colors dark:bg-gray-800">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-blue-600 dark:text-blue-400">To-Do List</h1>
      <button
        class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        on:click={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {#if darkMode}
          ☀️
        {:else}
          🌙
        {/if}
      </button>
    </div>
    <div class="flex mb-4">
      <select bind:value={priority} class="border border-gray-300 rounded-l px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        class="flex-1 border-t border-b border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        bind:value={newTask}
        on:keydown={handleKeydown}
        placeholder="Add a new task..."
      />
      <button
        class="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition dark:bg-blue-600 dark:hover:bg-blue-700"
        on:click={addTodo}
        aria-label="Add task"
      >Add</button>
    </div>
    <TodoList
      todos={$todos}
      onToggle={toggleComplete}
      onDelete={deleteTodo}
    />
  </div>
</main>

