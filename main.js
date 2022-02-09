const todo = document.querySelector('#todo-item');
const todoSubmit = document.querySelector('#todo-submit');
const todoResults = document.querySelector('#to-dos');
const todoItem = document.querySelectorAll('#to-dos .item');
const todoLists = document.querySelector('#todoLists');
const addList = document.querySelector('#add_list');
const deleteList = document.querySelector('#delete_list');
const changeListName = document.querySelector('#change_name');
const form = document.querySelector('#addTodoForm');

//Prevent default form
form.addEventListener('submit', (e) => {
    e.preventDefault();
})

//Create todo when pressed on add
todoSubmit.addEventListener('click', () => 
{
    createNewTodo(todo.value);
    saveTodo(todo.value);
    todo.value = '';
});

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







function getCurrentListId(value)
{
    const dbResults = getTodos('lists', 'id', `name = '${value}'`);
    return dbResults;
}

function importAllLists()
{
    const dbResults = getTodos('lists');
    dbResults.done((data) => {
        let listData = JSON.parse(data);

        listData.forEach(item => {
            createNewList(item['name']);
        });
    });
}

function importAllTodos(value)
{
    const dbResults = getTodos('todos');

    dbResults.done((data) => {
        let listData = JSON.parse(data);
        if(listData.length == 0) return;
        if(!value) value = listData[0]['name'];
        console.log(listData);
        listData.forEach(item => {
            if(item['name'] == value) {
                createNewTodo(item['todo']);
            }
        });
    });
}

importAllLists();
importAllTodos();

todoLists.addEventListener('change', () => {
    todoResults.innerHTML = '';
    importAllTodos(todoLists.value);
});

addList.addEventListener('click', () => {
    let listName = prompt('The list name is: ');
    if(listName == null) return;
    saveTodo(listName, 'todo_lists');
    createNewList(listName);
});

deleteList.addEventListener('click', () => {
    deleteTodo('', 'todo_lists');
    const todoListOption = document.querySelector('#todoLists option:checked');
    todoListOption.remove();
    importAllTodos(todoLists.value);
});

changeListName.addEventListener('click', () => {
    const newListName = prompt('The new list name is: ');
    if(newListName == null) return;
    updateTodo(newListName);
    const checked = document.querySelector('#todoLists option:checked');
    checked.value = newListName;
    checked.textContent = newListName;
});


/** database functions **/

//Get todos from database
function getTodos(type, select = '*', where = '1')
{
    let join = '';
    if(type == 'todos') 
    {   
        join = 'INNER JOIN to_dos ON todo_lists.id = to_dos.list_id';
    }
    return $.post( "./php/getTodos.php", {todo: 'todo_lists', select: select, where: where, join: join})
    
}

//Save todo to database
async function saveTodo(data, db = 'to_dos')
{
    let dataId = 0;
    await getCurrentListId(todoLists.value).then((data) => {
        if(data)
        {
            dataId = JSON.parse(data);
        } 
    });

    if(dataId.length == 0) dataId = '';
    else dataId = dataId[0]['id'];

    $.post( "./php/postTodos.php", { dbname: db, todo: data, id: dataId})
    .done(function( data ) {
        console.log(data);
    });
}

//Update List name from database
async function updateTodo(data = '')
{
    let dataId = 0;
    await getCurrentListId(todoLists.value).then((data) => {
        dataId = JSON.parse(data);
    });

    if(dataId.length == 0) dataId = '';
    else dataId = dataId[0]['id'];

    $.post( "./php/updateTodo.php", { update: data, id: dataId})
    .done(function( data ) {
        console.log('works: '+data);
    });
}


//Delete todo from database
async function deleteTodo(data = '', dbname = 'to_dos')
{
    let dataId = 0;
    await getCurrentListId(todoLists.value).then((data) => {
        dataId = JSON.parse(data);
    });

    if(dataId.length == 0) dataId = '';
    else dataId = dataId[0]['id'];

    $.post( "./php/deleteTodo.php", { deleteTodo: data, db: dbname, id: dataId })
    .done(function( data ) {
        console.log('works: '+data);
    });
}