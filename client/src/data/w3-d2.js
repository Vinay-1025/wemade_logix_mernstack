export const w3d2Data = {
  dayId: "w3-d2",
  dayTitle: "Day 2: DOM Manipulation",
  topics: [
    {
      id: "w3-d2-t1",
      title: "1. DOM Selection Engines",
      customComponent: "DOMTreeViz",
      explanation: "The Document Object Model (DOM) is an API that represents an HTML document as a tree structure of nodes. To edit nodes, we must target them using selectors.",
      progression: [
        {
          level: "easy",
          title: "Selecting by ID",
          content: "Use `document.getElementById('myId')` to target a single unique node. This is the fastest lookup query."
        },
        {
          level: "intermediate",
          title: "Query Selectors",
          content: "Use `document.querySelector('.class')` or `querySelectorAll()` to query nodes using standard CSS selector patterns (tags, classes, attributes)."
        },
        {
          level: "advanced",
          title: "Live lists vs Static lists",
          content: "Legacy selectors (like `getElementsByClassName`) return live HTMLCollections that update automatically when the DOM changes. Modern selectors (like `querySelectorAll`) return static NodeLists, which do not change dynamically."
        }
      ],
      detailedReference: {
        summary: "Selectors query nodes inside the DOM tree, returning element pointers or list collections.",
        keyConcepts: [
          { term: "NodeList", definition: "A collection of DOM nodes returned by querySelectorAll, support list iteration via forEach." }
        ],
        bestPractices: [
          "Use `document.querySelector` and `querySelectorAll` for flexibility across complex CSS hierarchies.",
          "Prefer IDs or dedicated classes when target querying to avoid layout-driven failures."
        ]
      },
      codeTemplate: {
        html: `<div class="container">\n  <p class="text">Item A</p>\n  <p class="text">Item B</p>\n</div>`,
        css: "",
        js: `const firstText = document.querySelector('.container .text');
const allTexts = document.querySelectorAll('.text');

allTexts.forEach((el, index) => {
  console.log(\`Element \${index}: \${el.innerText}\`);
});`
      },
      assessment: "Write a query selector targeting the second paragraph element inside a div with the class 'panel'."
    },
    {
      id: "w3-d2-t2",
      title: "2. Modifying Node Contents",
      customComponent: "DOMTreeViz",
      explanation: "Once selected, we can modify text contents or inject structured HTML nodes inside DOM elements using text and HTML properties.",
      progression: [
        {
          level: "easy",
          title: "innerText vs textContent",
          content: "`innerText` reads visible text as rendered on the page, respecting CSS styles. `textContent` returns all text content (including hidden styles or scripts) and is faster."
        },
        {
          level: "intermediate",
          title: "innerHTML injection",
          content: "Use `innerHTML` to set or read raw HTML markup strings inside elements. Be careful, as this overrides existing child elements."
        },
        {
          level: "advanced",
          title: "Cross-Site Scripting (XSS) Risks",
          content: "Setting `innerHTML` using unvalidated user text inputs opens your application to XSS security exploits. Always escape user values or default to `textContent` for safety."
        }
      ],
      detailedReference: {
        summary: "DOM content write methods set visible text labels or parse HTML layouts directly inside nodes.",
        keyConcepts: [
          { term: "Cross-Site Scripting (XSS)", definition: "A vulnerability where attackers inject malicious script elements into vulnerable web page layers." }
        ],
        bestPractices: [
          "Use `textContent` or `innerText` when inserting user-submitted text fields.",
          "Limit `innerHTML` updates to static templates or pre-sanitized text strings."
        ]
      },
      codeTemplate: {
        html: `<div id="card">Original Content</div>`,
        css: "",
        js: `const card = document.getElementById('card');

// Safe text update
card.textContent = 'Updated Content!';

// Dynamic HTML injection
card.innerHTML = \`<h4 style="color:#00d1d1;">Admin Notice</h4><p>\${card.textContent}</p>\`;`
      },
      assessment: "Discuss the performance and security differences between textContent and innerHTML properties."
    },
    {
      id: "w3-d2-t3",
      title: "3. Creating & Appending Nodes",
      customComponent: "DOMTreeViz",
      explanation: "Build dynamic lists by creating new elements programmatically in memory, configuring them, and appending them to the document tree.",
      progression: [
        {
          level: "easy",
          title: "document.createElement",
          content: "Create elements in memory (e.g. `const div = document.createElement('div')`). The element is floating and not yet visible in the document."
        },
        {
          level: "intermediate",
          title: "Appending Elements",
          content: "Insert elements into the DOM tree using `appendChild()` (inserts at the end of a parent) or `prepend()` (inserts at the absolute start)."
        },
        {
          level: "advanced",
          title: "Node removal",
          content: "Remove nodes from layouts using `element.remove()` directly, or remove child elements using `parent.removeChild(child)`."
        }
      ],
      detailedReference: {
        summary: "Programmatically building elements instantiates nodes in memory before appending them to document branches.",
        keyConcepts: [
          { term: "appendChild", definition: "Adds a node to the end of the list of children of a specified parent node." }
        ],
        bestPractices: [
          "Use `document.createElement` rather than building giant layouts with string concatenation inside `innerHTML`.",
          "Use `element.remove()` for clean, direct element destruction."
        ]
      },
      codeTemplate: {
        html: `<div id="box-holder"></div>`,
        css: "",
        js: `const container = document.getElementById('box-holder');

// 1. Create
const badge = document.createElement('span');

// 2. Configure
badge.textContent = 'New Item';
badge.style.background = '#00d1d1';

// 3. Append
container.appendChild(badge);`
      },
      assessment: "Describe how to insert a paragraph element at the beginning of a document section."
    },
    {
      id: "w3-d2-t4",
      title: "4. Traversing the DOM Tree",
      customComponent: "DOMTreeViz",
      explanation: "Navigate through parent, child, and sibling elements to modify elements based on their spatial relationships in the DOM tree.",
      progression: [
        {
          level: "easy",
          title: "Parent Nodes",
          content: "Use `parentNode` or `parentElement` to climb up the DOM tree and access the container holding your element."
        },
        {
          level: "intermediate",
          title: "Child Traversal",
          content: "Access child elements using `children` (returns elements only) or `childNodes` (returns elements, text, and comments). Use `firstElementChild` and `lastElementChild` for direct access."
        },
        {
          level: "advanced",
          title: "Sibling Navigation",
          content: "Navigate horizontally using `nextElementSibling` and `previousElementSibling` to target elements at the same nesting level."
        }
      ],
      detailedReference: {
        summary: "Nodal traversal maps references up, down, or across siblings in the DOM tree structure.",
        keyConcepts: [
          { term: "Element children", definition: "A collection containing only structural tag nodes, omitting empty whitespace text nodes." }
        ],
        bestPractices: [
          "Prefer `parentElement` and `nextElementSibling` over `parentNode` and `nextSibling` to avoid getting blank text elements."
        ]
      },
      codeTemplate: {
        html: `<ul id="menu">\n  <li>Item 1</li>\n  <li id="active-item">Item 2</li>\n  <li>Item 3</li>\n</ul>`,
        css: "",
        js: `const active = document.getElementById('active-item');
const parent = active.parentElement;
const next = active.nextElementSibling;
const prev = active.previousElementSibling;

console.log(parent.id); // menu
console.log(next.textContent); // Item 3
console.log(prev.textContent); // Item 1`
      },
      assessment: "Explain why navigating via nextSibling can sometimes return a text node containing empty spaces instead of the next HTML tag."
    },
    {
      id: "w3-d2-t5",
      title: "5. Class List & Attributes Control",
      customComponent: "DOMTreeViz",
      explanation: "Control visual styling and properties by reading or writing element attributes and toggling CSS classes programmatically.",
      progression: [
        {
          level: "easy",
          title: "Toggling CSS Classes",
          content: "Use `classList.add('className')`, `remove('className')`, or `toggle('className')` to modify styles smoothly."
        },
        {
          level: "intermediate",
          title: "Reading & Writing Attributes",
          content: "Use `setAttribute('name', 'value')` to update parameters (like image source links or buttons disabled states) and `getAttribute()` to read them."
        },
        {
          level: "advanced",
          title: "Data Attributes (dataset)",
          content: "Read and write custom data attributes (e.g. `<div data-id='10'>`) using the `element.dataset` property wrapper (e.g. `element.dataset.id = '10'`)."
        }
      ],
      detailedReference: {
        summary: "Attributes control nodal values and data attributes, while classList handles CSS class modifications.",
        keyConcepts: [
          { term: "Data Attributes", definition: "Custom user attributes prefixed with 'data-' that store metadata values directly in HTML tags." }
        ],
        bestPractices: [
          "Modify layouts by adding/removing classes rather than modifying inline styles (`element.style.color = 'red'`) directly.",
          "Use the `disabled` attribute to prevent double submission triggers on click buttons."
        ]
      },
      codeTemplate: {
        html: `<img id="preview" src="placeholder.jpg" data-category="audio">\n<button id="toggle-border">Toggle</button>`,
        css: ".bordered { border: 2px solid #00d1d1; }",
        js: `const img = document.getElementById('preview');
img.setAttribute('src', 'new-image.jpg');
console.log(img.dataset.category); // audio

document.getElementById('toggle-border').onclick = () => {
  img.classList.toggle('bordered');
};`
      },
      assessment: "Demonstrate classList modifications and custom data attributes management."
    },
    {
      id: "w3-d2-t6",
      title: "6. Assignment Task - Dynamic Item Builder",
      customComponent: "DOMTreeViz",
      explanation: "Build an interactive DOM list and item creator. Your application must collect text inputs, instantiate element cards programmatically, add styling classes, and attach delete actions to clean up list items.",
      progression: [
        {
          level: "easy",
          title: "Input Validation & Creation",
          content: "Create elements using `document.createElement('li')` on user click. Validate that input fields are not empty."
        },
        {
          level: "intermediate",
          title: "Styling & Nested Layout",
          content: "Add CSS classes (e.g., `item-card`) using `classList.add()`. Inject text elements and close buttons inside the card."
        },
        {
          level: "advanced",
          title: "Active Deletions & Insertion",
          content: "Bind action listeners directly on the delete buttons during creation to remove cards using `element.remove()`. Append new cards to parent grids."
        }
      ],
      codeTemplate: {
        html: `<div class="list-builder">
  <h3>Wemade DOM Builder</h3>
  <input type="text" id="item-text" placeholder="Enter item name">
  <button id="add-item">Create and Append</button>
  <ul id="items-list">
    <!-- Dynamic items populate here -->
  </ul>
</div>`,
        css: `.list-builder {
  background: var(--app-card-bg, #1e293b);
  border: 1px solid var(--app-border, #334155);
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  color: var(--app-text, #ffffff);
}
.item-card {
  background: rgba(255,255,255,0.05);
  padding: 10px 12px;
  border-radius: 6px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--app-border, #334155);
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
        js: `document.getElementById('add-item').onclick = () => {
  const input = document.getElementById('item-text');
  const container = document.getElementById('items-list');
  const textVal = input.value.trim();
  
  if (!textVal) {
    alert('Please write something!');
    return;
  }
  
  // 1. Create element
  const li = document.createElement('li');
  li.classList.add('item-card');
  
  // 2. Set content
  li.innerHTML = \`
    <span>\${textVal}</span>
    <button class="remove-btn" style="padding: 4px 8px; background:#ef4444; border:none; color:white; border-radius:4px; cursor:pointer; width:auto; margin:0;">Delete</button>
  \`;
  
  // 3. Event handler on child element (Delete action)
  li.querySelector('.remove-btn').onclick = () => {
    li.remove(); // Removes the element from the DOM
  };
  
  // 4. Append element
  container.appendChild(li);
  input.value = ''; // Reset input field
};`
      },
      assessment: "Verify dynamic DOM updates, element creation, property assignments, class configurations, and safe removals."
    },
    {
      id: "w3-d2-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "DOM Tree representation exercises, createElement performance benchmarks, append vs appendChild audits, and solutions for the DOM builder task.",
        duration: "15 mins",
        resources: [
          "Student DOM Trees Worksheet (PDF)",
          "DOM Dynamic Builder Solutions (ZIP)"
        ]
      }
    }
  ]
};
