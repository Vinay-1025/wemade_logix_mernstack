export const w3d5Data = {
  dayId: "w3-d5",
  dayTitle: "Day 5: Fetch API & JSON",
  topics: [
    {
      id: "w3-d5-t1",
      title: "1. Web APIs & Endpoints",
      customComponent: "PromiseFlowViz",
      explanation: "APIs (Application Programming Interfaces) allow web applications to retrieve or save database records on remote servers. Clients communicate with APIs by making HTTP requests to specific URLs called Endpoints.",
      progression: [
        {
          level: "easy",
          title: "API Basics",
          content: "Web client actions emit HTTP Requests (endpoints + methods like GET/POST). API servers reply with Response status codes (like 200 OK or 404 Not Found) and data payloads."
        },
        {
          level: "intermediate",
          title: "HTTP Request Methods",
          content: "API actions map to database operations (CRUD): GET (Read), POST (Create), PUT (Update), and DELETE (Delete)."
        },
        {
          level: "advanced",
          title: "JSONPayload Exchange",
          content: "Most APIs exchange data using JSON format. Request headers (like 'Content-Type: application/json') inform the server how to parse the incoming request body."
        }
      ],
      detailedReference: {
        summary: "REST APIs structure client-server exchanges over HTTP protocols using endpoints and JSON data objects.",
        keyConcepts: [
          { term: "REST API Endpoint", definition: "A server URL path listening for HTTP queries to execute database operations." }
        ],
        bestPractices: [
          "Use the correct HTTP method matching your database action (e.g. use GET for reading, never for updating data).",
          "Inspect HTTP response status codes (e.g. check if status is 2xx) to confirm the request succeeded."
        ]
      },
      codeTemplate: {
        html: `<div id="endpoint-out">Ready...</div>`,
        css: "",
        js: `// Conceptual REST endpoint flow
console.log('GET https://jsonplaceholder.typicode.com/users/1');
document.getElementById('endpoint-out').innerText = 'API Client initialized.';`
      },
      assessment: "Explain the difference between an API 'Endpoint' and a 'Payload'."
    },
    {
      id: "w3-d5-t2",
      title: "2. JSON Data Serialization",
      customComponent: "StorageManagerViz",
      explanation: "JSON (JavaScript Object Notation) is a lightweight, text-based data exchange format. To send or receive objects over HTTP, we convert them back and forth between memory objects and JSON strings.",
      progression: [
        {
          level: "easy",
          title: "JSON Syntax Rules",
          content: "JSON requires double quotes around all keys and string values (e.g., `{\"name\": \"Az\"}`). It supports strings, numbers, booleans, arrays, objects, and null values."
        },
        {
          level: "intermediate",
          title: "JSON Stringify",
          content: "Convert JavaScript objects or arrays into a JSON string using `JSON.stringify(object)` so they can be transmitted over networks."
        },
        {
          level: "advanced",
          title: "JSON Parse",
          content: "Convert JSON strings back into live, interactive JavaScript objects using `JSON.parse(jsonString)` to read or edit properties."
        }
      ],
      detailedReference: {
        summary: "JSON functions convert runtime data types to and from structured text strings for storage or network transport.",
        keyConcepts: [
          { term: "JSON Syntax", definition: "A strict text representation requiring double quotes for keys, forbidding function references." }
        ],
        bestPractices: [
          "Always wrap `JSON.parse` operations in try/catch blocks to gracefully handle malformed JSON inputs.",
          "Avoid using loose JSON-like structures that do not satisfy double-quote rules."
        ]
      },
      codeTemplate: {
        html: `<div id="json-out"></div>`,
        css: "",
        js: `const raw = '{"id": 102, "role": "Tutor"}';
const parsed = JSON.parse(raw);
console.log(parsed.role); // Tutor

const backToString = JSON.stringify(parsed);
document.getElementById('json-out').innerText = backToString;`
      },
      assessment: "Why does JSON require keys to be wrapped in double quotes?"
    },
    {
      id: "w3-d5-t3",
      title: "3. Fetching Resources (.fetch)",
      customComponent: "PromiseFlowViz",
      explanation: "The Fetch API provides a promise-based method `fetch()` in the global browser context to make network calls and retrieve resources.",
      progression: [
        {
          level: "easy",
          title: "fetch() Syntax",
          content: "Call `fetch(url)` to start a network request. It returns a Promise that resolves to a Response object."
        },
        {
          level: "intermediate",
          title: "Parsing the Response",
          content: "The Response object contains headers and status codes, but the body is a stream. Parse it explicitly by calling `response.json()`, which returns another Promise that resolves to the actual data."
        },
        {
          level: "advanced",
          title: "Status Validation Checks",
          content: "A `fetch()` promise only rejects on network failures (like being offline). It does *not* reject on server errors (like 404 or 500). Always check `response.ok` before parsing data."
        }
      ],
      detailedReference: {
        summary: "The Fetch API uses nested promises to manage network request cycles and parse response bodies.",
        keyConcepts: [
          { term: "response.ok", definition: "A boolean flag indicating if the HTTP status code falls in the successful 2xx range." }
        ],
        bestPractices: [
          "Always check `response.ok` before calling `response.json()` to avoid parsing HTML error pages as JSON.",
          "Use a catch block on your fetch chains to capture offline network errors."
        ]
      },
      codeTemplate: {
        html: `<div id="fetch-out">Fetching...</div>`,
        css: "",
        js: `fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => {
    if (!res.ok) throw new Error('Post not found');
    return res.json();
  })
  .then(data => {
    document.getElementById('fetch-out').innerText = data.title;
  })
  .catch(err => {
    document.getElementById('fetch-out').innerText = err.message;
  });`
      },
      assessment: "Explain why a fetch request to a missing page (404 status) does not reject the initial promise."
    },
    {
      id: "w3-d5-t4",
      title: "4. Async Fetch with Error Handling",
      customComponent: "PromiseFlowViz",
      explanation: "Combine the Fetch API with `async/await` and `try...catch` blocks to write clean, synchronous-looking network calls.",
      progression: [
        {
          level: "easy",
          title: "Awaiting Fetch Calls",
          content: "Await the network call to get the response object, and then await `res.json()` to parse the data: `const res = await fetch(url); const data = await res.json();`."
        },
        {
          level: "intermediate",
          title: "Handling Network Errors",
          content: "Wrap your awaited fetch statements in a `try...catch` block. This captures both offline network disconnects and parsing errors in one place."
        },
        {
          level: "advanced",
          title: "Toggling Loading Spinners",
          content: "Use a `finally` block to hide loading overlays or spinner elements regardless of whether the fetch succeeded or failed."
        }
      ],
      detailedReference: {
        summary: "Awaiting asynchronous network calls inside try/catch blocks improves code readability and robust error handling.",
        keyConcepts: [
          { term: "Awaited Streams", definition: "Pausing execution until response bodies resolve from stream buffers into JSON objects." }
        ],
        bestPractices: [
          "Provide fallback mock data or show error messages on screen if a fetch request fails, preventing a broken UI.",
          "Use the `finally` block to hide user loading indicators."
        ]
      },
      codeTemplate: {
        html: `<div id="async-fetch-out">Loading...</div>`,
        css: "",
        js: `async function fetchPost() {
  const box = document.getElementById('async-fetch-out');
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/2');
    if (!res.ok) throw new Error('Status: ' + res.status);
    const data = await res.json();
    box.innerText = data.title;
  } catch (err) {
    box.innerText = \`Error: \${err.message}\`;
  }
}

fetchPost();`
      },
      assessment: "Write an async function that fetches from a URL and prints the data or logs an error if the request fails."
    },
    {
      id: "w3-d5-t5",
      title: "5. POST Requests & Request Configuration",
      customComponent: "PromiseFlowViz",
      explanation: "To submit new records to an API, configure the fetch request with methods (POST, PUT, DELETE), request headers, and a serialized JSON body payload.",
      progression: [
        {
          level: "easy",
          title: "Request Options Object",
          content: "Pass a configuration options object as the second argument to `fetch(url, options)`."
        },
        {
          level: "intermediate",
          title: "Configuring Headers & Method",
          content: "Set the `method` key to `'POST'` and define request `headers` (e.g. `'Content-Type': 'application/json'`) so the server knows how to process the request."
        },
        {
          level: "advanced",
          title: "Sending the Body",
          content: "Stringify your data object and assign it to the `body` option: `body: JSON.stringify(myPayload)`. Await the response to confirm if the server saved the record."
        }
      ],
      detailedReference: {
        summary: "POST requests configure headers and transmit stringified JSON body payloads to save records to a database.",
        keyConcepts: [
          { term: "Headers configuration", definition: "Declaring metadata parameters (Content-Type) to define the exchange standards between client and server." }
        ],
        bestPractices: [
          "Always stringify the request body when sending JSON data; sending a raw object will result in a 400 Bad Request error.",
          "Set the Content-Type header to 'application/json' so the server knows to parse the payload as JSON."
        ]
      },
      codeTemplate: {
        html: `<button id="btn-post">Create Post</button>\n<div id="post-out"></div>`,
        css: "",
        js: `const btn = document.getElementById('btn-post');
const out = document.getElementById('post-out');

btn.onclick = async () => {
  out.innerText = 'Creating...';
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ title: 'Wemade Post', body: 'Restful API integration' }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await res.json();
    out.innerText = \`Success! Created record ID: \${data.id}\`;
  } catch (err) {
    out.innerText = \`Failed: \${err.message}\`;
  }
};`
      },
      assessment: "List the three main keys required in the options object of a fetch POST request."
    },
    {
      id: "w3-d5-t6",
      title: "6. Assessment Preview: Profiles Directory",
      customComponent: "PromiseFlowViz",
      explanation: "Review how to chain asynchronous operations, fetch datasets from remote endpoints, search filter user records, and render cards dynamically.",
      progression: [
        {
          level: "easy",
          title: "Data Loading",
          content: "Fetch user records from external mock endpoints, and verify they load successfully into your local array lists."
        },
        {
          level: "intermediate",
          title: "Displaying the Cards Grid",
          content: "Design card layouts in HTML/CSS, mapping array attributes (name, company) into the grid layouts."
        },
        {
          level: "advanced",
          title: "Filtering & Alerts Bindings",
          content: "Bind real-time filter callbacks to search boxes. Wire click events to buttons to display alerts containing contact details."
        }
      ],
      codeTemplate: {
        html: `<div id="prev-box">Ready...</div>`,
        css: "",
        js: `// Verification checkpoint concept
console.log('Concept: Directory search uses array filter and toLowerCase.');`
      },
      assessment: "Write a conceptual plan explaining how you will fetch user records and filter them in real-time as the user types."
    },
    {
      id: "w3-d5-t7",
      title: "7. Assignment Task – User Directory App",
      customComponent: "PromiseFlowViz",
      explanation: "Create an interactive profiles search portal. Fetch a list of user profiles from JSONPlaceholder users API, render them in responsive cards, implement search filtering dynamically, and bind card button alerts showing phone numbers.",
      progression: [
        {
          level: "easy",
          title: "API Request",
          content: "Fetch the user profile list from jsonplaceholder.typicode.com/users on page load."
        },
        {
          level: "intermediate",
          title: "Grid Cards Render",
          content: "Create grid container (id='user-list') and map through profile objects to inject cards with name, email, and company details."
        },
        {
          level: "advanced",
          title: "Interactive Search & Alerts",
          content: "Add text input (id='search') with oninput event logic to filter profiles by name. Add action buttons inside user cards that trigger phone alert() alerts."
        }
      ],
      codeTemplate: {
        html: `<div class="user-dir">
  <h3>Student Directory</h3>
  <input type="text" id="search" placeholder="Filter by name...">
  <div id="user-list"></div>
</div>`,
        css: `.user-dir {
  max-width: 500px;
  color: var(--app-text, #ffffff);
}
#user-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 15px;
}
.user-card {
  background: var(--app-card-bg, #1e293b);
  border: 1px solid var(--app-border, #334155);
  padding: 15px;
  border-radius: 8px;
}
button {
  background: var(--primary-cyan, #00d1d1);
  color: #0f172a;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  width: auto;
  margin: 0;
}`,
        js: `const list = document.getElementById('user-list');
const search = document.getElementById('search');
let usersList = [];

const render = (items) => {
  list.innerHTML = items.map(u => \`
    <div class="user-card">
      <h4 style="margin:0;">\${u.name}</h4>
      <p style="font-size:0.8rem; color:#94a3b8; margin:5px 0;">\${u.email}</p>
      <button class="phone-btn" data-phone="\${u.phone}">View Phone</button>
    </div>
  \`).join('');
  
  // Bind click events
  list.querySelectorAll('.phone-btn').forEach(btn => {
    btn.onclick = () => {
      alert(\`Phone: \${btn.dataset.phone}\`);
    };
  });
};

fetch('https://jsonplaceholder.typicode.com/users')
  .then(res => res.json())
  .then(data => {
    usersList = data;
    render(usersList);
  });

search.oninput = (e) => {
  const q = e.target.value.toLowerCase();
  const filtered = usersList.filter(u => u.name.toLowerCase().includes(q));
  render(filtered);
};`
      },
      assessment: "Final Challenge: Add a button to each card that opens an alert with the user's phone number."
    },
    {
      id: "w3-d5-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Network response audits, payload size optimization guidelines, search debounce implementation structures, and User Directory solutions.",
        duration: "15 mins",
        resources: [
          "Student Fetch & API Worksheet (PDF)",
          "Profiles Portal Solutions (ZIP)"
        ]
      }
    }
  ]
};
