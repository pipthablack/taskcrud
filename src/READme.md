# Task Management Application

Welcome to the Task Management Application, a web-based solution developed using Node.js and Express. This application provides a seamless platform for users to efficiently manage their tasks. Whether you are organizing work assignments, personal projects, or daily to-dos, this application empowers you to create, view, update, and delete tasks with ease.

## Key Features

- **Task Operations:** Perform a range of task-related actions, including creating new tasks, updating their details, marking them as completed, and removing tasks that are no longer needed.

- **Task Details:** Each task in the system comprises essential information, including a title, description, due date, and status. This allows users to maintain a comprehensive overview of their tasks.

- **In-Memory Storage:** The application utilizes in-memory storage, ensuring a lightweight and fast solution. However, please note that data persistence is limited to the duration the server is running. Once restarted, the data is reset.

## How to Get Started

To start using the Task Management Application, follow these simple steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   Create a `.env` file in the root directory and set the necessary environment variables:

   ```env
   PORT=3000
   ACCESS_TOKEN_SECRET=your_access_token_secret
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   ```

4. **Start the Server:**

   ```bash
   npm run dev
   ```

5. **Access the Application:**

   Open your web browser and navigate to `http://localhost:8000`. Alternatively, use tools like Postman to interact with the API.

## What Makes This Application Stand Out

- **User-Friendly Interface:** The application is designed with simplicity and user-friendliness in mind. The intuitive interface ensures a smooth experience for users at all levels.

- **Secure Authentication:** Even though the application uses in-memory storage, authentication is implemented securely. Access tokens and refresh tokens are generated and stored in memory during user sessions.

- **Flexible Task Management:** Whether you're a professional managing work tasks or an individual organizing personal projects, the Task Management Application adapts to your unique needs.

## API Endpoints

The application exposes several API endpoints for seamless integration and interaction. For detailed information about each endpoint, refer to the [API documentation](API_DOCUMENTATION.md).
