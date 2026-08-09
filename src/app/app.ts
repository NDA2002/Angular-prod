import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { TodoItem, PriorityLevel, CategoryType, FilterStatus, SortOption } from './models/todo.model';
import { FaqComponent } from './components/faq/faq.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, FaqComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly todoService = inject(TodoService);

  // Quick Form State
  quickTitle = '';

  // Advanced Modal Form State
  showModal = false;
  modalTitle = '';
  modalDescription = '';
  modalCategory: CategoryType = 'Work';
  modalPriority: PriorityLevel = 'medium';
  modalDueDate = '';
  modalSubtaskInput = '';
  modalSubtasks: string[] = [];

  // Detail Drawer State
  activeTodoDetail: TodoItem | null = null;
  newDetailSubtask = '';

  // Categories list for pills
  readonly categories: (CategoryType | 'All')[] = ['All', 'Work', 'Personal', 'Fitness', 'Study', 'Ideas', 'General'];

  // Motivational quote computed
  get motivationalQuote(): string {
    const pct = this.todoService.stats().percentage;
    if (pct === 100) return '🎉 Outstanding! You completed all your tasks today!';
    if (pct >= 75) return '🔥 Crushing it! You are in peak productivity mode!';
    if (pct >= 50) return '🚀 Great momentum! Halfway through your goal!';
    if (pct > 0) return '💪 Good start! Keep building up the momentum.';
    return '✨ Ready to conquer the day? Add your key priorities below!';
  }

  onQuickAdd() {
    if (!this.quickTitle.trim()) return;
    this.todoService.addTodo({
      title: this.quickTitle.trim(),
      priority: 'medium',
      category: this.todoService.categoryFilter() === 'All' ? 'Work' : (this.todoService.categoryFilter() as CategoryType)
    });
    this.quickTitle = '';
  }

  openAddModal() {
    this.modalTitle = this.quickTitle;
    this.modalDescription = '';
    this.modalCategory = this.todoService.categoryFilter() === 'All' ? 'Work' : (this.todoService.categoryFilter() as CategoryType);
    this.modalPriority = 'medium';
    this.modalDueDate = '';
    this.modalSubtaskInput = '';
    this.modalSubtasks = [];
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addModalSubtask() {
    if (this.modalSubtaskInput.trim()) {
      this.modalSubtasks.push(this.modalSubtaskInput.trim());
      this.modalSubtaskInput = '';
    }
  }

  removeModalSubtask(index: number) {
    this.modalSubtasks.splice(index, 1);
  }

  submitModal() {
    if (!this.modalTitle.trim()) return;

    if (this.modalSubtaskInput.trim()) {
      this.modalSubtasks.push(this.modalSubtaskInput.trim());
    }

    this.todoService.addTodo({
      title: this.modalTitle.trim(),
      description: this.modalDescription.trim(),
      category: this.modalCategory,
      priority: this.modalPriority,
      dueDate: this.modalDueDate || undefined,
      subtasks: this.modalSubtasks
    });

    this.quickTitle = '';
    this.closeModal();
  }

  openDetail(todo: TodoItem) {
    this.activeTodoDetail = todo;
  }

  closeDetail() {
    this.activeTodoDetail = null;
    this.newDetailSubtask = '';
  }

  addDetailSubtask(todoId: string) {
    if (!this.newDetailSubtask.trim()) return;
    this.todoService.addSubtask(todoId, this.newDetailSubtask.trim());
    this.newDetailSubtask = '';
    // Refresh active todo reference
    const updated = this.todoService.todos().find(t => t.id === todoId);
    if (updated) {
      this.activeTodoDetail = updated;
    }
  }

  exportData() {
    const json = this.todoService.exportData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `N1-Backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  importData(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (content) {
          const success = this.todoService.importData(content);
          if (success) {
            alert('Tasks successfully imported!');
          } else {
            alert('Failed to import JSON. Please check file structure.');
          }
        }
      };
      reader.readAsText(file);
    }
  }

  getCategoryBadgeClass(category: CategoryType): string {
    switch (category) {
      case 'Work': return 'badge-work';
      case 'Personal': return 'badge-personal';
      case 'Fitness': return 'badge-fitness';
      case 'Study': return 'badge-study';
      case 'Ideas': return 'badge-ideas';
      default: return 'badge-general';
    }
  }

  getPriorityBadgeClass(priority: PriorityLevel): string {
    switch (priority) {
      case 'urgent': return 'priority-urgent';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
    }
  }
}
