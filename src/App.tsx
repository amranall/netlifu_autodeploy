import React, { useState } from 'react';
import { PlusCircle, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import { Todo } from './types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    setIsSubmitting(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const todo: Todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      createdAt: new Date()
    };

    setTodos(prev => [todo, ...prev]);
    setNewTodo('');
    setIsSubmitting(false);
  };

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Todo List</h1>
            <p className="text-gray-600">
              {completedCount} of {todos.length} tasks completed
            </p>
          </div>

          <TodoInput
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            handleAddTodo={handleAddTodo}
            isSubmitting={isSubmitting}
          />

          <TodoList
            todos={todos}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />

          {todos.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No todos yet. Add one above!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;