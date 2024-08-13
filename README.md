# Getting Started with News App

## Prerequisites

Docker: Ensure Docker is installed on your machine. Download it from Docker's official site.\
Docker Compose: Docker Compose is included with Docker Desktop. If you're using Docker on Linux, you may need to install Docker Compose separately.

#### Step 1: Create a .env.local file
Create a new file named .env.local in the root directory of the project.

#### Step 2: Add environment variables to .env.local file
Add the following contents to the .env.local file:

REACT_APP_NEWS_API_KEY=YOUR_NEWS_API_KEY_HERE \
REACT_APP_GUARDIAN_API_KEY=YOUR_GUARDIAN_API_KEY_HERE \
REACT_APP_NEWS_API_AI_KEY=YOUR_NEWS_API_AI_KEY_HERE 

Replace YOUR_NEWS_API_KEY_HERE, YOUR_GUARDIAN_API_KEY_HERE, and YOUR_NEWS_API_AI_KEY_HERE with the actual API keys.

## Running the Project

### A. Using Docker Compose

#### 1. Navigate to the Project Directory
Open a terminal and navigate to the directory containing the docker-compose.yml file.

### `cd /path/to/news `

#### 2. Build and Start the Containers:
Run the following command to build the Docker image and start the container:

### `docker-compose up`

 This command will: \
    * Build the Docker image according to the Dockerfile. \
    * Start the container with environment variables loaded from .env.local. \
    * Map port 3000 of the container to port 3000 on your host machine.

#### 3. Access the Application:
Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the News application.

#### 4. Stop the Containers:
To stop the containers, press Ctrl+C in the terminal where Docker Compose is running, or use:

### `docker-compose down`

This will stop and remove the containers.

### B. Using Docker CLI (Alternative)
If you prefer to use Docker CLI directly without Docker Compose:

#### 1. Build the Docker Image:
Run the following command to build the Docker image:

### `docker build -t news`

#### 2. Run the Docker Container:
Start the container with

### `docker run -p 3000:3000 -v $(pwd):/app --env-file .env.local news`
 
 * -v $(pwd):/app mounts the current directory into /app in the container. 
 * --env-file .env.local loads environment variables from the .env.local file. 
 * -p 3000:3000 maps port 3000 of the container to port 3000 on the host.

#### 3. Access the Application:

Open your web browser and navigate to [http://localhost:3000](http://localhost:3000).

#### 3. Stop the Container:
To stop the running container, first list the containers:

### `docker ps`

Find the container ID and stop it with:
### `docker stop <container_id>`


