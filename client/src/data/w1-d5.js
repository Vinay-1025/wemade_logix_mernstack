export const w1d5Data = {
  dayId: "w1-d5",
  dayTitle: "Day 5: CSS Selectors, Colors, Fonts & Units",
  topics: [
    {
      id: "d5-t1",
      title: "1. CSS Selectors & Specificity",
      customComponent: "CSSSelectorsLab",
      explanation: "CSS Selectors are used to target the HTML elements on our web pages that we want to style. They range from simple tag names to complex combinations of classes, IDs, attributes, and pseudo-states. When multiple conflicting CSS rules target the same element, the browser uses Specificity (a weight-matching hierarchy) to determine which rule wins.",
      progression: [
        {
          level: "easy",
          title: "Basic Selectors (Tag, Class, ID)",
          content: "Tag Selectors target all elements of a type (e.g. `p` targets all paragraphs). Class Selectors (prefixed with `.`) target elements sharing a class name (e.g. `.btn`). ID Selectors (prefixed with `#`) target a single unique element (e.g. `#header`). ID selectors are highly specific and should be used sparingly."
        },
        {
          level: "intermediate",
          title: "Combinators & Attribute Selectors",
          content: "Combinators define relationships: Descendant (`div p` targets any `p` inside a `div`), Child (`div > p` targets only direct children), Adjacent Sibling (`h1 + p` targets the immediate next sibling), and General Sibling (`h1 ~ p`). Attribute Selectors target elements based on attributes (e.g., `input[type='email']` or `[data-status='active']`)."
        },
        {
          level: "advanced",
          title: "Pseudo-classes, Pseudo-elements & Specificity Formula",
          content: "Pseudo-classes represent states (e.g., `:hover`, `:nth-child(2)`). Pseudo-elements style specific parts (e.g. `::before`, `::first-letter`). Specificity is calculated as a 3-part score: (ID, Class/Attribute/Pseudo-class, Element/Pseudo-element). An ID score of `(1, 0, 0)` always beats any class score of `(0, 10, 0)`. The `!important` flag overrides all standard specificity rules, but is considered a bad practice."
        }
      ],
      detailedReference: {
        summary: "CSS Selectors act as the query engine for HTML documents, mapping style rules to specific DOM nodes. Specificity ensures that conflicts are resolved deterministically.",
        keyConcepts: [
          { "term": "Selector Weight (Specificity)", "definition": "A 3-tuple calculation (A, B, C) where A is the count of ID selectors, B is the count of class selectors, attributes, and pseudo-classes, and C is the count of element/pseudo-element selectors." },
          { "term": "Combinator Relationships", "definition": "Rules that query elements based on their spatial position in the DOM relative to other elements (descendant, child, adjacent sibling, or general sibling)." },
          { "term": "Pseudo-State Triggers", "definition": "Dynamic selectors that apply styles only when elements match particular states, such as hovering, focus, active inputs, or specific positions in child lists." }
        ],
        bestPractices: [
          "Keep CSS selector specificity as low as possible to make styles easy to override and maintain.",
          "Prefer class-based styling (`.card-title`) over deeply nested selectors (`div > ul > li > span.title`) to prevent layout coupling.",
          "Avoid using `!important` unless overriding inline styles from third-party scripts where you have no file control."
        ]
      },
      codeTemplate: {
        html: "<div class='card' id='featured-card'>\n  <h3 class='title'>Product Title</h3>\n  <p>Some description text with a <span class='highlight'>special word</span>.</p>\n  <button class='btn' data-type='primary'>Buy Now</button>\n</div>",
        css: "/* Basic styling with low specificity */\n.card {\n  border: 1px solid #cbd5e1;\n  padding: 16px;\n  border-radius: 8px;\n}\n\n/* Class selector */\n.card .title {\n  color: #1e3a8a;\n  margin-top: 0;\n}\n\n/* Attribute selector */\n.btn[data-type='primary'] {\n  background-color: #3b82f6;\n  color: white;\n  border: none;\n  padding: 8px 16px;\n  border-radius: 4px;\n  cursor: pointer;\n}\n\n/* Pseudo-class */\n.btn[data-type='primary']:hover {\n  background-color: #2563eb;\n}\n\n/* Child combinator */\n.card > p {\n  line-height: 1.5;\n}",
        js: ""
      },
      assessment: "Calculate the specificity score of the selector: `div.card #featured-card ul li a:hover`. Which rules take precedence?"
    },
    {
      id: "d5-t2",
      title: "2. CSS Colors & Contrast",
      customComponent: "CSSColorsPlayground",
      explanation: "Colors bring life to web design, but they must be applied with care to ensure readability and accessibility. CSS supports multiple color formats, each with different advantages, alongside opacity filters and alpha channels for handling transparency. Under WCAG rules, text colors must maintain high contrast ratios against backgrounds so all users can read them.",
      progression: [
        {
          level: "easy",
          title: "Color Formats (Names, HEX, RGB)",
          content: "CSS supports 140 standard named colors (e.g. `red`, `darkblue`). HEX (Hexadecimal) codes specify Red, Green, and Blue intensity in base-16 (e.g. `#FF0000` is pure red, `#3b82f6` is a clean blue). RGB format represents values as 0 to 255 (e.g. `rgb(59, 130, 246)`)."
        },
        {
          level: "intermediate",
          title: "HSL Format & Transparency (Alpha Channel)",
          content: "HSL (Hue, Saturation, Lightness) is the most intuitive format for designers: Hue is a degree on the color wheel (0-360), Saturation is percentage intensity (0-100%), and Lightness is brightness (0-100%). Alpha channels add opacity values from `0` (fully transparent) to `1` (fully opaque) using HEX (e.g., `#3b82f680` for 50% opacity), `rgba()`, or `hsla()` formats."
        },
        {
          level: "advanced",
          title: "WCAG Contrast Ratios & Web Accessibility",
          content: "Web accessibility standards (WCAG 2.1) require text colors to have a minimum contrast ratio against the background. For standard body text, Level AA requires a contrast ratio of at least `4.5:1` (and `3:1` for large text). Level AAA requires a strict `7:1` ratio. Using tools to measure color contrast is essential for building inclusive interfaces."
        }
      ],
      detailedReference: {
        summary: "Color declaration formats define RGB light mixtures or HSL coordinates. The integration of alpha transparency and WCAG color contrast validation ensures design appeal is coupled with full accessibility.",
        keyConcepts: [
          { "term": "HSL Color Model", "definition": "A coordinate system matching human perception of color, facilitating easy calculation of lighter, darker, warmer, or cooler shades by editing a single channel parameter." },
          { "term": "Alpha Channel Transparency", "definition": "A floating-point parameter (0.0 to 1.0) defining background transmission capabilities, allowing elements behind to bleed through without affecting child text nodes (unlike opacity properties)." },
          { "term": "WCAG Contrast Ratios", "definition": "A mathematical formula comparing the relative luminance of two colors, determining readability for users with low vision or color-blindness." }
        ],
        bestPractices: [
          "Prefer HSL color values when programmatically generating palettes or creating dynamic theme controls.",
          "Use HSL or RGBA for transparent backgrounds (`background: rgba(0,0,0,0.1)`) instead of setting `opacity: 0.1` on the entire element, as opacity forces all children (including text) to fade.",
          "Validate all text-to-background combinations against WCAG AA standards using automated checkers during the design phase."
        ]
      },
      codeTemplate: {
        html: "<div class='color-demo'>\n  <div class='contrast-box-good'>\n    <h4>High Contrast (Passes AA & AAA)</h4>\n    <p>This dark background with white text has a contrast ratio of over 10:1, making it highly readable.</p>\n  </div>\n  <div class='contrast-box-bad'>\n    <h4>Low Contrast (Fails WCAG)</h4>\n    <p>Light yellow text on a light gray background is extremely hard for most people to read.</p>\n  </div>\n</div>",
        css: "/* Using HSL and Alpha */\n.contrast-box-good {\n  background-color: hsla(220, 40%, 15%, 0.95);\n  color: hsl(220, 100%, 98%);\n  padding: 20px;\n  border-radius: 8px;\n  margin-bottom: 12px;\n}\n\n.contrast-box-bad {\n  background-color: #f1f5f9;\n  color: #fef08a; /* Soft yellow - bad contrast on light gray! */\n  padding: 20px;\n  border-radius: 8px;\n}",
        js: ""
      },
      assessment: "Determine why applying `opacity: 0.5` to a modal card will make its white text semi-transparent. Provide a CSS solution using alpha channels instead."
    },
    {
      id: "d5-t3",
      title: "3. CSS Typography & Fonts",
      customComponent: "CSSTypographyExplorer",
      explanation: "Typography dictates how users read and process content. Beyond selecting font families, professional web typography requires fine control over font weights, line spacing, alignments, and importing external Google Web Fonts to customize the app's aesthetic.",
      progression: [
        {
          level: "easy",
          title: "Font Families & Fallbacks",
          content: "Web typography uses Font Stacks. If a user doesn't have your primary font installed, the browser falls back through a list (e.g. `font-family: 'Inter', Arial, sans-serif`). Five generic families are: `serif` (flared corners), `sans-serif` (clean lines), `monospace` (fixed-width code), `cursive` (handwritten), and `fantasy` (decorative)."
        },
        {
          level: "intermediate",
          title: "Sizing, Alignment & Formatting",
          content: "We style fonts with size (`font-size`), weight (`font-weight`, e.g., 400 for regular, 700 for bold), style (`font-style: italic`), and alignment (`text-align: center/justify/left`). We can control capitalization using `text-transform` (e.g., `uppercase`, `capitalize`) and add decorations like underlines using `text-decoration`."
        },
        {
          level: "advanced",
          title: "Micro-typography & Custom Web Fonts",
          content: "External fonts are loaded using `@import` or `<link>` tags (like Google Fonts). Micro-typography parameters include `line-height` (vertical space between lines, best kept around `1.5` for readability) and `letter-spacing` (horizontal character tracking). For high-performance rendering, designers use variable fonts which pack multiple weights and styles into a single file."
        }
      ],
      detailedReference: {
        summary: "CSS Typography defines the rendering rules for text layouts. Using correct line-heights, letter-spacings, and optimized font-fallback stacks ensures reading comfort and quick load times.",
        keyConcepts: [
          { "term": "Font Fallback Stack", "definition": "A list of fonts declared in order of priority. The browser evaluates each font in the stack against local systems, falling back until a matching glyph library is found." },
          { "term": "Line-Height (Leading)", "definition": "The vertical space allocated to inline text lines. Standard readable layouts require line-height ratios of 1.4 to 1.6 times the font size." },
          { "term": "Letter-Spacing (Tracking)", "definition": "The horizontal separation between glyphs, adjusted to tighten large headers or loosen small, uppercase labels." }
        ],
        bestPractices: [
          "Always include a generic fallback (like `sans-serif` or `serif`) at the very end of your `font-family` declarations.",
          "Use unitless numbers for `line-height` (e.g. `line-height: 1.5`) so it scales proportionally when the `font-size` is adjusted.",
          "Do not load more than 2 or 3 font weights/styles from Google Fonts to avoid increasing the initial page load time."
        ]
      },
      codeTemplate: {
        html: "<article class='article-preview'>\n  <span class='category'>Education</span>\n  <h2 class='headline'>Designing Premium Typography Systems</h2>\n  <p class='lead'>Line spacing and font weight selection directly control how easily a reader absorbs information on mobile devices.</p>\n</article>",
        css: "/* Importing Outfit from Google Fonts */\n@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700&display=swap');\n\n.article-preview {\n  font-family: 'Outfit', sans-serif;\n  max-width: 500px;\n}\n\n.category {\n  font-size: 0.75rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.1em;\n  color: #3b82f6;\n}\n\n.headline {\n  font-size: 2rem;\n  font-weight: 700;\n  line-height: 1.2;\n  color: #0f172a;\n  margin: 8px 0 12px 0;\n}\n\n.lead {\n  font-size: 1rem;\n  font-weight: 300;\n  line-height: 1.6;\n  color: #475569;\n}",
        js: ""
      },
      assessment: "Explain the difference between a serif and a sans-serif font family, and list a scenario where you would choose monospace over cursive."
    },
    {
      id: "d5-t4",
      title: "4. CSS Units & Sizing",
      customComponent: "CSSUnitsComparator",
      explanation: "CSS units define the dimensions of margins, padding, text, and containers. Selecting the correct units is the cornerstone of responsive design, allowing layouts to scale fluidly when viewports shrink or when users adjust their default browser font sizes.",
      progression: [
        {
          level: "easy",
          title: "Absolute Units: Pixels (px)",
          content: "Pixels (`px`) are absolute units that represent a fixed size on the screen (regardless of zoom or screen type). They are ideal for precise styling like thin borders or small dividers, but fail to adjust when users increase browser font sizes for readability."
        },
        {
          level: "intermediate",
          title: "Relative Units (em, rem, %)",
          content: "`rem` is relative to the Root element's font-size (usually 16px by default, so `2rem = 32px`). `em` is relative to the font-size of the element itself or its parent (useful for padding that scales with text size). Percentage (`%`) sizes containers relative to their parent container's size."
        },
        {
          level: "advanced",
          title: "Viewport Units (vw, vh) & Boundary Limits",
          content: "Viewport units scale relative to the browser viewport: `1vw` is 1% of the viewport width, and `1vh` is 1% of the viewport height. To build robust grids, developers combine units with boundary properties like `min-width`, `max-width` (e.g. `width: 90%; max-width: 1200px`), and helper functions like `clamp()` or `calc()`."
        }
      ],
      detailedReference: {
        summary: "CSS Units regulate the scaling behavior of layouts. Utilizing relative rem/em units for typography/spacing and fluid percentages/viewport units for container grids allows layouts to adapt to any device.",
        keyConcepts: [
          { "term": "rem vs em Relative Sizing", "definition": "rem values calculate dimensions relative to the root html node font-size. em values calculate dimensions relative to the font-size of their immediate local DOM container." },
          { "term": "Viewport Layout Units", "definition": "Measurement scales calculated directly from the device window viewport width (vw) and height (vh), adapting instantly to browser window resizing." },
          { "term": "Boundary Constraint Rules", "definition": "CSS properties (min-width, max-height) that place caps on fluid layout units, preventing elements from becoming unreadable on massive desktop monitors or breaking on ultra-narrow mobile displays." }
        ],
        bestPractices: [
          "Use `rem` units for all typography, padding, and margins to respect the user's browser accessibility zoom preferences.",
          "Use percentages (`%`) or viewport units (`vw`/`vh`) for layout structures, but always combine them with a flat `max-width` boundary to maintain control.",
          "Use `em` units specifically for button padding or icon spacing, so that they scale automatically when the button's local `font-size` is adjusted."
        ]
      },
      codeTemplate: {
        html: "<div class='fluid-container'>\n  <div class='scaling-box'>\n    <h3>Responsive Box</h3>\n    <p>I scale with viewport width, but I have a hard limit of 800px so I don't stretch indefinitely.</p>\n  </div>\n</div>",
        css: ".fluid-container {\n  width: 100vw;\n  height: 50vh;\n  background: #f1f5f9;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.scaling-box {\n  /* Fluid width with hard upper limit */\n  width: 80%;\n  max-width: 800px;\n  background: white;\n  /* rem units for padding */\n  padding: 2rem;\n  border-radius: 0.75rem;\n  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n}\n\n.scaling-box h3 {\n  font-size: 1.5rem; /* scales to 24px by default */\n  margin-top: 0;\n}",
        js: ""
      },
      assessment: "If the root font-size is 16px, what is the computed pixel width of an element styled with `width: 25rem`? What if the user increases their browser font-size to 20px?"
    },
    {
      id: "d5-t5",
      title: "5. Mini Project: Dynamic Product Showcase Card",
      customComponent: "CSSCardCustomizer",
      explanation: "Apply everything you have learned about selectors, colors, web fonts, and relative sizing to build a premium product card component. This project challenges you to style an interactive, responsive layout using only CSS tokens and classes, ensuring high contrast, clean typography, and a fluid layout.",
      progression: [
        {
          level: "easy",
          title: "Structural Layout",
          content: "Build the card skeleton using HTML5 semantic tags. Set up a base wrapper styled with relative rem units, soft borders, and a clean sans-serif typeface stack."
        },
        {
          level: "intermediate",
          title: "Aesthetic Styling",
          content: "Apply a custom color theme using HSL variables. Use attribute selectors to style active status badges (e.g. `[data-status='in-stock']`). Add custom padding and margin spacing using `rem` for margins and `em` for buttons."
        },
        {
          level: "advanced",
          title: "Interactions & Accessibility",
          content: "Implement smooth transitions on hover. Validate contrast ratios to ensure that text labels overlaying backgrounds pass WCAG standards. Add focus states for interactive button selectors to support keyboard accessibility."
        }
      ],
      codeTemplate: {
        html: "<div class='product-card'>\n  <div class='badge' data-status='sale'>NEW ARRIVAL</div>\n  <div class='product-image-container'>\n    <img src='https://picsum.photos/400/300' alt='Premium Wireless Headphones'>\n  </div>\n  <div class='product-info'>\n    <span class='category-label'>AUDIO</span>\n    <h3 class='product-title'>SoundLink Pro Headphones</h3>\n    <p class='product-description'>Experience pure acoustic bliss with adaptive active noise cancellation and up to 40 hours of battery life.</p>\n    <div class='price-row'>\n      <span class='current-price'>$249.99</span>\n      <span class='old-price'>$299.99</span>\n    </div>\n    <button class='add-to-cart-btn'>Add to Cart</button>\n  </div>\n</div>",
        css: "@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap');\n\n:root {\n  --brand-primary: hsl(220, 95%, 50%);\n  --brand-hover: hsl(220, 90%, 40%);\n  --card-bg: hsl(0, 0%, 100%);\n  --text-dark: hsl(224, 71%, 4%);\n  --text-light: hsl(215, 16%, 47%);\n}\n\n.product-card {\n  font-family: 'Plus Jakarta Sans', sans-serif;\n  background: var(--card-bg);\n  max-width: 380px;\n  border-radius: 1rem;\n  border: 1px solid hsl(214, 32%, 91%);\n  overflow: hidden;\n  position: relative;\n  transition: all 0.3s ease;\n}\n\n.product-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 30px rgba(0,0,0,0.06);\n}\n\n.badge[data-status='sale'] {\n  position: absolute;\n  top: 1rem;\n  left: 1rem;\n  background: hsl(0, 84%, 60%);\n  color: white;\n  font-size: 0.7rem;\n  font-weight: 700;\n  padding: 0.35rem 0.75rem;\n  border-radius: 2rem;\n  z-index: 10;\n}\n\n.product-image-container img {\n  width: 100%;\n  height: 200px;\n  object-fit: cover;\n}\n\n.product-info {\n  padding: 1.5rem;\n}\n\n.category-label {\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.05em;\n  color: var(--brand-primary);\n}\n\n.product-title {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--text-dark);\n  margin: 0.5rem 0;\n}\n\n.product-description {\n  font-size: 0.875rem;\n  color: var(--text-light);\n  line-height: 1.5;\n  margin-bottom: 1.25rem;\n}\n\n.price-row {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  margin-bottom: 1.25rem;\n}\n\n.current-price {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--text-dark);\n}\n\n.old-price {\n  text-decoration: line-through;\n  color: var(--text-light);\n  font-size: 0.95rem;\n}\n\n.add-to-cart-btn {\n  width: 100%;\n  background: var(--brand-primary);\n  color: white;\n  border: none;\n  padding: 0.75rem;\n  border-radius: 0.5rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.2s ease;\n}\n\n.add-to-cart-btn:hover {\n  background: var(--brand-hover);\n}",
        js: ""
      },
      assessment: "Build the Product Showcase Card. Ensure that when users hover over the CTA button, it matches details using pseudo-classes, and that text contrast satisfies Level AA rules."
    },
    {
      id: "w1-d5-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Important talking points, structural timeline, common student pitfalls, and solutions for this session.",
        duration: "15 mins",
        resources: [
          "Student Hands-on Lab Worksheet (PDF)",
          "Reference Code & Solutions (ZIP)"
        ]
      }
    }
  ]
};
