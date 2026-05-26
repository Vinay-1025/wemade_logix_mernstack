export const w5d5Data = {
  dayId: "w5-d5",
  dayTitle: "Day 5: MongoDB CRUD Operations & Query Operators",
  topics: [
    {
      id: "w5-d5-t1",
      title: "1. MongoDB Shell CLI & Write Operations",
      customComponent: "CrudOperationsViz",
      explanation: "MongoDB Shell (mongosh) is an interactive JavaScript interface for querying and updating MongoDB instances. Write operations allow you to insert documents into collections using `insertOne()` (inserts a single document) or `insertMany()` (inserts an array of documents).",
      progression: [
        {
          level: "easy",
          title: "Shell Connect & database commands",
          content: "Connect to MongoDB using the `mongosh` command. Use the `show dbs` command to list databases, and the `use dbname` command to select a database."
        },
        {
          level: "intermediate",
          title: "Insert One Document (insertOne)",
          content: "Use the `insertOne()` method to insert a document: `db.users.insertOne({ name: \"Alex\", age: 24 })`. MongoDB creates the collection automatically and returns the generated `insertedId` ObjectID."
        },
        {
          level: "advanced",
          title: "Bulk Insert (insertMany)",
          content: "Use `insertMany()` to insert multiple documents in a single operation by passing an array of documents: `db.users.insertMany([{ name: \"Sam\" }, { name: \"Taylor\" }])`."
        }
      ],
      detailedReference: {
        summary: "Use the mongosh shell and insertOne/insertMany methods to connect to MongoDB and insert documents into collections.",
        keyConcepts: [
          { term: "mongosh", definition: "The interactive JavaScript shell interface used to query, configure, and manage MongoDB instances." }
        ],
        bestPractices: [
          "Always verify the target database using the `db` command before executing write queries.",
          "Use insertMany for bulk imports to reduce network roundtrips and improve write performance."
        ]
      },
      assessment: "Write the MongoDB shell command to insert a document with name 'Product A' and price 99 into a products collection."
    },
    {
      id: "w5-d5-t2",
      title: "2. Read Operations: find, findOne & Projections",
      customComponent: "CrudOperationsViz",
      explanation: "Read operations allow you to query collections and retrieve matching documents using the `find()` (returns a cursor to all matches) or `findOne()` (returns the first matching document) methods.",
      progression: [
        {
          level: "easy",
          title: "Fetch All Documents",
          content: "Query a collection by calling the `find()` method without arguments: `db.users.find()`. Use the `.pretty()` modifier in classic shells to format output."
        },
        {
          level: "intermediate",
          title: "Query Filters & Conditions",
          content: "Pass a query filter object to match specific field values (e.g. `db.users.find({ role: \"student\" })`)."
        },
        {
          level: "advanced",
          title: "Query Projections",
          content: "Use projection parameters to return only specific fields (e.g. `db.users.find({ active: true }, { name: 1, email: 1, _id: 0 })` returns name and email while hiding the _id field)."
        }
      ],
      detailedReference: {
        summary: "Query documents using find and findOne, passing filter parameters and projections to return only required fields.",
        keyConcepts: [
          { term: "Projection", definition: "A MongoDB parameter that controls which fields are included or excluded in query results." }
        ],
        bestPractices: [
          "Use findOne() when searching by unique fields (like email or ObjectID) to speed up queries.",
          "Use projections to return only the fields your application needs, saving network bandwidth."
        ]
      },
      assessment: "Write a MongoDB query that retrieves all active users, returning only their username and email fields."
    },
    {
      id: "w5-d5-t3",
      title: "3. MongoDB Query Operators: Filters",
      customComponent: "CrudOperationsViz",
      explanation: "MongoDB uses prefix operators (like `$gt`, `$lt`, `$in`, `$or`) to construct complex queries, allowing you to filter documents based on range comparisons, logical conditions, or array values.",
      progression: [
        {
          level: "easy",
          title: "Comparison Operators ($gt, $lt)",
          content: "Compare values using comparison operators: `$gt` (greater than), `$gte` (greater than or equal), `$lt` (less than), `$lte` (less than or equal) (e.g. `db.users.find({ age: { $gt: 18 } })`)."
        },
        {
          level: "intermediate",
          title: "Logical Operators ($or, $and)",
          content: "Combine queries using logical operators: `$or` matches if any condition is met, while `$and` matches if all conditions are met (e.g. `db.users.find({ $or: [{ role: \"admin\" }, { score: { $gt: 90 } }] })`)."
        },
        {
          level: "advanced",
          title: "Array and Element Operators ($in, $exists)",
          content: "Query arrays and elements: `$in` matches if a field value matches any item in a specified list, while `$exists` filters documents based on whether a field is present."
        }
      ],
      detailedReference: {
        summary: "MongoDB query operators enable complex range filtering, logical queries, and array element searches.",
        keyConcepts: [
          { term: "Query Operator", definition: "Prefix operators (starting with $) used to write comparison, logical, or array query conditions in MongoDB." }
        ],
        bestPractices: [
          "Ensure fields used in range filters ($gt, $lt) are indexed to keep queries fast.",
          "Prefer the implicit AND condition (`{ age: 20, active: true }`) over the explicit `$and` operator for simple queries."
        ]
      },
      assessment: "Write a query to retrieve all products whose price is greater than or equal to 100 and less than or equal to 500."
    },
    {
      id: "w5-d5-t4",
      title: "4. Update Operations: updateOne & set Modifiers",
      customComponent: "CrudOperationsViz",
      explanation: "Update operations modify existing documents in a collection using `updateOne()` or `updateMany()`, using update operators (like `$set`, `$unset`, `$push`) to modify specific fields.",
      progression: [
        {
          level: "easy",
          title: "Updating Specific Fields ($set)",
          content: "Use the `$set` operator in `updateOne()` to update specific fields: `db.users.updateOne({ _id: id }, { $set: { active: true } })`. If a field doesn't exist, MongoDB creates it."
        },
        {
          level: "intermediate",
          title: "Deleting Fields ($unset)",
          content: "Use the `$unset` operator to delete fields from documents (e.g. `db.users.updateOne({ name: \"Alex\" }, { $unset: { temporaryToken: \"\" } })`)."
        },
        {
          level: "advanced",
          title: "Modifying Arrays ($push, $pull)",
          content: "Use array update operators: `$push` appends elements to an array, while `$pull` removes elements from an array (e.g. `db.users.updateOne({ name: \"Alex\" }, { $push: { logs: \"login\" } })`)."
        }
      ],
      detailedReference: {
        summary: "Update document properties and arrays immutably using updateOne/updateMany with $set, $unset, and $push operators.",
        keyConcepts: [
          { term: "Update Operator", definition: "Operators (like $set, $push) used to modify specific fields or arrays within a document." }
        ],
        bestPractices: [
          "Always specify a unique query filter (like `_id`) in updateOne to prevent modifying the wrong document.",
          "Avoid overwriting the entire document; always use update operators (like `$set`) to modify specific fields."
        ]
      },
      assessment: "Write a query to append 'React Module' to the completedCourses array of a user with name 'Alex'."
    },
    {
      id: "w5-d5-t5",
      title: "5. Delete Operations: deleteOne & deleteMany",
      customComponent: "CrudOperationsViz",
      explanation: "Delete operations remove documents from collections using `deleteOne()` (removes the first document matching the query) or `deleteMany()` (removes all documents matching the query).",
      progression: [
        {
          level: "easy",
          title: "Deleting a Single Document",
          content: "Remove a single document by calling `deleteOne()` with a query filter: `db.users.deleteOne({ _id: ObjectId(\"...\") })`."
        },
        {
          level: "intermediate",
          title: "Bulk Deletions",
          content: "Remove all matching documents from a collection using `deleteMany()` (e.g. `db.users.deleteMany({ active: false })` deletes all inactive users)."
        },
        {
          level: "advanced",
          title: "Clearing Collections",
          content: "Clear all documents from a collection using `deleteMany({})` with an empty query filter. For better performance on large collections, use `db.collection.drop()` to delete the collection entirely."
        }
      ],
      detailedReference: {
        summary: "Delete documents from collections using deleteOne and deleteMany query filters.",
        keyConcepts: [
          { term: "Drop Collection", definition: "A database operation that deletes an entire collection, including all its documents and index definitions." }
        ],
        bestPractices: [
          "Double check your query filter before executing deleteMany to avoid deleting important data.",
          "Use unique identifiers (like `_id`) in deleteOne to ensure you only delete the intended document."
        ]
      },
      assessment: "Write the MongoDB shell command to delete all users who registered before 2025."
    },
    {
      id: "w5-d5-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "CRUD commands syntax slides, projection rules cheat sheets, query operators mapping models, and exercises for writing shell queries.",
        duration: "15 mins",
        resources: [
          "MongoDB CRUD Presentation slides (PDF)",
          "Shell Queries Cheat Sheet (PDF)"
        ]
      }
    }
  ]
};
