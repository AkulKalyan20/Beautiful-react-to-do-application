import React, { useState, useMemo } from 'react';
import { Plus, CheckSquare } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import { TodoCard } from './components/TodoCard';
import { TodoForm } from './components/TodoForm';
import { FilterBar } from './components/FilterBar';
import { Stats } from './components/Stats';
import { Todo } from './types/todo';

function App() {
  const { todos, categories, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (todo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      const matchesCategory = !selectedCategory || todo.category === selectedCategory;
      const matchesPriority = !priorityFilter || todo.priority === priorityFilter;
      const matchesStatus = !statusFilter || 
                           (statusFilter === 'completed' && todo.completed) ||
                           (statusFilter === 'pending' && !todo.completed);

      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });
  }, [todos, searchTerm, selectedCategory, priorityFilter, statusFilter]);

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTodo(null);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriorityFilter('');
    setStatusFilter('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">TaskFlow</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Organize your life with beautiful, intuitive task management. Stay productive and achieve your goals.
          </p>
        </div>

        {/* Stats */}
        <Stats todos={todos} />

        {/* Add Task Button */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Add New Task
          </button>
        </div>

        {/* Filter Bar */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onClearFilters={clearFilters}
        />

        {/* Todo List */}
        <div className="space-y-4">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {todos.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
              </h3>
              <p className="text-gray-500 mb-6">
                {todos.length === 0 
                  ? 'Create your first task to get started on your productivity journey!'
                  : 'Try adjusting your search or filter criteria to find your tasks.'
                }
              </p>
              {todos.length === 0 && (
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Create First Task
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTodos.map(todo => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  category={categories.find(cat => cat.id === todo.category)}
                  onToggle={toggleTodo}
                  onEdit={handleEditTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          )}
        </div>

        {/* Todo Form Modal */}
        <TodoForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={addTodo}
          onUpdate={updateTodo}
          categories={categories}
          editingTodo={editingTodo}
        />
      </div>
    </div>
  );
}

export default App;