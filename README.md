# Smart Goal Planner

A React application for managing financial goals and tracking savings progress.

## Features

- Create, read, update, and delete financial goals
- Track progress toward each goal with visual indicators
- Make deposits to specific goals
- View overview statistics of all goals
- Status indicators for completed, overdue, and near-deadline goals

## Technologies Used

- React
- JSON Server (for backend API)
- CSS for styling

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

Run both the React app and JSON Server with a single command:
```
npm run dev
```

Or run them separately:
- Start JSON Server: `npm run server`
- Start React app: `npm start`

## Deployment

### Frontend (GitHub Pages)
1. Update the homepage in package.json with your GitHub username
2. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

### Backend (Heroku)
1. Create a Heroku account and install Heroku CLI
2. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```
3. Deploy to Heroku:
   ```
   git push heroku main
   ```
4. Update the API_URL in src/App.js with your Heroku app URL

## Project Structure

- `src/components/` - React components
  - `GoalForm.jsx` - Form for adding new goals
  - `GoalList.jsx` - List of all goals
  - `GoalItem.jsx` - Individual goal display
  - `DepositForm.jsx` - Form for making deposits
  - `Overview.jsx` - Summary statistics
- `src/App.js` - Main application component with state management
- `db.json` - Database file for JSON Server

## API Endpoints

- GET `/goals` - Fetch all goals
- POST `/goals` - Create a new goal
- PATCH `/goals/:id` - Update a goal
- DELETE `/goals/:id` - Delete a goal

## Goal Status

- ✅ Completed: Goal amount reached
- ❌ Overdue: Deadline passed without reaching goal
- ⚠️ Near Deadline: Within 30 days of deadline
- ⏳ On Track: Progressing normally

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.