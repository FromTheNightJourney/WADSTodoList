import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';

const TodoList = () => {
  const filteredList = useSelector((state) => {
    const todos = state.todos;
    const filter = state.filter;
    const searchTerm = state.searchTerm.toLowerCase();

    return todos.filter((todo) => {
      const matchesFilter =
        (filter === 'COMPLETED' && todo.completed) ||
        (filter === 'INCOMPLETE' && !todo.completed) ||
        filter === 'ALL';

      const matchesSearch = todo.text.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  });

  const memoizedFilteredList = useMemo(() => filteredList, [filteredList]);

  console.log("Filtered Todos:", memoizedFilteredList);

  return (
    <ul className="stardew-text">
      {memoizedFilteredList.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          id={todo.id}
        />
      ))}
    </ul>
  );
};

export default TodoList;