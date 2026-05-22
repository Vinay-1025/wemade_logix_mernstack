export const w1d6Data = {
  dayId: "w1-d6",
  dayTitle: "Day 6: CSS Box Model & Positioning",
  topics: [
    {
      id: "d6-t1",
      title: "1. CSS Box Model (Content, Padding, Border, Margin)",
      customComponent: "CSSBoxModelLab",
      explanation: "Every element on a web page is treated as a rectangular box. The CSS Box Model defines how the content, padding, borders, and margins of that box combine to determine its total size and spacing relative to other elements. Mastery of the Box Model is fundamental to controlling layouts.",
      progression: [
        {
          level: "easy",
          title: "Content & Padding",
          content: "The innermost layer is the Content area, where text, images, or child elements reside (controlled by `width` and `height`). Surrounding this is Padding, which creates transparent breathing space *inside* the element's border. Padding is styled using `padding` (shorthand) or specific properties like `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`."
        },
        {
          level: "intermediate",
          title: "Borders & Margins",
          content: "Outside the padding is the Border, which wraps the padding and content. You define its `border-width`, `border-style` (e.g. `solid`, `dashed`), and `border-color`. The outermost layer is the Margin, which creates spacing *outside* the border, separating the element from other sibling boxes. Margins are transparent and do not absorb background colors."
        },
        {
          level: "advanced",
          title: "Margin Collapsing & Shorthand Notation",
          content: "When two vertical block margins touch (e.g., a header's bottom margin and a paragraph's top margin), they collapse into a single margin equal to the larger of the two, rather than adding together. Margin/Padding shorthands allow targeting all sides: `padding: 10px 20px;` (10px vertical, 20px horizontal) or `padding: 5px 10px 15px 20px;` (Top, Right, Bottom, Left - following a clock direction)."
        }
      ],
      detailedReference: {
        summary: "The CSS Box Model specifies the nested box structures that form rendering layouts, governing the exact mathematical space and boundaries of every DOM element.",
        keyConcepts: [
          { "term": "Content Box", "definition": "The core area holding nested text, images, or elements, whose width/height coordinates are declared in styles." },
          { "term": "Padding Area", "definition": "The inner clear spacing wrapping content. It inherits the background of the element and increases click targets." },
          { "term": "Border Boundary", "definition": "The dividing frame that wraps padding, acting as the visual outline separating inner properties from external spacing." },
          { "term": "Margin Space", "definition": "The outer clear spacing used to push neighboring boxes away, subject to vertical collapsing rules in block flows." }
        ],
        bestPractices: [
          "Use padding for internal element spacing to expand the touch/click target area for accessibility.",
          "Use margins for separation between adjacent block components (e.g. card gap margins).",
          "Be aware of margin collapse when stacking vertical paragraph/heading elements, and use padding or flexbox gaps if collapsing causes layout issues."
        ]
      },
      codeTemplate: {
        html: "<div class='box-model-demo'>\n  <div class='box-element'>\n    <h3>Box Model Visualizer</h3>\n    <p>Adjust padding, border, and margin to see how this card expands.</p>\n  </div>\n</div>",
        css: ".box-model-demo {\n  background: #f8fafc;\n  padding: 40px;\n}\n\n.box-element {\n  /* Content size */\n  width: 280px;\n  height: 150px;\n  background: #ffffff;\n  \n  /* Inner padding space */\n  padding: 24px;\n  \n  /* Border outline */\n  border: 4px solid #7c3aed;\n  \n  /* Outer margin spacing */\n  margin: 32px;\n  \n  border-radius: 8px;\n  box-shadow: 0 4px 12px rgba(0,0,0,0.05);\n}",
        js: ""
      },
      assessment: "If an element has width: 200px, padding: 20px, border: 5px, and margin: 30px, what is its total visual width on the screen under default box sizing?"
    },
    {
      id: "d6-t2",
      title: "2. Box Sizing (content-box vs border-box)",
      customComponent: "CSSBoxSizingLab",
      explanation: "By default, the browser calculates element width by adding padding and borders on top of the declared width. This is known as content-box sizing, and it often leads to broken grids. CSS provides the box-sizing property to switch elements to border-box sizing, making spacing much easier to manage.",
      progression: [
        {
          level: "easy",
          title: "Content-Box (Browser Default)",
          content: "Under `box-sizing: content-box;`, the width and height you specify only apply to the content area. If you set `width: 300px; padding: 20px; border: 5px solid;`, the element's actual visual width becomes `300 + 40 (padding) + 10 (borders) = 350px`. This makes percentage layouts break easily."
        },
        {
          level: "intermediate",
          title: "Border-Box (Modern Standard)",
          content: "Under `box-sizing: border-box;`, the width and height apply to the entire visible box, including content, padding, and borders. If you set `width: 300px; padding: 20px; border: 5px solid;`, the visual width remains exactly `300px`. The content area automatically shrinks to `250px` to absorb the padding and borders."
        },
        {
          level: "advanced",
          title: "Universal Box-Sizing Reset",
          content: "Because content-box is counter-intuitive for responsive design, modern web projects apply a universal CSS reset. By targeting all elements (`*`) and pseudo-elements, we force the entire site to use `border-box`, guaranteeing that components align predictably."
        }
      ],
      detailedReference: {
        summary: "The box-sizing property determines the mathematical formula the layout engine uses to compute actual box widths and heights.",
        keyConcepts: [
          { "term": "content-box formula", "definition": "Visual Width = Width + Padding(L+R) + Border(L+R). Margin is external and not included in visual width." },
          { "term": "border-box formula", "definition": "Visual Width = Width (Content width is automatically reduced to accommodate Padding + Border)." },
          { "term": "Universal Reset", "definition": "The practice of applying 'box-sizing: border-box' to the '*' selector to unify layout measurements across all browsers." }
        ],
        bestPractices: [
          "Always implement a universal box-sizing reset at the top of your stylesheet (`*, *::before, *::after { box-sizing: border-box; }`).",
          "Use border-box when building grids, columns, or form elements to prevent padding from causing column wrapping.",
          "Keep margins separate, as margin is never absorbed into the border-box width calculations."
        ]
      },
      codeTemplate: {
        html: "<div class='sizing-comparison'>\n  <div class='box content-box'>\n    <h4>Content-Box Sizing</h4>\n    <p>Visual size changes when padding is added.</p>\n  </div>\n  <div class='box border-box'>\n    <h4>Border-Box Sizing</h4>\n    <p>Visual size stays locked to declared width.</p>\n  </div>\n</div>",
        css: "/* Universal box-sizing reset is omitted here to demonstrate comparison */\n.box {\n  width: 250px;\n  height: 120px;\n  padding: 20px;\n  border: 8px solid #0891b2;\n  background: #ffffff;\n  margin-bottom: 20px;\n}\n\n.content-box {\n  box-sizing: content-box; /* Visual width = 250 + 40 + 16 = 306px */\n}\n\n.border-box {\n  box-sizing: border-box;  /* Visual width = 250px */\n}",
        js: ""
      },
      assessment: "Write the CSS rules for a universal box-sizing reset that respects inheritance."
    },
    {
      id: "d6-t3",
      title: "3. CSS Positioning (Static, Relative, Absolute, Fixed, Sticky)",
      customComponent: "CSSPositioningLab",
      explanation: "Positioning dictates where elements appear on the page and how they flow within the document structure. By default, elements stack in normal document flow. Using the position property, you can take elements out of flow, anchor them to parents, pin them to viewports, or make them stick during scrolls.",
      progression: [
        {
          level: "easy",
          title: "Static vs Relative",
          content: "`position: static` is the default. Elements follow normal page flow, and offset keys (`top`, `bottom`, `left`, `right`) have no effect. `position: relative` keeps the element in the normal flow but allows offsets to shift it relative to its original spot *without* affecting neighboring elements."
        },
        {
          level: "intermediate",
          title: "Absolute Positioning & Containment",
          content: "`position: absolute` completely removes the element from the document flow (no space is reserved for it). It is positioned relative to its nearest *positioned* ancestor (an ancestor with relative, absolute, fixed, or sticky styling). If none exist, it aligns to the HTML document body."
        },
        {
          level: "advanced",
          title: "Fixed vs Sticky Positioning",
          content: "`position: fixed` removes the element from flow and anchors it to the browser viewport. It stays pinned in the same spot even during scrolling (perfect for chat widgets or headers). `position: sticky` is a hybrid: it behaves like relative flow until it crosses a scroll threshold, where it pins like a fixed element, staying in view within its parent box."
        }
      ],
      detailedReference: {
        summary: "CSS positioning mechanisms define coordinate anchor points for rendering components, controlling whether elements stay in flow or fly out dynamically.",
        keyConcepts: [
          { "term": "Normal Document Flow", "definition": "The default system where block elements stack vertically and inline elements align horizontally in order of HTML appearance." },
          { "term": "Containing Block Anchor", "definition": "The coordinate frame of reference for absolute positioned elements, established by the closest parent with a position other than static." },
          { "term": "Viewport Pinning", "definition": "Positioning elements directly relative to the screen dimensions (fixed) or relative to scroll containers (sticky)." }
        ],
        bestPractices: [
          "Always apply `position: relative` to a card parent container when aligning an absolute child (like a close button or ribbon badge) inside it.",
          "Ensure sticky components have at least one offset dimension declared (e.g. `top: 0`), and note that sticky fails if any parent has `overflow: hidden`.",
          "Avoid excessive use of fixed/absolute positioning, as it breaks natural document layout and can lead to overlapping elements on smaller screens."
        ]
      },
      codeTemplate: {
        html: "<div class='positioning-demo'>\n  <div class='card-parent'>\n    <span class='badge'>NEW</span>\n    <h3>Product Card</h3>\n    <p>Card container has position relative, badge has position absolute.</p>\n  </div>\n</div>",
        css: ".card-parent {\n  position: relative; /* Acts as anchor container */\n  width: 300px;\n  padding: 24px;\n  border: 1px solid #e2e8f0;\n  background: #ffffff;\n  border-radius: 8px;\n}\n\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px; /* Anchor to parent top-right */\n  background: #ef4444;\n  color: white;\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 4px 8px;\n  border-radius: 4px;\n}",
        js: ""
      },
      assessment: "Why does an absolute child element fly to the top-right corner of the browser page when its parent card does not have relative positioning?"
    },
    {
      id: "d6-t4",
      title: "4. Stacking Contexts & Z-Index",
      customComponent: "CSSZIndexLab",
      explanation: "When elements overlap due to positioning, margins, or translates, CSS resolves their overlap order. The z-index property sets the stack order along the virtual Z-axis. However, z-index does not work globally; it is calculated inside Stacking Contexts which isolate layers.",
      progression: [
        {
          level: "easy",
          title: "Z-Index & Position Rules",
          content: "The `z-index` property accepts integers (positive, negative, or `0`). A higher number stacks above a lower number. Crucially, `z-index` is ignored on elements that have `position: static`. You must apply `relative`, `absolute`, `fixed`, or `sticky` to make z-index active."
        },
        {
          level: "intermediate",
          title: "Stacking Context Creation",
          content: "A Stacking Context is an isolated layer grouping where child elements are stacked together. It is triggered by setting `position` + `z-index` (other than auto), or by properties like `opacity` (under 1), `transform` (other than none), `filter`, or `mix-blend-mode`."
        },
        {
          level: "advanced",
          title: "The Stacking Trap (Nested Ordering)",
          content: "Once a stacking context is formed by a parent, child z-index values are locked inside it. For example, if Parent A has `z-index: 1` and Parent B has `z-index: 2`, any child of Parent A (even with `z-index: 99999`) will stack *behind* Parent B. The child cannot escape its parent's stacking context."
        }
      ],
      detailedReference: {
        summary: "Stacking Contexts are rendering layers on the screen. Knowing how they isolate elements helps you avoid z-index bugs.",
        keyConcepts: [
          { "term": "Z-Axis Depth", "definition": "The virtual 3D depth axis pointing towards the viewer. Higher z-index values bring elements visually closer." },
          { "term": "Stacking Context Isolation", "definition": "An independent container layer where child nodes are sorted locally. They cannot sort relative to elements in separate contexts." },
          { "term": "Context Triggers", "definition": "CSS properties (such as transforms, non-solid opacities, flex/grid child z-indexes) that create a local stacking context." }
        ],
        bestPractices: [
          "Avoid using giant z-index values (like `99999` or `999999`). Organize your layers using a structured range (e.g. modals = 100, headers = 50, dropdowns = 20, base = 1).",
          "If a child z-index is not working, inspect parents for properties like `transform`, `opacity`, or other z-indexes that might isolate the child.",
          "Use z-index only when necessary. Natural DOM order (elements lower down in the HTML render on top) is often enough."
        ]
      },
      codeTemplate: {
        html: "<div class='stacking-demo'>\n  <div class='parent-one'>\n    <div class='child-high'>Z-Index: 999</div>\n  </div>\n  <div class='parent-two'>\n    <div class='child-low'>Z-Index: 10</div>\n  </div>\n</div>",
        css: ".parent-one {\n  position: relative;\n  z-index: 1;\n  background: #fee2e2;\n  padding: 20px;\n  width: 150px;\n}\n\n.parent-two {\n  position: relative;\n  z-index: 2;\n  background: #dbeafe;\n  padding: 20px;\n  width: 150px;\n  margin-top: -30px;\n}\n\n.child-high {\n  position: absolute;\n  z-index: 999; /* Trapped! Still sits behind parent-two */\n  background: #ef4444;\n  color: white;\n}\n\n.child-low {\n  position: absolute;\n  z-index: 10;\n  background: #3b82f6;\n  color: white;\n}",
        js: ""
      },
      assessment: "Explain why Parent B stacks above Parent A, and why Parent A's child (z-index: 999) cannot render on top of Parent B."
    },
    {
      id: "d6-t5",
      title: "5. Mini Project: Interactive Layout Sandbox",
      customComponent: "CSSLayoutSandbox",
      explanation: "Synthesize box model geometry, box-sizing rules, offsets, and stacking contexts to build a complex modal widget. You will customize margins, padding, borders, backdrop positioning, sticky panels, and overlapping layers, watching how these rules combine to form a responsive interface.",
      progression: [
        {
          level: "easy",
          title: "Overlay Structure",
          content: "Use absolute/fixed positioning to layout a backdrop overlay and modal viewport. Anchor standard borders and padding metrics to define content shapes."
        },
        {
          level: "intermediate",
          title: "Internal Positioning offsets",
          content: "Position close buttons using absolute containment. Create sticky header components that stay pinned to the top of scrollable modal text contents."
        },
        {
          level: "advanced",
          title: "Stacking & Resizing Controls",
          content: "Adjust z-indexes to position the modal correctly above the backdrop. Test responsiveness by swapping box-sizing modes, and analyze how calculations affect grid alignment."
        }
      ],
      codeTemplate: {
        html: "<div class='modal-wrapper'>\n  <div class='modal-backdrop'></div>\n  <div class='modal-card'>\n    <button class='close-btn'>&times;</button>\n    <header class='modal-header'>\n      <h3>Interactive Layout Settings</h3>\n    </header>\n    <div class='modal-body'>\n      <p>Scroll down to review configuration details...</p>\n    </div>\n  </div>\n</div>",
        css: ".modal-wrapper {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.modal-backdrop {\n  position: absolute;\n  inset: 0;\n  background: rgba(15, 23, 42, 0.6);\n  z-index: 1;\n}\n\n.modal-card {\n  position: relative;\n  z-index: 2;\n  width: 90%;\n  max-width: 500px;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);\n  overflow: hidden; /* Contains children */\n}\n\n.close-btn {\n  position: absolute;\n  top: 16px;\n  right: 16px;\n  z-index: 10;\n  background: none;\n  border: none;\n  font-size: 1.5rem;\n  cursor: pointer;\n}",
        js: ""
      },
      assessment: "Build the modal widget structure. Implement absolute close tags, fixed backdrop layers, sticky titles, and verified box model widths."
    },
    {
      id: "w1-d6-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Core visual spacing demos, box model debugging tools, stacking context checklist, and solutions for the interactive modal sandbox.",
        duration: "15 mins",
        resources: [
          "Student Spacing & Positioning Worksheet (PDF)",
          "CSS Layout Challenges & Answers (ZIP)"
        ]
      }
    }
  ]
};
