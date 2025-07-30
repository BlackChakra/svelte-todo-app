<script>
  export let todo;
  export let idx;
  export let onToggle;
  export let onDelete;
</script>

<li
  id={"todo-" + idx}
  class="flex items-center justify-between mb-2 bg-gray-50 p-2 rounded hover:shadow transition-colors dark:bg-gray-700 fade-in"
>
  <div class="flex items-center">
    <input
      type="checkbox"
      class="mr-3 h-5 w-5 text-blue-500"
      checked={todo.completed}
      on:change={() => onToggle(idx)}
      aria-label="Toggle complete"
    />
    <span class={`text-lg ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
      {todo.text}
    </span>
  </div>
  <div class="flex items-center">
    <span class={`ml-2 px-2 py-1 text-xs rounded-full 
      ${todo.priority === 'high' ? 'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200' : ''}
      ${todo.priority === 'medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200' : ''}
      ${todo.priority === 'low' ? 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200' : ''}`}
    >
      {todo.priority}
    </span>
    <button
      class="ml-4 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      on:click={() => onDelete(idx)}
      aria-label="Delete task"
    >
      &times;
    </button>
  </div>
</li>
