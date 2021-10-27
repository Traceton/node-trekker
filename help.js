let helpMessage = `
********************
Available commands:

Current available data-types, :File :Image :String
if using :File or :Image, the client side must send multipart/form data to the upload route.

Generate a server.js, a router, model, and .rest test file:
Don't forget to set a DATABASE_URL value in the .env file that is generated.
Format: generate server-router-model model-name field-name:data-type field-name:data-type
Example: generate server-router-model blogPost mainTitle:String description:String 
Short hand example: g srm blogPost mainTitle:String description:String 

Generate a router with a model:
Format: generate router-with-model model-name field-name:data-type field-name:data-type
Example: generate router-with-model blogPost mainTitle:String description:String  
Short hand example: g rwm blogPost mainTitle:String description:String 
 
Generate a mongoose model:
Format: generate model model-name field-name:data-type field-name:data-type
Example: generate model blogPost mainTitle:String description:String 
Short hand example: g m blogPost mainTitle:String description:String 
 
Generate a router:
Format: generate router router-name/model-name field-name:data-type field-name:data-type
Example: generate router blogPost mainTitle:String description:String 
Short hand example: g r blogPost mainTitle:String description:String 
 
Generate a rest file with tests:
Format: generate tests router-name/model-name field-name:data-type field-name:data-type
Example: generate tests blogPost mainTitle:String description:String 
Short hand example: g t blogPost mainTitle:String description:String 
 
Generate a basic node.js/express server with env file:
Don't forget to set a DATABASE_URL value in the .env file that is generated.
Example: generate empty-server 
Short hand example: g e-s
 
Generate a empty node.js/express router:
Format: generate empty-router model-name
Example: generate empty-router blogPost
Short hand example: g e-r blogPost
********************
`;

const help = () => {
  console.log(helpMessage);
};

module.exports = { help };
