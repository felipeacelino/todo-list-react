import React from "react";

const Task = ({ taskId, task, setTasks }) => {
  function removeTask() {
    setTasks((tasks) => {
      return tasks.filter((taskItem, taskIndex) => taskIndex !== taskId);
    });
  }

  function toggleTask() {
    const doneStatus = !task.done;
    setTasks((tasks) => {
      return tasks.map((taskItem, taskIndex) => {
        if (taskIndex === taskId) {
          return {
            text: task.text,
            done: doneStatus,
          };
        }
        return taskItem;
      });
    });
  }

  const prefixClass = "task-item";
  const doneClass = task.done ? " done" : "";

  return (
    <li className={prefixClass + doneClass}>
      <div className={prefixClass + "-infos"}>
        <label className={prefixClass + "-checkbox"}>
          <input type="checkbox" onChange={toggleTask} checked={task.done} />
          <div className={prefixClass + "-checkbox-el"}></div>
        </label>
        <div className={prefixClass + "-text"}>{task.text}</div>
      </div>
      <div className={prefixClass + "-remove"}>
        <button onClick={removeTask} title="Remover item">
          <svg
            height="21"
            viewBox="0 0 21 21"
            width="21"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill="none"
              fill-rule="evenodd"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              transform="translate(5 5)"
            >
              <path d="m10.5 10.5-10-10z" />
              <path d="m10.5.5-10 10" />
            </g>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default Task;
