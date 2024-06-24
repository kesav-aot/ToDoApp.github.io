let mydata = JSON.parse(localStorage.getItem('todos')) || [];
const todoList = document.getElementById('todo');
const completedtodoList = document.getElementById('completed-todo');
const update = document.getElementById('update');
const delete_Btn = document.getElementById('delete-todo');
document.getElementById('sort').addEventListener('change', handleSelectChange);

function handleSelectChange(event) {
    const selectedValue = event.target.value;
    if(selectedValue === 'newest'){
        renderTodos(1);
    }
    else {
        renderTodos();
    }
    console.log('Selected value:', selectedValue);
    // Additional logic to handle the change can be added here
}

function addTask() {
    const name = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('dueDate').value;
    const completed = false;
    if (name && description && date) {
        const obj = {
            name,
            description,
            date,
            completed
        };
        mydata.push(obj);
        localStorage.setItem('todos', JSON.stringify(mydata));
        renderTodos();
        window.location.reload();
        
    } else {
        alert('Please fill out all fields');
        // addTask();
    }

    document.getElementById('taskForm').reset();
}
//render todos
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Set the min attribute of the date input to today's date
document.getElementById('dueDate').min = getTodayDate();
function formatDate(dateStr) {
    var date = new Date(dateStr);
    var day = date.getDate();
    var month = date.toLocaleString('default', { month: 'short' });
    var year = date.getFullYear();
    return `${day+1} ${month} ${year}`;
  }

function renderTodos(no =  0) {
    todoList.innerHTML = ' ';
    completedtodoList.innerHTML = '';
    let event = mydata;
    
    console.log(event);
    if(no == 0){
        event.sort((a, b) => new Date(a.date) - new Date(b.date));
        localStorage.setItem('todos', JSON.stringify(event));

    }
    else{
        event.sort((a, b) => new Date(b.date) - new Date(a.date));
        localStorage.setItem('todos', JSON.stringify(event));
    }
    let searchValue = document.getElementById('searchInput').value.toLowerCase();
    let filteredTasks = event.filter(task => task.name.toLowerCase().includes(searchValue));
    filteredTasks.forEach((todo, index) => {
        const div = document.createElement('div');
        div.className = 'todo-item';
        if(todo.completed == false){ 
            let date = new Date();
            let givenDate= formatDate(todo.date);
        if(givenDate < date){
            div.innerHTML = `
            
            
            
            <div class="todo-content">
                <input type="radio" name="completed" id="" class="completed" onclick="complete_element(${index})"> 
                 <div class="content">
                    <div class="color-row"><h1 class="titleFor">${todo.name} </h1><p class="color"></p></div>
                    <p class="descriptionFor">${todo.description} </p>
                    <div class="calander red-btn">
                    <img src="./Pictures/Vector (2).svg" alt="">
                    <p><span></span>by ${todo.date}</p>
                </div>
                
            </div>
            <div>
                <button class="edit-btn" ><img src="./Pictures/Group 817.svg" alt="" data-toggle="modal" data-target="#myModaledit" onclick="update_content(${index})"></button>
                <button class="delete-btn" ><img src="./Pictures/Group.svg" alt="" data-toggle="modal" data-target="#myModaldelete-todo" onclick="deletemodal(${index})"></button>
            </div>

            
            
        `;
        todoList.appendChild(div);
        }
        else{

        

    
        
        div.innerHTML = `
            
            
            
            <div class="todo-content">
                <input type="radio" name="completed" id="" class="completed" onclick="complete_element(${index})"> 
                 <div class="content">
                    <div class="color-row"><h1 class="titleFor">${todo.name} </h1><p class="color"></p></div>
                    <p class="descriptionFor">${todo.description} </p>
                    <div class="calander">
                    <img src="./Pictures/calendar_month_black_24dp 2.svg" alt="">
                    <p class="dateview"><span></span>by ${todo.date}</p>
                </div>
                
            </div>
            <div>
                <button class="edit-btn" ><img src="./Pictures/Group 817.svg" alt="" data-toggle="modal" data-target="#myModaledit" onclick="update_content(${index})"></button>
                <button class="delete-btn" ><img src="./Pictures/Group.svg" alt="" data-toggle="modal" data-target="#myModaldelete-todo" onclick="deletemodal(${index})"></button>
            </div>

            
            
        `;
        todoList.appendChild(div);
        }
    }
        else{
            const div = document.createElement('div');
        div.className = 'todo-item';
        div.innerHTML = `
            
            
            
            <div class="todo-content">
                
                <div class="complete">
                    <img src="./Pictures/Group 761.svg" alt="" onclick="active_element(${index})"style="margin-top: 10px;">
                    <img src="./Pictures/Group 761.svg" alt="" style="display:none;"f>
                </div>
                
                 <div class="content">
                    <div class="color-row"><h1 class="titleFor">${todo.name} </h1><p class="completed-color"></p></div>
                    <p class="descriptionFor">${todo.description} </p>
                    <div class="calander">
                    <img src="./Pictures/calendar_month_black_24dp 2.svg" alt="">
                    <p class="dateview"><span></span>by ${todo.date}</p>
                </div>
                
            </div>
            <div>
                <button class="edit-btn" ><img src="./Pictures/Group 817.svg" alt="" data-toggle="modal" data-target="#myModaledit" onclick="update_content(${index})"></button>
                <button class="delete-btn" ><img src="./Pictures/Group.svg" alt="" data-toggle="modal" data-target="#myModaldelete-todo" onclick="deletemodal(${index})"></button>
            </div>
            
            
            
        `;
        completedtodoList.appendChild(div);
        }
    });
}

