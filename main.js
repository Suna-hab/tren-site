const btnAdd = document.querySelector('.form__btn');
const input = document.querySelector('.form__input');
const taskList = document.querySelector('.task-list');
const h1 = document.querySelector('.todo-list__title');
const btnAllDelete = document.querySelector('.todo-list__btn');

let arrEx = JSON.parse(localStorage.getItem('arrEx')) || [];

function createTasks(arr){
   taskList.innerHTML = '';
    arr.forEach(task => {
        const li = document.createElement('li');
        const btn = document.createElement('button');

        li.classList.add('task-list__item');
        btn.classList.add('task-list__btn');
        li.innerHTML = `<p class="task-list__text">${task.text}</p>`;

        if (task.completed) {
            li.innerHTML = `<p class="task-list__text todo-list__text--completed">${task.text}</p>`; 
        }

        btn.textContent = 'delete';
        
        taskList.append(li);
        li.append(btn);
    });
}

createTasks(arrEx);

btnAdd.addEventListener('click', function(event){
   
    event.preventDefault();
    
    const text = input.value.trim();
    
    if(!text){
        if(document.querySelector('.todo-list__text')) document.querySelector('.todo-list__text').remove();

        const newElement = document.createElement('p');
        newElement.classList.add('todo-list__text');
        newElement.textContent = 'Введите текст!';
        h1.insertAdjacentElement('afterend', newElement);

        return;
    } else{
        if(document.querySelector('.todo-list__text')) document.querySelector('.todo-list__text').remove();
    }

    arrEx.push({text: text, completed: false});
    localStorage.setItem('arrEx', JSON.stringify(arrEx)); 

    createTasks(arrEx); 
    input.value = '';
});

taskList.addEventListener('click', function(event){
    if(event.target.classList.contains('task-list__btn')) {
        const li = event.target.closest('li');
        const index = [...taskList.children].indexOf(li);
        arrEx.splice(index, 1);

        localStorage.setItem('arrEx', JSON.stringify(arrEx));
        createTasks(arrEx);

        return;
    }  

    const li = event.target.closest('li');
    if(li){
        const index = [...taskList.children].indexOf(li);

        arrEx[index].completed = !arrEx[index].completed;
        localStorage.setItem('arrEx', JSON.stringify(arrEx));
        createTasks(arrEx);
    }
});

btnAllDelete.addEventListener('click', function(){
    if(taskList.children.length > 0){
        localStorage.removeItem('arrEx'); 
        arrEx = [];
        createTasks(arrEx);
    }
    return;
});