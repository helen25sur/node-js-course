const editButtons = document.querySelectorAll('button.btn-edit');
const deleteButtons = document.querySelectorAll('button.btn-danger');

function changeToEditableState(evt) {
  const target = evt.target;
  const li = target.closest('.list-group-item');
  li.style.textDecoration = 'none';
  console.log(li);

  li.querySelector('span.todo-list-item').style.display = 'none';
  li.querySelector('h3').style.display = 'none';
  const title = li.querySelector('h3').innerText;
  const description = li.querySelector('span.todo-list-item-label').innerText;
  const id = li.querySelector('input[name="id"]').value;
  console.log(id);
  li.innerHTML += `
    <form action="/tasks/${id}" method="POST" class="panel-add-item">
      <input type="hidden" name="_method" value="put" />
      <input type="hidden" name="id" value="${id}">
          <div class="panel-add-item-block">
            <input class="form-control panel-add-item-input"
            type="text" placeholder="" aria-label="add task title" name="title" autocomplete="on" value="${title}" required>
            <select class="form-control" name="status">
              <option value="todo">ToDo</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          
          <textarea class="form-control panel-add-item-input" name="description" id="" aria-label="add task description" rows="2" placeholder="" autocomplete="on" required>${description}</textarea>
          <button type="submit"
            class="btn btn-warning ms-2">Edit</button>
        </form>
  `
}

function deleteItem(evt) {
  const target = evt.target;
  const li = target.closest('.list-group-item');
  const id = li.querySelector('input[name="id"]').value;
  li.innerHTML += `<form action="/tasks/${id}" method="POST" class="panel-delete-item">
      <input type="hidden" name="_method" value="delete" />
      <input type="hidden" name="id" value="${id}">
  `;
  const form = li.querySelector('form.panel-delete-item');
  form.submit();
} 

editButtons.forEach(btn => {
  btn.addEventListener('click', changeToEditableState);
});

deleteButtons.forEach(btn => {
  btn.addEventListener('click', deleteItem);
})