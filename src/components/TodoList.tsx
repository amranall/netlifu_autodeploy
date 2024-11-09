import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <div
          key={todo.id}
          className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
            todo.completed
              ? 'bg-green-50 text-green-900'
              : 'bg-gray-50 text-gray-900'
          } hover:shadow-md`}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`transition-colors duration-200 ${
                todo.completed ? 'text-green-600' : 'text-gray-400'
              } hover:text-green-700`}
            >
              <CheckCircle2 className="w-6 h-6" />
            </button>
            <span
              className={`${
                todo.completed ? 'line-through text-gray-500' : ''
              } transition-all duration-300`}
            >
              {todo.text}
            </span>
          </div>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;