function complete_element(index){
    let storedArray = JSON.parse(localStorage.getItem('todos'));
    let updated = storedArray[index];
    storedArray[index].completed = true ;
    localStorage.setItem('todos', JSON.stringify(storedArray));
    window.location.reload();
    console.log("complete")
}


function active_element(index){
    let storedArray = JSON.parse(localStorage.getItem('todos'));
    let updated = storedArray[index];
    storedArray[index].completed = false ;
    localStorage.setItem('todos', JSON.stringify(storedArray));
    window.location.reload();
    console.log("complete")
}

function update_content(index){
    let storedArray = JSON.parse(localStorage.getItem('todos'));
    let updated = storedArray[index];
    console.log(updated)
    update.innerHTML = `
    <div class="modal" id="myModaledit">
          <div class="modal-dialog">
            <div class="modal-content">
            
              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title">Update Task</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
              <!-- Modal body -->
              <div class="modal-body">
                <div class="label">
                Title *
                <input type="text" id="update_name" class="name" value="${updated.name}">
                </div>
                <div class="label"><p>Description <img src="./Pictures/Vector.svg" alt=""></p>
                <input type="text" class="discription" id="update_discription" value="${updated.description}">
                
                </div>
                <div class="label">Due Date
                <input type="date" name="date"   id="update_date" value="${updated.date}">
                </div>
                
              </div>
              
              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="button" class="btn cancel-task-btn" class="close" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary add-task-btn add-btn" onclick="updateTodo(${updated.completed} ,${index} )">Update Task</button>
              </div>
              
            </div>
          </div>
        </div>
        
      </div>
    `
    
}


function clearAllcompleted(){
    mydata = mydata.filter((todo) => todo.completed == false);
    updateLocalStorage();
    renderTodos();
}





function updateTodo(completed_status , index  ) {
    const name = document.getElementById('update_name').value;
    const description = document.getElementById('update_discription').value;
    const date = document.getElementById('update_date').value;
    const completed = completed_status;
    console.log(name , description , date)
    if (name && description && date) {
        const obj = {
            name : name,
            description : description,
            date : date,
            completed : completed
        };
        let storedArray = JSON.parse(localStorage.getItem('todos'));
        let updated = storedArray[index];
        storedArray[index] = obj ;
        localStorage.setItem('todos', JSON.stringify(storedArray));
        window.location.reload();
    } else {
        console.log(name , description , date)
        alert('Please fill out all fields');
    }
}


function deleteTodo(index) {
    mydata.splice(index, 1);
    updateLocalStorage();
    renderTodos();
}

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(mydata));
}

// Call renderTodos on page load (Optional)
window.onload = renderTodos;







function deletemodal(index){
    delete_Btn.innerHTML = `
    <div class="modal" id="myModaldelete-todo">
          <div class="modal-dialog">
            <div class="modal-content" style="width:654px;height:297px;">
            
              <!-- Modal Header -->
              <div class="modal-header">
                <h4 class="modal-title">Add Task</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              
              <!-- Modal body -->
              <div class="modal-body">
                
                Are you sure you want to delete this task?
              </div>
              
              <!-- Modal footer -->
              <div class="modal-footer" style="justify-content: center; ">
                <button type="button" class="btn cancel-task-btn" class="close" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary add-task-btn add-btn" onclick="deleteTodo(${index})" data-dismiss="modal"style="background-color:#C0070B;">Delete</button>
              </div>
              
            </div>
          </div>
        </div>
`
}