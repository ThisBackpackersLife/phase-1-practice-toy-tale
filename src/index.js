let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  
  function fetchToys() {
    fetch(baseUrl + toysUrl)
    .then(response => response.json())
    .then(toysData => toysData.forEach(eachCard => {
      const toysCollection = document.getElementById("toy-collection")
      
      const div = document.createElement('div')
      div.className = "card"
      toysCollection.appendChild(div)
      
      const h2 = document.createElement('h2')
      h2.innerText = eachCard.name 
      div.appendChild(h2)

      const img = document.createElement('img')
      img.src = eachCard.image
      img.classList.add("toy-avatar")
      div.appendChild(img)

      const p = document.createElement('p')
      p.innerText = eachCard.likes
      div.appendChild(p)
      
      const btn = document.createElement('button')
      btn.className = "like-btn"
      btn.id = eachCard.id
      btn.textContent = "Like ❤️"
      div.appendChild(btn)
    }))
  }
  fetchToys()
  
  // function submitNewToy() {
    const addToyForm = document.getElementById("form")
      addToyForm.addEventListener('submit', (e) => {
      e.preventDefault()

      const newToyInput = document.getElementById("text-input").value
      const newImgInput = document.getElementById("img-input").value

      fetch(baseUrl + toysUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": "",
          "image": "",
          "likes": 0
        })
      })
      .then(response => response.json())
      .then(data => renderToy(data))
    })

  // }
  // submitNewToy()
function renderToy(data) {
  const toysCollection = document.getElementById("toy-collection")
  toysCollection.appendChild(data)
}

});

const baseUrl = "http://localhost:3000"
const toysUrl = "/toys"
// function postJSON(baseUrl, data) {
//   return fetch(baseUrl + toysUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(data)
//   })
//     .then(response => {
//       if (response.ok) {
//         return response.json()
//       } else {
//         throw (response.statusText)
//       }
//     })
// }


/* Add a New Toy
When a user submits the toy form, two things should happen:

A POST request should be sent to http://localhost:3000/toys and the new toy added to Andy's Toy Collection.
If the post is successful, the toy should be added to the DOM without reloading the page.
In order to send a POST request via fetch(), give the fetch() a second argument of an object. This object should specify the method as POST and also provide the appropriate headers and the JSON data for the request. The headers and body should look something like this:
*/
