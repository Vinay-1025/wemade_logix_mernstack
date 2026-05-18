export const courseData = [
  {
    "weekId": "w1",
    "weekTitle": "Week 1: Foundations of Web Development",
    "days": [
      {
        "dayId": "w1-d1",
        "dayTitle": "Day 1: HTML Semantic Structure",
        "topics": [
          {
            "id": "t1",
            "title": "1. How the Web Works",
            "visualization": "/how-web-works.png",
            "customComponent": "NetworkAnimation",
            "progression": [
              {
                "level": "easy",
                "title": "The Request-Response Cycle",
                "content": "Think of the web like a restaurant. You (the Client) order a pizza (a Request). The Waiter (the Internet) brings your order to the Kitchen (the Server). The Kitchen makes the pizza and sends it back (the Response)."
              },
              {
                "level": "intermediate",
                "title": "Protocols: HTTP vs HTTPS",
                "content": "HTTP is the language browsers and servers speak. HTTPS is the 'secure' version, where all data is encrypted. This is crucial for protecting passwords and credit card info."
              },
              {
                "level": "advanced",
                "title": "DNS & IP Addresses",
                "content": "Every server has an IP address (like 142.250.190.46). Since humans can't remember numbers, we use DNS (Domain Name System) to map 'google.com' to that IP."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Live Test: See how a server response 'feels' -->\n<div id='network-log'>Network Idle...</div>\n<button id='fetch-btn'>Make Request</button>",
              "css": "#network-log {\n  padding: 15px;\n  background: #1e293b;\n  color: #38bdf8;\n  border-radius: 8px;\n  margin-bottom: 10px;\n  font-family: monospace;\n}\nbutton {\n  background: #0ea5e9;\n  color: white;\n  border: none;\n  padding: 10px 20px;\n  border-radius: 4px;\n  cursor: pointer;\n}",
              "js": "document.getElementById('fetch-btn').onclick = () => {\n  const log = document.getElementById('network-log');\n  log.innerText = '-> Sending GET /api/data...';\n  setTimeout(() => {\n    log.innerText = '<- Status 200 OK (Received JSON)';\n  }, 1000);\n};"
            },
            "assessment": "Draw a simple diagram showing the path of a request from your laptop to a server and back."
          },
          {
            "id": "t2",
            "title": "2. Introduction to HTML",
            "visualization": "/html-tags.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Backbone of the Web",
                "content": "HTML stands for HyperText Markup Language. It's not a programming language—it's a 'markup' language that tells the browser how to organize text, images, and links."
              },
              {
                "level": "intermediate",
                "title": "Tags and Elements",
                "content": "A tag is the code (like <h1>). An element is the whole thing, including the content inside. Most tags come in pairs: an opening tag <h1> and a closing tag </h1>."
              },
              {
                "level": "advanced",
                "title": "Attributes & Values",
                "content": "Tags can have extra info called Attributes. For example, <h1 class='title'> has an attribute 'class' with the value 'title'. This is how we give tags 'labels' for styling."
              }
            ],
            "codeTemplate": {
              "html": "<h1 class='glow'>My First Heading</h1>\n<p>HTML elements are nested inside each other.</p>",
              "css": ".glow {\n  color: #00d1d1;\n  text-shadow: 0 0 10px #00d1d1;\n}\np {\n  color: #94a3b8;\n}",
              "js": ""
            },
            "assessment": "Explain why closing tags are important in HTML."
          },
          {
            "id": "t3",
            "title": "3. HTML Document Structure",
            "visualization": "/html-structure.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Three Musketeers",
                "content": "Every valid HTML file needs three main parts: <html> (the root), <head> (the brain), and <body> (the body users see)."
              },
              {
                "level": "intermediate",
                "title": "The Head vs Body",
                "content": "The <head> contains things you DON'T see (like titles and search engine info). The <body> contains everything you DO see (text, images, buttons)."
              },
              {
                "level": "advanced",
                "title": "The DOCTYPE Declaration",
                "content": "The very first line must be <!DOCTYPE html>. This tells the browser you are using the modern HTML5 standard, preventing old 'quirks' from breaking your site."
              }
            ],
            "codeTemplate": {
              "html": "<!DOCTYPE html>\n<html>\n<head>\n  <title>Deep Dive Structure</title>\n</head>\n<body>\n  <h1>Welcome to the Lab</h1>\n  <p>Inspect the 'Head' tab to see metadata!</p>\n</body>\n</html>",
              "css": "body { padding: 40px; background: #0f172a; color: white; }",
              "js": ""
            },
            "assessment": "Create a skeleton HTML file and explain what happens if you remove the <!DOCTYPE>."
          },
          {
            "id": "t4",
            "title": "4. Headings, Paragraphs & Links",
            "visualization": "/headings-hierarchy.png",
            "progression": [
              {
                "level": "easy",
                "title": "Headings (H1 - H6)",
                "content": "HTML provides 6 levels of headings. H1 is the most important (usually for page titles). Never skip levels (don't jump from H1 to H3) as it confuses screen readers."
              },
              {
                "level": "intermediate",
                "title": "Paragraphs and Spacing",
                "content": "The <p> tag automatically adds space before and after your text. Browsers ignore extra spaces inside the code, so <p> is your best friend for formatting."
              },
              {
                "level": "advanced",
                "title": "Anchor Tags (Links)",
                "content": "The <a> tag creates links. The 'href' attribute tells it where to go. Pro tip: Use target='_blank' to open links in a new tab."
              }
            ],
            "codeTemplate": {
              "html": "<h1>Article Title</h1>\n<p>This is the first paragraph of our story.</p>\n<a href='https://google.com' target='_blank'>Click here for more</a>",
              "css": "a {\n  color: #38bdf8;\n  text-decoration: underline;\n  font-weight: bold;\n}\na:hover { color: #7dd3fc; }",
              "js": ""
            },
            "assessment": "Create a page with an H1, H2, and a link that opens in a new tab."
          },
          {
            "id": "t5",
            "title": "5. Images & Lists",
            "visualization": "/lists-types.png",
            "progression": [
              {
                "level": "easy",
                "title": "Unordered Lists (UL)",
                "content": "Use <ul> for items where the order doesn't matter, like a grocery list. Each item is wrapped in an <li> tag."
              },
              {
                "level": "intermediate",
                "title": "Ordered Lists (OL)",
                "content": "Use <ol> when the order matters, like a recipe. The browser will automatically number the items for you!"
              },
              {
                "level": "advanced",
                "title": "The Self-Closing Image Tag",
                "content": "The <img> tag is special—it doesn't have a closing tag. It needs 'src' (source URL) and 'alt' (description for people who can't see the image)."
              }
            ],
            "codeTemplate": {
              "html": "<h3>Skills to Master</h3>\n<ul>\n  <li>HTML Structure</li>\n  <li>CSS Flexbox</li>\n</ul>\n\n<h3>Recipe Steps</h3>\n<ol>\n  <li>Crack eggs</li>\n  <li>Fry them</li>\n</ol>\n\n<img src='https://picsum.photos/200/100' alt='Study Logo' style='margin-top: 20px;'>",
              "css": "li { margin: 10px 0; }\nimg { border: 3px solid #00d1d1; border-radius: 12px; }",
              "js": ""
            },
            "assessment": "Build a list of your top 3 favorite movies using an ordered list."
          },
          {
            "id": "t6",
            "title": "6. Basic Page Structuring",
            "progression": [
              {
                "level": "easy",
                "title": "Logical Flow",
                "content": "A good webpage flows from Top to Bottom. Start with a header, move to main content, and end with a footer."
              },
              {
                "level": "intermediate",
                "title": "Nesting Elements",
                "content": "Nesting means putting elements inside other elements. For example, putting <li> inside <ul>. Always close in the reverse order you opened!"
              },
              {
                "level": "advanced",
                "title": "The Content First Approach",
                "content": "Before styling with CSS, your HTML should be clear and readable. If it looks good in plain text, it'll look amazing with styles."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Structural Challenge -->\n<header>\n  <h1>Company Name</h1>\n</header>\n<main>\n  <section>\n    <h2>Our Services</h2>\n    <ul>\n      <li>Web Design</li>\n      <li>App Development</li>\n    </ul>\n  </section>\n</main>",
              "css": "header { padding: 20px; border-bottom: 2px solid #334155; }\nmain { padding: 20px; }",
              "js": ""
            },
            "assessment": "Structure a simple landing page outline using semantic tags."
          },
          {
            "id": "t7",
            "title": "7. Mini Project – Personal Portfolio Page",
            "progression": [
              {
                "level": "easy",
                "title": "Core HTML Structure",
                "content": "Use the <!DOCTYPE html> and structural tags (header, main, footer) you learned today."
              },
              {
                "level": "intermediate",
                "title": "Content & Hierarchy",
                "content": "Add your name as an H1, a professional bio as a paragraph, and a list of your core values using an unordered list."
              },
              {
                "level": "advanced",
                "title": "Interactivity & Media",
                "content": "Include a profile image (use a placeholder if needed) and external links to your social profiles using the <a> tag."
              }
            ],
            "codeTemplate": {
              "html": "<!-- TARGET GOAL: Build this exact structure using only HTML -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Mission: Personal Portfolio</title>\n</head>\n<body>\n\n  <header>\n    <h1>Jane Developer</h1>\n    <h3>Full Stack Engineer & Tech Enthusiast</h3>\n  </header>\n\n  <main>\n    <section>\n      <h2>Mission Objective</h2>\n      <p>I am building the foundations of the web. This project demonstrates semantic HTML structure and accessibility standards.</p>\n      <img src='https://picsum.photos/200/200' alt='Professional Headshot of Jane Developer'>\n    </section>\n\n    <section>\n      <h2>Core Arsenal (Skills)</h2>\n      <ul>\n        <li>Semantic Layouts</li>\n        <li>Accessible Media</li>\n        <li>Link Management</li>\n        <li>Document Hierarchy</li>\n      </ul>\n    </section>\n\n    <section>\n      <h2>Digital Footprint</h2>\n      <p>Connect with me on my mission logs:</p>\n      <a href='https://github.com' target='_blank'>View GitHub Forge</a>\n      <br>\n      <a href='https://linkedin.com' target='_blank'>Access LinkedIn Node</a>\n    </section>\n  </main>\n\n  <footer>\n    <p>© 2024 Jane Developer. All rights reserved.</p>\n  </footer>\n\n</body>\n</html>",
              "css": "",
              "js": ""
            },
            "assessment": "Final Challenge: Recreate this professional portfolio structure using all the semantic tags, headings, lists, and links we've covered today. No CSS allowed!"
          },
          {
            "id": "w1-d1-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d2",
        "dayTitle": "Day 2: Forms, Tables & Semantics",
        "topics": [
          {
            "id": "d2-t1",
            "title": "1. HTML Forms Introduction",
            "visualization": "/html-forms.png",
            "progression": [
              {
                "level": "easy",
                "title": "Collecting Data",
                "content": "The <form> element is a container for different types of input elements. It's how websites 'listen' to users, whether it's for logging in, searching, or signing up."
              },
              {
                "level": "intermediate",
                "title": "Labels and Focus",
                "content": "Never use an input without a <label>. Labels tell the user what the field is for and, more importantly, they are clickable! Clicking a label will put focus on its related input."
              },
              {
                "level": "advanced",
                "title": "Form Validation Basics",
                "content": "Browsers have built-in ways to check if data is correct before the form is even sent. This is called 'Client-side validation' and uses attributes like 'required' and 'pattern'."
              }
            ],
            "codeTemplate": {
              "html": "<form>\n  <label for='name'>Full Name:</label>\n  <input type='text' id='name' placeholder='Enter your name' required>\n  \n  <button type='submit'>Register</button>\n</form>",
              "css": "form {\n  display: flex;\n  flex-direction: column;\n  gap: 15px;\n  max-width: 300px;\n}\ninput {\n  padding: 10px;\n  border-radius: 6px;\n  border: 1px solid #334155;\n  background: #1e293b;\n  color: white;\n}\nbutton {\n  background: #00d1d1;\n  color: #0f172a;\n  padding: 10px;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n  font-weight: bold;\n}",
              "js": "document.querySelector('form').onsubmit = (e) => {\n  e.preventDefault();\n  alert('Form Submitted!');\n};"
            },
            "assessment": "Create a form with a label and a required text input."
          },
          {
            "id": "d2-t2",
            "title": "2. Input Fields & Types",
            "progression": [
              {
                "level": "easy",
                "title": "One Tag, Many Jobs",
                "content": "The <input> tag changes its behavior entirely based on the 'type' attribute. 'text' for names, 'password' to hide characters, and 'email' for validation."
              },
              {
                "level": "intermediate",
                "title": "Selection Inputs",
                "content": "Radio buttons (type='radio') are for 'pick one only' choices, while Checkboxes (type='checkbox') let users pick multiple options."
              },
              {
                "level": "advanced",
                "title": "HTML5 Modern Types",
                "content": "Modern HTML5 gives us 'date' pickers, 'color' selectors, and 'number' inputs with up/down arrows. Use these instead of JS whenever possible for better mobile support!"
              }
            ],
            "codeTemplate": {
              "html": "<h3>User Preferences</h3>\n<label>Email: <input type='email'></label><br><br>\n<label>Birthday: <input type='date'></label><br><br>\n<label><input type='checkbox'> Subscribe to Newsletter</label>",
              "css": "input[type='date'] { color-scheme: dark; }",
              "js": ""
            },
            "assessment": "Build a mini-form with an email input, a date picker, and a checkbox."
          },
          {
            "id": "d2-t3",
            "title": "3. Form Attributes",
            "progression": [
              {
                "level": "easy",
                "title": "Action & Method",
                "content": "The 'action' attribute tells the form WHERE to send the data. The 'method' tells it HOW (usually 'GET' or 'POST')."
              },
              {
                "level": "intermediate",
                "title": "GET vs POST",
                "content": "GET sends data in the URL (visible/insecure), while POST sends it hidden in the request body (secure/large data). Use POST for passwords!"
              },
              {
                "level": "advanced",
                "title": "HTML Validation Power",
                "content": "Attributes like 'minlength', 'max', and 'required' prevent submission of bad data. No JavaScript needed for basic checks!"
              }
            ],
            "codeTemplate": {
              "html": "<form action='/submit' method='POST'>\n  <label>Age: <input type='number' min='18' max='100' required></label>\n  <input type='submit' value='Join Club'>\n</form>",
              "css": "input:invalid { border-color: #f87171; }\ninput:valid { border-color: #4ade80; }",
              "js": ""
            },
            "assessment": "Modify a form to use the POST method and require a number between 1 and 10."
          },
          {
            "id": "d2-t4",
            "title": "4. Tables in HTML",
            "visualization": "/html-tables.png",
            "progression": [
              {
                "level": "easy",
                "title": "Row by Row",
                "content": "Tables are built one row (<tr>) at a time. Inside each row, you put cells for data (<td>)."
              },
              {
                "level": "intermediate",
                "title": "Table Headers (th)",
                "content": "Use <th> instead of <td> for the top row or first column. This makes the text bold and centered by default, and clarifies meaning for screen readers."
              },
              {
                "level": "advanced",
                "title": "Semantic Table Parts",
                "content": "Complex tables use <thead>, <tbody>, and <tfoot> to group content. This helps browsers handle scrollable tables and printing better."
              }
            ],
            "codeTemplate": {
              "html": "<table>\n  <tr>\n    <th>Name</th>\n    <th>Role</th>\n  </tr>\n  <tr>\n    <td>John</td>\n    <td>Frontend</td>\n  </tr>\n  <tr>\n    <td>Sarah</td>\n    <td>Backend</td>\n  </tr>\n</table>",
              "css": "table {\n  width: 100%;\n  border-collapse: collapse;\n  margin-top: 20px;\n}\nth, td {\n  padding: 12px;\n  text-align: left;\n  border-bottom: 1px solid #334155;\n}\nth { background: #1e293b; color: #00d1d1; }",
              "js": ""
            },
            "assessment": "Build a table with 3 columns (Item, Price, Qty) and 2 rows of data."
          },
          {
            "id": "d2-t5",
            "title": "5. Semantic HTML",
            "visualization": "/semantic-layout.png",
            "progression": [
              {
                "level": "easy",
                "title": "Meaning Over Appearance",
                "content": "Semantic elements (like <header>, <footer>) tell the browser and user exactly WHAT the content is, not just how it should look."
              },
              {
                "level": "intermediate",
                "title": "Structure Elements",
                "content": "<nav> is for links, <main> is for the core content, and <section> groups related ideas together. These replace generic <div> tags."
              },
              {
                "level": "advanced",
                "title": "SEO and Screen Readers",
                "content": "Google Loves Semantic HTML. It help search engines understand your site's structure, which leads to better ranking. It also helps blind users navigate your site using voice tools."
              }
            ],
            "codeTemplate": {
              "html": "<header>\n  <h1>My Blog</h1>\n  <nav>\n    <a href='#'>Home</a> | <a href='#'>About</a>\n  </nav>\n</header>\n<main>\n  <article>\n    <h2>Semantic Wisdom</h2>\n    <p>Good code is readable code.</p>\n  </article>\n</main>\n<footer>\n  <p>© 2024</p>\n</footer>",
              "css": "header { padding: 20px; background: #1e293b; }\nmain { padding: 20px; }\nfooter { text-align: center; font-size: 0.8rem; }",
              "js": ""
            },
            "assessment": "Refactor a simple layout to use <header>, <main>, and <footer> instead of <div> tags."
          },
          {
            "id": "d2-t6",
            "title": "6. Basic Accessibility (a11y)",
            "visualization": "/html-a11y.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Web is for Everyone",
                "content": "Accessibility (often called a11y) means designing sites so people with disabilities can use them effectively."
              },
              {
                "level": "intermediate",
                "title": "Alt Text & Labels",
                "content": "Always provide 'alt' text for images. If an image doesn't load or a user is blind, the 'alt' text explains what the image contains. Similarly, labels are critical for inputs."
              },
              {
                "level": "advanced",
                "title": "ARIA Attributes",
                "content": "When standard HTML isn't enough, we use ARIA (Accessible Rich Internet Applications) attributes like 'aria-label' or 'aria-hidden' to give extra context to assistive tech."
              }
            ],
            "codeTemplate": {
              "html": "<img src='https://picsum.photos/200' alt='A beautiful sunset over mountains'>\n\n<button aria-label='Close Dialog'>X</button>",
              "css": "button {\n  padding: 5px 10px;\n  background: #f87171;\n  color: white;\n  border: none;\n  border-radius: 4px;\n}",
              "js": ""
            },
            "assessment": "Add alt text to an image and an ARIA label to a generic button."
          },
          {
            "id": "d2-t7",
            "title": "7. Mini Project – Registration Form",
            "progression": [
              {
                "level": "easy",
                "title": "Building the Form",
                "content": "Setup a <form> with semantic sections for personal info (Name, Email)."
              },
              {
                "level": "intermediate",
                "title": "Security & Validation",
                "content": "Add a password field, a password confirmation, and use HTML5 attributes to ensure the email is valid and fields aren't empty."
              },
              {
                "level": "advanced",
                "title": "Polished UX",
                "content": "Group related inputs using <fieldset> and <legend>, and add helpful placeholders and autofocus to the first field."
              }
            ],
            "codeTemplate": {
              "html": "<form class='registration-form'>\n  <h2>Create Account</h2>\n  \n  <fieldset>\n    <legend>Account Info</legend>\n    <label for='user'>Username:</label>\n    <input type='text' id='user' required autofocus>\n    \n    <label for='mail'>Email:</label>\n    <input type='email' id='mail' required>\n  </fieldset>\n\n  <fieldset>\n    <legend>Security</legend>\n    <label for='pass'>Password:</label>\n    <input type='password' id='pass' minlength='8' required>\n  </fieldset>\n\n  <button type='submit'>Sign Up Now</button>\n</form>",
              "css": ".registration-form {\n  background: #1e293b;\n  padding: 30px;\n  border-radius: 12px;\n  border: 1px solid #334155;\n}\nfieldset {\n  border: 1px solid #334155;\n  border-radius: 8px;\n  margin-bottom: 20px;\n  padding: 20px;\n}\nlegend {\n  color: #00d1d1;\n  padding: 0 10px;\n  font-weight: bold;\n}\nlabel {\n  display: block;\n  margin: 10px 0 5px;\n}\ninput {\n  width: 100%;\n  padding: 8px;\n  background: #0f172a;\n  border: 1px solid #334155;\n  border-radius: 4px;\n  color: white;\n}\nbutton {\n  width: 100%;\n  padding: 12px;\n  background: #00d1d1;\n  color: #0f172a;\n  font-weight: bold;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}",
              "js": ""
            },
            "assessment": "Final Challenge: Build this complete registration form and ensure all validation rules are met!"
          },
          {
            "id": "w1-d2-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d3",
        "dayTitle": "Day 3: Introduction to CSS Styling",
        "topics": [
          {
            "id": "d3-t1",
            "title": "1. Introduction to CSS",
            "visualization": "/css-box-model.png",
            "progression": [
              {
                "level": "easy",
                "title": "What is CSS?",
                "content": "CSS (Cascading Style Sheets) is the makeup of the web. While HTML provides the skeleton (structure), CSS provides the skin, clothes, and accessories (style)."
              },
              {
                "level": "intermediate",
                "title": "Ways to Add CSS",
                "content": "There are three ways to style elements: Inline (directly in the tag), Internal (using <style> in the head), and External (a separate .css file). External is the professional standard."
              },
              {
                "level": "advanced",
                "title": "The 'Cascade' in CSS",
                "content": "The 'C' in CSS stands for Cascading. This means styles are applied from top to bottom. If you define two different colors for the same element, the one declared last will usually win!"
              }
            ],
            "codeTemplate": {
              "html": "<h1 class='title'>Hello CSS!</h1>\n<p>Styling makes the web beautiful.</p>",
              "css": "/* This is external CSS */\n.title {\n  color: #00d1d1;\n  text-decoration: underline;\n}\np {\n  font-style: italic;\n  color: #64748b;\n}",
              "js": ""
            },
            "assessment": "Write an internal style tag that changes the body background color to lightblue."
          },
          {
            "id": "d3-t2",
            "title": "2. CSS Selectors",
            "visualization": "/css-selectors.png",
            "progression": [
              {
                "level": "easy",
                "title": "Targeting Elements",
                "content": "Selectors are how you tell CSS which HTML elements to style. The simplest is the Element selector (e.g., h1 { color: red; })."
              },
              {
                "level": "intermediate",
                "title": "Classes and IDs",
                "content": "Use Classes (.className) for multiple elements (like buttons) and IDs (#idName) for unique elements (like a navigation bar)."
              },
              {
                "level": "advanced",
                "title": "Universal Selector (*)",
                "content": "The asterisk (*) targets every single element on the page. It's often used for 'resets' to clear default browser margins and padding."
              }
            ],
            "codeTemplate": {
              "html": "<ul>\n  <li id='first'>Unique Item</li>\n  <li class='blue'>Standard Item</li>\n  <li class='blue'>Standard Item</li>\n</ul>",
              "css": "#first { font-weight: 800; color: #f87171; }\n.blue { color: #38bdf8; }\n* { font-family: 'Inter', sans-serif; }",
              "js": ""
            },
            "assessment": "Apply a class called 'special-text' to a paragraph and style it with a gold color."
          },
          {
            "id": "d3-t3",
            "title": "3. Colors & Units",
            "progression": [
              {
                "level": "easy",
                "title": "Color Formats",
                "content": "You can define colors by Name (red), Hex Code (#FF0000), or RGB (255, 0, 0). Hex is the most popular in web development."
              },
              {
                "level": "intermediate",
                "title": "Fixed vs Relative Units",
                "content": "PX is a fixed unit. REM and EM are relative units that scale based on font size. Using REM is better for accessibility!"
              },
              {
                "level": "advanced",
                "title": "VH and VW Units",
                "content": "Viewport Height (vh) and Viewport Width (vw) are units based on the screen size. 100vh means 'take up 100% of the screen height'."
              }
            ],
            "codeTemplate": {
              "html": "<div class='box'>Responsive Box</div>",
              "css": ".box {\n  background: #1e293b;\n  color: #fbbf24;\n  width: 50vw;\n  padding: 2rem;\n  font-size: 1.25rem;\n  border: 1px solid #334155;\n}",
              "js": ""
            },
            "assessment": "Set an element's width to 75% and its padding to 1.5rem."
          },
          {
            "id": "d3-t4",
            "title": "4. Box Model",
            "visualization": "/css-box-model.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Space Around You",
                "content": "Every element is a box. Margin is outside the border (space between elements), Padding is inside the border (space between content and border)."
              },
              {
                "level": "intermediate",
                "title": "Border vs Content",
                "content": "The content is your text/image. The border sits between padding and margin. You can style borders with thickness, color, and style (solid, dashed)."
              },
              {
                "level": "advanced",
                "title": "Box-Sizing: Border-Box",
                "content": "By default, padding and borders ADD to an element's width. Using 'box-sizing: border-box' keeps the width stable even when you add padding!"
              }
            ],
            "codeTemplate": {
              "html": "<div class='container'>\n  <div class='box m-1'>Margin 20px</div>\n  <div class='box p-1'>Padding 20px</div>\n</div>",
              "css": ".box {\n  background: #0ea5e9;\n  color: white;\n  width: 150px;\n  height: 100px;\n  border: 2px solid white;\n  display: inline-block;\n}\n.m-1 { margin: 20px; }\n.p-1 { padding: 20px; }",
              "js": ""
            },
            "assessment": "Create a box with 10px margin, 20px padding, and a 2px solid border."
          },
          {
            "id": "d3-t5",
            "title": "5. Typography & Fonts",
            "visualization": "/css-typography.png",
            "progression": [
              {
                "level": "easy",
                "title": "Font Basics",
                "content": "Transform your text by changing the Font-Family (type of font) and Font-Size (how big it is)."
              },
              {
                "level": "intermediate",
                "title": "Weights and Spacing",
                "content": "Font-Weight controls thickness (100 to 900). Line-Height controls the vertical gap between lines, which is crucial for readability."
              },
              {
                "level": "advanced",
                "title": "Letter Spacing and Alignment",
                "content": "Text-Align centers or justifies your text. Letter-Spacing controls the gap between characters, perfect for modern heading styles."
              }
            ],
            "codeTemplate": {
              "html": "<h1>Premium Heading</h1>\n<p>This paragraph is styled for maximum readability.</p>",
              "css": "h1 {\n  font-family: 'Outfit', sans-serif;\n  letter-spacing: 2px;\n  text-transform: uppercase;\n  color: #00d1d1;\n}\np {\n  line-height: 1.8;\n  font-size: 1.1rem;\n  color: #94a3b8;\n}",
              "js": ""
            },
            "assessment": "Change the font size of a paragraph to 18px and set its line height to 1.5."
          },
          {
            "id": "d3-t6",
            "title": "6. Backgrounds & Borders",
            "visualization": "/css-backgrounds.png",
            "progression": [
              {
                "level": "easy",
                "title": "Solid Backgrounds",
                "content": "Background-color gives your element a solid base color. It sits behind all text and images in the element."
              },
              {
                "level": "intermediate",
                "title": "Border Radius",
                "content": "Border-radius rounds the corners of your boxes. Use 50% for circles and small px values for modern rounded cards."
              },
              {
                "level": "advanced",
                "title": "Background Images & Gradients",
                "content": "You can use images as backgrounds or create smooth color transitions using 'linear-gradient'. Combine with 'background-size: cover' for full-screen visuals."
              }
            ],
            "codeTemplate": {
              "html": "<div class='card'>\n  <h3>Glass Card</h3>\n</div>",
              "css": ".card {\n  width: 250px;\n  height: 150px;\n  background: linear-gradient(135deg, #3730a3, #4338ca);\n  border-radius: 20px;\n  padding: 30px;\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 10px 25px rgba(0,0,0,0.2);\n}",
              "js": ""
            },
            "assessment": "Build a circular div (width/height same + 50% radius) with a gradient background."
          },
          {
            "id": "d3-t7",
            "title": "7. Mini Project – Styled Profile Page",
            "progression": [
              {
                "level": "easy",
                "title": "Theme Setup",
                "content": "Start by picking a color palette (a primary and secondary color) and applying it to your background and headings."
              },
              {
                "level": "intermediate",
                "title": "Card Layout",
                "content": "Use margins, padding, and borders to turn your profile info into a clean, centered card with rounded corners."
              },
              {
                "level": "advanced",
                "title": "Polishing Visuals",
                "content": "Add a circular border to your profile image, style your skills list with custom bullets, and add a hover effect to your links."
              }
            ],
            "codeTemplate": {
              "html": "<div class='profile-container'>\n  <div class='profile-card'>\n    <img src='https://i.pravatar.cc/120' alt='User'>\n    <h1>Jane Smith</h1>\n    <p>Creative UI Designer & CSS Architect</p>\n    \n    <div class='stats'>\n      <span class='stat-item'>50+ Projects</span>\n      <span class='stat-item'>UX Expert</span>\n    </div>\n    \n    <button class='follow-btn'>View Portfolio</button>\n  </div>\n</div>",
              "css": "body { background: #0f172a; font-family: sans-serif; }\n.profile-container { display: flex; justify-content: center; padding: 50px; }\n.profile-card {\n  background: #1e293b;\n  padding: 40px;\n  border-radius: 30px;\n  text-align: center;\n  color: white;\n  width: 350px;\n  border: 1px solid #334155;\n}\n.profile-card img {\n  border-radius: 50%;\n  border: 4px solid #00d1d1;\n  margin-bottom: 20px;\n}\n.stat-item {\n  background: #334155;\n  padding: 5px 12px;\n  border-radius: 100px;\n  font-size: 0.8rem;\n  margin: 0 5px;\n}\n.follow-btn {\n  margin-top: 30px;\n  padding: 12px 30px;\n  background: #00d1d1;\n  color: #0f172a;\n  border: none;\n  border-radius: 10px;\n  font-weight: bold;\n  cursor: pointer;\n}",
              "js": ""
            },
            "assessment": "Final Challenge: Take your HTML profile page from Day 1 and apply full CSS styling to make it look professional!"
          },
          {
            "id": "w1-d3-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d4",
        "dayTitle": "Day 4: Mastering Flexbox Layouts",
        "topics": [
          {
            "id": "d4-t1",
            "title": "1. CSS Display Property",
            "visualization": "/css-display.png",
            "progression": [
              {
                "level": "easy",
                "title": "How Elements Occupy Space",
                "content": "Every HTML element has a default display behavior. 'Block' elements (like <div>) stack on top of each other, while 'Inline' elements (like <span>) sit side-by-side like words in a sentence."
              },
              {
                "level": "intermediate",
                "title": "Inline-Block",
                "content": "Inline-block is the 'best of both worlds'. Elements sit side-by-side, but you can still give them a specific width, height, margin, and padding."
              },
              {
                "level": "advanced",
                "title": "The 'Display: None' Trick",
                "content": "Setting 'display: none' completely removes an element from the page layout. It's not just hidden; it's gone as if it never existed until you turn it back on with JavaScript or CSS."
              }
            ],
            "codeTemplate": {
              "html": "<div class='block'>Block 1</div>\n<div class='block'>Block 2</div>\n<span class='inline'>Inline 1</span>\n<span class='inline'>Inline 2</span>",
              "css": ".block {\n  background: #0ea5e9;\n  color: white;\n  padding: 10px;\n  margin-bottom: 5px;\n}\n.inline {\n  background: #4ade80;\n  padding: 5px;\n}",
              "js": ""
            },
            "assessment": "Convert two block elements into inline-block elements and set their width to 100px."
          },
          {
            "id": "d4-t2",
            "title": "2. Flexbox Basics",
            "visualization": "/flex-axis.png",
            "progression": [
              {
                "level": "easy",
                "title": "Introduction to Flex",
                "content": "Flexbox (Flexible Box) is a modern layout system. It's designed to align elements in a row or column, and it can grow or shrink them to fill the available space automatically."
              },
              {
                "level": "intermediate",
                "title": "Container vs Items",
                "content": "Flexbox works on a Parent-Child relationship. You turn a parent into a 'Flex Container' using 'display: flex', and its children automatically become 'Flex Items'."
              },
              {
                "level": "advanced",
                "title": "The Main vs Cross Axis",
                "content": "Flexbox has two directions. The Main Axis is where your items flow (usually horizontal), and the Cross Axis is the vertical direction. Understanding this is key to mastering Flexbox."
              }
            ],
            "codeTemplate": {
              "html": "<div class='flex-root'>\n  <div class='item'>1</div>\n  <div class='item'>2</div>\n  <div class='item'>3</div>\n</div>",
              "css": ".flex-root {\n  display: flex;\n  background: #1e293b;\n  padding: 20px;\n  border-radius: 12px;\n}\n.item {\n  width: 50px;\n  height: 50px;\n  background: #00d1d1;\n  margin: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #0f172a;\n  font-weight: bold;\n}",
              "js": ""
            },
            "assessment": "Explain the difference between the Main Axis and the Cross Axis."
          },
          {
            "id": "d4-t3",
            "title": "3. Flexbox Properties (Container)",
            "customComponent": "FlexboxPlayground",
            "progression": [
              {
                "level": "easy",
                "title": "Justify Content",
                "content": "This property aligns items along the Main Axis. You can center them, push them to the ends, or spread them out evenly using 'space-between'."
              },
              {
                "level": "intermediate",
                "title": "Align Items",
                "content": "This handles alignment on the Cross Axis. It's the easiest way to vertically center elements (using 'align-items: center')."
              },
              {
                "level": "advanced",
                "title": "Flex Direction",
                "content": "By default, items flow in a row. You can switch the layout to a column or even reverse the order using 'row-reverse' or 'column-reverse'."
              }
            ],
            "codeTemplate": {
              "html": "<div class='flex-container'>\n  <div class='box'>A</div>\n  <div class='box'>B</div>\n</div>",
              "css": ".flex-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 200px;\n  background: #0f172a;\n}\n.box { background: white; padding: 20px; color: black; }",
              "js": ""
            },
            "assessment": "Use the interactive playground to find the setting that puts space between items."
          },
          {
            "id": "d4-t4",
            "title": "4. Flexbox Properties (Items)",
            "progression": [
              {
                "level": "easy",
                "title": "Flex-Grow",
                "content": "Should an item grow to fill extra space? A value of 1 means 'yes, grow!', while 0 means 'stay my size'."
              },
              {
                "level": "intermediate",
                "title": "Flex-Basis",
                "content": "This sets the initial 'starting' size of an item before the extra space is distributed. It's like a smarter version of 'width'."
              },
              {
                "level": "advanced",
                "title": "Align-Self",
                "content": "Sometimes you want one specific item to behave differently from the rest. 'Align-self' lets you override the container's vertical alignment for just that one item."
              }
            ],
            "codeTemplate": {
              "html": "<div class='container'>\n  <div class='fixed'>Fixed</div>\n  <div class='growing'>Grows</div>\n</div>",
              "css": ".container { display: flex; background: #334155; padding: 10px; }\n.fixed { width: 100px; background: #f87171; }\n.growing { flex-grow: 1; background: #4ade80; }",
              "js": ""
            },
            "assessment": "Create three items where the center item grows twice as much as the others."
          },
          {
            "id": "d4-t5",
            "title": "5. Spacing & Alignment Techniques",
            "progression": [
              {
                "level": "easy",
                "title": "The Gap Property",
                "content": "Traditionally, we used margins to separate items. Now, we use 'gap'. It's much simpler because it only adds space BETWEEN items, not on the outer edges."
              },
              {
                "level": "intermediate",
                "title": "The Margin Auto Hack",
                "content": "In Flexbox, 'margin-left: auto' will push an item to the far right. It's a powerful trick for separating navigation links from a logo."
              },
              {
                "level": "advanced",
                "title": "The Ultimate Centering",
                "content": "To perfectly center anything inside a parent, just use: 'display: flex', 'justify-content: center', and 'align-items: center'. This is the #1 most used Flexbox pattern."
              }
            ],
            "codeTemplate": {
              "html": "<div class='full-center'>\n  <div class='modal'>Perfectly Centered Content</div>\n</div>",
              "css": ".full-center {\n  height: 300px;\n  background: #1e293b;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.modal {\n  background: white;\n  padding: 40px;\n  border-radius: 20px;\n  color: #0f172a;\n}",
              "js": ""
            },
            "assessment": "Center an H1 tag both vertically and horizontally in a div that is 400px tall."
          },
          {
            "id": "d4-t6",
            "title": "6. Building Layouts with Flexbox",
            "progression": [
              {
                "level": "easy",
                "title": "Navigation Bars",
                "content": "Standard navbars have a logo on the left and links on the right. Using 'justify-content: space-between' makes this layout a breeze."
              },
              {
                "level": "intermediate",
                "title": "Sticky Footers",
                "content": "Use 'flex-direction: column' on your body and 'flex-grow: 1' on your main content to push your footer to the very bottom, even on empty pages."
              },
              {
                "level": "advanced",
                "title": "Flex Wrap & Grids",
                "content": "Flexbox usually puts everything on one line. Use 'flex-wrap: wrap' to let items fall to the next line when the screen gets narrow (great for image galleries)."
              }
            ],
            "codeTemplate": {
              "html": "<nav class='navbar'>\n  <div class='logo'>LOGO</div>\n  <ul class='links'>\n    <li>Home</li>\n    <li>Tools</li>\n    <li>Contact</li>\n  </ul>\n</nav>",
              "css": ".navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  background: #0f172a;\n  padding: 1rem 2rem;\n  color: white;\n}\n.links {\n  display: flex;\n  gap: 20px;\n  list-style: none;\n}",
              "js": ""
            },
            "assessment": "Build a navigation bar with a logo and 3 links spread across the width of the page."
          },
          {
            "id": "d4-t7",
            "title": "7. Mini Project – Responsive Card Layout",
            "progression": [
              {
                "level": "easy",
                "title": "The Grid Foundation",
                "content": "Create a container with 'display: flex' and 'flex-wrap: wrap' to hold several cards."
              },
              {
                "level": "intermediate",
                "title": "Uniform Card Sizing",
                "content": "Use 'flex: 1 1 300px' on your cards. This tells them: 'try to be 300px wide, but grow and shrink to fit the containers width'."
              },
              {
                "level": "advanced",
                "title": "Interactive Polish",
                "content": "Add transitions and hover effects. Use Flexbox inside the card itself to center images and titles perfectly."
              }
            ],
            "codeTemplate": {
              "html": "<div class='grid'>\n  <div class='card'>Card 1</div>\n  <div class='card'>Card 2</div>\n  <div class='card'>Card 3</div>\n</div>",
              "css": ".grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n  padding: 20px;\n}\n.card {\n  flex: 1 1 200px;\n  background: #1e293b;\n  color: #00d1d1;\n  padding: 40px;\n  border-radius: 15px;\n  text-align: center;\n  border: 1px solid #334155;\n  transition: 0.3s transform;\n}\n.card:hover {\n  transform: translateY(-5px);\n  background: #334155;\n}",
              "js": ""
            },
            "assessment": "Final Challenge: Build a 3-column card grid that drops to 1 column on small screens using what you learned!"
          },
          {
            "id": "w1-d4-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d5",
        "dayTitle": "Day 5: Responsive Web Design",
        "topics": [
          {
            "id": "d5-t1",
            "title": "1. Introduction to Responsive Design",
            "visualization": "/res-breakpoints.png",
            "customComponent": "ResponsiveSimulator",
            "progression": [
              {
                "level": "easy",
                "title": "One Web, Many Devices",
                "content": "Responsive Design is the practice of building websites that look great on any screen size, from a tiny smartphone to a massive desktop monitor. Instead of building different sites for each, we build one site that ADAPTS."
              },
              {
                "level": "intermediate",
                "title": "The Mobile-First Approach",
                "content": "Mobile-First means designing for the smallest screen first, then adding more features and complex layouts as the screen gets larger. It's the modern industry standard because it forces you to prioritize content."
              },
              {
                "level": "advanced",
                "title": "Fluidity vs Fixedness",
                "content": "In the past, websites had 'fixed' widths (like 960px). Today, everything is fluid. We use relative units and layout systems that let content flow naturally depending on the container's size."
              }
            ],
            "codeTemplate": {
              "html": "<div class='info'>\n  <h2>Responsive News</h2>\n  <p>Resize the preview to see me adapt!</p>\n</div>",
              "css": ".info {\n  width: 90%;\n  max-width: 600px;\n  margin: auto;\n  background: #1e293b;\n  padding: 20px;\n  border-radius: 12px;\n  color: white;\n}",
              "js": ""
            },
            "assessment": "Explain why current web development prefers a 'Mobile-First' approach."
          },
          {
            "id": "d5-t2",
            "title": "2. Media Queries",
            "progression": [
              {
                "level": "easy",
                "title": "The @media Rule",
                "content": "Media queries are the heart of responsive design. They allow you to apply CSS only when certain conditions are met, like 'if the screen is wider than 600px'."
              },
              {
                "level": "intermediate",
                "title": "Breakpoints",
                "content": "Breakpoints are the specific widths where your layout changes. Common ones are 768px (Tablets) and 1024px (Desktops). Use them sparingly to keep your code clean."
              },
              {
                "level": "advanced",
                "title": "Condition Combinations",
                "content": "You can combine conditions using 'and', 'not', and 'only'. For example, you can target only high-resolution screens or only devices in 'landscape' orientation."
              }
            ],
            "codeTemplate": {
              "html": "<div class='box'>I change color on Desktop!</div>",
              "css": ".box {\n  background: #f87171;\n  padding: 20px;\n  text-align: center;\n  color: white;\n}\n\n@media (min-width: 768px) {\n  .box {\n    background: #00d1d1;\n    font-size: 2rem;\n  }\n}",
              "js": ""
            },
            "assessment": "Write a media query that changes the font-size to 14px when the screen is smaller than 480px."
          },
          {
            "id": "d5-t3",
            "title": "3. Flexible Layouts",
            "progression": [
              {
                "level": "easy",
                "title": "Percentage Widths",
                "content": "Instead of 'width: 400px', use 'width: 50%'. This ensures the element always takes up half of its parent, no matter how wide the parent is."
              },
              {
                "level": "intermediate",
                "title": "Max-Width is Your Friend",
                "content": "If you set 'width: 100%' and 'max-width: 800px', the element will be fluid on small screens but stop growing once it hits 800px. This prevents text from becoming too long to read comfortably."
              },
              {
                "level": "advanced",
                "title": "The Box-Sizing Fix",
                "content": "Always use 'box-sizing: border-box'. Without it, adding padding to a 'width: 100%' element will cause it to overflow the screen. This is one of the most common responsive bugs!"
              }
            ],
            "codeTemplate": {
              "html": "<div class='outer'>\n  <div class='inner'>I am fluid!</div>\n</div>",
              "css": ".outer { background: #334155; padding: 20px; }\n.inner {\n  width: 80%;\n  max-width: 400px;\n  background: #00d1d1;\n  margin: auto;\n  padding: 20px;\n  text-align: center;\n}",
              "js": ""
            },
            "assessment": "Create a container that takes up 90% of the screen but never exceeds 1200px."
          },
          {
            "id": "d5-t4",
            "title": "4. Responsive Images & Media",
            "visualization": "/res-images.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Golden Rule",
                "content": "To make any image responsive, simply add 'max-width: 100%' and 'height: auto'. This ensures the image never overflows its container and keeps its proportions."
              },
              {
                "level": "intermediate",
                "title": "Object-Fit",
                "content": "When you have a fixed-size container but dynamic images, use 'object-fit: cover'. It works like a background-image, cropping the photo to fill the box perfectly without stretching it."
              },
              {
                "level": "advanced",
                "title": "The Picture Element",
                "content": "Sometimes you need different images for different screens (e.g., a landscape photo for desktop and a vertical crop for mobile). The <picture> tag lets you serve different files based on media queries!"
              }
            ],
            "codeTemplate": {
              "html": "<div class='img-frame'>\n  <img src='https://picsum.photos/800/400' alt='Responsive' class='resp-img'>\n</div>",
              "css": ".img-frame { width: 300px; height: 300px; border: 4px solid white; }\n.resp-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}",
              "js": ""
            },
            "assessment": "Render an image that occupies 100% of its parent's width but maintains its aspect ratio."
          },
          {
            "id": "d5-t5",
            "title": "5. Mobile Navigation Patterns",
            "progression": [
              {
                "level": "easy",
                "title": "The Hamburger Menu",
                "content": "On small screens, we hide the navigation links behind a 'Hamburger' icon (three line icon). This saves valuable screen space for actual content."
              },
              {
                "level": "intermediate",
                "title": "Vertical Stacking",
                "content": "The simplest mobile nav pattern is just stacking the links vertically. Use Flexbox with 'flex-direction: column' inside a media query to achieve this."
              },
              {
                "level": "advanced",
                "title": "Off-Canvas sidebars",
                "content": "Modern apps often use a sidebar that slides in from the left or right. You can build this using CSS transforms ('translateX') for high-performance animations."
              }
            ],
            "codeTemplate": {
              "html": "<nav class='mobile-friendly-nav'>\n  <div class='logo'>APP</div>\n  <div class='menu-toggle'>☰</div>\n  <ul class='nav-links'>\n    <li>Home</li>\n    <li>Gallery</li>\n  </ul>\n</nav>",
              "css": ".nav-links { display: none; }\n@media (min-width: 768px) {\n  .nav-links { display: flex; list-style: none; gap: 20px; }\n  .menu-toggle { display: none; }\n}",
              "js": ""
            },
            "assessment": "Build a navigation bar that hides its links on mobile and shows a hamburger icon instead."
          },
          {
            "id": "d5-t6",
            "title": "6. Testing Responsiveness",
            "progression": [
              {
                "level": "easy",
                "title": "Browser Dev Tools",
                "content": "Right-click any webpage and select 'Inspect'. Click the device toggle icon (next to the cursor) to simulate mobile screens directly in your browser."
              },
              {
                "level": "intermediate",
                "title": "Device Presets",
                "content": "Inside Dev Tools, you can pick specific devices like 'iPhone 14' or 'Pixel 7' to see exactly how your site looks on those specific resolutions."
              },
              {
                "level": "advanced",
                "title": "Lighthouse Insights",
                "content": "Lighthouse is a tool inside Chrome that audits your site. It will tell you if your 'Tap Targets' are too small for fingers or if your text is too tiny for mobile readers."
              }
            ],
            "codeTemplate": {
              "html": "<div class='touch-target'>Click Me!</div>",
              "css": ".touch-target {\n  background: #00d1d1;\n  padding: 10px; /* Is this too small for mobile? */\n  border-radius: 8px;\n  cursor: pointer;\n}",
              "js": ""
            },
            "assessment": "Open Dev Tools and simulate an 'iPhone SE' view. What is the screen width?"
          },
          {
            "id": "d5-t7",
            "title": "7. Mini Project – Responsive Landing Page",
            "progression": [
              {
                "level": "easy",
                "title": "The Stacked Layout",
                "content": "Create a simple landing page that stacks every section (Header, Hero, Services, Footer) vertically for mobile."
              },
              {
                "level": "intermediate",
                "title": "Expanding for Desktop",
                "content": "Add a media query for screens wider than 1024px. Change the services section from 1 column to 3 columns using Flexbox."
              },
              {
                "level": "advanced",
                "title": "Polishing UX",
                "content": "Add responsive padding that grows on larger screens, ensuring your content never feels too cramped or too spread out."
              }
            ],
            "codeTemplate": {
              "html": "<div class='landing'>\n  <section class='hero'>Responsive Hero</section>\n  <section class='grid'>\n    <div class='feat'>A</div>\n    <div class='feat'>B</div>\n    <div class='feat'>C</div>\n  </section>\n</div>",
              "css": ".landing { font-family: sans-serif; }\n.hero { height: 200px; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; }\n.grid { display: flex; flex-direction: column; gap: 10px; padding: 20px; }\n.feat { background: #f1f5f9; padding: 40px; border-radius: 10px; border: 1px solid #cbd5e1; }\n\n@media (min-width: 768px) {\n  .grid { flex-direction: row; }\n}",
              "js": ""
            },
            "assessment": "Final Challenge: Take everything you learned and build a landing page that is perfectly readable on BOTH a phone and a high-res monitor!"
          },
          {
            "id": "w1-d5-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d6",
        "dayTitle": "Day 6: Version Control & Deployment",
        "topics": [
          {
            "id": "d6-t1",
            "title": "1. Introduction to Git",
            "progression": [
              {
                "level": "easy",
                "title": "The Save Game of Coding",
                "content": "Git is a Version Control System (VCS). Think of it like a 'Save Game' feature for your code. If you make a mistake, you can 'load' an older version of your project and start over."
              },
              {
                "level": "intermediate",
                "title": "Git vs GitHub",
                "content": "Git is the tool that tracks changes on your local computer. GitHub is a website (a cloud service) where you store those changes so you can share them with others or access them from any device."
              },
              {
                "level": "advanced",
                "title": "Distributed Version Control",
                "content": "Git is 'distributed', meaning every developer has a full copy of the project's history on their machine. This makes it incredibly fast and reliable, even without an internet connection."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Git is a CLI tool, no HTML here -->\n<h1>Git is Power</h1>",
              "css": "/* Style your console in your mind */",
              "js": "// Run git commands in your terminal!"
            },
            "assessment": "Explain the difference between Git and GitHub in your own words."
          },
          {
            "id": "d6-t2",
            "title": "2. Git Basic Commands",
            "customComponent": "GitTerminal",
            "progression": [
              {
                "level": "easy",
                "title": "Starting a Repo",
                "content": "Use 'git init' to turn a normal folder into a Git Repository. This creates a hidden .git folder that starts tracking every character you type."
              },
              {
                "level": "intermediate",
                "title": "The Staging Area",
                "content": "Before you 'Save', you must pick which files to include. 'git add .' puts all your changes in the 'Staging Area' (the packing phase)."
              },
              {
                "level": "advanced",
                "title": "Commits & History",
                "content": "'git commit' is the actual save button. Every commit has a message describing what changed. Use 'git log' to see a timeline of every save you've ever made."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Open the Git Terminal below to practice -->",
              "css": "",
              "js": ""
            },
            "assessment": "Use the simulator to initialize a repo, add files, and make your first commit."
          },
          {
            "id": "d6-t3",
            "title": "3. Working with GitHub",
            "progression": [
              {
                "level": "easy",
                "title": "Pushing to the Cloud",
                "content": "To get your code onto GitHub, you 'push' it. This uploads your local commits to a 'Remote' repository."
              },
              {
                "level": "intermediate",
                "title": "Cloning Repositories",
                "content": "Want to work on an existing project? Use 'git clone [URL]'. This downloads the entire project and its history to your machine in seconds."
              },
              {
                "level": "advanced",
                "title": "SSH vs HTTPS",
                "content": "There are two ways to talk to GitHub. HTTPS uses your username/password, while SSH uses digital keys for a more secure, password-less experience."
              }
            ],
            "codeTemplate": {
              "html": "<ul>\n  <li>git clone [url]</li>\n  <li>git push origin main</li>\n  <li>git pull origin main</li>\n</ul>",
              "css": "",
              "js": ""
            },
            "assessment": "Outline the steps to connect a local repository to a new repository on GitHub."
          },
          {
            "id": "d6-t4",
            "title": "4. Branching & Merging",
            "progression": [
              {
                "level": "easy",
                "title": "Parallel Universes",
                "content": "Branches let you work on a new feature in a separate 'timeline' without breaking the main code. The default branch is usually called 'main'."
              },
              {
                "level": "intermediate",
                "title": "Merging Changes",
                "content": "Once your feature is done, you 'merge' your branch back into the main branch. Git automatically combines the changes from both timelines."
              },
              {
                "level": "advanced",
                "title": "Handling Merge Conflicts",
                "content": "If two people change the same line of code, Git gets confused. This is a 'Merge Conflict'. You have to manually pick which version of the code to keep."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Commands to master -->\n<p>git checkout -b feature-dark-mode</p>\n<p>git merge feature-dark-mode</p>",
              "css": "",
              "js": ""
            },
            "assessment": "Explain how branching helps teams avoid breaking the production website."
          },
          {
            "id": "d6-t5",
            "title": "5. Collaboration Workflow",
            "progression": [
              {
                "level": "easy",
                "title": "Pull Requests (PRs)",
                "content": "On GitHub, you don't just merge code. You create a 'Pull Request'. It's a formal request to the team to review your code before it goes live."
              },
              {
                "level": "intermediate",
                "title": "Code Reviews",
                "content": "Teammates can comment on specific lines of your PR, suggesting better ways to write a function or pointing out bugs."
              },
              {
                "level": "advanced",
                "title": "Atomic Commits",
                "content": "Professional devs use 'Atomic Commits'—small, focused saves that do exactly ONE thing. This makes the project history much easier to read and debug."
              }
            ],
            "codeTemplate": {
              "html": "<h3>Commit Message Guidelines</h3>\n<ul>\n  <li>feat: add login form</li>\n  <li>fix: resolve navbar alignment</li>\n  <li>docs: update readme</li>\n</ul>",
              "css": "",
              "js": ""
            },
            "assessment": "Write three examples of good commit messages following the standard convention."
          },
          {
            "id": "d6-t6",
            "title": "6. Deployment Basics",
            "progression": [
              {
                "level": "easy",
                "title": "From Local to Global",
                "content": "Deployment means taking your code from your computer and putting it on a specialized 'Web Server' so anyone with a URL can visit it."
              },
              {
                "level": "intermediate",
                "title": "Static vs Dynamic Hosting",
                "content": "Simple HTML/CSS sites are 'Static'. They can be hosted for free on services like GitHub Pages or Netlify. Apps with databases are 'Dynamic' and require more complex servers."
              },
              {
                "level": "advanced",
                "title": "Continuous Deployment (CD)",
                "content": "Modern tools can automatically deploy your site every time you 'git push'. If you update your code on GitHub, your live website updates its content automatically!"
              }
            ],
            "codeTemplate": {
              "html": "<h1>My Live Site</h1>\n<p>Hosted via Netlify CDN</p>",
              "css": "body { background: #e2e8f0; }",
              "js": ""
            },
            "assessment": "Name two popular services used for deploying modern frontend applications."
          },
          {
            "id": "d6-t7",
            "title": "7. Mini Project – Deploy Your Website",
            "progression": [
              {
                "level": "easy",
                "title": "Final Push",
                "content": "Commit all your changes from the week and push them to your GitHub repository."
              },
              {
                "level": "intermediate",
                "title": "Connecting Netlify",
                "content": "Log into Netlify/Vercel and link your GitHub account. Select your repository and hit 'Deploy'."
              },
              {
                "level": "advanced",
                "title": "Custom Domains",
                "content": "Learn how to point a custom domain (like www.yoursite.com) to your newly deployed project!"
              }
            ],
            "codeTemplate": {
              "html": "<div class='success-badge'>Live on Netlify!</div>",
              "css": ".success-badge { padding: 20px; background: #4ade80; color: #064e3b; border-radius: 12px; font-weight: bold; }",
              "js": ""
            },
            "assessment": "Final Milestone: Push your Week 1 portfolio to GitHub and share your live Netlify URL!"
          },
          {
            "id": "w1-d6-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w1-d7",
        "dayTitle": "Day 7: Final Project & Review",
        "topics": [
          {
            "id": "d7-t1",
            "title": "1. Revision & Concept Reinforcement",
            "progression": [
              {
                "level": "easy",
                "title": "The HTML Foundation",
                "content": "Remember: HTML is the skeleton. We use semantic tags like <header> and <main> to give meaning to our content, making it accessible to both users and search engines."
              },
              {
                "level": "intermediate",
                "title": "The CSS Skin",
                "content": "CSS is the design. We use the Box Model (Margin/Padding) to create space, and Flexbox to align elements effortlessly in rows and columns."
              },
              {
                "level": "advanced",
                "title": "The Responsive Mindset",
                "content": "Everything we build must be responsive. Use Media Queries and fluid units (%) to ensure your portfolio looks perfect on every screen from a phone to a desktop."
              }
            ],
            "codeTemplate": {
              "html": "<div class='recap'>\n  <h2>Week 1 Mastery</h2>\n  <ul>\n    <li>Semantic HTML</li>\n    <li>CSS Box Model</li>\n    <li>Flexbox Layouts</li>\n    <li>Responsive Design</li>\n    <li>Git & Deployment</li>\n  </ul>\n</div>",
              "css": ".recap {\n  background: var(--brand-gradient);\n  color: white;\n  padding: 30px;\n  border-radius: 20px;\n}\nli { margin-top: 10px; font-weight: bold; }",
              "js": ""
            },
            "assessment": "Write a short paragraph explaining how Flexbox and Media Queries work together to create responsive layouts."
          },
          {
            "id": "d7-t2",
            "title": "2. UI Planning & Layout Design",
            "customComponent": "PlanVisualizer",
            "progression": [
              {
                "level": "easy",
                "title": "Thinking in Boxes",
                "content": "Before you type a single line of code, you must plan. Wireframing is the process of sketching your layout using simple boxes. This helps you focus on structure without getting distracted by colors."
              },
              {
                "level": "intermediate",
                "title": "Layout Structuring",
                "content": "Break your design into components: Header, Hero, Services, Contact. This 'Component Thinking' makes development much easier because you can build and test one piece at a time."
              },
              {
                "level": "advanced",
                "title": "High-Fidelity Planning",
                "content": "Once the boxes are set, you add the 'Fidelity'—picking your font families, color palettes, and spacing systems. Always define your CSS variables early to keep your design consistent."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Plan your layout here using comments -->\n<!-- <header> for logo/nav -->\n<!-- <main> for content -->",
              "css": "/* Define your theme variables first! */\n:root {\n  --primary: #00d1d1;\n}",
              "js": ""
            },
            "assessment": "Sketch a simple 3-box wireframe for a personal portfolio home page."
          },
          {
            "id": "d7-t3",
            "title": "3. Combining HTML & CSS",
            "progression": [
              {
                "level": "easy",
                "title": "The Integration Phase",
                "content": "Start with a clean HTML structure. Once the content is there, link your External CSS file and begin applying your global styles (reset, fonts, colors)."
              },
              {
                "level": "intermediate",
                "title": "Class-Based Styling",
                "content": "Avoid using IDs for styling. Use reusable classes like '.card' or '.btn'. This keeps your CSS 'Dry' (Don't Repeat Yourself) and much easier to maintain."
              },
              {
                "level": "advanced",
                "title": "Z-Index & Positioning",
                "content": "When combining elements, you might need layers. Use 'position: relative' and 'z-index' to control which elements sit on top of others, especially for navigation bars."
              }
            ],
            "codeTemplate": {
              "html": "<div class='full-component'>\n  <div class='overlay'>Integrated UI</div>\n  <p>Learn to layer and style complex components.</p>\n</div>",
              "css": ".full-component {\n  position: relative;\n  background: #1e293b;\n  padding: 40px;\n  color: white;\n}\n.overlay {\n  position: absolute;\n  top: 10px; right: 10px;\n  background: var(--primary-cyan);\n  padding: 5px 10px;\n  font-size: 0.7rem;\n}",
              "js": ""
            },
            "assessment": "Build a hero section that has a background image and centered text on top of it."
          },
          {
            "id": "d7-t4",
            "title": "4. Responsive Optimization",
            "progression": [
              {
                "level": "easy",
                "title": "Finding the Breaks",
                "content": "Open your site in Dev Tools and slowly shrink the window. Whenever the layout looks 'broken' (text overflows, images get too small), that's where you need a breakpoint."
              },
              {
                "level": "intermediate",
                "title": "The Clamp Function",
                "content": "For truly fluid typography, use 'font-size: clamp(1rem, 5vw, 2rem)'. This tells the font to grow and shrink smoothly without needing dozens of media queries."
              },
              {
                "level": "advanced",
                "title": "Container Queries",
                "content": "The next level of responsive design is 'Container Queries'. Instead of looking at the screen size, elements can look at the size of their PARENT container to decide how to style themselves."
              }
            ],
            "codeTemplate": {
              "html": "<h1 class='fluid-text'>I scale perfectly!</h1>",
              "css": ".fluid-text {\n  font-size: clamp(2rem, 10vw, 5rem);\n  text-align: center;\n  color: var(--primary-cyan);\n}",
              "js": ""
            },
            "assessment": "Optimize a 4-column grid to become 2 columns on tablets and 1 column on mobile."
          },
          {
            "id": "d7-t5",
            "title": "5. Code Cleanup & Best Practices",
            "progression": [
              {
                "level": "easy",
                "title": "Naming Conventions (BEM)",
                "content": "Use BEM (Block Element Modifier) to name your classes: 'card', 'card__title', 'card__btn--active'. This makes your code readable for any developer in the world."
              },
              {
                "level": "intermediate",
                "title": "Commenting & Documentation",
                "content": "Add comments to separate sections of your CSS: /* --- HERO SECTION --- */. This helps you find code quickly when your file grows to 500+ lines."
              },
              {
                "level": "advanced",
                "title": "Removing Dead Code",
                "content": "Before you deploy, delete any unused classes and console logs. Clean code is faster to load and much easier to debug later."
              }
            ],
            "codeTemplate": {
              "html": "<div class='card card--featured'>\n  <h3 class='card__title'>Clean Code</h3>\n  <button class='card__btn'>Standardized</button>\n</div>",
              "css": "/* Component: Card */\n.card { padding: 20px; }\n.card--featured { border: 2px solid cyan; }\n.card__title { font-size: 1.2rem; }\n.card__btn { background: black; color: white; }",
              "js": ""
            },
            "assessment": "Refactor a messy piece of CSS using the BEM naming convention."
          },
          {
            "id": "d6-t6",
            "title": "6. Project Deployment Review",
            "progression": [
              {
                "level": "easy",
                "title": "Checking the Build",
                "content": "Verify that all your assets (images, icons) are showing up correctly in your local project before pushing to GitHub."
              },
              {
                "level": "intermediate",
                "title": "README Files",
                "content": "Every project needs a 'README.md' file. This describes what the project is, what tools you used, and how someone else can run it on their computer."
              },
              {
                "level": "advanced",
                "title": "Deployment Audit",
                "content": "Run your live URL through Lighthouse again. Check for any SEO issues (missing alt tags) or performance bottlenecks before sharing the link."
              }
            ],
            "codeTemplate": {
              "html": "<!-- Checklist for Deployment -->\n<ul>\n  <li>Alt tags on images?</li>\n  <li>Fixed all links?</li>\n  <li>Cleaned up comments?</li>\n</ul>",
              "css": "",
              "js": ""
            },
            "assessment": "Create a README structure for your final portfolio project."
          },
          {
            "id": "d7-t7",
            "title": "7. Final Project – Personal Portfolio Page",
            "progression": [
              {
                "level": "easy",
                "title": "The Assembly",
                "content": "Combine your About Me section, Project Grid, and Contact form into a single, cohesive HTML file."
              },
              {
                "level": "intermediate",
                "title": "Global Styling",
                "content": "Apply your premium design system. Ensure all buttons, headers, and spacing are consistent across the entire page."
              },
              {
                "level": "advanced",
                "title": "Responsiveness & Launch",
                "content": "Apply your breakpoints. Verify it works on your phone. Push to GitHub, deploy to Netlify, and celebrate your first professional web project!"
              }
            ],
            "codeTemplate": {
              "html": "<!-- YOUR COMPLETE PORTFOLIO STRUCTURE HERE -->\n<header>...</header>\n<main>\n  <section id='hero'>...</section>\n  <section id='work'>...</section>\n</main>",
              "css": "/* YOUR BRAND SYSTEM HERE */\n:root { ... }\nbody { ... }\n\n/* MEDIA QUERIES */\n@media (...) { ... }",
              "js": ""
            },
            "assessment": "The Ultimate Challenge: Build and deploy your responsive portfolio using everything you learned in Week 1!"
          },
          {
            "id": "w1-d7-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      }
    ]
  },
  {
    "weekId": "w2",
    "weekTitle": "Week 2: JavaScript Essentials",
    "days": [
      {
        "dayId": "w2-d1",
        "dayTitle": "Day 1: JavaScript Fundamentals",
        "topics": [
          {
            "id": "w2-d1-t1",
            "title": "1. Introduction to JavaScript",
            "customComponent": "JSRuntimeViz",
            "progression": [
              {
                "level": "easy",
                "title": "What is JavaScript?",
                "content": "JavaScript is a high-level, interpreted programming language that enables interactive web pages. While HTML provides structure and CSS provides style, JS provides the 'brain' or logic."
              },
              {
                "level": "intermediate",
                "title": "The Role in Web Development",
                "content": "JS allows you to change content dynamically, control multimedia, animate images, and much more. It's one of the three core technologies of the World Wide Web."
              },
              {
                "level": "advanced",
                "title": "The JavaScript Runtime",
                "content": "JavaScript runs in the browser's engine (like Chrome's V8). It uses an event loop to handle asynchronous tasks, making it incredibly efficient for user interactions."
              }
            ],
            "codeTemplate": {
              "html": "<h1>JS Brain Test</h1>\n<p id='message'>Static Text</p>\n<button id='action-btn'>Click to Think</button>",
              "css": "button { padding: 10px 20px; background: var(--brand-gradient); border: none; color: white; border-radius: 8px; cursor: pointer; }",
              "js": "document.getElementById('action-btn').onclick = () => {\n  document.getElementById('message').innerText = 'JavaScript just changed this text!';\n  document.getElementById('message').style.color = 'var(--primary-cyan)';\n};"
            },
            "assessment": "Explain the 'three-layer' analogy of web development (HTML, CSS, JS)."
          },
          {
            "id": "w2-d1-t2",
            "title": "2. Variables & Data Types",
            "customComponent": "DataTypeViz",
            "progression": [
              {
                "level": "easy",
                "title": "Containers for Data",
                "content": "Variables are containers for storing data values. In modern JS, we use 'let' for values that change and 'const' for values that stay the same."
              },
              {
                "level": "intermediate",
                "title": "Primitive Data Types",
                "content": "JS has several primitive types: Strings (text), Numbers (integers/decimals), Booleans (true/false), Null (empty), and Undefined (unassigned)."
              },
              {
                "level": "advanced",
                "title": "Var vs Let vs Const",
                "content": "'var' is the old way (function-scoped). 'let' and 'const' are block-scoped, which prevents many bugs related to variable leaking."
              }
            ],
            "codeTemplate": {
              "html": "<div id='output'>Check console for types!</div>",
              "css": "#output { padding: 20px; background: var(--app-card-bg); border-radius: 12px; }",
              "js": "const name = 'Alex';\nlet age = 25;\nlet isStudent = true;\n\nconsole.log(typeof name); // string\nconsole.log(typeof age);  // number\nconsole.log(typeof isStudent); // boolean"
            },
            "assessment": "Create variables for your name, age, and a boolean representing if you like coding."
          },
          {
            "id": "w2-d1-t3",
            "title": "3. Operators in JavaScript",
            "customComponent": "OperatorViz",
            "progression": [
              {
                "level": "easy",
                "title": "Arithmetic Operators",
                "content": "Used to perform math: + (addition), - (subtraction), * (multiplication), / (division), and % (remainder)."
              },
              {
                "level": "intermediate",
                "title": "Comparison Operators",
                "content": "Used to compare values: == (equal), === (strict equal), != (not equal), > (greater), < (less)."
              },
              {
                "level": "advanced",
                "title": "Logical Operators",
                "content": "Used to combine conditions: && (AND), || (OR), and ! (NOT). These are the foundation of complex decision making."
              }
            ],
            "codeTemplate": {
              "html": "<div id='calc-output'>Result: </div>",
              "css": "",
              "js": "let x = 10;\nlet y = 5;\nlet sum = x + y;\nlet isGreater = x > y;\n\ndocument.getElementById('calc-output').innerText = `Sum: ${sum}, Is X > Y? ${isGreater}`;"
            },
            "assessment": "Write a script that calculates the area of a rectangle given its width and height."
          },
          {
            "id": "w2-d1-t4",
            "title": "4. Conditional Statements",
            "customComponent": "LogicFlowViz",
            "progression": [
              {
                "level": "easy",
                "title": "If / Else",
                "content": "The if statement executes a block of code if a condition is true. The else statement handles the 'otherwise' case."
              },
              {
                "level": "intermediate",
                "title": "Else If & Nesting",
                "content": "You can chain multiple conditions using 'else if'. Nesting allows you to check conditions inside other conditions."
              },
              {
                "level": "advanced",
                "title": "The Switch Statement",
                "content": "A switch statement is a cleaner way to handle multiple specific values for a single variable, like choosing a day of the week."
              }
            ],
            "codeTemplate": {
              "html": "<input type='number' id='age-input' placeholder='Enter age'>\n<button id='check-btn'>Check Status</button>\n<p id='result'></p>",
              "css": "",
              "js": "document.getElementById('check-btn').onclick = () => {\n  const age = document.getElementById('age-input').value;\n  const result = document.getElementById('result');\n  \n  if (age >= 18) {\n    result.innerText = 'You are an adult.';\n  } else {\n    result.innerText = 'You are a minor.';\n  }\n};"
            },
            "assessment": "Write a switch statement that prints the name of a fruit based on a number (1-3)."
          },
          {
            "id": "w2-d1-t5",
            "title": "5. Loops in JavaScript",
            "customComponent": "LoopViz",
            "progression": [
              {
                "level": "easy",
                "title": "The For Loop",
                "content": "For loops are used when you know exactly how many times you want to repeat a task. It has three parts: init, condition, and increment."
              },
              {
                "level": "intermediate",
                "title": "While Loops",
                "content": "While loops repeat as long as a condition remains true. Be careful of 'infinite loops' that never stop!"
              },
              {
                "level": "advanced",
                "title": "Do-While & Break",
                "content": "Do-while ensures the code runs at least ONCE. 'break' and 'continue' allow you to exit or skip iterations early."
              }
            ],
            "codeTemplate": {
              "html": "<div id='loop-output'></div>",
              "css": "",
              "js": "let output = '';\nfor (let i = 1; i <= 5; i++) {\n  output += `Count: ${i} <br>`;\n}\ndocument.getElementById('loop-output').innerHTML = output;"
            },
            "assessment": "Create a loop that prints only even numbers from 1 to 20."
          },
          {
            "id": "w2-d1-t6",
            "title": "6. Input & Output Basics",
            "customComponent": "InputOutputViz",
            "progression": [
              {
                "level": "easy",
                "title": "Console Logging",
                "content": "console.log() is a developer's best friend. it prints messages to the browser console for debugging."
              },
              {
                "level": "intermediate",
                "title": "Alerts & Confirms",
                "content": "alert() pops up a message. confirm() asks for a Yes/No answer. These are simple but can be annoying to users."
              },
              {
                "level": "advanced",
                "title": "Prompt Basics",
                "content": "prompt() allows you to collect text input from the user via a popup window. Note: the data returned is always a string!"
              }
            ],
            "codeTemplate": {
              "html": "<button id='greet-btn'>Say Hello</button>",
              "css": "",
              "js": "document.getElementById('greet-btn').onclick = () => {\n  const name = prompt('What is your name?');\n  if (name) {\n    alert(`Hello, ${name}! Welcome to JS.`);\n  }\n};"
            },
            "assessment": "Use prompt to ask for two numbers and alert their sum."
          },
          {
            "id": "w2-d1-t7",
            "title": "7. Mini Task – Simple Calculator Logic",
            "customComponent": "CalculatorTaskViz",
            "progression": [
              {
                "level": "easy",
                "title": "The Logic Plan",
                "content": "We need to take two numbers and an operator, then perform the correct math based on that operator."
              },
              {
                "level": "intermediate",
                "title": "Building the Engine",
                "content": "Using an if-else chain or switch statement to handle +, -, *, and / cases."
              },
              {
                "level": "advanced",
                "title": "Handling Errors",
                "content": "What happens if a user tries to divide by zero? A good developer anticipates and handles these edge cases."
              }
            ],
            "codeTemplate": {
              "html": "<div class='mini-calc'>\n  <input type='number' id='n1'>\n  <select id='op'>\n    <option value='+'>+</option>\n    <option value='-'>-</option>\n    <option value='*'>*</option>\n    <option value='/'>/</option>\n  </select>\n  <input type='number' id='n2'>\n  <button id='calc-btn'>=</button>\n  <span id='res'></span>\n</div>",
              "css": ".mini-calc { display: flex; gap: 10px; align-items: center; }",
              "js": "document.getElementById('calc-btn').onclick = () => {\n  const n1 = parseFloat(document.getElementById('n1').value);\n  const n2 = parseFloat(document.getElementById('n2').value);\n  const op = document.getElementById('op').value;\n  const res = document.getElementById('res');\n  \n  let result;\n  switch(op) {\n    case '+': result = n1 + n2; break;\n    case '-': result = n1 - n2; break;\n    case '*': result = n1 * n2; break;\n    case '/': result = n2 !== 0 ? n1 / n2 : 'Error'; break;\n  }\n  res.innerText = result;\n};"
            },
            "assessment": "Build a calculator that also handles exponents (**)."
          },
          {
            "id": "w2-d1-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d2",
        "dayTitle": "Day 2: Functions, Scope & Arrays",
        "topics": [
          {
            "id": "w2-d2-t1",
            "title": "1. Functions in JavaScript",
            "visualization": "/js-functions.png",
            "progression": [
              {
                "level": "easy",
                "title": "Reusable Logic",
                "content": "Functions are blocks of code designed to perform a particular task. They help you write code once and use it many times."
              },
              {
                "level": "intermediate",
                "title": "Parameters & Arguments",
                "content": "Parameters are placeholders in the function definition. Arguments are the actual values passed to the function when it's called."
              },
              {
                "level": "advanced",
                "title": "The Return Statement",
                "content": "The 'return' statement stops the function and sends a value back to the caller. Without it, functions return 'undefined' by default."
              }
            ],
            "codeTemplate": {
              "html": "<div id='func-out'>Result: </div>",
              "css": "",
              "js": "function add(a, b) {\n  return a + b;\n}\n\nconst sum = add(10, 20);\ndocument.getElementById('func-out').innerText = `Sum: ${sum}`;"
            },
            "assessment": "Write a function called 'greet' that takes a name and returns 'Hello [name]!'."
          },
          {
            "id": "w2-d2-t2",
            "title": "2. Function Expressions & Arrow Functions",
            "visualization": "/js-arrow.png",
            "progression": [
              {
                "level": "easy",
                "title": "Function Expressions",
                "content": "A function can also be stored in a variable. This is called a function expression. They are not hoisted like declarations!"
              },
              {
                "level": "intermediate",
                "title": "The Arrow Syntax",
                "content": "ES6 introduced arrow functions (=>). They are shorter and handled differently with 'this' context."
              },
              {
                "level": "advanced",
                "title": "Implicit Returns",
                "content": "If an arrow function has only one line, you can omit the curly braces and the 'return' keyword for an implicit return."
              }
            ],
            "codeTemplate": {
              "html": "<div id='arrow-out'>Squared: </div>",
              "css": "",
              "js": "const square = n => n * n;\n\ndocument.getElementById('arrow-out').innerText += square(5);"
            },
            "assessment": "Convert a standard function declaration into a one-line arrow function."
          },
          {
            "id": "w2-d2-t3",
            "title": "3. Scope & Hoisting",
            "customComponent": "ScopeHoistingViz",
            "progression": [
              {
                "level": "easy",
                "title": "Global vs Local Scope",
                "content": "Variables declared outside a function are Global. Variables declared inside are Local (only accessible within that function)."
              },
              {
                "level": "intermediate",
                "title": "Block Scope",
                "content": "'let' and 'const' provide block scope (inside {}). 'var' does not, which can lead to unexpected behavior in loops."
              },
              {
                "level": "advanced",
                "title": "Understanding Hoisting",
                "content": "JS moves declarations to the top of their scope. Standard functions are fully hoisted, but 'let' and 'const' variables are not accessible until their line is reached."
              }
            ],
            "codeTemplate": {
              "html": "<p>Check the console to see scope errors!</p>",
              "css": "",
              "js": "if (true) {\n  var globalish = 'I am var';\n  let localOnly = 'I am let';\n}\nconsole.log(globalish); // Works\nconsole.log(localOnly);  // Error!"
            },
            "assessment": "Explain why using 'let' is generally safer than using 'var' for loop counters."
          },
          {
            "id": "w2-d2-t4",
            "title": "4. Arrays in JavaScript",
            "customComponent": "ArrayMethodsViz",
            "progression": [
              {
                "level": "easy",
                "title": "Collections of Data",
                "content": "An array is an ordered list of values. You can store strings, numbers, or even other arrays inside one."
              },
              {
                "level": "intermediate",
                "title": "Zero-Based Indexing",
                "content": "The first item in an array is at index 0. To get the third item, you use array[2]."
              },
              {
                "level": "advanced",
                "title": "The Length Property",
                "content": "array.length always tells you how many items are in the array. It's automatically updated when you add or remove items."
              }
            ],
            "codeTemplate": {
              "html": "<div id='array-out'>First Fruit: </div>",
              "css": "",
              "js": "const fruits = ['Apple', 'Banana', 'Cherry'];\ndocument.getElementById('array-out').innerText += fruits[0];\nconsole.log(fruits.length); // 3"
            },
            "assessment": "Create an array of your top 3 favorite colors and print the second one."
          },
          {
            "id": "w2-d2-t5",
            "title": "5. Array Methods",
            "visualization": "/js-array-methods.png",
            "progression": [
              {
                "level": "easy",
                "title": "Adding & Removing",
                "content": "push() adds to the end, pop() removes from the end. unshift() and shift() do the same for the beginning."
              },
              {
                "level": "intermediate",
                "title": "Map & Filter",
                "content": "map() creates a NEW array by transforming every item. filter() creates a NEW array with only items that match a condition."
              },
              {
                "level": "advanced",
                "title": "forEach vs Map",
                "content": "forEach() is for looping/performing actions. map() is for transforming data. Choosing the right one makes your code cleaner."
              }
            ],
            "codeTemplate": {
              "html": "<ul id='fruit-list'></ul>",
              "css": "",
              "js": "const fruits = ['apple', 'banana', 'orange'];\nconst upperFruits = fruits.map(f => f.toUpperCase());\n\nconst list = document.getElementById('fruit-list');\nupperFruits.forEach(f => {\n  const li = document.createElement('li');\n  li.innerText = f;\n  list.appendChild(li);\n});"
            },
            "assessment": "Take an array of numbers and use filter to get only numbers greater than 10."
          },
          {
            "id": "w2-d2-t6",
            "title": "6. Objects in JavaScript",
            "visualization": "/js-objects.png",
            "progression": [
              {
                "level": "easy",
                "title": "Key-Value Pairs",
                "content": "Objects store data as properties (keys) and values. They are perfect for representing real-world things like a User or a Product."
              },
              {
                "level": "intermediate",
                "title": "Dot vs Bracket Notation",
                "content": "Use dot notation (user.name) for simple access. Use brackets (user['name']) if the property name is stored in a variable."
              },
              {
                "level": "advanced",
                "title": "Methods & 'this'",
                "content": "Functions stored inside objects are called Methods. They often use the 'this' keyword to refer to the object itself."
              }
            ],
            "codeTemplate": {
              "html": "<div id='obj-out'></div>",
              "css": "",
              "js": "const user = {\n  name: 'Alex',\n  role: 'Admin',\n  greet: function() {\n    return `Welcome, ${this.name}!`;\n  }\n};\n\ndocument.getElementById('obj-out').innerText = user.greet();"
            },
            "assessment": "Create a 'car' object with properties like make, model, and a method that returns a full description."
          },
          {
            "id": "w2-d2-t7",
            "title": "7. Mini Task – Student Data Manager",
            "visualization": "/js-manager.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Data Structure",
                "content": "Create an array of 'Student' objects, each with a name, grade, and attendance status."
              },
              {
                "level": "intermediate",
                "title": "Filtering Results",
                "content": "Write a function that filters students who have a grade above 80."
              },
              {
                "level": "advanced",
                "title": "Dynamic Updates",
                "content": "Add a method to your manager that allows you to add a new student or update an existing one's grade."
              }
            ],
            "codeTemplate": {
              "html": "<div id='manager-out'></div>\n<button id='pass-btn'>Show Passing Students</button>",
              "css": "",
              "js": "const students = [\n  { name: 'John', grade: 75 },\n  { name: 'Sarah', grade: 90 },\n  { name: 'Alex', grade: 85 }\n];\n\nconst display = (arr) => {\n  document.getElementById('manager-out').innerHTML = \n    arr.map(s => `<p>${s.name}: ${s.grade}</p>`).join('');\n};\n\ndisplay(students);\n\ndocument.getElementById('pass-btn').onclick = () => {\n  const passing = students.filter(s => s.grade > 80);\n  display(passing);\n};"
            },
            "assessment": "Extend the manager to calculate the average grade of all students."
          },
          {
            "id": "w2-d2-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d3",
        "dayTitle": "Day 3: DOM & Interactivity",
        "topics": [
          {
            "id": "w2-d3-t1",
            "title": "1. DOM Introduction",
            "customComponent": "DOMTreeViz",
            "progression": [
              {
                "level": "easy",
                "title": "The Document Object Model",
                "content": "The DOM is a programming interface for web documents. It represents the page as a 'tree' of objects that JavaScript can manipulate."
              },
              {
                "level": "intermediate",
                "title": "JS Meets HTML",
                "content": "When a web page is loaded, the browser creates a DOM. JavaScript uses this tree to change text, colors, and structure dynamically."
              },
              {
                "level": "advanced",
                "title": "The window and document Objects",
                "content": "'window' represents the browser window. 'document' is the root of the page structure. Together, they allow you to control everything from URL info to button clicks."
              }
            ],
            "codeTemplate": {
              "html": "<h1>Inspect the DOM!</h1>\n<p>Everything you see is a node in the DOM tree.</p>",
              "css": "",
              "js": "console.log(document); // The entire HTML document\nconsole.log(document.body); // Just the body element"
            },
            "assessment": "Describe how the browser represents an HTML <div> as a DOM node."
          },
          {
            "id": "w2-d3-t2",
            "title": "2. DOM Selectors",
            "visualization": "/js-dom-selectors.png",
            "progression": [
              {
                "level": "easy",
                "title": "Selecting by ID",
                "content": "getElementById() is the fastest way to target a single, unique element. Just pass the ID string (without the #)!"
              },
              {
                "level": "intermediate",
                "title": "The Modern querySelector",
                "content": "querySelector() uses CSS syntax. You can target IDs (#myId), Classes (.myClass), or even complex combinations like 'div > p'."
              },
              {
                "level": "advanced",
                "title": "Selecting Multiple Elements",
                "content": "querySelectorAll() returns a NodeList of ALL matching elements. You can loop through them using .forEach() to apply changes to many items at once."
              }
            ],
            "codeTemplate": {
              "html": "<div id='target'>Target Me</div>\n<p class='text'>Paragraph 1</p>\n<p class='text'>Paragraph 2</p>",
              "css": ".highlight { color: var(--primary-cyan); font-weight: bold; }",
              "js": "const single = document.getElementById('target');\nsingle.innerText = 'Found You!';\n\nconst allPara = document.querySelectorAll('.text');\nallPara.forEach(p => p.classList.add('highlight'));"
            },
            "assessment": "Write a selector that targets a button inside a div with the class 'container'."
          },
          {
            "id": "w2-d3-t3",
            "title": "3. Modifying Elements",
            "visualization": "/js-modify.png",
            "progression": [
              {
                "level": "easy",
                "title": "Changing Content",
                "content": "Use .innerText for text content and .innerHTML if you need to add HTML tags inside an element."
              },
              {
                "level": "intermediate",
                "title": "Styling via JS",
                "content": "You can change CSS directly using .style (e.g., el.style.color = 'red'). However, it's often better to toggle classes using .classList."
              },
              {
                "level": "advanced",
                "title": "Attributes & Values",
                "content": "Use setAttribute() and getAttribute() to change things like image sources (src), link destinations (href), or input values."
              }
            ],
            "codeTemplate": {
              "html": "<div id='box'>Change My Style</div>\n<button id='toggle-btn'>Toggle Glow</button>",
              "css": ".glow { box-shadow: var(--glow); border-color: var(--primary-cyan); }\n#box { padding: 20px; border: 1px solid #ccc; transition: all 0.3s; }",
              "js": "const box = document.getElementById('box');\nconst btn = document.getElementById('toggle-btn');\n\nbtn.onclick = () => {\n  box.classList.toggle('glow');\n  box.innerText = box.classList.contains('glow') ? 'GLOWING' : 'OFF';\n};"
            },
            "assessment": "Create a script that changes an image source when a button is clicked."
          },
          {
            "id": "w2-d3-t4",
            "title": "4. Event Handling",
            "visualization": "/js-events.png",
            "progression": [
              {
                "level": "easy",
                "title": "What are Events?",
                "content": "Events are 'signals' that something has happened (click, scroll, key press). JS listens for these signals to run code."
              },
              {
                "level": "intermediate",
                "title": "addEventListener",
                "content": "This is the professional way to handle events. It allows you to add multiple listeners to one element without overwriting existing ones."
              },
              {
                "level": "advanced",
                "title": "The Event Object",
                "content": "When an event triggers, JS passes an 'event' object to your function. It contains useful info like which key was pressed or the mouse coordinates."
              }
            ],
            "codeTemplate": {
              "html": "<button id='evt-btn'>Click Me</button>\n<p id='coords'>Coords: 0, 0</p>",
              "css": "",
              "js": "const btn = document.getElementById('evt-btn');\n\nbtn.addEventListener('click', (e) => {\n  alert('Button clicked!');\n  console.log(e); // Inspect this in the console!\n});\n\nwindow.addEventListener('mousemove', (e) => {\n  document.getElementById('coords').innerText = `Coords: ${e.clientX}, ${e.clientY}`;\n});"
            },
            "assessment": "Add a 'keyup' listener to an input field and print the value to the console."
          },
          {
            "id": "w2-d3-t5",
            "title": "5. Form Handling with JavaScript",
            "visualization": "/js-form-handle.png",
            "progression": [
              {
                "level": "easy",
                "title": "Preventing Default Behavior",
                "content": "Forms naturally refresh the page when submitted. In modern apps, we use e.preventDefault() to stop this so we can handle the data with JS."
              },
              {
                "level": "intermediate",
                "title": "Capturing Input Values",
                "content": "Target input elements and use their .value property to get what the user typed."
              },
              {
                "level": "advanced",
                "title": "Real-time Validation",
                "content": "Use 'input' or 'change' events to check data while the user is typing, providing instant feedback (like showing a red border for invalid emails)."
              }
            ],
            "codeTemplate": {
              "html": "<form id='login-form'>\n  <input type='text' id='user' placeholder='Username' required>\n  <button type='submit'>Login</button>\n</form>\n<p id='feedback'></p>",
              "css": ".error { color: #f87171; }",
              "js": "const form = document.getElementById('login-form');\nconst feedback = document.getElementById('feedback');\n\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n  const username = document.getElementById('user').value;\n  \n  if (username.length < 3) {\n    feedback.innerText = 'Username too short!';\n    feedback.className = 'error';\n  } else {\n    feedback.innerText = `Welcome, ${username}!`;\n    feedback.className = '';\n  }\n});"
            },
            "assessment": "Build a form that takes two passwords and alerts the user if they don't match."
          },
          {
            "id": "w2-d3-t6",
            "title": "6. Dynamic Content Rendering",
            "visualization": "/js-dynamic.png",
            "progression": [
              {
                "level": "easy",
                "title": "Creating Elements",
                "content": "document.createElement() creates a new HTML tag in memory. It's not on the page until you append it!"
              },
              {
                "level": "intermediate",
                "title": "Appending & Removing",
                "content": "Use .appendChild() to add a child to a parent. Use .remove() to delete an element from the page."
              },
              {
                "level": "advanced",
                "title": "Efficient Lists",
                "content": "Instead of adding items one by one, you can build a long string of HTML and set it as innerHTML once, or use 'fragments' for better performance."
              }
            ],
            "codeTemplate": {
              "html": "<button id='add-btn'>Add Item</button>\n<ul id='dynamic-list'></ul>",
              "css": "li { padding: 8px; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; }",
              "js": "const btn = document.getElementById('add-btn');\nconst list = document.getElementById('dynamic-list');\n\nbtn.onclick = () => {\n  const li = document.createElement('li');\n  li.innerHTML = `New Item ${list.children.length + 1} <button class='del-btn'>X</button>`;\n  \n  li.querySelector('.del-btn').onclick = () => li.remove();\n  \n  list.appendChild(li);\n};"
            },
            "assessment": "Write a script that generates a 3x3 grid of colored squares dynamically."
          },
          {
            "id": "w2-d3-t7",
            "title": "7. Mini Project – Interactive To-Do List",
            "visualization": "/js-todo.png",
            "progression": [
              {
                "level": "easy",
                "title": "Adding Tasks",
                "content": "Capture the input value and create a new list item when the user clicks 'Add'."
              },
              {
                "level": "intermediate",
                "title": "Task Actions",
                "content": "Add buttons to every task to mark them as 'Complete' (striking through text) or 'Delete' (removing the node)."
              },
              {
                "level": "advanced",
                "title": "Persistence & UX",
                "content": "Clear the input field after adding, and prevent adding empty tasks. (Bonus: Try to save them to LocalStorage so they stay after refresh!)"
              }
            ],
            "codeTemplate": {
              "html": "<div class='todo-app'>\n  <input type='text' id='todo-in' placeholder='What needs to be done?'>\n  <button id='add-todo'>Add</button>\n  <ul id='todo-list'></ul>\n</div>",
              "css": ".done { text-decoration: line-through; opacity: 0.5; }",
              "js": "const input = document.getElementById('todo-in');\nconst addBtn = document.getElementById('add-todo');\nconst list = document.getElementById('todo-list');\n\naddBtn.onclick = () => {\n  if (!input.value) return;\n  \n  const li = document.createElement('li');\n  li.innerHTML = `\n    <span>${input.value}</span>\n    <button class='done-btn'>✓</button>\n    <button class='del-btn'>✕</button>\n  `;\n  \n  li.querySelector('.done-btn').onclick = () => li.classList.toggle('done');\n  li.querySelector('.del-btn').onclick = () => li.remove();\n  \n  list.appendChild(li);\n  input.value = '';\n};"
            },
            "assessment": "Final Challenge: Build the To-Do app and add a 'Clear All' button."
          },
          {
            "id": "w2-d3-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d4",
        "dayTitle": "Day 4: Advanced JS & Async",
        "topics": [
          {
            "id": "w2-d4-t1",
            "title": "1. Advanced JavaScript Concepts",
            "customComponent": "JSRuntimeViz",
            "progression": [
              {
                "level": "easy",
                "title": "Execution Context",
                "content": "Everything in JS happens inside an 'Execution Context'. It's like a box where all your code is evaluated and executed."
              },
              {
                "level": "intermediate",
                "title": "The Call Stack",
                "content": "The Call Stack is a mechanism JS uses to keep track of its place in a script that calls multiple functions. It's 'Last In, First Out' (LIFO)."
              },
              {
                "level": "advanced",
                "title": "Memory Heap",
                "content": "Variables and objects are stored in the Memory Heap. Understanding how memory is allocated and cleaned up (Garbage Collection) helps prevent performance leaks."
              }
            ],
            "codeTemplate": {
              "html": "<p>Check the console for the stack trace!</p>",
              "css": "",
              "js": "function first() {\n  console.log('Inside first');\n  second();\n}\nfunction second() {\n  console.log('Inside second');\n  console.trace(); // Shows the current call stack\n}\nfirst();"
            },
            "assessment": "Describe what happens to the Call Stack when a function returns."
          },
          {
            "id": "w2-d4-t2",
            "title": "2. Closures in JavaScript",
            "visualization": "/js-closures.png",
            "progression": [
              {
                "level": "easy",
                "title": "Functions with Memory",
                "content": "A closure is the combination of a function and the lexical environment within which that function was declared."
              },
              {
                "level": "intermediate",
                "title": "Retaining Access",
                "content": "Closures allow a function to access variables from an enclosing scope even after the outer function has finished executing."
              },
              {
                "level": "advanced",
                "title": "Private Variables",
                "content": "Closures are often used to create 'private' variables that cannot be accessed or modified from outside the function, providing data security."
              }
            ],
            "codeTemplate": {
              "html": "<button id='counter-btn'>Click to Count</button>\n<p id='count-out'>0</p>",
              "css": "",
              "js": "function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\ndocument.getElementById('counter-btn').onclick = () => {\n  document.getElementById('count-out').innerText = counter();\n};"
            },
            "assessment": "Explain why the 'count' variable in the example above is not accessible globally."
          },
          {
            "id": "w2-d4-t3",
            "title": "3. Callbacks & Higher-Order Functions",
            "visualization": "/js-higher-order.png",
            "progression": [
              {
                "level": "easy",
                "title": "Higher-Order Functions",
                "content": "A function that takes another function as an argument or returns a function is called a Higher-Order Function."
              },
              {
                "level": "intermediate",
                "title": "Callback Functions",
                "content": "A callback is a function passed into another function as an argument, which is then invoked inside the outer function to complete some action."
              },
              {
                "level": "advanced",
                "title": "Dynamic Logic",
                "content": "Callbacks allow you to write highly reusable code where the specific behavior can be decided at the moment the function is called."
              }
            ],
            "codeTemplate": {
              "html": "<div id='ho-out'></div>",
              "css": "",
              "js": "function process(n, callback) {\n  return callback(n);\n}\n\nconst double = x => x * 2;\nconst triple = x => x * 3;\n\ndocument.getElementById('ho-out').innerHTML = `\n  Double 5: ${process(5, double)} <br>\n  Triple 5: ${process(5, triple)}\n`;"
            },
            "assessment": "Write a higher-order function that takes a number and a function, then applies that function twice."
          },
          {
            "id": "w2-d4-t4",
            "title": "4. Asynchronous JavaScript",
            "visualization": "/js-async.png",
            "progression": [
              {
                "level": "easy",
                "title": "Blocking vs Non-blocking",
                "content": "Synchronous code runs line-by-line, blocking the next line until the current one finishes. Asynchronous code allows tasks to run in the background."
              },
              {
                "level": "intermediate",
                "title": "The Event Loop",
                "content": "The Event Loop manages the execution of multiple scripts. It continuously checks the Call Stack and the Callback Queue to keep the app responsive."
              },
              {
                "level": "advanced",
                "title": "Why Async Matters",
                "content": "Without async, your website would 'freeze' every time it fetches data or waits for a timer, leading to a terrible user experience."
              }
            ],
            "codeTemplate": {
              "html": "<p>Check the timing in the console!</p>",
              "css": "",
              "js": "console.log('1. Start');\nsetTimeout(() => {\n  console.log('2. Async Task (after 1s)');\n}, 1000);\nconsole.log('3. End');"
            },
            "assessment": "Predict the order of logs in the example above and explain why."
          },
          {
            "id": "w2-d4-t5",
            "title": "5. Promises",
            "customComponent": "PromiseFlowViz",
            "progression": [
              {
                "level": "easy",
                "title": "A Future Value",
                "content": "A Promise is an object representing the eventual completion (or failure) of an asynchronous operation and its resulting value."
              },
              {
                "level": "intermediate",
                "title": "Promise States",
                "content": "A promise is either Pending (starting), Fulfilled (success), or Rejected (error). You handle these using .then() and .catch()."
              },
              {
                "level": "advanced",
                "title": "Chaining Promises",
                "content": "You can chain multiple .then() calls to perform sequential async tasks, avoiding the 'Callback Hell' of nested functions."
              }
            ],
            "codeTemplate": {
              "html": "<p id='promise-status'>Waiting for promise...</p>",
              "css": "",
              "js": "const myPromise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve('Promise Resolved! ✅'), 2000);\n});\n\nmyPromise\n  .then(val => document.getElementById('promise-status').innerText = val)\n  .catch(err => console.error(err));"
            },
            "assessment": "Create a promise that rejects after 1 second and handle the error using .catch()."
          },
          {
            "id": "w2-d4-t6",
            "title": "6. Async/Await",
            "visualization": "/js-async-await.png",
            "progression": [
              {
                "level": "easy",
                "title": "Cleaner Async Code",
                "content": "Async/Await is 'syntactic sugar' for Promises. It makes asynchronous code look and behave like synchronous code."
              },
              {
                "level": "intermediate",
                "title": "The 'await' Keyword",
                "content": "The 'await' keyword can only be used inside 'async' functions. It pauses the function execution until the promise is settled."
              },
              {
                "level": "advanced",
                "title": "Error Handling (Try/Catch)",
                "content": "When using async/await, we use standard try/catch blocks to handle errors, making the code much more readable than .catch() chains."
              }
            ],
            "codeTemplate": {
              "html": "<p id='async-out'>Loading...</p>",
              "css": "",
              "js": "async function getData() {\n  try {\n    const response = await new Promise(res => setTimeout(() => res('Data Found!'), 1500));\n    document.getElementById('async-out').innerText = response;\n  } catch (error) {\n    document.getElementById('async-out').innerText = 'Error!';\n  }\n}\ngetData();"
            },
            "assessment": "Convert a .then() chain into an async/await function."
          },
          {
            "id": "w2-d4-t7",
            "title": "7. Mini Project – API Data Fetcher",
            "visualization": "/js-api.png",
            "progression": [
              {
                "level": "easy",
                "title": "Introduction to Fetch",
                "content": "The Fetch API provides an easy, logical way to fetch resources asynchronously across the network."
              },
              {
                "level": "intermediate",
                "title": "JSON Parsing",
                "content": "API responses are usually in JSON format. We use .json() to convert them into JavaScript objects we can use."
              },
              {
                "level": "advanced",
                "title": "Live Rendering",
                "content": "Combine fetch with DOM manipulation to build a dynamic UI that displays live data from an external server (like user lists or weather info)."
              }
            ],
            "codeTemplate": {
              "html": "<div class='api-app'>\n  <button id='fetch-users'>Fetch Random User</button>\n  <div id='user-display' style='margin-top: 20px;'></div>\n</div>",
              "css": ".user-card { padding: 15px; background: var(--app-card-bg); border-radius: 12px; border: 1px solid var(--app-border); }",
              "js": "const btn = document.getElementById('fetch-users');\nconst display = document.getElementById('user-display');\n\nbtn.onclick = async () => {\n  display.innerText = 'Fetching...';\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/users/1');\n    const user = await res.json();\n    display.innerHTML = `\n      <div class='user-card'>\n        <h3>${user.name}</h3>\n        <p>Email: ${user.email}</p>\n        <p>City: ${user.address.city}</p>\n      </div>\n    `;\n  } catch (err) {\n    display.innerText = 'Failed to load user.';\n  }\n};"
            },
            "assessment": "Final Challenge: Modify the fetcher to display the user's company name and phone number."
          },
          {
            "id": "w2-d4-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d5",
        "dayTitle": "Day 5: ES6+ & Storage",
        "topics": [
          {
            "id": "w2-d5-t1",
            "title": "1. ES6+ Features Overview",
            "visualization": "/js-es6.png",
            "progression": [
              {
                "level": "easy",
                "title": "Modern JavaScript",
                "content": "ES6 (ECMAScript 2015) was a major update that introduced many features we use today in React, like arrow functions, classes, and better variable scoping."
              },
              {
                "level": "intermediate",
                "title": "Syntactic Sugar",
                "content": "Most ES6 features are 'syntactic sugar' - they don't change what JS can do, but they make the code much cleaner and easier to read/write."
              },
              {
                "level": "advanced",
                "title": "The Evolution of JS",
                "content": "Since ES6, new features are added every year (ES7, ES8, etc.), including async/await, optional chaining, and nullish coalescing, keeping JS modern and powerful."
              }
            ],
            "codeTemplate": {
              "html": "<p>Check the console for modern JS output!</p>",
              "css": "",
              "js": "// Modern features in action\nconst greet = (name = 'Guest') => `Hello, ${name}!`;\nconsole.log(greet('Developer'));"
            },
            "assessment": "List three ES6 features that improved JavaScript development."
          },
          {
            "id": "w2-d5-t2",
            "title": "2. Destructuring",
            "visualization": "/js-destructuring.png",
            "progression": [
              {
                "level": "easy",
                "title": "Extracting Data",
                "content": "Destructuring allows you to unpack values from arrays or properties from objects into distinct variables in a single line."
              },
              {
                "level": "intermediate",
                "title": "Object Destructuring",
                "content": "Instead of writing user.name and user.age multiple times, you can write { name, age } = user to get direct access to those properties."
              },
              {
                "level": "advanced",
                "title": "Renaming & Defaults",
                "content": "You can rename variables during destructuring ({ name: userName }) and set default values in case a property is missing ({ role = 'user' })."
              }
            ],
            "codeTemplate": {
              "html": "<div id='destruct-out'></div>",
              "css": "",
              "js": "const user = { name: 'Alex', age: 28, city: 'London' };\nconst { name, city } = user;\n\nconst colors = ['Red', 'Green', 'Blue'];\nconst [primary] = colors;\n\ndocument.getElementById('destruct-out').innerHTML = `\n  User: ${name} from ${city} <br>\n  First Color: ${primary}\n`;"
            },
            "assessment": "Destructure a nested object containing a user's address (street, zip) into variables."
          },
          {
            "id": "w2-d5-t3",
            "title": "3. Spread & Rest Operators",
            "visualization": "/js-spread.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Three Dots (...)",
                "content": "The triple dot operator (...) can be used as either Spread (expanding values) or Rest (collecting values) depending on the context."
              },
              {
                "level": "intermediate",
                "title": "Spread for Copying",
                "content": "Spread allows you to quickly copy an array or merge two objects without affecting the original ones. This is crucial for state management in React."
              },
              {
                "level": "advanced",
                "title": "Rest for Arguments",
                "content": "Rest parameters allow a function to accept an indefinite number of arguments as an array, making your functions highly flexible."
              }
            ],
            "codeTemplate": {
              "html": "<p>Check the console for merged data!</p>",
              "css": "",
              "js": "const arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4]; // Spread\n\nfunction sum(...numbers) { // Rest\n  return numbers.reduce((acc, n) => acc + n, 0);\n}\n\nconsole.log(arr2);\nconsole.log(sum(10, 20, 30));"
            },
            "assessment": "Merge two objects 'profile' and 'settings' using the spread operator."
          },
          {
            "id": "w2-d5-t4",
            "title": "4. Template Literals",
            "visualization": "/js-templates.png",
            "progression": [
              {
                "level": "easy",
                "title": "Backticks & Variables",
                "content": "Template literals use backticks (`) instead of quotes. They allow you to embed variables directly using the ${variable} syntax."
              },
              {
                "level": "intermediate",
                "title": "Multiline Strings",
                "content": "Before ES6, multiline strings were messy. With template literals, you just press Enter, and the line breaks are preserved automatically."
              },
              {
                "level": "advanced",
                "title": "Expression Interpolation",
                "content": "You can perform any JS expression inside the ${}, like math operations or function calls, making string building extremely dynamic."
              }
            ],
            "codeTemplate": {
              "html": "<div id='tpl-out'></div>",
              "css": "",
              "js": "const item = 'Keyboard';\nconst price = 50;\nconst qty = 2;\n\nconst message = `\n  <div style='border: 1px solid var(--primary-cyan); padding: 10px;'>\n    <h3>Receipt</h3>\n    <p>Product: ${item}</p>\n    <p>Total: $${price * qty}</p>\n  </div>\n`;\n\ndocument.getElementById('tpl-out').innerHTML = message;"
            },
            "assessment": "Create a multiline string that displays a user's full profile info using template literals."
          },
          {
            "id": "w2-d5-t5",
            "title": "5. Modules in JavaScript",
            "visualization": "/js-modules.png",
            "progression": [
              {
                "level": "easy",
                "title": "Modular Code",
                "content": "Modules allow you to break your code into separate files. This makes large projects manageable, organized, and searchable."
              },
              {
                "level": "intermediate",
                "title": "Export & Import",
                "content": "Use 'export' to make functions or variables available to other files, and 'import' to bring them into your current file."
              },
              {
                "level": "advanced",
                "title": "Default vs Named Exports",
                "content": "Named exports allow multiple items per file. Default exports are for the main item in a file. Knowing when to use each is key to clean architecture."
              }
            ],
            "codeTemplate": {
              "html": "<p>Note: Modules usually require a server environment to work in browsers!</p>",
              "css": "",
              "js": "// Example syntax (conceptual):\n// utils.js: export const add = (a, b) => a + b;\n// app.js:   import { add } from './utils.js';"
            },
            "assessment": "Explain the difference between 'import { x }' and 'import x'."
          },
          {
            "id": "w2-d5-t6",
            "title": "6. Local Storage & Session Storage",
            "customComponent": "StorageManagerViz",
            "progression": [
              {
                "level": "easy",
                "title": "Browser Persistence",
                "content": "Local Storage allows you to save small amounts of data in the browser that stay even after you close the tab or restart the computer."
              },
              {
                "level": "intermediate",
                "title": "Key-Value Pairs",
                "content": "Data is stored as strings. Use setItem('key', 'value') to save and getItem('key') to retrieve. Everything must be a string!"
              },
              {
                "level": "advanced",
                "title": "JSON Storage",
                "content": "To store objects or arrays, you must use JSON.stringify() before saving and JSON.parse() after retrieving to get your objects back."
              }
            ],
            "codeTemplate": {
              "html": "<input type='text' id='save-in' placeholder='Type something'>\n<button id='save-btn'>Save</button>\n<button id='load-btn'>Load</button>\n<p id='storage-out'></p>",
              "css": "",
              "js": "const btn = document.getElementById('save-btn');\nconst load = document.getElementById('load-btn');\nconst output = document.getElementById('storage-out');\n\nbtn.onclick = () => {\n  const val = document.getElementById('save-in').value;\n  localStorage.setItem('myNote', val);\n  alert('Saved!');\n};\n\nload.onclick = () => {\n  output.innerText = 'Loaded: ' + localStorage.getItem('myNote');\n};"
            },
            "assessment": "Write a script that saves a 'theme' preference (dark/light) to local storage."
          },
          {
            "id": "w2-d5-t7",
            "title": "7. Mini Project – Notes App",
            "visualization": "/js-notes.png",
            "progression": [
              {
                "level": "easy",
                "title": "The App Logic",
                "content": "Create a simple UI with a textarea and a 'Save Note' button. Display the saved notes in a list below."
              },
              {
                "level": "intermediate",
                "title": "Persistent Memory",
                "content": "Every time a note is added, update an array in Local Storage so the user doesn't lose their data on refresh."
              },
              {
                "level": "advanced",
                "title": "CRUD Implementation",
                "content": "Complete the app by adding 'Delete' functionality. Each note should have its own unique ID for targeted removal."
              }
            ],
            "codeTemplate": {
              "html": "<div class='notes-app'>\n  <textarea id='note-text' placeholder='New note...'></textarea>\n  <button id='add-note'>Add Note</button>\n  <div id='notes-list' style='margin-top: 20px;'></div>\n</div>",
              "css": ".note-item { padding: 10px; background: var(--app-card-bg); margin-bottom: 10px; border-radius: 8px; border: 1px solid var(--app-border); display: flex; justify-content: space-between; }",
              "js": "const input = document.getElementById('note-text');\nconst addBtn = document.getElementById('add-note');\nconst list = document.getElementById('notes-list');\n\nlet notes = JSON.parse(localStorage.getItem('notes')) || [];\n\nconst render = () => {\n  list.innerHTML = notes.map((n, i) => `\n    <div class='note-item'>\n      <span>${n}</span>\n      <button onclick='deleteNote(${i})'>X</button>\n    </div>\n  `).join('');\n};\n\nwindow.deleteNote = (i) => {\n  notes.splice(i, 1);\n  localStorage.setItem('notes', JSON.stringify(notes));\n  render();\n};\n\naddBtn.onclick = () => {\n  if (!input.value) return;\n  notes.push(input.value);\n  localStorage.setItem('notes', JSON.stringify(notes));\n  input.value = '';\n  render();\n};\n\nrender();"
            },
            "assessment": "Final Challenge: Add a timestamp to every note saved in the app."
          },
          {
            "id": "w2-d5-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d6",
        "dayTitle": "Day 6: Advanced JS & API Deep Dive",
        "topics": [
          {
            "id": "w2-d6-t1",
            "title": "1. JavaScript Error Handling",
            "visualization": "/js-error-handling.png",
            "progression": [
              {
                "level": "easy",
                "title": "Try / Catch",
                "content": "Errors are inevitable in programming. 'Try/Catch' allows you to attempt an action and gracefully handle any errors that occur without crashing the app."
              },
              {
                "level": "intermediate",
                "title": "Finally & Throw",
                "content": "The 'finally' block runs regardless of whether an error occurred. Use 'throw' to create custom errors when something specific goes wrong."
              },
              {
                "level": "advanced",
                "title": "Error Object Properties",
                "content": "When an error is caught, the error object contains useful properties like 'message' and 'stack', which help you pinpoint exactly where and why it failed."
              }
            ],
            "codeTemplate": {
              "html": "<div id='error-out'></div>",
              "css": ".error-msg { color: #f87171; padding: 10px; background: rgba(248, 113, 113, 0.1); border-radius: 8px; }",
              "js": "const output = document.getElementById('error-out');\n\ntry {\n  const x = 10 / y; // y is not defined\n} catch (err) {\n  output.innerHTML = `<div class='error-msg'>Caught: ${err.message}</div>`;\n} finally {\n  console.log('Cleanup or logging complete.');\n}"
            },
            "assessment": "Write a function that throws an error if a user's input is not a number."
          },
          {
            "id": "w2-d6-t2",
            "title": "2. Debugging Techniques",
            "visualization": "/js-debugging.png",
            "progression": [
              {
                "level": "easy",
                "title": "Console Debugging",
                "content": "Beyond console.log(), you can use console.table() for arrays of objects or console.error() for highlighting issues in the logs."
              },
              {
                "level": "intermediate",
                "title": "The debugger Keyword",
                "content": "Inserting the 'debugger' keyword in your code will automatically pause execution at that line if your browser dev tools are open."
              },
              {
                "level": "advanced",
                "title": "Breakpoints & Watch",
                "content": "Use the Sources tab in DevTools to set breakpoints, inspect variable values at specific moments, and step through code line by line."
              }
            ],
            "codeTemplate": {
              "html": "<button id='debug-btn'>Run Debug Logic</button>",
              "css": "",
              "js": "document.getElementById('debug-btn').onclick = () => {\n  let x = 10;\n  let y = 20;\n  // debugger; // Uncomment to pause in dev tools!\n  let sum = x + y;\n  console.log('Sum calculated:', sum);\n};"
            },
            "assessment": "Describe how to use a 'Watch' expression in the Chrome Debugger."
          },
          {
            "id": "w2-d6-t3",
            "title": "3. Array Advanced Methods",
            "visualization": "/js-array-advanced.png",
            "progression": [
              {
                "level": "easy",
                "title": "Some & Every",
                "content": "some() checks if AT LEAST ONE item matches a condition. every() checks if ALL items match the condition. Both return booleans."
              },
              {
                "level": "intermediate",
                "title": "Find & FindIndex",
                "content": "find() returns the first item that matches a condition. findIndex() returns the position of that item in the array."
              },
              {
                "level": "advanced",
                "title": "The Reduce Power",
                "content": "reduce() is the most powerful array method. It allows you to transform an entire array into a single value (like a sum, or a single object)."
              }
            ],
            "codeTemplate": {
              "html": "<div id='arr-adv-out'></div>",
              "css": "",
              "js": "const scores = [45, 80, 10, 95, 60];\n\nconst anyFail = scores.some(s => s < 20);\nconst total = scores.reduce((acc, s) => acc + s, 0);\n\ndocument.getElementById('arr-adv-out').innerHTML = `\n  Any failures? ${anyFail} <br>\n  Total Score: ${total}\n`;"
            },
            "assessment": "Take an array of objects and use reduce to calculate the total price of all items."
          },
          {
            "id": "w2-d6-t4",
            "title": "4. Object-Oriented JavaScript Basics",
            "visualization": "/js-oop.png",
            "progression": [
              {
                "level": "easy",
                "title": "Classes & Blueprints",
                "content": "A class is a blueprint for creating objects. It defines the structure (properties) and behavior (methods) that all instances will have."
              },
              {
                "level": "intermediate",
                "title": "The Constructor",
                "content": "The constructor() method is a special function that runs automatically when a new object is created from a class."
              },
              {
                "level": "advanced",
                "title": "Instantiation",
                "content": "Use the 'new' keyword to create a specific object instance from a class. Each instance can have its own data but shares the same methods."
              }
            ],
            "codeTemplate": {
              "html": "<div id='oop-out'></div>",
              "css": "",
              "js": "class Hero {\n  constructor(name, power) {\n    this.name = name;\n    this.power = power;\n  }\n  intro() {\n    return `I am ${this.name}, and I can ${this.power}!`;\n  }\n}\n\nconst h1 = new Hero('Flash', 'run fast');\ndocument.getElementById('oop-out').innerText = h1.intro();"
            },
            "assessment": "Create a 'User' class with properties for name and email, and a method that returns a greeting."
          },
          {
            "id": "w2-d6-t5",
            "title": "5. Introduction to APIs",
            "visualization": "/js-api-intro.png",
            "progression": [
              {
                "level": "easy",
                "title": "What is an API?",
                "content": "API stands for Application Programming Interface. It's a way for two software components to talk to each other over the web."
              },
              {
                "level": "intermediate",
                "title": "Request & Response",
                "content": "An API interaction involves a client (your app) sending a Request and a server sending back a Response (usually containing data like JSON)."
              },
              {
                "level": "advanced",
                "title": "REST Architecture",
                "content": "REST is the most common API architectural style. It uses standard HTTP methods (GET, POST, PUT, DELETE) to manage data resources."
              }
            ],
            "codeTemplate": {
              "html": "<h3>API Lifecycle Visualization</h3>\n<div class='api-flow'>Client ↔ Server</div>",
              "css": ".api-flow { padding: 20px; border: 2px solid var(--primary-cyan); border-radius: 12px; text-align: center; }",
              "js": "// Conceptual flow:\n// 1. GET /users (Request)\n// 2. HTTP 200 OK [{...}] (Response)"
            },
            "assessment": "Explain the difference between an API 'Endpoint' and a 'Payload'."
          },
          {
            "id": "w2-d6-t6",
            "title": "6. Fetch API Deep Dive",
            "visualization": "/js-fetch-deep.png",
            "progression": [
              {
                "level": "easy",
                "title": "POST Requests",
                "content": "While GET is for fetching, POST is for sending data to a server (like creating a new user or submitting a form)."
              },
              {
                "level": "intermediate",
                "title": "Handling Headers",
                "content": "Headers provide extra info about the request, such as 'Content-Type: application/json', which tells the server we are sending JSON data."
              },
              {
                "level": "advanced",
                "title": "Processing Responses",
                "content": "Always check response.ok before parsing data. This ensures you handle server errors (like 404 or 500) without breaking your app logic."
              }
            ],
            "codeTemplate": {
              "html": "<button id='post-btn'>Submit Test Data</button>\n<p id='post-res'></p>",
              "css": "",
              "js": "document.getElementById('post-btn').onclick = async () => {\n  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {\n    method: 'POST',\n    body: JSON.stringify({ title: 'Test Post', body: 'JS rules!' }),\n    headers: { 'Content-type': 'application/json' }\n  });\n  const data = await res.json();\n  document.getElementById('post-res').innerText = 'Server ID: ' + data.id;\n};"
            },
            "assessment": "Write a fetch request that sends a DELETE command to an API endpoint."
          },
          {
            "id": "w2-d6-t7",
            "title": "7. Mini Project – User Directory App",
            "visualization": "/js-directory.png",
            "progression": [
              {
                "level": "easy",
                "title": "Fetching the Data",
                "content": "Start by fetching a list of users from a public API (like JSONPlaceholder) and logging them to the console."
              },
              {
                "level": "intermediate",
                "title": "Dynamic Grid",
                "content": "Map through the users and generate a grid of cards, each showing a user's name, email, and company."
              },
              {
                "level": "advanced",
                "title": "Search & Filter",
                "content": "Add a search bar that filters the displayed user cards in real-time as the student types. This combines events, arrays, and DOM skills."
              }
            ],
            "codeTemplate": {
              "html": "<input type='text' id='search' placeholder='Filter by name...'>\n<div id='user-list' class='grid'></div>",
              "css": ".grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; }\n.user-card { padding: 10px; background: var(--app-card-bg); border-radius: 8px; border: 1px solid var(--app-border); }",
              "js": "const list = document.getElementById('user-list');\nconst search = document.getElementById('search');\nlet allUsers = [];\n\nconst render = (users) => {\n  list.innerHTML = users.map(u => `\n    <div class='user-card'>\n      <h4>${u.name}</h4>\n      <p style='font-size: 0.8rem;'>${u.email}</p>\n    </div>\n  `).join('');\n};\n\nfetch('https://jsonplaceholder.typicode.com/users')\n  .then(res => res.json())\n  .then(data => {\n    allUsers = data;\n    render(allUsers);\n  });\n\nsearch.oninput = (e) => {\n  const filtered = allUsers.filter(u => \n    u.name.toLowerCase().includes(e.target.value.toLowerCase())\n  );\n  render(filtered);\n};"
            },
            "assessment": "Final Challenge: Add a button to each card that opens an alert with the user's phone number."
          },
          {
            "id": "w2-d6-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      },
      {
        "dayId": "w2-d7",
        "dayTitle": "Day 7: Final Review & Project",
        "topics": [
          {
            "id": "w2-d7-t1",
            "title": "1. JavaScript Revision & Practice",
            "visualization": "/js-revision.png",
            "progression": [
              {
                "level": "easy",
                "title": "Core Logic Review",
                "content": "A quick recap of variables, data types, and operators. These are the building blocks of every JavaScript application."
              },
              {
                "level": "intermediate",
                "title": "Functional & DOM Review",
                "content": "Reviewing how to organize logic into functions and how to use those functions to manipulate the DOM based on user events."
              },
              {
                "level": "advanced",
                "title": "Async & API Review",
                "content": "Final touch-up on Promises, Async/Await, and fetching data. Mastering these allows you to build data-driven, modern web apps."
              }
            ],
            "codeTemplate": {
              "html": "<div id='rev-out'>Ready to review!</div>\n<button id='rev-btn'>Run Comprehensive Check</button>",
              "css": "",
              "js": "const checks = ['Logic', 'Functions', 'DOM', 'Async'];\ndocument.getElementById('rev-btn').onclick = () => {\n  document.getElementById('rev-out').innerText = `Checked: ${checks.join(', ')}`;\n};"
            },
            "assessment": "Write a summary of the most challenging JS concept you learned this week and how you solved it."
          },
          {
            "id": "w2-d7-t2",
            "title": "2. Problem Solving with JavaScript",
            "visualization": "/js-problem-solving.png",
            "progression": [
              {
                "level": "easy",
                "title": "Analyzing the Goal",
                "content": "Before coding, always define the input, the output, and the steps needed to get there. This 'Pseudo-code' phase prevents stuck moments."
              },
              {
                "level": "intermediate",
                "title": "Edge Cases",
                "content": "A good problem solver thinks about what could go wrong. What if the input is null? What if the API is down? Handle these scenarios early."
              },
              {
                "level": "advanced",
                "title": "Refactoring for Performance",
                "content": "Once the code works, look for ways to make it cleaner and faster. Replace messy loops with array methods like .map or .filter where possible."
              }
            ],
            "codeTemplate": {
              "html": "<input type='text' id='pal-in' placeholder='Check palindrome...'>\n<p id='pal-res'></p>",
              "css": "",
              "js": "document.getElementById('pal-in').oninput = (e) => {\n  const str = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');\n  const rev = str.split('').reverse().join('');\n  document.getElementById('pal-res').innerText = \n    str && str === rev ? 'It is a palindrome! ✅' : 'Keep typing...';\n};"
            },
            "assessment": "Solve the 'FizzBuzz' problem: Print numbers 1-50, but 'Fizz' for multiples of 3 and 'Buzz' for multiples of 5."
          },
          {
            "id": "w2-d7-t3",
            "title": "3. Building Reusable Logic",
            "visualization": "/js-reusable.png",
            "progression": [
              {
                "level": "easy",
                "title": "DRY Principle",
                "content": "DRY stands for 'Don't Repeat Yourself'. If you see the same code block twice, it should probably be a function."
              },
              {
                "level": "intermediate",
                "title": "Utility Functions",
                "content": "Create a library of small, focused functions (like formatDate, validateEmail) that can be used across different parts of your app."
              },
              {
                "level": "advanced",
                "title": "Generic Components",
                "content": "Write functions that accept configuration objects, allowing them to behave differently in different contexts without changing the core code."
              }
            ],
            "codeTemplate": {
              "html": "<div id='util-out'></div>",
              "css": "",
              "js": "const formatCurrency = (num) => `$${num.toFixed(2)}`;\nconst calculateTax = (price, tax = 0.1) => price * tax;\n\nconst price = 100;\nconst tax = calculateTax(price);\ndocument.getElementById('util-out').innerText = \n  `Price: ${formatCurrency(price)}, Tax: ${formatCurrency(tax)}`;"
            },
            "assessment": "Build a utility function that takes an array and returns only the unique items (no duplicates)."
          },
          {
            "id": "w2-d7-t4",
            "title": "4. Working with Dynamic UI",
            "visualization": "/js-dynamic-ui.png",
            "progression": [
              {
                "level": "easy",
                "title": "State-Driven UI",
                "content": "Think of your UI as a reflection of your data. When the data changes, the UI should update automatically to reflect the new state."
              },
              {
                "level": "intermediate",
                "title": "Conditional Rendering",
                "content": "Show or hide elements based on logic. For example, show a 'Loading...' spinner while fetching and the data once it arrives."
              },
              {
                "level": "advanced",
                "title": "Event Delegation",
                "content": "Instead of adding listeners to every button in a long list, add one listener to the parent. This is much more efficient and handles new items automatically."
              }
            ],
            "codeTemplate": {
              "html": "<div id='ui-state'>Logged Out</div>\n<button id='auth-btn'>Login</button>",
              "css": ".logged-in { color: #4ade80; font-weight: bold; }",
              "js": "let isLoggedIn = false;\nconst btn = document.getElementById('auth-btn');\nconst status = document.getElementById('ui-state');\n\nbtn.onclick = () => {\n  isLoggedIn = !isLoggedIn;\n  status.innerText = isLoggedIn ? 'Welcome back, User!' : 'Logged Out';\n  status.className = isLoggedIn ? 'logged-in' : '';\n  btn.innerText = isLoggedIn ? 'Logout' : 'Login';\n};"
            },
            "assessment": "Create a UI that shows a 'No items found' message only when an array is empty."
          },
          {
            "id": "w2-d7-t5",
            "title": "5. API Integration Workflow",
            "visualization": "/js-api-workflow.png",
            "progression": [
              {
                "level": "easy",
                "title": "The Fetch Phase",
                "content": "The start of the workflow: identifying the endpoint and making the initial network call."
              },
              {
                "level": "intermediate",
                "title": "Data Transformation",
                "content": "Rarely is API data perfect for your UI. This phase involves mapping, filtering, or sorting the raw data before it hits the screen."
              },
              {
                "level": "advanced",
                "title": "Error & Empty States",
                "content": "A professional workflow always handles the 'offline' or 'no results' scenarios, ensuring the user isn't left looking at a blank screen."
              }
            ],
            "codeTemplate": {
              "html": "<button id='load-posts'>Load Posts</button>\n<div id='posts-container'></div>",
              "css": ".post { padding: 10px; border-bottom: 1px solid var(--app-border); }",
              "js": "document.getElementById('load-posts').onclick = async () => {\n  const container = document.getElementById('posts-container');\n  container.innerText = 'Loading...';\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');\n    const posts = await res.json();\n    container.innerHTML = posts.map(p => `<div class='post'><b>${p.title}</b></div>`).join('');\n  } catch (err) {\n    container.innerText = 'Failed to load posts.';\n  }\n};"
            },
            "assessment": "Describe a full API integration workflow from button click to data display."
          },
          {
            "id": "w2-d7-t6",
            "title": "6. Project Structuring Basics",
            "visualization": "/js-structuring.png",
            "progression": [
              {
                "level": "easy",
                "title": "File Organization",
                "content": "Keep your CSS, JS, and Images in separate folders. In JS, separate your UI logic from your data fetching logic."
              },
              {
                "level": "intermediate",
                "title": "Separation of Concerns",
                "content": "Each function or file should do one thing well. A file that fetches users shouldn't also be responsible for styling the cards."
              },
              {
                "level": "advanced",
                "title": "Scalable Architecture",
                "content": "As projects grow, naming conventions and folder hierarchies become critical. Using consistent patterns prevents 'Spaghetti Code'."
              }
            ],
            "codeTemplate": {
              "html": "<h3>Project Structure Preview</h3>\n<pre>/src\n  /api\n  /components\n  /styles\n  index.js</pre>",
              "css": "pre { background: #0f172a; padding: 15px; border-radius: 8px; color: var(--primary-cyan); }",
              "js": "// Keep logic clean and modular!"
            },
            "assessment": "Draw or list a folder structure for a small JS weather application."
          },
          {
            "id": "w2-d7-t7",
            "title": "7. Final Project – Interactive JavaScript Application",
            "visualization": "/js-final-project.png",
            "progression": [
              {
                "level": "easy",
                "title": "Project Goal",
                "content": "Build a 'Movie Search App' that fetches movie data from an API, displays it in a grid, and allows users to 'favorite' movies."
              },
              {
                "level": "intermediate",
                "title": "Core Features",
                "content": "Implement search functionality, dynamic card rendering, and save 'favorites' to Local Storage so they persist."
              },
              {
                "level": "advanced",
                "title": "Polishing & UX",
                "content": "Add a 'loading' state, handle 'no results' found, and ensure the UI is fully responsive and looks professional."
              }
            ],
            "codeTemplate": {
              "html": "<div class='final-app'>\n  <input type='text' id='search' placeholder='Search movies (e.g. Batman)...'>\n  <div id='movie-grid' class='grid'></div>\n</div>",
              "css": ".grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 20px; }\n.movie-card { background: var(--app-card-bg); padding: 10px; border-radius: 12px; border: 1px solid var(--app-border); }",
              "js": "// Final project skeleton\nconst search = document.getElementById('search');\nconst grid = document.getElementById('movie-grid');\n\nsearch.oninput = async (e) => {\n  if (e.target.value.length < 3) return;\n  grid.innerHTML = 'Searching...';\n  // In a real app, you would use a movie API key here!\n  // For this demo, we use placeholder data to simulate the result\n  setTimeout(() => {\n    grid.innerHTML = `\n      <div class='movie-card'>\n        <h4>${e.target.value} Result</h4>\n        <p>Movie information would appear here from the API.</p>\n      </div>\n    `;\n  }, 500);\n};"
            },
            "assessment": "Final Capstone: Submit the link to your completed interactive application."
          },
          {
            "id": "w2-d7-resources",
            "title": "Tutor Materials & Resources",
            "isResources": true,
            "explanation": "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
            "tutorMaterial": {
              "title": "Tutor Lesson Plan & Reference Guide",
              "content": "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
              "duration": "15 mins",
              "resources": [
                "Classroom Presentation Slides (PDF)",
                "Student Hands-on Lab Worksheet (PDF)",
                "Reference Code & Solutions (ZIP)",
                "Day Evaluation Rubric"
              ]
            }
          }
        ]
      }
    ]
  }
];
