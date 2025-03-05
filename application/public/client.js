// Writing a function to communicate with our local server

const getMessages = async () => {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Loading...";

  try {
    const response = await fetch(`/api/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

const postMessage = async () => {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Loading...";

  try {
    const response = await fetch(`/api/new_message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "If you can see this POST is working :)" }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

const getCats = async () => {
  const catCards = document.querySelectorAll(".cat-card")
  catCards.textContent = "...loading";

  try {
    const response = await fetch(`/api/get_cats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const cats = await response.json();

    cats.forEach((cat, index) => {
      if(catCards[index]) {
        catCards[index].innerHTML = 
        `<img src="${cat.image_url}"/>
        <h3>${cat.breed}</h3>
        <p>${cat.description}</p>
        `;
      }
    });
  } catch (error) {
    catCards.textContent = `Error: ${error.message}`;
  }
};

const postCat = async () => {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "Loading...";

  const breed = document.getElementById("breed").value;
  const age = document.getElementById("age").value;

  try {
    const response = await fetch(`/api/new_cat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ breed, age: Number(age) }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    resultElement.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
};

window.addEventListener("DOMContentLoaded", getCats)

// document
//   .getElementById("callFunction")
//   .addEventListener("click", getCats);
// document
//   .getElementById("catFunction")
//   .addEventListener("click", postCat)

// To begin try adding another button to use the postMessage function
