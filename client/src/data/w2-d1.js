export const w2d1Data = {
  dayId: "w2-d1",
  dayTitle: "Day 1: Flexbox & Grid Layouts",
  topics: [
    {
      id: "w2-d1-t1",
      title: "1. Introduction to Flexbox",
      customComponent: "FlexboxGridVisualizer",
      explanation: "Flexbox (Flexible Box Layout) is a one-dimensional layout model. It allows you to align items in rows or columns, distributing space dynamically even when their sizes are unknown. It is optimized for small-scale layouts, user interface styling, alignment components, and content flows.",
      progression: [
        {
          level: "easy",
          title: "The Flexbox Model",
          content: "Flexbox operates on a main axis (defined by flex-direction) and a cross axis (perpendicular to the main axis). Applying `display: flex` turns the parent element into a flex container and all its immediate children into flex items."
        },
        {
          level: "intermediate",
          title: "Flex Directions & Wrap",
          content: "Use `flex-direction` to change axes (row, row-reverse, column, column-reverse). If content overflows, apply `flex-wrap: wrap` to allow items to flow onto new lines instead of shrinking or overflowing."
        },
        {
          level: "advanced",
          title: "Flex Container Alignment",
          content: "Control alignment along the main axis with `justify-content` (flex-start, flex-end, center, space-between, space-around, space-evenly) and the cross axis with `align-items` (stretch, center, flex-start, flex-end, baseline)."
        }
      ],
      detailedReference: {
        summary: "The Flexbox layout model provides space distribution and alignment capabilities that overcome traditional float and block models.",
        keyConcepts: [
          { term: "Flex Axis", definition: "The orientation determining direction (row or column) that determines how the main axis lines up, and how items align on the cross axis." },
          { term: "Wrap Controls", definition: "Parameters (flex-wrap) preventing layout compression when child dimensions exceed parent viewport limits." }
        ],
        bestPractices: [
          "Use flexbox for 1D content layouts like navigation bars, list items, card headers, and button grids.",
          "Use unitless flex shorthand values rather than width sizing to let items expand fluidly."
        ]
      },
      codeTemplate: {
        html: `<div class="flex-container">
  <div class="box">1</div>
  <div class="box">2</div>
  <div class="box">3</div>
</div>`,
        css: `.flex-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background: #1e293b;
  padding: 20px;
  border-radius: 8px;
}
.box {
  width: 60px;
  height: 60px;
  background: var(--brand-gradient, linear-gradient(135deg, #00f2fe 0%, #4facfe 100%));
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}`,
        js: ""
      },
      assessment: "How do you align items along the cross axis in a flex container?"
    },
    {
      id: "w2-d1-t2",
      title: "2. Flexbox Item Properties",
      customComponent: "FlexboxGridVisualizer",
      explanation: "While container properties control layout layout flow, flex item properties control how individual children grow, shrink, and align themselves within the parent container.",
      progression: [
        {
          level: "easy",
          title: "Flex Grow & Shrink",
          content: "Control how individual items grow (`flex-grow`) or shrink (`flex-shrink`) relative to others to occupy available free space."
        },
        {
          level: "intermediate",
          title: "Flex Basis & Shorthand",
          content: "`flex-basis` sets the default size before scaling. Use the `flex` shorthand: `flex: [flex-grow] [flex-shrink] [flex-basis]`."
        },
        {
          level: "advanced",
          title: "Align Self Override",
          content: "Use `align-self` on a specific child item to override the container's `align-items` setting, allowing independent alignment."
        }
      ],
      detailedReference: {
        summary: "Individual item behaviors determine how items adapt when viewport space is distributed, allowing targeted overrides.",
        keyConcepts: [
          { term: "Flex Grow", definition: "A proportion determining how much of the remaining empty space is allocated to this item." },
          { term: "Align Self", definition: "A cross-axis override setting that frees individual children from the parent alignment rule." }
        ],
        bestPractices: [
          "Always use the shorthand `flex: 1 1 auto` rather than declaring properties individually.",
          "Use `flex-shrink: 0` to prevent icons or static width controls from being crushed."
        ]
      },
      codeTemplate: {
        html: `<div class="flex-container">
  <div class="box grow-1">Grow 1</div>
  <div class="box grow-2">Grow 2</div>
  <div class="box override-self">Override Self</div>
</div>`,
        css: `.flex-container {
  display: flex;
  gap: 15px;
  height: 150px;
  align-items: flex-start;
  background: #0f172a;
  padding: 15px;
}
.box {
  background: var(--primary-cyan, #00d1d1);
  color: #0f172a;
  padding: 15px;
  border-radius: 8px;
  font-weight: bold;
}
.grow-1 { flex-grow: 1; }
.grow-2 { flex-grow: 2; }
.override-self { align-self: flex-end; }`,
        js: ""
      },
      assessment: "What is the default value of flex-grow for a flex item?"
    },
    {
      id: "w2-d1-t3",
      title: "3. Grid Layout Foundations",
      customComponent: "FlexboxGridVisualizer",
      explanation: "CSS Grid is a two-dimensional layout model. Unlike Flexbox, it handles both columns and rows simultaneously, making it ideal for macro layout design and complex dashboard screens.",
      progression: [
        {
          level: "easy",
          title: "The CSS Grid Model",
          content: "Declare `display: grid` on a container to turn it into a grid. Grid structures align items into columns and rows on a grid mesh."
        },
        {
          level: "intermediate",
          title: "Defining Grid Tracks",
          content: "Use `grid-template-columns` and `grid-template-rows` to partition tracks using relative, absolute (px), or fractional (`fr`) units."
        },
        {
          level: "advanced",
          title: "Gap & Grid Spacing",
          content: "Control spacing between rows and columns with grid gap properties (`gap`, `row-gap`, `column-gap`), avoiding layout margin calculations."
        }
      ],
      detailedReference: {
        summary: "Grid structures provide two-dimensional layout grids that can handle columns and rows cleanly and adaptively.",
        keyConcepts: [
          { term: "Fractional Unit (fr)", definition: "A unit representing a fraction of the available space in the grid container." },
          { term: "Grid Tracks", definition: "The rows and columns defined inside a grid layout." }
        ],
        bestPractices: [
          "Use grid for macro layout grids (e.g. main page layouts, cards grids) and flexbox for micro elements.",
          "Prefer `gap` instead of margins on grid child items to maintain separation rules."
        ]
      },
      codeTemplate: {
        html: `<div class="grid-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>`,
        css: `.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  background: #1e293b;
  padding: 16px;
  border-radius: 8px;
}
.grid-container > div {
  background: var(--brand-gradient, linear-gradient(135deg, #00f2fe 0%, #4facfe 100%));
  padding: 20px;
  text-align: center;
  color: white;
  font-weight: bold;
  border-radius: 6px;
}`,
        js: ""
      },
      assessment: "Explain the difference between Flexbox and Grid models."
    },
    {
      id: "w2-d1-t4",
      title: "4. Grid Templates & Areas",
      customComponent: "FlexboxGridVisualizer",
      explanation: "CSS Grid allows you to name regions of your page and place elements directly inside those areas, creating readable responsive layout configurations.",
      progression: [
        {
          level: "easy",
          title: "Explicit Grid Placements",
          content: "Use `grid-column` and `grid-row` coordinates to span items across specific tracks (e.g., `grid-column: 1 / 3` to span two columns)."
        },
        {
          level: "intermediate",
          title: "Grid Template Areas",
          content: "Assign region names using `grid-template-areas`, then map elements directly to these spots using the `grid-area` property."
        },
        {
          level: "advanced",
          title: "Grid Track Auto-sizing",
          content: "Use `auto-fit` or `auto-fill` combined with `minmax()` to build grids that scale dynamically based on viewport width without media queries."
        }
      ],
      detailedReference: {
        summary: "Grid template areas map semantic areas to grid coordinates, simplifying complex responsive structures.",
        keyConcepts: [
          { term: "Grid Area Mapping", definition: "Declaring a visual map in CSS using named template regions to layout child nodes." },
          { term: "Minmax Function", definition: "A layout formula defining a range size (min value and max value) that scales fluidly." }
        ],
        bestPractices: [
          "Use `grid-template-areas` for clean layout documents that are easy to visualize directly from the CSS code.",
          "Pair `repeat(auto-fit, minmax(width, 1fr))` to build responsive galleries without media query breakpoints."
        ]
      },
      codeTemplate: {
        html: `<div class="grid-layout">
  <header>Header</header>
  <aside>Sidebar</aside>
  <main>Main Content</main>
</div>`,
        css: `.grid-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 180px 1fr;
  gap: 10px;
}
header {
  grid-area: header;
  background: #3b82f6;
  padding: 15px;
  color: white;
}
aside {
  grid-area: sidebar;
  background: #475569;
  padding: 15px;
  color: white;
}
main {
  grid-area: main;
  background: #f1f5f9;
  color: #1e293b;
  padding: 30px;
}`,
        js: ""
      },
      assessment: "How do you make a grid item occupy two columns?"
    },
    {
      id: "w2-d1-t5",
      title: "5. Hybrid Layouts (Flex & Grid)",
      customComponent: "FlexboxGridVisualizer",
      explanation: "Premium designs combine both CSS Grid (for macro-layouts like the sidebars, headers, and footers structure) and CSS Flexbox (for micro-elements alignment within grid cells).",
      progression: [
        {
          level: "easy",
          title: "Layout Combination Rules",
          content: "Use CSS Grid for the outer macro-layout (Sidebar + Header + Body), and Flexbox for inner components (navbar links, card metrics)."
        },
        {
          level: "intermediate",
          title: "Nested Flex Containers",
          content: "Make a grid cell item a flex container using `display: flex` to manage its local alignment variables. This is a very common layout pattern."
        },
        {
          level: "advanced",
          title: "Grid Centering Shortcuts",
          content: "Use `place-items: center` inside a grid to perfectly align item coordinates horizontally and vertically in a single line of CSS."
        }
      ],
      detailedReference: {
        summary: "Hybrid design strategies combine the 2D layout layout of CSS Grid with the 1D alignment of Flexbox for polished components.",
        keyConcepts: [
          { term: "Nested Layout Flow", definition: "Declaring alternative layout contexts (like display: flex) inside grid cells." }
        ],
        bestPractices: [
          "Nest a flex row inside a grid cell to align icons and text horizontally.",
          "Use `place-items: center` for single-item containers that need absolute centering."
        ]
      },
      codeTemplate: {
        html: `<div class="grid-wrapper">
  <div class="card">
    <span class="label">Sales Metric</span>
    <h3 class="value">$4,200</h3>
  </div>
  <div class="card centered">
    <span>Perfect Center</span>
  </div>
</div>`,
        css: `.grid-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.card {
  background: #1e293b;
  padding: 20px;
  border-radius: 8px;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100px;
}
.card.centered {
  display: grid;
  place-items: center;
  background: var(--brand-gradient, linear-gradient(135deg, #00f2fe 0%, #4facfe 100%));
}`,
        js: ""
      },
      assessment: "When would you prefer Grid over Flexbox?"
    },
    {
      id: "w2-d1-t6",
      title: "6. Assignment Task - Premium Holy Grail Admin Dashboard",
      customComponent: "FlexboxGridVisualizer",
      explanation: "Build a highly responsive Admin Dashboard layout using a hybrid combination of CSS Grid for the macro layout (Sidebar, Header, Main content, and Footer) and CSS Flexbox for micro-alignments inside header widgets, analytics cards, and table structures. Your code must adapt flawlessly across desktop, tablet, and mobile viewports.",
      progression: [
        {
          level: "easy",
          title: "Grid Base Structure",
          content: "Establish the Holy Grail wrapper using CSS Grid layout. Set up a grid-template-areas map for header, sidebar, main content, and footer regions."
        },
        {
          level: "intermediate",
          title: "Flexbox Components Integration",
          content: "Apply display: flex within the header bar (for brand logo vs user profile buttons) and inside analytical card widgets to arrange stats dynamically."
        },
        {
          level: "advanced",
          title: "Breakpoints & Responsiveness",
          content: "Implement media queries to shift the layout grid on mobile devices, collapsing the sidebar navigation and stacking panels vertically."
        }
      ],
      codeTemplate: {
        html: `<div class="dashboard">
  <header class="dash-header">
    <div class="logo">WEMADE LOGIX</div>
    <div class="profile">Admin User</div>
  </header>
  <aside class="dash-sidebar">
    <nav class="nav-links">
      <a class="active">Dashboard</a>
      <a>Analytics</a>
      <a>Settings</a>
    </nav>
  </aside>
  <main class="dash-main">
    <div class="metrics-grid">
      <div class="card">
        <h4>Total Revenue</h4>
        <p>$45,231</p>
      </div>
      <div class="card">
        <h4>Active Users</h4>
        <p>12,482</p>
      </div>
    </div>
  </main>
  <footer class="dash-footer">
    <span>© 2026 Admin Portal</span>
  </footer>
</div>`,
        css: `:root {
  --bg-primary: #0f172a;
  --bg-card: #1e293b;
  --border: #334155;
  --primary: #00d1d1;
}

.dashboard {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 60px 1fr 40px;
  min-height: 100vh;
  font-family: sans-serif;
  color: white;
}

.dash-header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border);
}

.dash-sidebar {
  grid-area: sidebar;
  background: var(--bg-card);
  border-right: 1px solid var(--border);
  padding: 20px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-links a {
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
}

.nav-links a.active {
  background: var(--primary);
  color: #0f172a;
  font-weight: bold;
}

.dash-main {
  grid-area: main;
  background: var(--bg-primary);
  padding: 30px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 20px;
  border-radius: 8px;
}

.dash-footer {
  grid-area: footer;
  background: var(--bg-card);
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid var(--border);
  font-size: 0.85rem;
  color: #64748b;
}

@media (max-width: 768px) {
  .dashboard {
    grid-template-areas:
      "header"
      "main"
      "footer";
    grid-template-columns: 1fr;
    grid-template-rows: 60px 1fr 40px;
  }
  .dash-sidebar {
    display: none;
  }
}`,
        js: ""
      },
      assessment: "Explain how grid-template-areas maps content placement and collapses to a single column grid on mobile viewport scaling."
    },
    {
      id: "w2-d1-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Flexbox alignment guidelines, CSS grid area mapping checklists, mobile responsive workflows, and solutions for the dashboard task.",
        duration: "15 mins",
        resources: [
          "Student Flex & Grid Spacing Worksheet (PDF)",
          "Hybrid Layout Code Solutions (ZIP)"
        ]
      }
    }
  ]
};
