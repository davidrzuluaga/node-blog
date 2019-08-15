# Welcome to this node-api project

feel free to clone and fork this repo 

## Steps
clone this repo locally using 
```
git clone https://github.com/davidrzuluaga/node-blog/
cd node-blog
npm install 
npm start:dev
```

## Routes to use this app

### User Routes
``` javascript
post -> localhost:5000/api/users/ //use this to create a new user
post -> localhost:5000/api/users/login //use this to login whit an existent user
get -> localhost:5000/api/users/current //use this to check an existent user token
```

### Blog Routes
```javascript
get -> localhost:5000/api/blogs //use this to get all the blog entries
get -> localhost:5000/api/blog/:id //use this to get all blog entries from a specific user
delete -> localhost:5000/api/blog/:id //use this to delete a specific blog entry
post -> localhost:5000/api/blog/:id //use this to create a new blog entry
```
