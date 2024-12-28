# How to Run the Application Locally

## Prerequisites
1. Install [Node.js](https://nodejs.org/) (LTS version recommended).
2. Install [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/).


## Steps to Run

1. **Clone the Repository:**
   ```bash
   git clone <https://github.com/xpadyal/Alma_assignment.git>
   cd <Alma_assignment>
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env.local` file in the root directory.
   - Add the following variables (update values as needed):
     ```env
     NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
     ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The public Lead form will be available at [http://localhost:3000/public-lead-form]
   The internal UI will be available at [http://localhost:3000/internal-lead-auth]
   

6. **Run Tests:**
   ```bash
   npm test
   # or
   yarn test
   ```

---

# Design Document

## Overview
The application is a Next.js web application designed for managing internal leads with features for mock authentication, filtering, and updating lead statuses. The tech stack includes:

- **Frontend:** React with Material-UI and CSS (Assets were not provided so I haven't added images in the UI)
- **Backend:** Next.js API routes
- **Data Fetching:** Axios for API communication

## Design Choices

### 1. **Framework: Next.js**
   - **Why:**
     - Built-in routing simplifies project structure.
     - Server-side rendering (SSR) for improved performance and SEO.
     - API routes for lightweight backend functionality.
   - **How:**
     - API endpoints are defined in `pages/api/`.
     - Dynamic routes are used for flexibility.

### 2. **Styling: Material-UI and CSS**
   - **Why:**
     - Provides pre-built components for rapid UI development.
     - Easily customizable themes.
     - CSS to build Form UI (Just to show diff tech stack)
   - **How:**
     - Used Material-UI components like `Table`, `Button`, and `Typography` for building internal leads UI.

### 3. **State Management:**
   - **Why:**
     - Simple state management with `useState` and `useEffect` was sufficient for current requirements.
     - No need for external libraries like Redux at this stage.
   - **How:**
     - Local state is managed for authentication, search, and filters.

### 4. **API Communication: Axios**
   - **Why:**
     - Simplified HTTP requests with built-in error handling.
   - **How:**
     - Axios is used to fetch data and update lead statuses.

### 5. **Typing:**
   - **Why:**
     - TypeScript ensures type safety and reduces runtime errors.
   - **How:**
     - Interfaces (`Lead`) are defined for data structures.
     - Types are added for states and event handlers.
    
### 6. **Auth:**
   - **Why:**
     - Used Mock Auth based on the requirement (Use **admin123** as password to login into internal-lead-UI).
   - **How:**
     - Created internal-leads-auth.tsx to handle auth
       

## File Structure Documentation

This document outlines the key directories and their purposes in the project.

---

### Key Directories

### `src/`
- **Purpose:** Contains core resources and utilities for the project.
- **Subdirectory:**
  - `schema/`: Contains JSON schema files used for JSONForms.

### `components/`
- **Purpose:** Houses reusable UI components.
- **Example:**
  - `InternalLead/`: Contains UI components specific to the InternalLead functionality.

### `pages/`
- **Purpose:** Includes all page-level components for the application.
- **Subdirectory:**
  - `pages/api/`: Contains Next.js API routes for handling backend logic.
  - Other page components for various routes.

### `tests/`
- **Purpose:** Contains test files for components and application functionality.
- **Example:**
  - Unit tests for components.
  - Integration tests for verifying end-to-end functionality.

---

This structure is designed to maintain modularity and clarity in organizing project files, ensuring scalability and ease of maintenance.




---

### **Bonus Points**

- Implement API routes using Next.js API **(Completed)**
- Use [JsonForms](https://jsonforms.io/) to implement the lead form in a configuration driven way (JsonForms is a configuration driven UI component lib) **Completed Vist** [http://localhost:3000/public-lead-form-JsonForm]
- Use a state management library (e.g., Redux) to manage the state of the leads. Used useState and useEffect
- Implement unit tests for key components and functionalities. **Completed using Jest -- npm test**
- Add responsiveness to ensure the application works well on different screen sizes. **Completed**
- Use TypeScript for type safety. **Completed**
- Implement form validation feedback (e.g., show error messages when fields are not filled in correctly). **Completed**
- Document the system design. **Completed** 

# System Design

## Architecture Overview
The application follows a client-server model with:

1. **Frontend:**
   - Next.js with React renders the UI.
   - Material-UI and CSS for consistent design and styling.
  

2. **Backend:**
   - Next.js API routes handle data fetching and updates.
   - Lightweight and sufficient for internal usage.

3. **Database:**
   - Not included in this version (in-memory is used for simplicity).
   - Future updates can integrate a database like PostgreSQL or MongoDB.

4. **API Communication:**
   - Frontend communicates with backend API routes using Axios.

## Component Breakdown

### 1. **Authentication Flow:**
   - Uses local state to manage authentication.
   - Password validation is hardcoded (to be replaced with real auth in the future) Use **admin123** as password to login into internal lead ui.

### 2. **Leads Management:**
   - **Components:**
     - `InternalLeads.js` handles the layout and sidebar.
     - `InternalLeads.js` manages lead filtering, search, and state updates.
     -  internal-leads-auth.tsx creates a mock auth before entering into internal-lead-UI 
   - **APIs:**
     - `GET /api/leads`: Fetch all leads.
     - `PUT /api/leads`: Update lead status.
     - POST /api/leads : Add new leads

## Future Enhancements
1. **Authentication:**
   - Replace hardcoded login with a real authentication mechanism (e.g., OAuth).
2. **Database Integration:**
   - Use a database for persistent lead storage.
3. **State Management:**
   - Introduce Context API or Redux for scalable state management.
4. **Testing:**
   - Add end-to-end tests with Jest.
  
<img width="627" alt="image" src="https://github.com/user-attachments/assets/c13a85e2-51e2-4f86-a9c2-5b5022eb79a7" />


---

THANK YOU

