import React from "react";
import List from "./List";
import "./Todo.css";

function Todo() {
  const [tasks, setTasks] = React.useState([]);
  const [remainingTasks, setRemainingTasks] = React.useState(0);
  const addTaskInput = React.useRef();

  useDidMountEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setRemainingTasks(
      tasks.filter((taskItem) => taskItem.done === false).length
    );
  }, [tasks]);

  /* React.useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]); */

  React.useEffect(() => {
    const localTasks = localStorage.getItem("tasks");
    if (localTasks) {
      setTasks(JSON.parse(localTasks));
    }
  }, []);

  function addTask() {
    const newTask = addTaskInput.current.value;
    if (newTask && !tasks.some((task) => task.text === newTask)) {
      const newTaskObj = {
        text: newTask,
        done: false,
      };
      setTasks((tasks) => {
        return [...tasks, newTaskObj];
      });
      addTaskInput.current.value = "";
      addTaskInput.current.focus();
    }
  }

  function handleKey({ keyCode, target }) {
    if (keyCode === 13) {
      addTask();
    } else {
      if (!tasks.some((task) => task.text === target.value)) {
        addTaskInput.current.classList.remove("invalid");
      } else {
        addTaskInput.current.classList.add("invalid");
      }
    }
  }

  return (
    <div className="main">
      <div className="todo">
        <div className="todo-header">
          <h1>Todo List</h1>
          <small>
            {tasks.length > 0 && remainingTasks === 0 ? (
              "All done! =D"
            ) : (
              <>
                You have <b>{remainingTasks}</b> of <b>{tasks.length}</b> tasks
                remaining
              </>
            )}
          </small>
        </div>
        <div className="todo-form">
          <input
            ref={addTaskInput}
            type="text"
            placeholder="Add task..."
            onKeyUp={handleKey}
          />
          <button onClick={addTask}>+</button>
        </div>
        <div className="todo-body">
          <List tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </div>
  );
}

const useDidMountEffect = (func, deps) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) {
      return func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

export default Todo;
