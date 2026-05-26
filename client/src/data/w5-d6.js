export const w5d6Data = {
  dayId: "w5-d6",
  dayTitle: "Day 6: Mongoose Schemas, Models & Schema Validation",
  topics: [
    {
      id: "w5-d6-t1",
      title: "1. Mongoose ODM: Object Document Mapper",
      customComponent: "SchemaModelsViz",
      explanation: "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It acts as a bridge between JavaScript code and the MongoDB database, allowing you to define structured schemas, validate data, and manage relationships between collections easily.",
      progression: [
        {
          level: "easy",
          title: "The ODM Layer",
          content: "While MongoDB collections are schemaless, Mongoose enforces structure on the application level. It maps JavaScript objects to MongoDB documents, validating data before saving it to the database."
        },
        {
          level: "intermediate",
          title: "Connecting Mongoose",
          content: "Connect to MongoDB using the `mongoose.connect()` method, passing connection URLs and setting up event handlers to monitor connection status."
        },
        {
          level: "advanced",
          title: "Mongoose Middleware hooks",
          content: "Use Mongoose pre and post hooks (middleware) to run logic automatically before or after database actions, such as hashing passwords before saving user documents."
        }
      ],
      detailedReference: {
        summary: "Mongoose provides structured schemas, validation checks, and middleware hooks for MongoDB models in Node.js applications.",
        keyConcepts: [
          { term: "Object Document Mapper", definition: "A library that maps JavaScript objects and models to MongoDB database documents." }
        ],
        bestPractices: [
          "Use Mongoose to manage application-level validation and schema structure.",
          "Keep connection configurations centralized in a database config file."
        ]
      },
      assessment: "Explain the role of an ODM like Mongoose in a Node.js and MongoDB application stack."
    },
    {
      id: "w5-d6-t2",
      title: "2. Defining Mongoose Schemas",
      customComponent: "SchemaModelsViz",
      explanation: "A Mongoose Schema defines the structure of documents within a MongoDB collection, specifying field names, data types, validation constraints, and default values.",
      progression: [
        {
          level: "easy",
          title: "Schema Constructor",
          content: "Instantiate a schema using `new mongoose.Schema({ ... })`, defining field keys and basic JS data types (e.g. `String`, `Number`, `Boolean`, `Date`)."
        },
        {
          level: "intermediate",
          title: "Configuring Default Values",
          content: "Assign fallback values to schema fields (e.g., `role: { type: String, default: 'student' }`). Mongoose applies these defaults automatically if the field is omitted during document creation."
        },
        {
          level: "advanced",
          title: "Nested Object Schemas",
          content: "Nest schemas within schemas to represent complex, structured sub-documents (e.g., nesting an `addressSchema` within a `userSchema`)."
        }
      ],
      detailedReference: {
        summary: "Define collection document structures, types, and defaults using the mongoose.Schema constructor.",
        keyConcepts: [
          { term: "Schema", definition: "A Mongoose class object defining the structure, types, and validations of documents in a collection." }
        ],
        bestPractices: [
          "Keep schemas simple and flat where possible to make queries easy to write.",
          "Specify the index parameter (`index: true`) on fields you query frequently to speed up searches."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const mongoose = require('mongoose');

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  createdAt: {
    type: Date,
    default: Date.now // Applies current timestamp automatically
  }
});`
      },
      assessment: "Write a Mongoose schema definition for a product with string name, number price, and boolean inStock."
    },
    {
      id: "w5-d6-t3",
      title: "3. Schema Validation: Types, Constraints",
      customComponent: "SchemaModelsViz",
      explanation: "Mongoose provides built-in validation rules to ensure data matches required formats before it is saved to the database. These rules include type enforcement, required flags, numeric ranges, and custom regex matching.",
      progression: [
        {
          level: "easy",
          title: "Enforcing Required Fields",
          content: "Flag fields as required using the `required` constraint: `username: { type: String, required: [true, 'Username is required'] }`. If a write query is missing this field, Mongoose throws a ValidationError."
        },
        {
          level: "intermediate",
          title: "Numeric Ranges & String Lengths",
          content: "Enforce numeric ranges using `min` and `max` (e.g., `age: { type: Number, min: 18 }`), and string lengths using `minlength` and `maxlength` constraints."
        },
        {
          level: "advanced",
          title: "Regex Format Matches",
          content: "Validate field formats using the `match` operator with a regular expression (e.g., `email: { type: String, match: [/@/, 'Invalid email format'] }`), which is ideal for validating emails, phone numbers, or zip codes."
        }
      ],
      detailedReference: {
        summary: "Validate fields before saving them using built-in Mongoose constraints like required, min/max length, and regex matches.",
        keyConcepts: [
          { term: "Schema Validation", definition: "Validation rules declared in schemas that are executed by Mongoose before saving documents to the database." }
        ],
        bestPractices: [
          "Write clear, custom error messages for all validation checks to help guide users.",
          "Validate unique fields (like email) on the database level using the `unique: true` constraint."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username name is required'],
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/@/, 'Please enter a valid email address']
  }
});`
      },
      assessment: "Write Mongoose schema validation rules for an age field that must be between 18 and 65."
    },
    {
      id: "w5-d6-t4",
      title: "4. Compiling Models: mongoose.model()",
      customComponent: "SchemaModelsViz",
      explanation: "Once a schema is defined, compile it into a Model using the `mongoose.model()` method. Models are constructor functions compiled from schemas, providing methods to query, update, and delete documents in MongoDB.",
      progression: [
        {
          level: "easy",
          title: "Compiling Schemas to Models",
          content: "Compile a schema into a model: `const User = mongoose.model('User', userSchema)`. Mongoose automatically maps the model to a lowercase, plural collection name in MongoDB (e.g., 'User' becomes the 'users' collection)."
        },
        {
          level: "intermediate",
          title: "Instantiation & Saving Documents",
          content: "Create a new document instance using your Model, then call `.save()` to save it to the database: `const user = new User({ name: 'Alex' }); await user.save();`."
        },
        {
          level: "advanced",
          title: "Model Query Methods",
          content: "Use compiled model methods (like `User.find()`, `User.findByIdAndUpdate()`, `User.deleteOne()`) to execute queries programmatically in your Node.js application."
        }
      ],
      detailedReference: {
        summary: "Compile schemas into models using mongoose.model(), creating constructor functions that provide methods to interact with MongoDB collections.",
        keyConcepts: [
          { term: "Model", definition: "A Mongoose class compiled from a schema, providing methods to perform database CRUD operations." }
        ],
        bestPractices: [
          "Name models using singular, PascalCase nouns (e.g. 'User', 'ProductCard').",
          "Export compiled models from schema files to keep database operations organized."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  price: Number
});

// Compile Schema to Model constructor
const Product = mongoose.model('Product', productSchema);

module.exports = Product;`
      },
      assessment: "Describe the difference between a Mongoose Schema and a Mongoose Model."
    },
    {
      id: "w5-d6-t5",
      title: "5. Handling Validation Errors",
      customComponent: "SchemaModelsViz",
      explanation: "When validation checks fail, Mongoose throws a `ValidationError` containing details about the failing fields. Learn how to catch these errors and format them into readable error messages.",
      progression: [
        {
          level: "easy",
          title: "Catching Database Errors",
          content: "Wrap database save and update queries in `try...catch` blocks to catch database errors and prevent server crashes."
        },
        {
          level: "intermediate",
          title: "Parsing Mongoose Validation Errors",
          content: "Mongoose validation errors are grouped in the `error.errors` object. Extract field-specific messages using `error.errors[field].message`."
        },
        {
          level: "advanced",
          title: "Formatting API Responses",
          content: "Map Mongoose validation errors into structured objects (e.g. `{ [field]: message }`), returning them to frontend clients as clean JSON error payloads."
        }
      ],
      detailedReference: {
        summary: "Catch Mongoose validation errors in try...catch blocks, extracting error messages from the error.errors object to return to clients.",
        keyConcepts: [
          { term: "ValidationError", definition: "An error thrown by Mongoose when document properties violate schema constraints." }
        ],
        bestPractices: [
          "Always handle database errors in try...catch blocks to keep your server running.",
          "Format validation errors into user-friendly messages before returning them to client frontends."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const saveUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log('User saved successfully.');
  } catch (err) {
    if (err.name === 'ValidationError') {
      // Loop through errors and log messages
      Object.keys(err.errors).forEach(key => {
        console.error(\`Field \${key}: \${err.errors[key].message}\`);
      });
    } else {
      console.error('Database write error:', err);
    }
  }
};`
      },
      assessment: "Write a try...catch block that catches a Mongoose ValidationError and prints the message of the failing field."
    },
    {
      id: "w5-d6-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Mongoose models compilation structures, validation constraints checklist slides, middleware lifecycle diagrams, and schema design exercises.",
        duration: "15 mins",
        resources: [
          "Mongoose ODM Presentation slides (PDF)",
          "Validation Exercises (ZIP)"
        ]
      }
    }
  ]
};
