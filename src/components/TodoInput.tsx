import React from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

interface TodoInputProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  handleAddTodo: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const TodoInput: React.FC<TodoInputProps> = ({
  newTodo,
  setNewTodo,
  handleAddTodo,
  isSubmitting
}) => {
  return (
    <form onSubmit={handleAddTodo} className="relative">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo..."
        className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200"
        disabled={isSubmitting}
      />
      <button
        type="submit"
        disabled={isSubmitting || !newTodo.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 disabled:text-gray-300 transition-colors duration-200"
      >
        {isSubmitting ? (
          <Loader2 className="w-6 h-6 animate-spin" />
        ) : (
          <PlusCircle className="w-6 h-6" />
        )}
      </button>
    </form>
  );
};

export default TodoInput;