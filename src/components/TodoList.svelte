<script>
  import TodoItem from './TodoItem.svelte';
  export let todos = [];
  export let onToggle;
  export let onDelete;
</script>

<ul>
  {#each todos as todo, idx}
    <TodoItem
      {todo}
      {idx}
      {onToggle}
      {onDelete}
    />
  {/each}
  {#if todos.length === 0}
    <li class="text-center text-gray-400 mt-4 dark:text-gray-500">No tasks yet!</li>
  {/if}
</ul>
