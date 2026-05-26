export const w4d6Data = {
  dayId: "w4-d6",
  dayTitle: "Day 6: React Router & Single Page Applications (SPA)",
  topics: [
    {
      id: "w4-d6-t1",
      title: "1. Multi-page Apps vs Single Page Applications",
      customComponent: "RouterSimulatorViz",
      explanation: "A Multi-page Application (MPA) requests and reloads a new HTML document from the server on every link click. A Single Page Application (SPA) loads a single HTML page and updates the layout dynamically client-side as users navigate, preventing page reloads.",
      progression: [
        {
          level: "easy",
          title: "Browser Document Requests",
          content: "In an MPA, clicking links causes the browser window to flash and reload. In an SPA, the browser intercepts clicks and swaps layout elements dynamically, keeping interactions fast."
        },
        {
          level: "intermediate",
          title: "Client-side Router",
          content: "SPAs use client-side routers to synchronize browser URL changes with the rendering of specific component layouts, giving users the feel of multi-page navigation."
        },
        {
          level: "advanced",
          title: "DOM Diffing vs Server Requests",
          content: "Interchange layouts client-side reduces server load, saves network bandwidth, and enables smooth, app-like page transition animations."
        }
      ],
      detailedReference: {
        summary: "SPAs intercept page requests, rendering corresponding components locally to enable fast, seamless navigation.",
        keyConcepts: [
          { term: "Single Page Application", definition: "A web application that loads a single document, updating content dynamically via DOM manipulation." }
        ],
        bestPractices: [
          "Use client-side routing to build fast, app-like web interfaces.",
          "Ensure URL paths remain clean and clear for search engine crawlers."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// MPA Link (Page reloads): <a href="/about">About</a>
// SPA Link (No page reload): <Link to="/about">About</Link>`
      },
      assessment: "What is the main user experience benefit of an SPA over an MPA?"
    },
    {
      id: "w4-d6-t2",
      title: "2. React Router Components: Routes & Route",
      customComponent: "RouterSimulatorViz",
      explanation: "React Router uses `<Routes>` and `<Route>` components to define your application's routing map. The router compares the browser's current URL path with defined routes, rendering the matching component element.",
      progression: [
        {
          level: "easy",
          title: "Mapping Route Paths",
          content: "Declare route paths using the `<Route>` element, defining the URL path in the `path` prop and the target component in the `element` prop (e.g. `<Route path=\"/about\" element={<About />} />`)."
        },
        {
          level: "intermediate",
          title: "The Routes Container",
          content: "Wrap all your `<Route>` components inside a single `<Routes>` element. React Router evaluates these routes sequentially and renders the best match."
        },
        {
          level: "advanced",
          title: "Wildcard Fallback (404 Page)",
          content: "Create a fallback route using the wildcard path `*` (e.g. `<Route path=\"*\" element={<NotFound />} />`). If no other routes match, this component renders automatically."
        }
      ],
      detailedReference: {
        summary: "The Routes container matches the active path against Route components, rendering the corresponding element.",
        keyConcepts: [
          { term: "Routing Map", definition: "The list of Route definitions matching URL paths to specific component layouts." }
        ],
        bestPractices: [
          "Wrap your entire application in a Router component (e.g. `<BrowserRouter>`).",
          "Always add a wildcard `*` route to handle 404 Page Not Found cases gracefully."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Note: UMD ReactRouterDOM loads HashRouter/BrowserRouter globally
// Wrap components inside a HashRouter/BrowserRouter element in React:

const Home = () => <h2>Home Screen</h2>;
const About = () => <h2>About Screen</h2>;

const App = () => {
  return (
    <HashRouter>
      <div style={{ padding: '16px' }}>
        {/* Router wrapper maps views */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </HashRouter>
  );
};`
      },
      assessment: "Explain how to write a fallback route that renders a <NotFound /> component when no other routes match."
    },
    {
      id: "w4-d6-t3",
      title: "3. Navigation Links with <Link>",
      customComponent: "RouterSimulatorViz",
      explanation: "Using standard HTML anchor `<a>` tags causes a full browser page reload, losing application state. In React, use the `<Link>` component to navigate between routes client-side without reloads.",
      progression: [
        {
          level: "easy",
          title: "The Link Component",
          content: "Import and use `<Link>` components, specifying target paths in the `to` prop (e.g. `<Link to=\"/about\">About Us</Link>`)."
        },
        {
          level: "intermediate",
          title: "Preventing Page Reloads",
          content: "The `<Link>` component intercepts clicks, updates the browser URL, and renders matching routes locally without reloading the page."
        },
        {
          level: "advanced",
          title: "Active Navigation Styling",
          content: "Use the `<NavLink>` component to style active links. It receives an `isActive` parameter, allowing you to highlight the current page link."
        }
      ],
      detailedReference: {
        summary: "The Link component intercepts clicks to enable client-side navigation, preventing page reloads and state loss.",
        keyConcepts: [
          { term: "Client-side Link", definition: "A navigation component that updates the browser URL and swaps views locally without reloading the page." }
        ],
        bestPractices: [
          "Never use standard anchor `<a>` tags for internal links; always use `<Link>` or `<NavLink>`.",
          "Use descriptive labels for navigation links to improve accessibility."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `// Link navigation demo
const Navigation = () => {
  return (
    <nav style={{ padding: '10px', background: '#f1f5f9', display: 'flex', gap: '10px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#0ea5e9' }}>Home</Link>
      <Link to="/about" style={{ textDecoration: 'none', color: '#0ea5e9' }}>About</Link>
    </nav>
  );
};`
      },
      assessment: "Why should you use React Router's <Link> component instead of a standard HTML <a> anchor tag?"
    },
    {
      id: "w4-d6-t4",
      title: "4. Programmatic Navigation using useNavigate",
      customComponent: "RouterSimulatorViz",
      explanation: "To navigate programmatically in response to user actions (like form submissions or successful checkouts), use the `useNavigate` hook to redirect users programmatically.",
      progression: [
        {
          level: "easy",
          title: "The useNavigate Hook",
          content: "Initialize the hook inside a component: `const navigate = useNavigate()`. Call `navigate('/path')` to redirect users programmatically."
        },
        {
          level: "intermediate",
          title: "Redirecting After Actions",
          content: "Redirect users to dashboards or success pages after handling events (like form validation or login submissions)."
        },
        {
          level: "advanced",
          title: "History Navigation Steps",
          content: "Pass integers to `navigate` to move backward or forward in the browser history (e.g. `navigate(-1)` moves back one page)."
        }
      ],
      detailedReference: {
        summary: "The useNavigate hook provides a redirect function, allowing you to trigger navigation programmatically.",
        keyConcepts: [
          { term: "Programmatic Navigation", definition: "Navigating users to different pages programmatically in response to logic triggers." }
        ],
        bestPractices: [
          "Use useNavigate to redirect users only after operations (like API submissions) complete successfully.",
          "Avoid calling navigate directly inside rendering code; always trigger it within event handlers."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePortal />} />
        <Route path="/dashboard" element={<h2>Welcome to Dashboard!</h2>} />
      </Routes>
    </HashRouter>
  );
};

const HomePortal = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simulate login and redirect programmatically
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '16px' }}>
      <button onClick={handleLogin}>Log In & Go to Dashboard</button>
    </div>
  );
};`
      },
      assessment: "Write a button component that redirects the user back one page in history when clicked using useNavigate."
    },
    {
      id: "w4-d6-t5",
      title: "5. URL Parameters & useParams Hook",
      customComponent: "RouterSimulatorViz",
      explanation: "To build dynamic routes like user profiles or product details, define parameters in your route paths using colons (`:`) and read them using the `useParams` hook.",
      progression: [
        {
          level: "easy",
          title: "Declaring Dynamic Paths",
          content: "Define parameters in route paths using colon prefixes (e.g. `<Route path=\"/user/:id\" element={<Profile />} />`)."
        },
        {
          level: "intermediate",
          title: "Reading Parameter Keys",
          content: "Call `useParams()` in the matched component to read URL parameter values dynamically as a key-value object."
        },
        {
          level: "advanced",
          title: "Dynamic Resource Queries",
          content: "Pass URL parameter values as dependency keys to `useEffect` to fetch corresponding item details from APIs automatically."
        }
      ],
      detailedReference: {
        summary: "Route variables declared with colons are parsed into key-value objects accessible via the useParams hook.",
        keyConcepts: [
          { term: "Dynamic Route", definition: "A route path containing variables, allowing a single component to render details for different resources." }
        ],
        bestPractices: [
          "Name route parameters clearly to keep code self-documenting (e.g. `:itemId` instead of `:id`).",
          "Ensure matched components validate parameter formats before using them in API queries."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  return (
    <HashRouter>
      <nav>
        <Link to="/student/Alice">Alice Profile</Link> | <Link to="/student/Bob">Bob Profile</Link>
      </nav>
      <Routes>
        {/* Dynamic Route definition */}
        <Route path="/student/:name" element={<StudentCard />} />
      </Routes>
    </HashRouter>
  );
};

const StudentCard = () => {
  // Read name parameter from URL path
  const { name } = useParams();
  return <h3 style={{ color: '#0ea5e9' }}>Student Card: {name}</h3>;
};`
      },
      assessment: "Write a Route definition that maps a dynamic /product/:id path to a ProductDetails component."
    },
    {
      id: "w4-d6-t6",
      title: "6. Assignment Task: Multi-page Portal Navigation",
      explanation: "Build a multi-page portal using React Router. The app must render inside a Router wrapper (`HashRouter` or `BrowserRouter`), define routes for Home, About, and Profile pages, use `Link` components for navigation to prevent page reloads, and include a programmatic redirect button using `useNavigate` to redirect users from the About page to the Profile page.",
      progression: [
        {
          level: "easy",
          title: "Configure Route Links",
          content: "Wrap the app inside a HashRouter. Define navbar Links and route paths for Home, About, and Profile pages."
        },
        {
          level: "intermediate",
          title: "Render Matching Screens",
          content: "Verify that clicking navigation links swaps pages dynamically in the viewport without reloading the page."
        },
        {
          level: "advanced",
          title: "Add Programmatic Redirects",
          content: "Add a button on the About page that calls `useNavigate()` to redirect users programmatically to the Profile page."
        }
      ],
      codeTemplate: {
        html: "",
        css: `/* Routing Portal Styles */
.router-portal {
  max-width: 500px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  background: #1e293b;
  color: white;
  border-radius: 12px;
  overflow: hidden;
}
.portal-nav {
  display: flex;
  gap: 12px;
  background: #0f172a;
  padding: 12px 20px;
  border-bottom: 1px solid #334155;
}
.portal-link {
  color: #94a3b8;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: bold;
}
.portal-link:hover {
  color: white;
}
.viewport {
  padding: 24px;
  min-height: 180px;
}
.redirect-btn {
  background: #0ea5e9;
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 12px;
  font-weight: bold;
}`,
        js: `// Dynamic Page Components
const Home = () => (
  <div>
    <h3>🏠 Welcome Home</h3>
    <p>This is the portal landing home screen element.</p>
  </div>
);

const Profile = () => (
  <div>
    <h3>👤 Student Profile Dashboard</h3>
    <p>Matched route: /profile. Cohort active status: Active.</p>
  </div>
);

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>ℹ️ About Wemade Logix</h3>
      <p>This sandbox illustrates client-side routing in single-page apps.</p>
      <button 
        onClick={() => navigate('/profile')} 
        className="redirect-btn"
      >
        Go to Profile (Programmatic)
      </button>
    </div>
  );
};

// Main routing app container
const App = () => {
  return (
    <HashRouter>
      <div className="router-portal">
        <nav className="portal-nav">
          <Link to="/" className="portal-link">Home</Link>
          <Link to="/about" className="portal-link">About</Link>
          <Link to="/profile" className="portal-link">Profile</Link>
        </nav>

        <div className="viewport">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
};`
      },
      assessment: "Checklist:\n1. Wrap your application layout in a Router component.\n2. Add `<Link>` components to navigate between routes client-side without full page reloads.\n3. Add a programmatic redirect on the About page using the `useNavigate` hook.\n4. Define `<Routes>` containing `<Route>` configurations mapping Home, About, and Profile pages."
    },
    {
      id: "w4-d6-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Routing lifecycle diagrams, Link vs Anchor visual models, programmatic state patterns, and solutions for the navigation portal code.",
        duration: "15 mins",
        resources: [
          "React Router presentation slides (PDF)",
          "Navigation Portal Solutions (ZIP)"
        ]
      }
    }
  ]
};
