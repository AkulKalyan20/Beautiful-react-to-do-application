import React from 'react';
import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Circle,
  AlertTriangle,
  Flag
} from 'lucide-react';
import { Todo, Category } from '../types/todo';

interface TodoCardProps {
  todo: Todo;
  category: Category | undefined;
  onToggle: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

export const TodoCard: React.FC<TodoCardProps> = ({
  todo,
  category,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const priorityColors = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  };

  const priorityIcons = {
    low: Flag,
    medium: AlertTriangle,
    high: AlertTriangle,
  };

  const PriorityIcon = priorityIcons[todo.priority];

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all duration-200 hover:shadow-md hover:border-gray-200 ${
      todo.completed ? 'opacity-60' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggle(todo.id)}
            className="mt-1 transition-colors duration-200 hover:scale-105"
          >
            {todo.completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 hover:text-green-500" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <h3 className={`font-semibold text-gray-900 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}>
              {todo.title}
            </h3>
            {todo.description && (
              <p className={`mt-1 text-sm ${
                todo.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {todo.description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PriorityIcon className={`w-4 h-4 ${priorityColors[todo.priority]}`} />
          <button
            onClick={() => onEdit(todo)}
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          {category && (
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${category.color}`} />
              <span className="text-gray-600">{category.name}</span>
            </div>
          )}
          {todo.dueDate && (
            <div className="flex items-center gap-1 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{format(todo.dueDate, 'MMM dd')}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{format(todo.createdAt, 'MMM dd')}</span>
        </div>
      </div>
    </div>
  );
};