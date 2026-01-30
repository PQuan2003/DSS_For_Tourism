# PROJECT TITLE  
## DECISION SUPPORT SYSTEM FOR TOURISM

---

## PROJECT DEMO
**LINK DEMO:**  
https://drive.google.com/file/d/18QrY0MHz9KKNMNFpY4acbUMBqHxzMOIb/view?usp=sharing

---

## INSTALLATION & SETUP

---

### 0. REQUIREMENTS
- Node.js (v24.8.0 or later)
- npm (v11.6.0 or later)
- MySQL Server (v8.0 or later)
- Modern web browser (Chrome, Edge, Firefox)
- Git

---

### 1. CLONING THE REPOSITORY
Run the following command inside the folder you want:

```bash
git clone https://github.com/PQuan2003/DSS_For_Tourism.git

```

---

### 2. SETUP THE DATABASE

#### Step 1: Create a New Database
- Using MySQL Workbench or MySQL CLI, run this command:

```sql
CREATE DATABASE your_database_name_here;
```

#### Step 2: Import the SQL File
- Open MySQL Workbench  
- Connect to MySQL Server  
- Go to **Server → Data Import**  
- Select **Import from Self-Contained File**  
- Choose `database/project_db.sql`  
- Select **Default Target Schema → your_database_name_here**  
- Click **Start Import**

#### Step 3 (Optional): 
- Check if the database is properly loaded

---

### 3. BACKEND SETUP

#### Step 1: Navigate to Backend Folder
Navigate to BE folder with:

```bash
cd .\backend\
```

#### Step 2: Install Backend Dependencies
Run this command:

```bash
npm install
```

#### Step 3: Configure Environment Variables
- First check if there is already an .env file
- If yes, change the content of the .env file to what you will use
- If no, create a .env file in the backend folder

The .env file will have these fields:
- MYSQL_DATABASE_NAME
- MYSQL_USERNAME
- MYSQL_PASSWORD
- MYSQL_HOST
- MYSQL_PORT
- PORT
- JWT_SECRET

#### Step 4: Start the Backend Server
To start the BE server, run:

```bash
npm start
```

You should see these lines:

```text
> server@1.0.0 start
> nodemon server.js
```

The BE server will be able to run normally after this line:

```text
Server is running on port your_port_here
```

---

### 3. FRONTEND SETUP

#### Step 1: Navigate to Frontend Folder
Navigate to FR folder with:

```bash
cd .\frontend\
```

#### Step 2: Install Backend Dependencies
Run this command:

```bash
npm install
```

React, Tailwind CSS, and all UI libraries will be installed automatically.

#### Step 2.5: Fix shadcn/ui Component Issues (If Any)
- In some cases, shadcn/ui components may not work correctly after cloning the project (e.g., missing files or import errors).
- If such an issue occurs, re-install the required shadcn/ui components:

```bash
npx shadcn@latest add component_name
```

Alternatively, to reinitialize shadcn/ui configuration:

```bash
npx shadcn@latest init
```

#### Step 3: Start the Frontend Application
To start the FE server, run:

```bash
npm run dev
```

You should see these lines:

```text
> front_end@0.0.0 dev
> vite
```

The BE server will be able to run normally after this line:

```text
VITE v6.4.1 ready in x duration
```



