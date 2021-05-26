# :rocket: Node-Treker

### Node-Treker is a simple npm package for people using node.js, express, and mongoose to create a RESTFUL api.

#### Node-treker can generate a working express server, with Create Read Update and Delete routes, a mongoose model, and a .rest file to test your routes. Or generate individual components as needed. 


## :one: Install and setup:
#### :heavy_exclamation_mark: express, mongoose and dotenv are not required packages, but are what is supported here. :heavy_exclamation_mark:

### :two: navigate to your desired directory

``` use npm init Your-App-Name-Here ```

### :three: Next, install the packages below for best compatibility:

``` npm i dotenv express mongoose ```
### :four: Next, install node-treker

``` npm i node-treker -D ```

### :five: Next, navigate to your package.json file and copy the node-treker script given here:

```
 "scripts": {
    "node-trecker": "node node_modules/node-treker/index.js"
  }
```

 ## :six: How To Use:

 Before running any commands you must start node-treker from the terminal inside of your apps directory:

 ``` npm run node-treker ```

 ## :seven: :arrow_down: Current Available commands:

 ### Generate a server.js, a router, model, and .rest test file:
 ##### Don't forget to set a DATABASE_URL value in the .env file that is generated.
 ```
 Format: generate server-router-model model-name field-name:data-type field-name:data-type
 Example: generate server-router-model blogPost mainTitle:String description:String 
 Short hand example: g srm blogPost mainTitle:String description:String 
 ```

 ### Generate a router with a model:
 ``` 
 Format: generate router-with-model model-name field-name:data-type field-name:data-type
 Example: generate router-with-model blogPost mainTitle:String description:String  
 Short hand example: g rwm blogPost mainTitle:String description:String 
 ```

 ### Generate a mongoose model:
 ```
 Format: generate model model-name field-name:data-type field-name:data-type
 Example: generate model blogPost mainTitle:String description:String 
 Short hand example: g m blogPost mainTitle:String description:String 
 ```

 ### Generate a router:
 ```
 Format: generate router router-name/model-name field-name:data-type field-name:data-type
 Example: generate router blogPost mainTitle:String description:String 
 Short hand example: g r blogPost mainTitle:String description:String 
 ```

 ### Generate a rest file with tests:
 ``` 
 Format: generate tests router-name/model-name field-name:data-type field-name:data-type
 Example: generate tests blogPost mainTitle:String description:String 
 Short hand example: g t blogPost mainTitle:String description:String 
 ```

 ### Generate a basic node.js/express server with env file:
 ##### Don't forget to set a DATABASE_URL value in the .env file that is generated.
 ```
 Example: generate empty-server 
 Short hand example: g e-s
 ```

 ### Generate a empty node.js/express router:
 ```
 Format: generate empty-router model-name
 Example: generate empty-router blogPost
 Short hand example: g e-r blogPost
 ```



