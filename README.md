# PathForge
**Course Pathway** is a system designed to help GMU Computer Science students plan their classes more effectively. It looks at a student’s completed courses, remaining degree requirements, and career interests, then recommends electives and future courses that fit both their graduation needs and career goals. 


## Setup and Installation

### Prerequisites
- Node.js and npm
- MySQL Server
- MySQL Workbench

### 1. Navigation

Clone the GitHub repository and navigate to the project directory.

```bash
cd PathForge/backend
```

### 2. Installation
```bash
npm install
```
### 3. Setup MySql

create a file in the backend called .env and add this: 
```bash
MYSQL_HOST = localhost
MYSQL_USER = root
MYSQL_PASSWORD = yourmysqlpassword
MYSQL_DATABASE = pathforge
```

### 4. Running
run the server using this:
```bash
node app.js
```
