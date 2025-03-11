## 🐱 Cat Frontend & Node Middleware API

This project serves as the frontend application for managing cat data. It also includes a Node.js-based API (using Express.js) that acts as a middleware between the frontend and Supabase. The API is run separately from the frontend but is included within the same codebase.

## Technologies 

**Frontend**

- Vue
- Vitest
- CSS


**Backend**

- Node and Express - handles API requests to Supabase to serve to the front-end

## Features

### Frontend via the UI:

- **View All Cats** – Displays a list of cats with their breed and image on the "Cats" page.
- **Sort Hypoallergenic Cats** – Allows users to filter and display only hypoallergenic cats.
- **Search by Breed** – Users can search for cats by typing in their breed name.
- **View Cat Details** – Clicking on a cat will show more detailed information about it.
- **Admin Tab** – Provides forms where an admin can:
    - Add a New Cat to the database.
    - Edit a Cat’s details.
    - Delete a Cat from the database.
- The UI is updated dynamically after any CRUD operation, reflecting the changes made in the database.

### Express API:

Connects to supabase and handles 

- Fetching all cats via GET request``api/get_cats``
  
- Fetching a cat by its ID via GET request ``api/get_cat/:id``

- Adding a new cat via POST request ``api/new_cat``

- Edit a cat via PUT request ``api/edit_cat/:id``

- Delete a cat via DELETE request ``api/delete_cat/:id``


## Running the App Locally

First install dependencies:  ``npm install``

To serve the frontend with data from the backend run 
``node server.js`` from the root of the project. Data can be view via the api endpoints

To run the frontend Vue UI navigate to the application ``cd application`` and run ``npm run serve``. Here you can navigate through the website and perform CRUD operations. 

## Testing 

- There is a test folder that tests middlewear API calls in catService these can be run by running ``npx vitest``


