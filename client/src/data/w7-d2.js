export const w7d2Data = {
  dayId: "w7-d2",
  dayTitle: "Day 2: JSON Web Token (JWT) Authentication & Sessions",
  topics: [
    {
      id: "w7-d2-t1",
      title: "1. Stateless Tokens vs. Stateful Sessions",
      customComponent: "JwtSessionsViz",
      explanation: "JSON Web Tokens (JWT) enable stateless authentication, where user session details are encoded directly in a signed token string stored on the client. Stateful sessions store sessions on the database, verifying session IDs against database records for every incoming request.",
      progression: [
        {
          level: "easy",
          title: "Stateful Session Cookie",
          content: "In stateful sessions, the server stores session IDs in memory or a database (like Redis) and sends a session cookie to the client, checking the database on every request."
        },
        {
          level: "intermediate",
          title: "Stateless JWTs",
          content: "JWTs contain self-contained JSON payloads (like userID, roles, expiration) signed with a secret key, allowing the server to verify user identity without querying databases."
        },
        {
          level: "advanced",
          title: "JWT Structure",
          content: "JWTs consist of three parts separated by dots: Header (algorithm), Payload (user details), and Signature (verified using the server's secret key)."
        }
      ],
      detailedReference: {
        summary: "Identify differences between stateful session IDs and stateless signed JSON Web Tokens (JWT) for user authentication.",
        keyConcepts: [
          { term: "JSON Web Token", definition: "A stateless, URL-safe string containing signed JSON claims, used to share authenticated user sessions." }
        ],
        bestPractices: [
          "Set appropriate expiration times (e.g. 15 minutes for access tokens) to limit abuse if a token is intercepted.",
          "Never include sensitive data (like user passwords or API keys) in the unencrypted JWT payload."
        ]
      },
      codeTemplate: {
        html: `{}`,
        css: `JWT_SECRET=supersecret123`,
        js: `const jwt = require('jsonwebtoken');

const payload = { userId: 101, role: 'admin' };
const secret = process.env.JWT_SECRET || 'wemadeSecret';

// Sign token with payload, secret, and expiration
const token = jwt.sign(payload, secret, { expiresIn: '1h' });
console.log('Encoded JWT Token:', token);

// Verify token signature and decode payload
jwt.verify(token, secret, (err, decoded) => {
  if (err) {
    console.error('Token Verification Failed:', err.message);
    return;
  }
  console.log('Decoded Payload:', decoded);
});`
      },
      assessment: "Write an Express login controller snippet that signs a JWT containing the user's ID."
    },
    {
      id: "w7-d2-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "JWT anatomy presentation slides, JWT verification flowcharts, XSS vs CSRF mitigation guides, and exercises for signing tokens.",
        duration: "15 mins",
        resources: [
          "JWT Authentication Presentation (PDF)",
          "JWT Signing Lab Exercises (ZIP)"
        ]
      }
    }
  ]
};
