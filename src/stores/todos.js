import { writable } from 'svelte/store';

const stored = localStorage.getItem('todos');

export const todos = writable(
  stored
    ? JSON.parse(stored)
    : [
        { text: 'Learn Svelte', completed: false, priority: 'high' },
        { text: 'Build a To-Do App', completed: false, priority: 'medium' }
      ]
);

todos.subscribe((value) => {
  localStorage.setItem('todos', JSON.stringify(value));
});
