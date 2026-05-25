export const w2d6Data = {
  dayId: "w2-d6",
  dayTitle: "Day 6: JavaScript Array Methods",
  topics: [
    {
      id: "w2-d6-t1",
      title: "1. Basic Array Operations",
      customComponent: "ArrayMethodsViz",
      explanation: "Arrays are ordered lists of data. JavaScript provides core methods to add and remove items at the end or start of an array, mutating the list dynamically.",
      progression: [
        {
          level: "easy",
          title: "Adding / Removing at End",
          content: "Use `push(val)` to append an item to the end of an array. Use `pop()` to remove and return the final element of the array."
        },
        {
          level: "intermediate",
          title: "Adding / Removing at Start",
          content: "Use `unshift(val)` to insert an item at the absolute beginning of an array (shifting indices). Use `shift()` to remove and return the first element."
        },
        {
          level: "advanced",
          title: "Splicing & Slicing Lists",
          content: "Use `slice(start, end)` to copy a section of an array into a new list. Use `splice(index, count, items...)` to add, delete, or replace items at any index position."
        }
      ],
      detailedReference: {
        summary: "Arrays are indexed reference structures. Core stack/queue methods mutate the collection inline.",
        keyConcepts: [
          { term: "Queue Operations", definition: "Combination of unshift and shift, adding at start and removing at start respectively." }
        ],
        bestPractices: [
          "Use `push` and `pop` over `unshift` and `shift` for large lists to avoid re-indexing all items.",
          "Use `slice()` without arguments to quickly clone an array."
        ]
      },
      codeTemplate: {
        html: `<div id="basic-out"></div>`,
        css: "",
        js: `const list = [2, 3, 4];
list.push(5);       // [2, 3, 4, 5]
list.unshift(1);    // [1, 2, 3, 4, 5]
const item = list.pop(); // [1, 2, 3, 4]

document.getElementById('basic-out').innerText = 
  \`List: [\${list.join(', ')}], Popped: \${item}\`;`
      },
      assessment: "Explain the difference between slice and splice methods in JavaScript."
    },
    {
      id: "w2-d6-t2",
      title: "2. Mapping Arrays (.map)",
      customComponent: "ArrayMethodsViz",
      explanation: "The `.map()` method is a higher-order array method that creates a brand new array by applying a callback transformation function to every item in the original array.",
      progression: [
        {
          level: "easy",
          title: "Map Basics",
          content: "`.map()` walks through each element, executes a callback function on it, and collects returned values into a new array of matching length."
        },
        {
          level: "intermediate",
          title: "Objects Mapping",
          content: "Use `.map()` to pluck specific properties from a list of objects (e.g. mapping an array of user objects to a clean list of name strings)."
        },
        {
          level: "advanced",
          title: "Immutable Operations",
          content: "`.map()` does not modify (mutate) the original array, which is a key concept in functional programming and state management architectures (like React)."
        }
      ],
      detailedReference: {
        summary: "Map processes elements through a callback, building a matching-length collection without side-effects.",
        keyConcepts: [
          { term: "Immutability", definition: "A practice where data is never updated directly; instead, new data structures are built to reflect state changes." }
        ],
        bestPractices: [
          "Always return a value inside the `.map()` callback function.",
          "Do not use `.map()` if you do not plan to use the returned array; use `.forEach()` instead."
        ]
      },
      codeTemplate: {
        html: `<div id="map-out"></div>`,
        css: "",
        js: `const prices = [10, 20, 30];
const doublePrices = prices.map(p => p * 2);

document.getElementById('map-out').innerText = 
  \`Original: [\${prices.join(', ')}], Mapped: [\${doublePrices.join(', ')}]\`;`
      },
      assessment: "Write a map expression that takes an array of strings and returns their lengths."
    },
    {
      id: "w2-d6-t3",
      title: "3. Filtering Arrays (.filter)",
      customComponent: "ArrayMethodsViz",
      explanation: "The `.filter()` method returns a new array containing only the elements that pass a logical true/false test implemented by the callback function.",
      progression: [
        {
          level: "easy",
          title: "Filter Basics",
          content: "`.filter()` runs a test function on each item. If the callback returns a truthy value, the item is kept; if falsy, it is discarded."
        },
        {
          level: "intermediate",
          title: "Predicate Expressions",
          content: "Write clean inline arrow checks (predicate functions) (e.g., `list.filter(x => x % 2 === 0)` to keep even numbers)."
        },
        {
          level: "advanced",
          title: "Combining Map & Filter",
          content: "Since both `.map()` and `.filter()` return new arrays, you can chain them together (e.g., filter numbers first, then double the remaining ones)."
        }
      ],
      detailedReference: {
        summary: "Filter creates subsets of array nodes based on predicate truth thresholds.",
        keyConcepts: [
          { term: "Predicate Function", definition: "A callback function executing a logical check on elements that returns true or false." }
        ],
        bestPractices: [
          "Ensure your callback returns a boolean value (or truthy/falsy check).",
          "When chaining methods, put `.filter()` before `.map()` to avoid executing transformations on items you will discard anyway."
        ]
      },
      codeTemplate: {
        html: `<div id="filter-out"></div>`,
        css: "",
        js: `const scores = [45, 80, 55, 92, 70];
const passing = scores.filter(score => score >= 60);

document.getElementById('filter-out').innerText = 
  \`Passing scores: [\${passing.join(', ')}]\`;`
      },
      assessment: "Write a filter statement that removes empty strings from an array of text values."
    },
    {
      id: "w2-d6-t4",
      title: "4. Reducing Arrays (.reduce)",
      customComponent: "ArrayMethodsViz",
      explanation: "The `.reduce()` method runs a callback aggregator function on each element of the array, returning a single accumulated value (such as a sum, average, or unified object).",
      progression: [
        {
          level: "easy",
          title: "Reduce Basics",
          content: "`.reduce()` takes a callback with an accumulator and the current element, plus an initial value (e.g. `list.reduce((acc, curr) => acc + curr, 0)`)."
        },
        {
          level: "intermediate",
          title: "Accumulator Initializer",
          content: "Always specify the initial value parameter. If omitted, reduce uses the first array element, which can crash on empty arrays."
        },
        {
          level: "advanced",
          title: "Complex Reductions",
          content: "Use `.reduce()` to transform an array into an object (e.g. counting the occurrences of tags or grouping records by category)."
        }
      ],
      detailedReference: {
        summary: "Reduce processes collections into single values by carrying state across accumulator cycles.",
        keyConcepts: [
          { term: "Accumulator", definition: "A running total variable holding compiled outputs returned by previous loop cycles." }
        ],
        bestPractices: [
          "Always provide an initial value (like `0`, `[]`, or `{}`) as the second argument to `.reduce()`.",
          "Use simpler loops or array methods if you only need basic iterations, as `.reduce()` can be harder to read for beginners."
        ]
      },
      codeTemplate: {
        html: `<div id="reduce-out"></div>`,
        css: "",
        js: `const expenses = [5.99, 12.50, 45.00];
const total = expenses.reduce((accumulator, current) => {
  return accumulator + current;
}, 0);

document.getElementById('reduce-out').innerText = 
  \`Total: \$\${total.toFixed(2)}\`;`
      },
      assessment: "Explain the purpose of the initial value parameter in the reduce method."
    },
    {
      id: "w2-d6-t5",
      title: "5. Chaining Array Methods",
      customComponent: "ArrayMethodsViz",
      explanation: "Since map and filter return brand new arrays, you can chain them together to execute complex data processing pipelines in a single readable block of code.",
      progression: [
        {
          level: "easy",
          title: "Chaining Basics",
          content: "Connect array calls using dots (e.g. `list.filter(...).map(...)`). The output of each step is passed as the input to the next."
        },
        {
          level: "intermediate",
          title: "Data Pipeline Flows",
          content: "Filter raw records down, map to extract fields, and reduce to compute aggregates. This is a standard functional data pipeline pattern."
        },
        {
          level: "advanced",
          title: "Performance Traps",
          content: "Every chained method creates a new array in memory and iterates over the elements. For huge datasets, consider using a single `.reduce()` or a standard `for` loop to optimize execution time."
        }
      ],
      detailedReference: {
        summary: "Chaining connects functional data operations into clean transformation pipelines.",
        keyConcepts: [
          { term: "Method Chaining", definition: "Invoking sequential operations directly on the returned data types of previous operations." }
        ],
        bestPractices: [
          "Format chained methods on separate lines to keep the pipeline easy to read.",
          "Ensure each middle step returns an array so the next method can be invoked without throwing errors."
        ]
      },
      codeTemplate: {
        html: `<div id="chain-out"></div>`,
        css: "",
        js: `const items = [
  { name: 'Notebook', price: 5, tax: false },
  { name: 'Laptop', price: 1000, tax: true },
  { name: 'Mouse', price: 30, tax: true }
];

const totalTaxedPrice = items
  .filter(item => item.tax)
  .map(item => item.price * 1.1)
  .reduce((total, price) => total + price, 0);

document.getElementById('chain-out').innerText = 
  \`Total Taxed Price: \$\${totalTaxedPrice.toFixed(2)}\`;`
      },
      assessment: "Write a chained expression that takes a numbers array, filters out even numbers, and returns their sum."
    },
    {
      id: "w2-d6-t6",
      title: "6. Assignment Task - Array Analytics & Aggregator",
      customComponent: "ArrayMethodsViz",
      explanation: "Build an interactive Array Analytics Engine. Users can input a comma-separated list of numbers, convert them into an array list, and execute map, filter, and reduce operations to calculate double values, extract elements passing conditions, and aggregate sums.",
      progression: [
        {
          level: "easy",
          title: "Input Array Parsing",
          content: "Read comma-separated input values, split the string by commas, convert values to numbers explicitly, and filter out any NaN entries."
        },
        {
          level: "intermediate",
          title: "Transform & Filter Arrays",
          content: "Use `.map()` to double all inputs. Use `.filter()` to select doubled values that exceed 50."
        },
        {
          level: "advanced",
          title: "Aggregate Reductions",
          content: "Use `.reduce()` to compute the total sum of the filtered list, and render all results dynamically in the DOM panels."
        }
      ],
      codeTemplate: {
        html: `<div class="array-analyzer">
  <h3>Wemade Array Analyzer</h3>
  <input type="text" id="numbers-input" placeholder="e.g. 10, 20, 30, 45, 60">
  <button id="run-analytics">Analyze Numbers</button>
  <div class="result-panel">
    <p>Parsed: <span id="out-parsed">--</span></p>
    <p>Doubled (.map): <span id="out-doubled">--</span></p>
    <p>Greater than 50 (.filter): <span id="out-filtered">--</span></p>
    <p>Sum Total (.reduce): <span id="out-sum">--</span></p>
  </div>
</div>`,
        css: `.array-analyzer {
  background: var(--app-card-bg, #1e293b);
  border: 1px solid var(--app-border, #334155);
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  color: var(--app-text, #ffffff);
}
.result-panel {
  margin-top: 15px;
  background: rgba(0,0,0,0.15);
  padding: 12px;
  border-radius: 6px;
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
        js: `document.getElementById('run-analytics').onclick = () => {
  const rawInput = document.getElementById('numbers-input').value;
  if (!rawInput.trim()) {
    alert('Please enter a comma-separated list of numbers!');
    return;
  }
  
  // Parse input list to array of numbers
  const numbers = rawInput.split(',')
    .map(val => parseFloat(val.trim()))
    .filter(num => !isNaN(num));
    
  if (numbers.length === 0) {
    alert('Please enter valid numeric values!');
    return;
  }
  
  document.getElementById('out-parsed').innerText = numbers.join(', ');
  
  // Map operation: double all numbers
  const doubled = numbers.map(x => x * 2);
  document.getElementById('out-doubled').innerText = doubled.join(', ');
  
  // Filter operation: get doubled numbers greater than 50
  const filtered = doubled.filter(x => x > 50);
  document.getElementById('out-filtered').innerText = filtered.join(', ');
  
  // Reduce operation: sum all values in the filtered list
  const sum = filtered.reduce((total, current) => total + current, 0);
  document.getElementById('out-sum').innerText = sum;
};`
      },
      assessment: "Final Challenge: Build the array transformation engine. Apply map, filter, and reduce chaining to aggregate user numbers list values."
    },
    {
      id: "w2-d6-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Basic array mutation checks, map vs filter logic mapping, reduce accumulator whiteboard traces, and solutions for the arrays aggregator.",
        duration: "15 mins",
        resources: [
          "Student Arrays & Aggregation Lab (PDF)",
          "Array Analytics Solutions (ZIP)"
        ]
      }
    }
  ]
};
