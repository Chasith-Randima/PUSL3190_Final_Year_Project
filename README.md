# User Guide

## 1. Installation and Setup Instructions

- Download or clone the project. Then navigate inside to inside the project directory.
- Make sure you have an internet connection.

Inside that folder, there are 4 other folders:

1. **Backend-RestAPI**
2. **Scrape-API**
3. **Summarizer-API**
4. **Frontend**

### 1.1 Backend-RestAPI:

#### Platform Specification:
- Node.js – v 20.X
- MongoDB – v 8.X

#### Installation Steps:
- Copy the project or Clone the repository.
- Navigate to the `Backend-RestAPI` directory.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start the development server. – it will start running on port 3001.
- Run `npm run start` to start the production server - it will start running on port 3001.

#### Running Test Cases:
- Navigate to the `Backend-RestAPI` directory.
- Run `npm run test`.

### 1.2 Scrape-API:

#### Platform Specification:
- Node.js – v 20.X
- MongoDB – v 8.X

#### Installation Steps:
- Copy the Project or Clone the repository.
- Navigate to the `Scrape-API` directory.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start the development server. – it will start running on port 3002.
- Run `npm run start` to start the production server - it will start running on port 3002.

#### Running Test Cases:
- Navigate to the `Scrape-API` directory.
- Run `npm run test`.

### 1.3 Summarizer API:

#### Platform Specification:
- Python - v 3.X
- Flask – v 3.X

#### Installation Steps:
- Install Python 3.x if not already installed.
- Navigate to the `summarizer-api` directory.
- Create a virtual environment (optional but recommended) by running `py -m venv .venv`.
- Then activate the virtual environment by running `.venv/Scripts/activate`.
- Install dependencies using `pip install -r requirements.txt`.
- Navigate to the `src` directory.
- Run `python server.py` to start the Flask server.
- Server will start running on port 3005.

#### Running Tests:
- Navigate to the `tests` directory.
- Run `python server_test.py`.

Optional Details about the Summarizer-API:

Inside the `summarizer-api`, there is a folder called `server_to_run_model_locally`. This folder contains a Flask server that can be used to run the model weights on the local computer.

### 1.4 Frontend Server:

#### Minimum Platform Specification:
- Node.js – v 20.X
- Next.JS – v 14.X
- React.JS – v 18.X

#### Installation Steps:
- Copy or Clone the repository.
- Navigate to the `Frontend` directory.
- Run `npm install` to install dependencies.
- Run `npm run dev` to start the development server. – it will start running on port 3000 (http://127.0.0.1:3000).
- Run `npm run start` to start the production server - it will start running on port 3000.

#### Running Test Cases:
- Navigate to the `Frontend` directory.
- Run `npm run test`.

## 2. Login Credentials and Specifications

### 2.1 Login Credentials

- Any user can signup and login to the website with their login details. But admin users can’t be created from the signup. It has to be done either directly from the database or only another admin user can make another user admin from the user management page in the website.
  
#### Admin user credentials:
- Email: randima@gmail.com
- Password: 1234567890

#### Normal user account for ease of use:
- Email: charith@gmail.com
- Password: 1234567890

## 3. Installation for Demonstration

- Follow the installation steps provided for each component.
- Ensure all dependencies are installed correctly.
- Start each server according to the provided instructions.

## 4. System Usage

- After installation, the Backend-RestAPI, ScrapeAPI, SummarizerAPI, and frontend server will be up and running.
- Access the frontend server in your browser to interact with the application. It will be started on port 3000 (http://127.0.0.1:3000).
- Use the provided endpoints to interact with the backend APIs for scraping and summarizing articles.

## 5. Platform Specification

- Ensure the minimum platform specifications are met for each component (Node.js, Python 3.x, MongoDB).
  - Python Version should be Higher than 3.0
  - Node.Js version is tested on v20.10.0
- Internet connectivity is required for some components to fetch data from external sources.

