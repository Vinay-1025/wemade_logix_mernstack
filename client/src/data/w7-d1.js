export const w7d1Data = {
  dayId: "w7-d1",
  dayTitle: "Day 1: Bcrypt Password Hashing & Encryption",
  topics: [
    {
      id: "w7-d1-t1",
      title: "1. Hashing vs. Encryption: Salt & Hashing Rounds",
      customComponent: "BcryptEncryptionViz",
      explanation: "Hashing is a one-way cryptographic function that converts passwords into fixed-length strings. Unlike encryption, hashed strings cannot be decrypted back into plain text. Salting adds a random string to passwords before hashing to prevent rainbow table attacks.",
      progression: [
        {
          level: "easy",
          title: "One-Way Hashing",
          content: "Always hash user passwords before storing them. Never store plaintext passwords in a database, as database breaches would expose them instantly."
        },
        {
          level: "intermediate",
          title: "The Role of Salts",
          content: "A salt is a random string added to passwords before hashing. Salting ensures that identical passwords yield completely different hashes, protecting against rainbow table attacks."
        },
        {
          level: "advanced",
          title: "Bcrypt Work Factor",
          content: "Bcrypt uses salt rounds (exponential work factor) to intentionally slow down calculation speeds. This delay makes brute-force attacks computationally expensive for attackers."
        }
      ],
      detailedReference: {
        summary: "Hash user passwords using Bcrypt, setting salt rounds to balance security and server response times.",
        keyConcepts: [
          { term: "Salting", definition: "Adding random data to a password input before hashing to ensure unique hash values." }
        ],
        bestPractices: [
          "Use Bcrypt with a work factor of 10-12 to balance security and CPU load.",
          "Use async methods (`bcrypt.hash`) in Express routes to prevent blocking the single server thread during hashing."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: `SALT_ROUNDS=10`,
        js: `const bcrypt = require('bcrypt');

const password = 'mySecretPassword';

// Generate salt and hash asynchronously
bcrypt.genSalt(10)
  .then(salt => bcrypt.hash(password, salt))
  .then(hash => {
    console.log('Generated Hash:', hash);
    // Compare password with hash
    return bcrypt.compare(password, hash);
  })
  .then(match => {
    console.log('Password Match:', match); // returns true
  })
  .catch(err => console.error(err));`
      },
      assessment: "Write the asynchronous code to hash a password string 'userPass12' with a salt round factor of 12."
    },
    {
      id: "w7-d1-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Bcrypt salting slides, brute force attack vectors, password strength checkers, and solutions for the server registration auth code.",
        duration: "15 mins",
        resources: [
          "Bcrypt Password Hashing presentation (PDF)",
          "Bcrypt Lab Exercise Solutions (ZIP)"
        ]
      }
    }
  ]
};
