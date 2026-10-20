const btnAdd = document.querySelector('.form__btn');
const input = document.querySelector('.form__input');
const taskList = document.querySelector('.task-list');
const warn = document.querySelector('.todo-list__text')

btnAdd.addEventListener('click', function(event){
    event.preventDefault();
    const text = input.value.trim();
    const li = document.createElement('li');
    const btn = document.createElement('button');

    if(!text){
        warn.textContent = 'Введите что-то!'
        return;
    }

    li.classList.add('task-list__item');
    btn.classList.add('task-list__btn');
    li.innerHTML = `<p class="task-list__text">${text}</p>`;
    btn.textContent = 'delete';

    taskList.append(li);
    li.append(btn);
    input.value = '';

    btn.addEventListener('click', function(){
        btn.parentElement.remove();
    })
});



