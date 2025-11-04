# Task Manager (Todo App)

A simple **full-stack TypeScript Todo list** project.  
It includes:
- **Backend:** Node.js + Express + TypeScript (in-memory storage)
- **Frontend:** Vanilla TypeScript compiled to JS, served via `live-server`

---

## Project Structure

```bash
back/
src/
controllers/ # request handlers
data/ # in-memory repository
models/ # task & response types
routes/ # /tasks endpoints
services/ # business logic
utils/ # logger & error handler
index.ts # server entry point
package.json
tsconfig.json

front/
src/
api.ts # REST API calls
main.ts # app entry
ui.ts # DOM rendering & events
types.ts # shared types
index.html
styles.css
package.json
tsconfig.json
```

---

## API Endpoints

**Base URL:** `http://localhost:3000/tasks`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | `/tasks` | Get all tasks (optional `q` and `status` filters) |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

### Example: Create Task
```json
POST /tasks
{
  "title": "Learn TypeScript",
  "description": "Watch a tutorial",
  "status": "in_progress"
}

Example: Response

{
  "success": true,
  "data": {
    "id": 1730638231541,
    "title": "Learn TypeScript",
    "description": "Watch a tutorial",
    "status": "in_progress"
  }
}
```

---

## Installation & Run

### Backend

```bash
cd back
npm install
npm run dev
# runs at http://localhost:3000
```

### Frontend

```bash
cd front
npm install
npm run dev
# opens http://127.0.0.1:8080 or similar
```

## Notes

Data is stored in memory, so it resets on restart.
CORS is enabled, so frontend and backend work together locally.
The frontend uses compiled TypeScript from /src → /dist.