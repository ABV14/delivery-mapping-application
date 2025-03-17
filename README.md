# Distance-Calculator-Application (Calculate distance between two locations)

This project is a full-stack application built with a Svelte Frontend, an Express Backend, and a PostgreSQL database. 

This README provides detailed instructions for setting up and running the project locally using Docker.

Please find the live here - (https://delivery-mapping-application-abv.vercel.app/)

## Prerequisites

- [Docker](https://www.docker.com/get-started)


## Project Structure
```
distance-calculator(root)/
├── Frontend/       # Svelte Frontend application
├── Backend/        # Express.js Backend application
└── README.md       # Documentation file
└── Dockerfile      #Docker file
```   


## Prerequisites

To run this application locally, you'll need:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) (v13 or later)

To run with Docker, you'll need:

- [Docker](https://www.docker.com/get-started)





## Local Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/ABV14/distance-calculator.git
   cd  distance-calculator


### Backend Setup

1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the Backend directory with your PostgreSQL configuration:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=mydatabase
   DB_USER=postgres
   DB_PASSWORD=yourpassword
   BACKEND_PORT=3000
   ```

4. Start the Backend server:
   ```bash
   npm run dev 
   ```
   - use npm run dev to run the Backend in --watch mode
   - The API will be available at http://localhost:3000

### Frontend Setup

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.development` file in the Frontend directory:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The Frontend will be available at http://localhost:5173

## Running with a Single Docker Container

This project uses a single Dockerfile to set up and run the entire application stack:

1. Place the Dockerfile and start.sh in your project root directory.

2. Build the Docker image:
   ```bash
   docker build -t distance-calculator .
   ```

3. Run the container:
   ```bash
   docker run -p 5173:5173 -p 3547:3547 -p 5432:5432 distance-calculator
   ```

4. The application will be available at:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - PostgreSQL: localhost:5432

## Development

- Backend code changes will automatically restart the server (using nodemon)
- Frontend code changes will trigger hot-module replacement through Vite

## Additional Configuration

### Database Migrations

If your project uses database migrations, run them with:

```bash
cd Backend
npm run migrate
```

### Production Build

To create production builds:

```bash
# Frontend
cd Frontend
npm run build

# Backend
cd Backend
npm run build  # If TypeScript is used
```

## Troubleshooting

- **Database Connection Issues**: Ensure PostgreSQL is running and the credentials in your `.env` file are correct
- **Port Conflicts**: If ports 3000 or 5173 are already in use, modify the respective PORT variables in your `.env` files or Docker configuration
