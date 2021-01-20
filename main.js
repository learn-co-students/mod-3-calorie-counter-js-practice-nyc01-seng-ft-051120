// your code here, it may be worth it to ensure this file only runs AFTER the dom has loaded.
window.addEventListener('DOMContentLoaded', (event) => {
  fetchEntries()
})

const API = 'http://localhost:3000/api/v1/calorie_entries'

const fetchEntries = () => {
  fetch(API)
  .then(res => res.json())
  .then(entries => {
    displayEntries(entries)
  })
}

const displayEntries = (entries) => {
  entries.forEach(entry => {
    entryInfo(entry)
    // getAllCalories(entries)
  })
}

const entryInfo = (entry) => {
  let container = document.getElementById('calories-list')
  let li = document.createElement('li')
  li.innerHTML = `
    <li class="calories-list-item">
      <div class="uk-grid">
        <div class="uk-width-1-6">
          <strong>${entry.calorie}</strong>
          <span>kcal</span>
        </div>
        <div class="uk-width-4-5">
          <em class="uk-text-meta">${entry.note}</em>
        </div>
      </div>
      <div class="list-item-menu">
        <a class="edit-button" uk-icon="icon: pencil" uk-toggle="target: #edit-form-container"></a>
        <a class="delete-button" uk-icon="icon: trash"></a>
      </div>
    </li>
  `
  container.prepend(li)
}

// const getAllCalories = (entries) => {
//   let total = 0
//   entries.map(entry => {
//     total += entry.calorie
//   })
//   console.log(total)
// }

document.addEventListener('click', (e) => {
  console.log(e.target)

})

document.addEventListener('submit', (e) => {
  e.preventDefault();
  let form = document.getElementById('new-calorie-form')
  if(e.target.id === 'new-calorie-form'){
    let input = document.getElementById('calorie-input')
    let calorie = input.value
    let textArea = document.querySelector('.uk-textarea')
    let note = textArea.value
    fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        calorie,
        note
      })
    })
    .then(res => res.json())
    .then(entry => {
      entryInfo(entry)
      form.reset()
    })

  }


})
