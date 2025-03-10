// Get all cats
export const getCats = async () => {
  const response = await fetch(`/api/get_cats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json(); 
};

// Get a single cat by ID
export const getCatById = async (id) => {
  
  const response = await fetch(`/api/get_cat/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json(); 
};

// Create a new cat (POST request)
export const postCat = async (
  breed,
  description,
  temperament,
  hypoallergenic,
  image_url
) => {

  const response = await fetch(`/api/new_cat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      breed,
      description,
      temperament,
      hypoallergenic,
      image_url,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return await response.json();
};

// Update an existing cat (PUT request)
export const updateCat = async (cat) => {

  const response = await fetch(`/api/edit_cat/${cat.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: cat.id, 
      breed: cat.breed,
      description: cat.description,
      temperament: cat.temperament,
      hypoallergenic: cat.hypoallergenic,
      image_url: cat.image_url,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  console.log("Updating cat with data:", cat);

  return await response.json();
};

// Sort cats by hypoallergenic status
export const getHypoallegenicCats = (cats) => {
  return cats.filter(cat => cat.hypoallergenic === true);
};
