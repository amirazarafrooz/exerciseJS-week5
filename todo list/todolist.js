

window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    
    
    const username = localStorage.getItem('username') || '';
    
    nameInput.value = username;
    
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
        
    })
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();
        
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }
        
        todos.push(todo);
        
        localStorage.setItem('todos', JSON.stringify(todos));
        
        e.target.reset();
        
        DisplayTodos('all');
    })
    
    DisplayTodos('all');
    
})

filters = document.querySelectorAll('.filters span');
clearAll = document.querySelectorAll('.controls .clearAllBtn')[0];


filters.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelector('span.active').classList.remove('active');
        btn.classList.add('active');
        filterStatus = btn.id
        console.log('btn id: '+btn.id)
        DisplayTodos(btn.id);
        
    })
})
let filterStatus;

function DisplayTodos (filter) {
    const todoList = document.querySelector('#todo-list');
    
    todoList.innerHTML = '';
    
    todos.forEach((todo,id) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')
        /*console.log(todos,id);*/
        console.log('status: '+todo.done)
        console.log('filter: '+filter)
        if(filter == todo.done+'' || filter =='all') {
            
            //    } 
            
            
            const label = document.createElement('label');
            const input = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('div');
            const actions = document.createElement('div');
            const edit = document.createElement('button');
            const deleteButton = document.createElement('button');
            
            input.type = 'checkbox';
            input.checked = todo.done;
            span.classList.add('bubble');
            
            if(todo.category == 'urgent-important') {
                span.classList.add('urgent-important');
            } else if(todo.category == 'not-urgent-important'){
                span.classList.add('not-urgent-important');
            } else if(todo.category == 'not-important-urgent'){
            span.classList.add('not-important-urgent');
        } else {
            span.classList.add('not-important-not-urgent');
        }
        
        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');
        
        content.innerHTML = `<input type="text" value="${todo.content}" readonly> `;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';
        
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);
        
        todoList.appendChild(todoItem);
        
        if(todo.done) {
            todoItem.classList.add('done');
        }
        
        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if(todo.done) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done');
            }
            
            
            DisplayTodos(filterStatus);
        
        })

        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos('all');
            })
        })

        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos('all');
        })
        
    }
});
}

clearAll.addEventListener('click', e => {
    todos.splice(0, todos.length);
    localStorage.setItem('todos', JSON.stringify(todos));
    DisplayTodos();
})

