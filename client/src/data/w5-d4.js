export const w5d4Data = {
  dayId: "w5-d4",
  dayTitle: "Day 4: MongoDB Foundations & NoSQL Collections",
  topics: [
    {
      id: "w5-d4-t1",
      title: "1. Introduction to Databases: SQL vs NoSQL",
      customComponent: "NoSqlCollectionsViz",
      explanation: "A database is an organized collection of structured data stored electronically in a computer system. SQL (Relational) databases organize data in rigid tables with columns and rows. NoSQL (Document) databases like MongoDB store data in flexible, nested JSON-like documents, allowing each document to have completely different fields.",
      progression: [
        {
          level: "easy",
          title: "Structured Tables vs. JSON Docs",
          content: "SQL databases (like MySQL, PostgreSQL) use pre-defined schemas and tables. MongoDB uses NoSQL, storing records as flexible documents (JSON/BSON) grouped inside collections."
        },
        {
          level: "intermediate",
          title: "Rigid Schemas vs. Schema-less",
          content: "In SQL, adding a column requires running migrations to update all rows. In MongoDB, documents are schemaless. One user document can have a middleName field, while another has a socialProfile object, without altering other records."
        },
        {
          level: "advanced",
          title: "Horizontal Scaling vs. Vertical Scaling",
          content: "SQL databases scale vertically (adding more CPU/RAM to a single server). NoSQL databases scale horizontally by sharding (distributing data collections across clusters of cheap servers), making them ideal for massive datasets."
        }
      ],
      detailedReference: {
        summary: "MongoDB stores data in collections of JSON documents, providing flexibility and horizontal scaling compared to SQL tables.",
        keyConcepts: [
          { term: "Document Database", definition: "A NoSQL database that stores data as self-contained JSON-like documents rather than tables with rows and columns." }
        ],
        bestPractices: [
          "Choose NoSQL databases when your data structure is dynamic, changes rapidly, or requires high write throughput.",
          "Avoid using NoSQL databases if your data requires complex relational integrity, foreign key locks, or multi-table joins."
        ]
      },
      assessment: "Compare and contrast SQL tables and NoSQL document collections in terms of schema rigidity and scaling capabilities."
    },
    {
      id: "w5-d4-t2",
      title: "2. Understanding Documents & BSON",
      customComponent: "NoSqlCollectionsViz",
      explanation: "MongoDB stores documents in BSON (Binary JSON) format. BSON extends JSON by supporting extra data types (like Date, ObjectIDs, Decimal128, and raw binary data) and is optimized for speed and storage efficiency.",
      progression: [
        {
          level: "easy",
          title: "JSON Document format",
          content: "Documents are represented as key-value pairs (e.g. `{ \"name\": \"Alex\", \"age\": 24 }`). Nested objects and arrays are fully supported."
        },
        {
          level: "intermediate",
          title: "The ObjectID Identifier",
          content: "Every MongoDB document requires a unique primary key field named `_id`. MongoDB generates an 12-byte ObjectID automatically (e.g., `ObjectId(\"60c72b2f9b1d8b2bad000001\")`) representing a unique timestamp, machine ID, and counter."
        },
        {
          level: "advanced",
          title: "BSON vs JSON Specs",
          content: "While JSON only supports strings, numbers, booleans, arrays, and objects, BSON adds data types like Date, Decimal128, and ObjectID, and stores documents in binary format for faster parsing."
        }
      ],
      detailedReference: {
        summary: "BSON extends JSON by supporting binary serialization and data types like ObjectID, Date, and Decimal128.",
        keyConcepts: [
          { term: "ObjectID", definition: "A unique 12-byte identifier generated automatically by MongoDB to act as the primary key (_id) for each document." }
        ],
        bestPractices: [
          "Always let MongoDB generate the `_id` ObjectID automatically to prevent index conflicts.",
          "Use nested objects and sub-documents instead of separate tables to represent related data (like addresses or preferences)."
        ]
      },
      assessment: "What are two advantages of BSON over standard JSON in MongoDB databases?"
    },
    {
      id: "w5-d4-t3",
      title: "3. MongoDB Hierarchies: Database -> Collection -> Document",
      customComponent: "NoSqlCollectionsViz",
      explanation: "In MongoDB, data is organized into a hierarchy: Databases, Collections, and Documents, which correspond to SQL Databases, Tables, and Rows.",
      progression: [
        {
          level: "easy",
          title: "Collections and Databases",
          content: "A MongoDB instance can host multiple independent databases. Each database contains collections. A collection is a grouping of related MongoDB documents (similar to an SQL table)."
        },
        {
          level: "intermediate",
          title: "Schema-less Collections",
          content: "Although collections group similar documents together, MongoDB does not enforce structure. Different documents in a collection can have different fields, nested objects, or arrays."
        },
        {
          level: "advanced",
          title: "Dynamic Indexing",
          content: "MongoDB indexes collections by default using the `_id` key, allowing you to create custom indexes (like compound or text indexes) to keep query speeds fast as your dataset grows."
        }
      ],
      detailedReference: {
        summary: "MongoDB databases contain collections of documents, similar to SQL databases, tables, and rows.",
        keyConcepts: [
          { term: "Collection", definition: "A grouping of MongoDB documents (analogous to a table in a relational database)." }
        ],
        bestPractices: [
          "Group related documents in a single collection (e.g. keep all product documents in the 'products' collection).",
          "Ensure collection names are lowercase and plural (e.g., 'users', 'products') for consistency."
        ]
      },
      assessment: "Explain the MongoDB database hierarchy and map each level to its relational SQL database counterpart."
    },
    {
      id: "w5-d4-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "SQL vs NoSQL schema comparison slides, BSON binary parsing models, MongoDB workspace configuration steps, and worksheets for collection schemas.",
        duration: "15 mins",
        resources: [
          "NoSQL Fundamentals Presentation (PDF)",
          "Collections Worksheet (PDF)"
        ]
      }
    }
  ]
};
