let helpMessage = `
********************
Available commands:

Please check out our wiki for more help! https://github.com/Traceton/node-trekker/wiki

  Currently available data-types :String :File :Image
  If :File or :Image is going to be used used, Follow the below install instructions, as they will be required for use.
  # :heavy_exclamation_mark: Also, if :File or :Image is being used. multipart/form data must be sent from the client side :heavy_exclamation_mark:
 
  npm install multer multer-gridfs - storage

  Generate a server.js, a router, model, and .rest test file:
  ## Don't forget to set a DATABASE_URL value in the .env file that is generated.
 
  Format: generate crud model-name field-name:data-type field-name:data-type
  Example: generate crud blogPost mainTitle:String description: String 
  Short hand example: g srm blogPost mainTitle:String description: String
  

  Generate a router with a model:
 
  Format: generate router-with-model model-name field-name:data-type field-name:data-type
  Example: generate router-with-model blogPost mainTitle:String description: String  
  Short hand example: g rwm blogPost mainTitle:String description: String
  

  Generate a mongoose model:
 
  Format: generate model model-name field-name:data-type field-name:data-type
  Example: generate model blogPost mainTitle:String description: String 
  Short hand example: g m blogPost mainTitle:String description: String
  

  Generate a router:
 
  Format: generate router router-name model-name field-name:data-type field-name:data-type
  Example: generate router blogPost mainTitle:String description: String 
  Short hand example: g r blogPost mainTitle:String description: String
  

  Generate a rest file with tests:
 
  Format: generate tests router-name model-name field-name:data-type field-name:data-type
  Example: generate tests blogPost mainTitle:String description: String 
  Short hand example: g t blogPost mainTitle:String description: String
  

  Generate a basic node.js/express server with env file:
  ## Don't forget to set a DATABASE_URL value in the .env file that is generated.
 
  Example: generate empty - server 
  Short hand example: g e - s
  

  Generate a empty node.js/express router:
 
  Format: generate empty - router model - name
  Example: generate empty - router blogPost
  Short hand example: g e - r blogPost
  

  Get current commands:
 
  help
  
********************
`;

const help = () => {
  console.log(helpMessage);
};

module.exports = { help };
