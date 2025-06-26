# AfriCharge - Autonomous EV Charging Network
A web application for managing electric vehicle charging stations in Africa.
## Setup

### Prerequisites
- **Node.js**: v18.x (use `nvm` to install: `nvm install 18 && nvm use 18`)
- **npm**: v9.x or higher (comes with Node.js 18)
- **Python 3.8**: With `pipenv` for backend dependencies
- **PostgreSQL**: For the database

### Installation
1. **Install PostgreSQL**:
   - `sudo apt update && sudo apt install postgresql postgresql-contrib`
   - Create database and user:
   - Seed data: `pipenv run python server/seed.py`
   - Replace `yourusername` and `yourpassword` with your preferred credentials.

2. **Backend Setup**:
- Navigate to project root: `cd ~/development/code/phase-4/Afri-charge`
- Install dependencies: `pipenv install`
- Set environment: `export FLASK_APP=server`
- Initialize and apply migrations:
- Run backend: `pipenv run python server/app.py`

3. **Frontend Setup**:
- Navigate to client: `cd client`
- Install dependencies: `npm install`
- Run frontend: `npm start`
- Open `http://localhost:3000` in your browser.

## Deployment
(To be updated with Render deployment steps by Ali)

## Usage
- **Home/Get Started**: View the landing page with a call-to-action to log in.
- **Find Stations**: See a map and list of charging stations (requires backend running).
- **Add Station**: Submit a new station (requires login and backend).
- **About**: Learn about AfriCharge and the team.
- **Login**: Authenticate to access protected features.

## Development Notes
- **Styling**: Uses Tailwind CSS with a custom `africharge-blue` theme. Adjust `tailwind.config.js` for branding.
- **API**: Connects to `http://localhost:5555/api/stations` for data. Ensure CORS is configured in `server/config.py`.
- **Testing**: Use browser dev tools to inspect and tweak layouts.