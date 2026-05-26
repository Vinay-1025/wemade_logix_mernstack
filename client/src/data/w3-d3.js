export const w3d3Data = {
  dayId: "w3-d3",
  dayTitle: "Day 3: Events & LocalStorage",
  topics: [
    {
      id: "w3-d3-t1",
      title: "1. Event Handlers & Bubbling",
      customComponent: "StorageManagerViz",
      explanation: "Events are triggers (like clicks, keypresses, or form submissions) sent by the browser when actions occur. JavaScript captures these events to run custom logic.",
      progression: [
        {
          level: "easy",
          title: "addEventListener API",
          content: "Use `addEventListener('eventName', callback)` to bind event listeners to DOM elements. This is the modern, flexible way to listen for events."
        },
        {
          level: "intermediate",
          title: "The Event Object (e)",
          content: "Callback functions receive an Event object `e` automatically. This contains context metadata like `e.target` (the element clicked) and `e.type` (the trigger name)."
        },
        {
          level: "advanced",
          title: "Bubbling & Event Delegation",
          content: "Events bubble up the DOM tree from child to parents. Event Delegation takes advantage of this by binding a single listener to a parent container to manage click actions on all nested children."
        }
      ],
      detailedReference: {
        summary: "Events propagate up DOM trees, and handlers manage interactions using the Event arguments.",
        keyConcepts: [
          { term: "Event Bubbling", definition: "The phase where click signals rise from nested child triggers up through parent nodes." }
        ],
        bestPractices: [
          "Use event delegation on dynamic list items to save memory and avoid resetting listeners when children are added/removed.",
          "Use `e.stopPropagation()` if you want to prevent clicks on child nodes from triggering parent action handlers."
        ]
      },
      codeTemplate: {
        html: `<div id="parent" style="padding:20px; background:#1e293b;">\n  <button id="child">Click Me</button>\n</div>`,
        css: "",
        js: `const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEventListener('click', () => {
  console.log('Parent container clicked!');
});

child.addEventListener('click', (e) => {
  console.log('Child button clicked!');
  e.stopPropagation(); // Prevents parent from hearing this event!
});`
      },
      assessment: "Describe event bubbling and explain how e.stopPropagation() alters this behavior."
    },
    {
      id: "w3-d3-t2",
      title: "2. Form Submission & Input Triggers",
      customComponent: "StorageManagerViz",
      explanation: "Forms capture complex user inputs. Handling forms in JavaScript requires interception of submit actions and custom field validation.",
      progression: [
        {
          level: "easy",
          title: "Form Submit Listener",
          content: "Listen to the `submit` event on forms rather than click events on buttons. This captures enter key triggers automatically."
        },
        {
          level: "intermediate",
          title: "Preventing Default Actions",
          content: "Browser forms reload the page on submit by default. Use `e.preventDefault()` inside your listener to stop this, keeping user state intact."
        },
        {
          level: "advanced",
          title: "Real-time Input Validation",
          content: "Use `change`, `input`, or `keyup` triggers to validate user credentials as they type, providing dynamic error messages before submission."
        }
      ],
      detailedReference: {
        summary: "Form interception requires halting default browser redirects to run custom validation routines.",
        keyConcepts: [
          { term: "preventDefault", definition: "A method on the Event object that halts standard browser actions (like page reloads on form submit)." }
        ],
        bestPractices: [
          "Always call `e.preventDefault()` at the start of form submit handlers to handle validation programmatically.",
          "Use input type attributes (email, number) for browser-level validation fallbacks."
        ]
      },
      codeTemplate: {
        html: `<form id="auth-form">\n  <input type="email" id="email-field" placeholder="Enter email" required>\n  <button type="submit">Submit Form</button>\n</form>\n<p id="msg"></p>`,
        css: "",
        js: `const form = document.getElementById('auth-form');
const msg = document.getElementById('msg');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Stop page reload!
  const email = document.getElementById('email-field').value;
  msg.innerText = \`Validating: \${email}...\`;
});`
      },
      assessment: "Explain why e.preventDefault() is critical when handling form submits with custom JS."
    },
    {
      id: "w3-d3-t3",
      title: "3. LocalStorage APIs & Persistence",
      customComponent: "StorageManagerViz",
      explanation: "LocalStorage allows developers to persist key-value pairs inside the user's browser, maintaining state across page reloads.",
      progression: [
        {
          level: "easy",
          title: "Storing and Reading Strings",
          content: "Use `localStorage.setItem(key, value)` to save string data, and `localStorage.getItem(key)` to retrieve it."
        },
        {
          level: "intermediate",
          title: "Removing Data",
          content: "Delete specific keys using `localStorage.removeItem(key)`. Use `localStorage.clear()` to wipe all stored parameters."
        },
        {
          level: "advanced",
          title: "Storage Caps & Limits",
          content: "LocalStorage is limited to string data and restricted to roughly 5MB of storage capacity per origin. Browsers block further write requests if this threshold is crossed."
        }
      ],
      detailedReference: {
        summary: "LocalStorage saves persistent string key-value configurations inside browser local memory.",
        keyConcepts: [
          { term: "Storage quota", definition: "The storage limit (typically 5MB) allocated to each domain origin for local storage." }
        ],
        bestPractices: [
          "Use clear, descriptive namespace keys (e.g. `wemade_theme_mode`) to avoid naming collisions with other scripts.",
          "Wrap your storage operations in try/catch blocks to gracefully handle quota exceptions."
        ]
      },
      codeTemplate: {
        html: `<button id="btn-dark">Dark Mode</button>`,
        css: "",
        js: `const btn = document.getElementById('btn-dark');

// Load stored theme on boot
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.style.background = '#0f172a';
}

btn.onclick = () => {
  document.body.style.background = '#0f172a';
  localStorage.setItem('theme', 'dark'); // Save choice!
};`
      },
      assessment: "Write a script that stores the user's theme preference and restores it on page reload."
    },
    {
      id: "w3-d3-t4",
      title: "4. JSON Serialization & Storage",
      customComponent: "StorageManagerViz",
      explanation: "Since LocalStorage only accepts string values, we must serialize arrays and objects before saving them, and deserialize them on retrieval.",
      progression: [
        {
          level: "easy",
          title: "The String Constraint",
          content: "If you try to save an array directly, LocalStorage coerces it to a flat string (e.g. `[1, 2]` becomes `'1,2'`). Objects become `'[object Object]'`, breaking the data structure."
        },
        {
          level: "intermediate",
          title: "JSON Stringify",
          content: "Serialize complex arrays or objects into JSON strings using `JSON.stringify(data)` before passing them to `setItem()`."
        },
        {
          level: "advanced",
          title: "JSON Parse",
          content: "Retrieve the JSON string and deserialize it back into a functional JavaScript array or object using `JSON.parse(string)`."
        }
      ],
      detailedReference: {
        summary: "Serialization bridges runtime memory structures with flat browser string storage interfaces.",
        keyConcepts: [
          { term: "JSON Serialization", definition: "Converting active memory structures (arrays/objects) into flat JSON string payloads." }
        ],
        bestPractices: [
          "Provide a fallback default string (like `'[]'`) inside `JSON.parse` to avoid parsing errors (e.g. `JSON.parse(localStorage.getItem('key') || '[]')`).",
          "Ensure nested structures contain serializable fields (avoid saving recursive references or functions)."
        ]
      },
      codeTemplate: {
        html: `<div id="todo-out"></div>`,
        css: "",
        js: `const todos = ['Exercise', 'Code React'];

// Serialize
localStorage.setItem('my_todos', JSON.stringify(todos));

// Deserialize
const storedTodos = JSON.parse(localStorage.getItem('my_todos') || '[]');
document.getElementById('todo-out').innerText = \`Total Tasks: \${storedTodos.length}\`;`
      },
      assessment: "Explain why storing an object directly in localStorage without JSON.stringify returns '[object Object]'."
    },
    {
      id: "w3-d3-t5",
      title: "5. Form Validation & Local Cache State",
      customComponent: "StorageManagerViz",
      explanation: "Combine form submission triggers, prevent default action commands, and local storage writes to build offline-first cached forms.",
      progression: [
        {
          level: "easy",
          title: "Input Caching",
          content: "Listen to the `input` event on text fields, saving entries to local storage so user drafts aren't lost if the browser tab crashes."
        },
        {
          level: "intermediate",
          title: "Restoring Form Drafts",
          content: "Check local storage when the page loads, pre-filling input fields with cached drafts if they exist."
        },
        {
          level: "advanced",
          title: "Clearing Cache on Submit",
          content: "Wipe cached inputs from local storage inside the submit listener once the form validates and submits successfully."
        }
      ],
      detailedReference: {
        summary: "Caching input fields offline provides an offline-first draft feature for web users.",
        keyConcepts: [
          { term: "Offline drafts", definition: "Pre-filling values from browser cache states to avoid data loss on page refresh." }
        ],
        bestPractices: [
          "Throttle local storage writes inside input handlers to avoid hurting performance on slow devices."
        ]
      },
      codeTemplate: {
        html: `<form id="draft-form">\n  <textarea id="draft-box" placeholder="Write post..."></textarea>\n  <button type="submit">Publish</button>\n</form>`,
        css: "",
        js: `const box = document.getElementById('draft-box');
const form = document.getElementById('draft-form');

// Load draft
box.value = localStorage.getItem('post_draft') || '';

// Save draft
box.addEventListener('input', (e) => {
  localStorage.setItem('post_draft', e.target.value);
});

// Clear draft on submit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  localStorage.removeItem('post_draft');
  box.value = '';
  alert('Published!');
});`
      },
      assessment: "Write a script that caches an input field draft and wipes the cache when the form is submitted."
    },
    {
      id: "w3-d3-t6",
      title: "6. Assessment Preview: Notes Application",
      customComponent: "StorageManagerViz",
      explanation: "Apply events, form prevention triggers, array operations, and local storage serialization to build a persistent note-taking dashboard.",
      progression: [
        {
          level: "easy",
          title: "Interactive UI Setup",
          content: "Build layout panels containing text inputs, click triggers, and container nodes to list notes."
        },
        {
          level: "intermediate",
          title: "Adding and Appending Notes",
          content: "Instantiate note objects containing unique IDs (e.g. `Date.now()`), write text contents, push to the array list, serialize, and save."
        },
        {
          level: "advanced",
          title: "Deleting Individual Notes",
          content: "Render list notes dynamically with delete buttons. Bind click listeners that filter or splice the selected node by ID and update the cache."
        }
      ],
      codeTemplate: {
        html: `<div class="notes-app">
  <h3>Notes Preview</h3>
  <textarea id="note-text" placeholder="Write a note..."></textarea>
  <button id="add-note">Add Note</button>
  <div id="notes-list"></div>
</div>`,
        css: `textarea { width: 100%; height: 50px; margin-bottom: 10px; }`,
        js: `// Simple visual concept showing event bind
document.getElementById('add-note').onclick = () => {
  console.log('Concept: Note addition binds event callbacks.');
};`
      },
      assessment: "Prepare your structural ideas for building a persistent, deletable note list."
    },
    {
      id: "w3-d3-t7",
      title: "7. Assignment Task – Notes App with Local Storage",
      customComponent: "StorageManagerViz",
      explanation: "Create an interactive note-taking dashboard. Users can write notes, save them to a list, persist the notes to local storage (surviving page refreshes), display unique creation timestamps for each note, and delete notes individually.",
      progression: [
        {
          level: "easy",
          title: "DOM Elements Setup",
          content: "Create textarea (id='note-text'), save button (id='add-note'), and notes container (id='notes-list') elements."
        },
        {
          level: "intermediate",
          title: "Arrays & LocalStorage Sync",
          content: "Write JS logic to load any existing notes array from LocalStorage on launch. Sync notes array additions and deletions using JSON stringify/parse."
        },
        {
          level: "advanced",
          title: "Interactive Note List Rendering",
          content: "Implement note list creation, attaching unique timestamps (new Date) to each note object. Add delete buttons with listener callbacks to splice and update."
        }
      ],
      codeTemplate: {
        html: `<div class="notes-app">
  <h3>My Persistent Notes</h3>
  <textarea id="note-text" placeholder="Write a note..."></textarea>
  <button id="add-note">Add Note</button>
  <div id="notes-list"></div>
</div>`,
        css: `.notes-app {
  max-width: 450px;
  background: var(--app-card-bg, #1e293b);
  border: 1px solid var(--app-border, #334155);
  padding: 24px;
  border-radius: 12px;
  color: var(--app-text, #ffffff);
}
textarea {
  width: 100%;
  height: 80px;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid var(--app-border, #334155);
  background: var(--app-bg, #0f172a);
  color: var(--app-text, #ffffff);
}
.note-item {
  background: rgba(255,255,255,0.05);
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
  border: 1px solid var(--app-border, #334155);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.note-item small {
  color: var(--app-text-muted, #94a3b8);
  display: block;
  font-size: 0.7rem;
}
input, button {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid var(--app-border, #334155);
  background: var(--app-bg, #0f172a);
  color: var(--app-text, #ffffff);
}
button {
  background: var(--primary-cyan, #00d1d1);
  color: #0f172a;
  font-weight: 600;
  cursor: pointer;
}`,
        js: `const textarea = document.getElementById('note-text');
const addBtn = document.getElementById('add-note');
const listContainer = document.getElementById('notes-list');

let notes = JSON.parse(localStorage.getItem('my_notes') || '[]');

const renderNotes = () => {
  listContainer.innerHTML = notes.map((note, index) => \`
    <div class="note-item">
      <div>
        <p style="margin:0;">\${note.text}</p>
        <small>\${note.time}</small>
      </div>
      <button onclick="deleteNote(\${index})" style="padding:4px 8px; background:#ef4444; border:none; color:white; border-radius:4px; cursor:pointer; width:auto; margin:0;">Delete</button>
    </div>
  \`).join('');
};

window.deleteNote = (index) => {
  notes.splice(index, 1);
  localStorage.setItem('my_notes', JSON.stringify(notes));
  renderNotes();
};

addBtn.onclick = () => {
  const text = textarea.value.trim();
  if (!text) return;
  
  const newNote = {
    text: text,
    time: new Date().toLocaleTimeString()
  };
  
  notes.push(newNote);
  localStorage.setItem('my_notes', JSON.stringify(notes));
  textarea.value = '';
  renderNotes();
};

renderNotes();`
      },
      assessment: "Explain notes serialization, data mapping, and how event delegation/onclick handles deletions."
    },
    {
      id: "w3-d3-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "DOM tree visualizer exercises, Event delegation mechanics, LocalStorage data size limits, and solutions for the persistent note-taking task.",
        duration: "15 mins",
        resources: [
          "Student DOM & Storage Worksheet (PDF)",
          "Notes App Solutions (ZIP)"
        ]
      }
    }
  ]
};
