# BackendDataProcesser

<p>Welcome to the data processor for the backend</p>

## Databases
### Create new Entrypoint
   - Example Entrypoint
```json
{
  "endpoints": [
    {
      "url": "/api/users/login",
      "httpMethod": "post",
      "requiredPermission": "none",
      "function": "login"
    },
    {
      "url": "/api/users/signup",
      "httpMethod": "post",
      "requiredPermission": "none",
      "function": "signup"
    },
    {
      "url": "/api/users/info",
      "httpMethod": "get",
      "requiredPermission": "login",
      "function": "getUserInfo()"
    }
  ],
  "responses": {
    "getUserInfo": {
      "users[email:*email]": {
        "username": "username",
        "email": "email",
        "exercises": "exercise"
      }
    }
  }
}


```
   - Path: The path of the entrypoint
   - method: get/post/put/delete
   - Permissions
     - 0: No Permission
     - login: user must me logged in
   - action: login/signup/response/insert
   - response (optional): Contains the database names and paths to the data, which will be returned
     - The Object inside contains the keyword to the specific data as the keywords and the keywords from the response for the values as the value (Exception: `+`)
     - If you want to search in a list for an object with a special value, use: `[key:*value]`
       - The `*` indicate, that this is a value from the cookies
       - The `#` indicate, that this is a value from the body
       - The `°` indicate, that this is a value from is an url parameter (like .../?q=hello+world)
       - The `~` indicate, that this is a value from the parameter from the function call
     - The `+` indicate, that this value will be overridden with the value from the value
       