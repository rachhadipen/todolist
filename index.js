// create all Elements and array
let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('input');
const addButton = document.getElementsByClassName('add');
const taskCounter = document.getElementById('total_task');
const taskCompleted = document.getElementById('completed');
const taskIncompleted = document.getElementById('incomplited');
var count = 0;
var deletecount = 0;
var incount = 0;

// add task to dom 
function addTaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
    <label for="${task.id}">${task.text}</label>
    <button class="delete deletebutton" data-id="${task.id}">x</button>
    `;
    taskList.append(li);
}
// render the lists
function renderList(){
    taskList.innerHTML="";
    if(tasks.length==0){
        showNotification('All tasks deleted successfully......')
    }
    for(let i = 0; i < tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }
    // Total Number of Tasks
    taskCounter.innerHTML = tasks.length;
    // Completed Tasks
    const completedTasksArray = tasks.filter((task) => task.done === true);
    taskCompleted.innerHTML = completedTasksArray.length;
    // Incomplted Tasks
    taskIncompleted.innerHTML = tasks.length-completedTasksArray.length;
    
}
// add task to  list
function addTask(task){
    
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added Successfully');
        return;
    }else{
        showNotification('Task cannot be added!!!!');
    }
    
    
}
// markAsCompleted function
function markAsCompleted(taskId){
    const task = tasks.filter(function(task){
        return task.id === taskId
        
        
    });
    if(task.length > 0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        return;
    }

  
}
// show notification function
function showNotification(text){
    alert(text);
}
// delete function
function deleteTask(taskId){
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId
    })
    
    tasks = newTasks;
    renderList();
   
}

// on click add function
function clickToAdd(){
    var inputValue = addTaskInput.value;
    if(inputValue==''){
        showNotification("You must write something!");
        return;
    }
    const task ={
        text:inputValue,
        id: Date.now().toString(),
        done: false
    }
    addTask(task);
    addTaskInput.value='';
    
}
//count for completed tasks



// click event handeler 
function handledClickListener(e){
    const target = e.target;
    if(target.className =='add addbutton' || target.className === 'plus')
    {
        clickToAdd();
    }
    if(target.className === 'delete deletebutton')
    {
        const taskId = target.dataset.id;
        deleteTask(taskId);
        showNotification('Task is deleted Successfully!!!!');
        return;
    }
    else if(target.className === 'custom-checkbox')
    {
        const taskId = target.id;
        // checkBoxCount();
        showNotification('Task is completed  Successfully!!!!');
        markAsCompleted(taskId);
        return;
    }
    else if(target.className ==='completedAll'){
        
        if(tasks.length == 0){
            showNotification('Sorry! no tasks');
            return;
        }
        for(let i = 0; i < tasks.length; i++)
        {
            tasks[i].done = true;
        }
        
        renderList();
        showNotification('Congratulations!!! you have completed all task........')

    }else if(target.className === 'uncompleted All'){
        if(tasks.length == 0){
            showNotification('Sorry! no tasks');
            return;
        }
        for(let i = 0; i < tasks.length; i++){
            tasks[i].done = false
        }
        renderList();
        showNotification('All Tasks are marked as incompleted')}

    else if(target.className ==='deleteAll')
    {
        if(tasks.length == 0)
        {
            showNotification('Sorry! no tasks or you have deleted Already...');
            return;
        }
        count = 0;
        taskCompleted.innerHTML = 0;
        taskIncompleted.innerHTML = 0;
        const newTasks =[]
        tasks= newTasks;
        renderList();
    }
}
// event listener 
document.addEventListener('click',handledClickListener);




