const todo = document.querySelector('#todo-item');
const todoSubmit = document.querySelector('#todo-submit');
const todoResults = document.querySelector('#to-dos');
const todoItem = document.querySelectorAll('#to-dos .item');
const todoLists = document.querySelector('#todoLists');

//Create todo when pressed on add
todoSubmit.addEventListener('click', () => 
{
    createNewTodo(todo.value);
    saveTodo(todo.value);
});

//Get todos from database
function getTodos(tableName, f)
{
    $.post( "./php/getTodos.php", {todo: tableName})
    .done(function(tableName) {
        
        json = JSON.parse(tableName);
        // let listData = json.splice(0, 2);
        
        json.forEach(item =>
        {
            if(f == 1) createNewTodo(item['todo']);
            if(f == 2) createNewList(item['name']);
        });
    })
    
}
getTodos('todo_lists', 1);

//Save todo to database
function saveTodo(data)
{
    $.post( "./php/postTodos.php", { todo: data })
    .done(function( data ) {
        console.log(data);
    });
}

function deleteTodo(data)
{
    $.post( "./php/deleteTodo.php", { deleteTodo: data })
    .done(function( data ) {
        console.log('works: '+data);
    });
}

//Create new todo
function createNewTodo(data)
{
    const item = document.createElement('div');
    todoResults.appendChild(item);
    item.className = 'item';
    const itemTitle = document.createElement('h3');
    item.appendChild(itemTitle);

    itemTitle.textContent = data;

    const itemImg = document.createElement('img');
    item.appendChild(itemImg);
    itemImg.src = 'imgs/delete-icon.png';
   
    itemImg.addEventListener('mouseover', () =>
    {
        itemImg.src = 'imgs/delete-icon2.png';
    });
    itemImg.addEventListener('mouseout', () => {
        itemImg.src = 'imgs/delete-icon.png';
    });

    itemImg.addEventListener('click', () => {
        itemImg.parentElement.remove();
        deleteTodo(itemTitle.textContent);
    });
}

//Create new list
function createNewList(data)
{
    const item = document.createElement('option');
    todoLists.appendChild(item);
    item.textContent = data;
    item.value = data;
}
todoLists.addEventListener('change', () => {

});