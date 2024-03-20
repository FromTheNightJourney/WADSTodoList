// Todo.jsx
import React, { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import TodoList from './TodoList'; 
import FilterButtons from './FilterButtons';
import { BsPlus } from 'react-icons/bs'; 
import { addTodo, updateSearchTerm } from '../redux/actions'; 

const Todo = () => {
  const todos = useSelector((state) => state.todos);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const [newTodoText, setNewTodoText] = useState(''); // new todo text state
  const [searchTerm, setSearchTerm] = useState(''); // search term state

  // new todo function handling
  const handleAddTodo = (text) => {
    // ask to make new todo
    dispatch(addTodo(text)); 
  };

  // func for when new todo button pressed
  const handleAddTodoClick = () => {
    if (newTodoText.trim() !== '') {
      // if text not empty, add new todo
      handleAddTodo(newTodoText.trim());
      // clear input
      setNewTodoText('');
    }
  };

  // func if search term change
  const handleSearchChange = (value) => {
    // update search term state
    setSearchTerm(value); 
    dispatch(updateSearchTerm(value)); 
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // also add todo if enter is pressed
      // looking at oval's todo list, i got jealous because i didn't think to also allow enter key to be pressed for adding new todo
      // so i used that functionality as well
      handleAddTodoClick();
    }
  };

  return (
    <div className="max-w-4xl mx-auto sm:mt-8 p-4 bg-woodBrown rounded" style={{ border: '3px solid #deb887' }}> {/* todo container with brown border */}
      <h2 className='mt-3 mb-6 text-2xl font-bold text-center uppercase'>★ The ToDew List ★</h2> {/* heading */}
      <div className="flex items-center mb-4"> {/* input field */}
        <input
          id="addTodoInput"
          className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-deb887 custom-font"
          type="text"
          placeholder="Add New Entry..."
          value={newTodoText}
          // update text state
          onChange={(e) => setNewTodoText(e.target.value)} 
          onKeyPress={handleKeyPress} 
        />
        <button
        className="ml-4 p-2 text-white rounded hover:bg-deb887 focus:outline-none"
        onClick={handleAddTodoClick} // Handling click on add todo button
        >
        <img src="src/resources/plus5.jpg" alt="Add" style={{ width: '40px', height: '40px' }}/> {/* Image for add button */}
      </button> 

      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4"> {/* search input and filter component */}
        <FilterButtons /> {/* filter buttons component */}
        <div className="flex items-center mb-4">
          <input
            className="flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-deb887 custom-font"
            type="text"
            placeholder="Search..."
            // set input field val to search term
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)} 
          />
          <img src='src/resources/serch.png' alt="Search" className="ml-4 w-6 h-6 cursor-pointer" />
        </div>
      </div>

      <TodoList />
    </div>
  );
};

export default Todo; 
