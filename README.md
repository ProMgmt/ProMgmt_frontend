## Pro_Mgmt
A project management application for collaborative teams.

## Configuration
To run locally, create a .dev.env file with the following environment variables:

```

NODE_ENV='dev'
CLIENT_URL=http://localhost:8080
API_URL=http://localhost:3000
API_URL=http://localhost:3000
CLIENT_URL=http://localhost:8080

```

## Running Pro_Mgmt
1. Start a mongodb
2. Run </npm run start> to start the server on the backend 
3. Run </npm run watch> to render the frontend


## Auth

Sluggram uses Basic authentication and Bearer authorization to enforce access controls. Basic and Bearer auth both use the HTTP Authorization header to pass credentials on a request.

Basic Authentication
Once a user account has been created Basic Authentication can be used to make a request on behalf of the account. To create a Basic Authorzation Header the client must base64 encode a string with the username and password seporated by a colon. Then the encoded string can then be appened to the string 'Basic ' and set to an Authorization header on an HTTP Request.

Bearer Authorization
After a successfull signup or login request the client will receive a token. Bearer Authorization uses that token to make a request on behalf of that user account. The token should be append to the string 'Bearer ' and set to an Authorization header on an HTTP Request.


## API Resources

### User Model
The user model is used on the backend for authentication and authorization. 
* `_id` - generated by mongodb to uniquely identify a user  
* `email` - a unique string that stores the users email
* `username` - a unique string that stores the users username
* `findHash` - a string that holds a users hashed password

### Profile Model
The profile model is used for adding members and admins to organizations, projets and tasks
* `firstName` - a string storing a users given name
* `lastName` - a string storing a users family name
* `_userId` - mongodb's generated id to connect the profile to the user
* `desc` - description about the user
* `company` - company the user belongs to (not required)
* `title` - the users title within their company (not required)

### Org Model
Each user can be a part of an orgaization
* `name` - name of the org
* `desc` - a description of the org
* `projects` - projects connected to the org
* `admins` - admins that are part of an org
* `users` - users that are members of the org

### Project Model
* `orgId` - unique identifier of the org the project belongs to
* `admins` - admins that are a part of the projcet
* `users` - users that are part of the project
* `tasks` - dependencies of the project
* `projectName` - name of proeject
* `desc` - description of the project
* `startDate` - start date of the project
* `dueDate` - due date of the projet

### Task Model
* `projectId` - unique id of project task lives under
* `orgId` - unique id of org that the task lives under
* `admins` - admins that access the task
* `desc` - description of the task
* `startDate` - start date of the task
* `endDate` - end date of the task
* `dueDate` - due date of the task
* `status` - how far along the task is
* `dependentTasks` - tasks dependent on the task



