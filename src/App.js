import React, {useRef, useState, useEffect} from "react";
import './App.css';
import  Form from './components/form'
import TodoList from './components/todoList'
import ContentEditable from 'react-contenteditable'

window.onload = function() {
  document.getElementById("editable").focus();
};

function App() {
  const [inputText,setInputText] = useState("");
  const [todos,setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [userName, setUserName] = useState("Your Name's");

  useEffect(() => {
    getLocalTodos();
  }, []);


  useEffect(() =>{
    filterHandler();
    saveLocalTodos();
  }, [todos,status,userName]);

  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }

  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('userName', JSON.stringify(userName));
  };
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    }else{
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }

    if(localStorage.getItem('userName') === null){
      localStorage.setItem('userName', JSON.stringify([]));
    }else{
      let userNameLocal = JSON.parse(localStorage.getItem('userName'));
      setUserName(userNameLocal);
    }
    
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
    console.log(userName);
  }

  return (
    <div className="App">
      <header>
      <ContentEditable id="editable" suppressContentEditableWarning={true} spellCheck={false}  className="list-title" html={userName} onChange={handleChange}></ContentEditable>
        <h1 id="userName" ><span> </span>Todo List</h1>
      </header>
      <Form setStatus={setStatus} inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText}/>
     <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
