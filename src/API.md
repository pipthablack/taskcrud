# API ENDPOINTS

- [API ENDPOINTS](#api-endpoints)

- Link to API Endpoints: `https://documenter.getpostman.com/view/22964988/2s9YeD8YPZ`
- Create Task: `POST /api/tasks`
- View Tasks: `GET /api/tasks`
- View User Tasks: `GET /api/tasks`
- Update Task: `PUT /api/tasks/:id`
- Delete Task: `DELETE /api/tasks/:id`
- Register User: `POST /api/users/register`
- Login User: `POST /api/users/login`
- Logout User: `POST /api/users/logout`

Task Management Microservice API
This document provides information on the API endpoints and how to interact with the Task Management Microservice.

User Endpoints

User Registration
Register a new user.

- URL: `/api/auth/signup`
- Method: `POST`
- Request Body:

````{
  "username": "your-username",
  "email": "your-email@example.com",
  "password": "your-password"
}```

- Response:
 - 200 OK: User registration successful.
 - 400 Bad Request: Invalid input data.


User Login
Login a user.

 - URL: `/api/auth/login`
 - Method: `POST`
 - Request Body:
```{
  "email": "your-email@example.com",
  "password": "your-password"
}```
- Response:
 - 200 OK: User login successful.
 - 401 Unauthorized: Invalid login credentials.
 - 500 Internal Server Error: Server error.

Task Endpoints
Create Task
Create a new task.

- URL: `/api/tasks/create`
- Method: `POST`
- Request Body:
``` {
  "description": "Task Description",
  "status": "pending",
  "dueDate": "2023-12-31"
}```
- Response:
 - 201 Created: Task created successfully.
 - 400 Bad Request: Invalid input data.
 - 401 Unauthorized: User not authenticated.
 - 500 Internal Server Error: Server error.


View All Tasks
View all tasks for a user.

- URL: `/api/tasks/all`
- Method: `GET`
- Request Headers:
 - Authorization: Bearer YOUR_JWT_TOKEN (Required for authentication)
- Response:
"tasks": [
        {
            "_id": "51a5d963-af43-4385-8f64-84c7397179a7",
            "description": "read more ruby pdfs",
            "status": "pending",
            "dueDate": "2023-11-26"
        },
        {
            "_id": "f251f1a8-8606-453e-8ae5-ed5f5e61f287",
            "description": "read more go pdfs",
            "status": "pending",
            "dueDate": "2023-11-26"
        },
]

Update Task
Update an existing task.

- URL: `/api/tasks/update/:id`
- Method: `PUT`
- Request Headers:
 - Authorization: Bearer YOUR_JWT_TOKEN (Required for authentication)
- URL Parameters:
 - id (Path Parameter): The unique identifier of the task to be updated.
- Request Body:
``` {
    "description": "read more py pdfs",
    "status":"pending",
    "dueDate": "2023-11-29"
 }```
- Response:
 - 200 OK: Task updated successfully.
 - 400 Bad Request: Invalid input data.
 - 401 Unauthorized: User not authenticated.
 - 403 Forbidden: User does not own this task.
 - 404 Not Found: Task not found.


Delete Task
Delete a task.

- URL: `/api/tasks/delete/:id`
- Method: `DELETE`
- Request Headers:
 - Authorization: Bearer YOUR_JWT_TOKEN (Required for authentication)
- URL Parameters:
 - id (Path Parameter): The unique identifier of the task to be deleted.
- Response:
 - 200 OK: Task deleted successfully.
 - 401 Unauthorized: User not authenticated.
 - 403 Forbidden: User does not own this task.
 - 404 Not Found: Task not found.
 


Update Task Status
Update task status (completed or pending).

- URL: `/api/tasks/:id`
- Method: `PUT`
- Request Headers:
 - Authorization: Bearer YOUR_JWT_TOKEN (Required for authentication)
- URL Parameters:
 - id (Path Parameter): The unique identifier of the task to update its status.
Request Body:
``` {
"status": "completed"
} ```

- Response:
 - 200 OK: Task status updated successfully.
 - 400 Bad Request: Invalid input data.
 - 401 Unauthorized: User not authenticated.
 - 403 Forbidden: User does not own this task.
 - 404 Not Found: Task not found.
