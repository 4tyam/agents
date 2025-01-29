# AI Todo List Assistant

An intelligent todo list application powered by openai that helps you manage your tasks through natural language conversations.

## Features

- Natural language task management
- Add new todos
- View all todos
- Search todos
- Delete todos
- Intelligent conversation handling

## Tech Stack

- Node.js
- OpenAI&#x20;
- PostgreSQL
- Drizzle ORM
- Docker

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   DATABASE_URL=postgres://admin:admin@localhost:5431/postgres
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the PostgreSQL database:

   ```bash
   docker-compose up -d
   ```

5. Run database migrations:

   ```bash
   npm run migrate
   ```

6. Start the application:

   ```bash
   node index.js
   ```

## Database Schema

The application uses a simple `todos` table with the following structure:

- `id`: Integer (Primary Key, Auto-increment)
- `todo`: Text (Not Null)
- `created_at`: Timestamp
- `updated_at`: Timestamp

## Available Commands

- `npm run generate`: Generate database migrations
- `npm run migrate`: Run database migrations
- `npm run studio`: Launch Drizzle Studio for database management

## Usage Examples

Start the application and interact with it using natural language:

```plaintext
>> Add a task to buy groceries
📜: Can you tell me what items you want to buy?
>> I need to buy milk, bread, and eggs
📜: Your todo has been added successfully
>> Show me all my tasks
📜: Here are all your todos...
```

## Development

The project uses Drizzle ORM for database operations and includes:

- Database migrations
- Schema definitions
- Docker configuration for PostgreSQL
- OpenAI integration for natural language processing

## Available Tools

The AI assistant has access to the following tools:

- `getAllTodos()`: Returns all todos from the database
- `createTodo(todo)`: Creates a new todo and returns its ID
- `deleteTodoById(id)`: Deletes a todo by its ID
- `searchTodo(query)`: Searches todos using a query string