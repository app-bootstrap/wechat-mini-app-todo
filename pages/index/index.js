const app = getApp()

Page({
  data: {
    todos: wx.getStorageSync('todos') || [],
    inputMaxLength: 12,
    emptyString: '',
  },
  syncTodoState: function (todos) {
    this.setData({
      todos,
    });
    wx.setStorageSync('todos', todos);
  },
  changeTodo: function(e) {
    var id = e.target.dataset.id;
    this.syncTodoState(this.data.todos.map(todo => {
      if (todo.id === id) {
        todo.state = todo.state === 'completed'
          ? 'uncompleted'
          : 'completed';
      }
      return todo;
    }));
  },
  removeTodo: function(e) {
    var id = e.target.dataset.id;
    this.syncTodoState(this.data.todos.filter(todo => {
      return todo.id !== id;
    }));
  },
  confirmTodo: function(e) {
    const value = e.detail.value;
    const todos = this.data.todos;
    todos.push({
      id: +new Date,
      content: value,
      state: 'uncomplated',
    });
    this.syncTodoState(todos);
    this.setData({
      emptyString: ''
    });
  },
});