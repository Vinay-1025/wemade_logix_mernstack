export const w2d2Data = {
  dayId: "w2-d2",
  dayTitle: "Day 2: Media Queries & Web Animations",
  topics: [
    {
      id: "w2-d2-t1",
      title: "1. Media Queries & Breakpoints",
      customComponent: "ResponsiveSimulator",
      explanation: "Responsive design ensures that your site layouts adapt smoothly to different viewports (mobile, tablet, desktop) without broken text or components. Media queries allow you to apply CSS conditionally based on viewport width, orientation, resolution, or other traits.",
      progression: [
        {
          level: "easy",
          title: "What is Responsive Design?",
          content: "Responsive design ensures that your elements resize, shift, or toggle display based on screen width. The base layout should scale fluidly first using percentage widths."
        },
        {
          level: "intermediate",
          title: "Declaring Media Queries",
          content: "Use the `@media` rule to write conditional styling block segments (e.g. `@media (min-width: 768px)` targets screen sizes wider than 768px)."
        },
        {
          level: "advanced",
          title: "Mobile-First Design",
          content: "In mobile-first design, write baseline styles for small viewports first (outside of media queries), then use progressive `min-width` media queries to expand the design for tablet and desktop views."
        }
      ],
      detailedReference: {
        summary: "Media queries form the core of responsive CSS layouts, allowing developers to target screen breakpoints and orientations.",
        keyConcepts: [
          { term: "Breakpoints", definition: "Specific viewport width coordinates (e.g. 480px, 768px, 1024px) where layout grids modify their track arrangements." },
          { term: "Mobile-First Styling", definition: "Writing CSS rules starting from mobile viewports, layer-loading desktop overrides with min-width constraints." }
        ],
        bestPractices: [
          "Always declare the viewport meta tag in the HTML head so mobile devices respect media queries.",
          "Prefer using `min-width` media queries for mobile-first workflows rather than cluttering with `max-width` overrides."
        ]
      },
      codeTemplate: {
        html: `<div class="responsive-box">Scale the simulator window!</div>`,
        css: `.responsive-box {
  background: #ef4444;
  padding: 20px;
  color: white;
  text-align: center;
  font-weight: bold;
  border-radius: 8px;
  transition: background 0.3s;
}

@media (min-width: 600px) {
  .responsive-box {
    background: #22c55e;
  }
}`,
        js: ""
      },
      assessment: "Write a media query that targets screens smaller than 480px."
    },
    {
      id: "w2-d2-t2",
      title: "2. CSS Transitions",
      customComponent: "CSSAnimationsPlayground",
      explanation: "Transitions allow you to change CSS property values smoothly over a given duration, instead of triggering changes instantly on hover or state change.",
      progression: [
        {
          level: "easy",
          title: "Intro to Transitions",
          content: "To create a transition, define the property you want to animate, the transition duration, and optional timing behaviors (e.g., `transition: background-color 0.3s`)."
        },
        {
          level: "intermediate",
          title: "Duration & Properties",
          content: "You can transition multiple properties at once, separating them with commas (e.g. `transition: transform 0.3s, opacity 0.5s`)."
        },
        {
          level: "advanced",
          title: "Transition Timing Functions",
          content: "Use timing functions (like `linear`, `ease-in`, `ease-out`, `ease-in-out`, or custom `cubic-bezier`) to control acceleration and deceleration curves."
        }
      ],
      detailedReference: {
        summary: "Transitions smooth the state changes on elements, providing a polished feeling for user interface triggers.",
        keyConcepts: [
          { term: "Timing Curves", definition: "Mathematical paths (like cubic-bezier) that govern the speed profiles of property transitions." }
        ],
        bestPractices: [
          "Only transition layout safe properties like `opacity` and `transform` to prevent browser reflow lag.",
          "Keep UI transition durations fast (150ms to 300ms) to ensure the interface feels responsive."
        ]
      },
      codeTemplate: {
        html: `<button class="transition-btn">Hover Me</button>`,
        css: `.transition-btn {
  background: #3b82f6;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.transition-btn:hover {
  background: #06b6d4;
  transform: scale(1.1);
}`,
        js: ""
      },
      assessment: "Explain the difference between a linear and an ease timing function."
    },
    {
      id: "w2-d2-t3",
      title: "3. Keyframe Animations",
      customComponent: "CSSAnimationsPlayground",
      explanation: "While transitions require a trigger to animate between two states, Keyframe animations let you define complex, multi-step, self-running visual timelines that execute automatically.",
      progression: [
        {
          level: "easy",
          title: "Keyframe Rules",
          content: "Define animation milestones using the `@keyframes` block, specifying style properties at key milestones (like `from` and `to` or `0%` and `100%`)."
        },
        {
          level: "intermediate",
          title: "Percentage Steps",
          content: "Declare percentages (0%, 25%, 50%, 100%) to specify exact layout values throughout the animation timeline sequence."
        },
        {
          level: "advanced",
          title: "Animation Subproperties",
          content: "Use configurations like `animation-name`, `animation-duration`, `animation-iteration-count` (like `infinite`), and `animation-direction` (like `alternate`)."
        }
      ],
      detailedReference: {
        summary: "Keyframes allow CSS components to cycle through sequential visual timelines without scripting dependencies.",
        keyConcepts: [
          { term: "Milestones", definition: "Percentage values within keyframe bindings defining visual styles at intervals." }
        ],
        bestPractices: [
          "Use keyframe loops for subtle UI attention-grabbers (like pulsing notification dots or loading spinners).",
          "Ensure loop animations respect accessibility modes (`prefers-reduced-motion`) to prevent user discomfort."
        ]
      },
      codeTemplate: {
        html: `<div class="spinning-wheel"></div>`,
        css: `.spinning-wheel {
  width: 50px;
  height: 50px;
  border: 5px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}`,
        js: ""
      },
      assessment: "How do you make an animation repeat forever?"
    },
    {
      id: "w2-d2-t4",
      title: "4. Transitioning Layout States",
      customComponent: "CSSAnimationsPlayground",
      explanation: "By combining CSS transitions with JavaScript class listing triggers, we can animate visual state transformations (like sliding menus, opening modals, or folding accordion drawers).",
      progression: [
        {
          level: "easy",
          title: "Interactive Classes",
          content: "Write classes (like `.open`, `.active`) defining layout changes, and add or remove them dynamically via JS click handlers."
        },
        {
          level: "intermediate",
          title: "Transitioning Layout Offsets",
          content: "Transition translate positions (`transform: translateX(-100%)` to `translateX(0)`) to slide panels smoothly onto the screen."
        },
        {
          level: "advanced",
          title: "GPU Hardware Acceleration",
          content: "Transitioning coordinates like `left` or `top` forces the browser to recalculate the page layout (reflow) on every frame. Using `transform` uses hardware acceleration for smooth rendering."
        }
      ],
      detailedReference: {
        summary: "Animating class additions via transitions provides standard layout transition patterns while maintaining fast rendering speeds.",
        keyConcepts: [
          { term: "Browser Reflows", definition: "Recalculations of layout shapes that block UI frame updates and lag visual renders." }
        ],
        bestPractices: [
          "Prefer transitioning `transform` and `opacity` properties to prevent page rendering performance drops.",
          "Use hidden visibility attributes or `pointer-events: none` to keep offscreen drawer links from being clicked."
        ]
      },
      codeTemplate: {
        html: `<div id="sidebar" class="drawer">Menu Content</div>
<button id="toggle-drawer">Toggle Menu</button>`,
        css: `.drawer {
  width: 200px;
  height: 100px;
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  padding: 10px;
  transform: translateX(-110%);
  transition: transform 0.3s ease;
}
.drawer.open {
  transform: translateX(0);
}`,
        js: `document.getElementById('toggle-drawer').onclick = () => {
  document.getElementById('sidebar').classList.toggle('open');
};`
      },
      assessment: "Why is transitioning 'transform: translateX' better than transitioning 'left' property?"
    },
    {
      id: "w2-d2-t5",
      title: "5. Advanced Animation Controls",
      customComponent: "CSSAnimationsPlayground",
      explanation: "Fine-tune animations using subproperties to stagger elements, capture final frames, or play/pause timelines dynamically.",
      progression: [
        {
          level: "easy",
          title: "Play/Pause States",
          content: "Control playback states directly using the `animation-play-state` property (set to `running` or `paused`)."
        },
        {
          level: "intermediate",
          title: "Animation Delay",
          content: "Use `animation-delay` to stagger multiple entering nodes, creating structured sequential entry animations."
        },
        {
          level: "advanced",
          title: "Animation Fill Mode",
          content: "By default, animations reset when finished. Use `animation-fill-mode: forwards` to make the element freeze at its final keyframe values."
        }
      ],
      detailedReference: {
        summary: "Fill modes and offsets grant developers full timeline control, enabling staggered entrance sequences.",
        keyConcepts: [
          { term: "Animation Delay", definition: "A pause duration before the timeline triggers, used for staggering." },
          { term: "Fill Modes", definition: "Parameters (like forwards or backwards) determining element styles when animations are idle." }
        ],
        bestPractices: [
          "Use `animation-fill-mode: forwards` on entrance animations so objects don't flash back to invisible states.",
          "Use inline styles or CSS variables to configure staggered delays (`animation-delay: 0.1s`, `0.2s`) inside lists."
        ]
      },
      codeTemplate: {
        html: `<div class="fade-box">Stays visible!</div>`,
        css: `.fade-box {
  opacity: 0;
  padding: 20px;
  background: var(--primary-cyan, #00d1d1);
  color: #0f172a;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  animation: fadeIn 2s forwards;
}
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}`,
        js: ""
      },
      assessment: "What does animation-fill-mode: forwards accomplish?"
    },
    {
      id: "w2-d2-t6",
      title: "6. Assignment Task - Interactive Animated Portfolio Section",
      customComponent: "CSSAnimationsPlayground",
      explanation: "Create a highly responsive and interactive Portfolio layout. You must implement multiple breakpoints using media queries, configure smooth hover transitions on cards, declare custom keyframe animations, and stagger child entrances using delays.",
      progression: [
        {
          level: "easy",
          title: "Responsive Portfolio Grid",
          content: "Style a portfolio project grid that displays 3 columns on desktop, 2 columns on tablets, and collapses to 1 column on mobile devices."
        },
        {
          level: "intermediate",
          title: "Card Transition Effects",
          content: "Implement custom hover transitions on cards, modifying scales, shadow offsets, and overlay captions on mouse trigger."
        },
        {
          level: "advanced",
          title: "Staggered Keyframe Animations",
          content: "Declare entrance keyframe animations to fade and slide cards into place on load. Add staggered animation-delays to each card."
        }
      ],
      codeTemplate: {
        html: `<div class="portfolio">
  <h2 class="section-title">My Projects</h2>
  <div class="portfolio-grid">
    <div class="project-card" style="animation-delay: 0.1s">
      <img src="https://picsum.photos/300/200?random=1" alt="Project 1">
      <div class="card-info">
        <h3>E-Commerce Platform</h3>
        <p>Built with React & Node.js</p>
      </div>
    </div>
    <div class="project-card" style="animation-delay: 0.2s">
      <img src="https://picsum.photos/300/200?random=2" alt="Project 2">
      <div class="card-info">
        <h3>Analytics Dashboard</h3>
        <p>Built with CSS Grid & ChartJS</p>
      </div>
    </div>
    <div class="project-card" style="animation-delay: 0.3s">
      <img src="https://picsum.photos/300/200?random=3" alt="Project 3">
      <div class="card-info">
        <h3>Chat Application</h3>
        <p>Built with Socket.io & MongoDB</p>
      </div>
    </div>
  </div>
</div>`,
        css: `:root {
  --accent: #00d1d1;
  --shadow: rgba(0, 0, 0, 0.15);
}

.portfolio {
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 30px;
  opacity: 0;
  animation: slideInDown 0.8s ease forwards;
  color: white;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.project-card {
  background: #1e293b;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px var(--shadow);
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.6s ease forwards;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  border: 1px solid #334155;
  color: white;
}

.project-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 209, 209, 0.2);
  border-color: var(--accent);
}

.card-info {
  padding: 16px;
}

.card-info h3 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
}

.card-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #94a3b8;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .portfolio-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }
  .section-title {
    font-size: 1.8rem;
  }
}`,
        js: ""
      },
      assessment: "Discuss how keyframes, animation subproperties, and staggered timing delays improve page load user experience."
    },
    {
      id: "w2-d2-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Mobile viewport simulation guides, hover state transition audits, keyframes coding syntax, and solutions for the animated portfolio card list.",
        duration: "15 mins",
        resources: [
          "Student Animations Worksheet (PDF)",
          "Animated Portfolio Solutions (ZIP)"
        ]
      }
    }
  ]
};
