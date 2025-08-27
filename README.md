# Smart Goal Planner

A React app for managing multiple savings goals, making deposits, and tracking progress.  
Built with Vite and json-server for full CRUD functionality.

## Features

- Add, edit, and delete financial goals (name, target amount, category, deadline)
- Track progress for each goal with a visual progress bar
- Make deposits to any goal and update saved amount
- Overview dashboard showing total goals, total saved, completed goals, warnings, and overdue goals


### 1. Install dependencies
npm install


### 2. Start json-server
npx json-server --watch src/db.json --port 3001

### 3. Start the React app
npm run dev

### 4. Open in browser
Visit [http://localhost:5173](http://localhost:5173)

## Folder Structure

- `src/components` – React components (GoalList, GoalForm, DepositForm, Overview, ProgressBar(jsx))
- `src/db.json` – Local database for goals (used by json-server)
- `src/App.jsx` – Main app logic
- `src/App.css` – Styling

## API Endpoints (json-server)

- `GET /goals` – Fetch all goals
- `POST /goals` – Add a new goal
- `PUT /goals/:id` – Update a goal
- `PATCH /goals/:id` – Update savedAmount
- `DELETE /goals/:id` – Delete a goal

**Demo:**  
[https://github.com/Demestrine/react-smart-goal-planner](https://github.com/Demestrine/react-smart-goal-planner)