export const w4d4Data = {
  dayId: "w4-d4",
  dayTitle: "Day 4: Controlled Components & Form Validation",
  topics: [
    {
      id: "w4-d4-t1",
      title: "1. Controlled vs Uncontrolled Components",
      customComponent: "ControlledFormViz",
      explanation: "In HTML, form elements like `<input>` and `<select>` manage their own state. In React, a controlled component is an input element whose value is driven by React state, making React the single source of truth.",
      progression: [
        {
          level: "easy",
          title: "The State-value Loop",
          content: "In a controlled input, you bind the `value` attribute to a state variable and update that state on every keystroke using the `onChange` event handler."
        },
        {
          level: "intermediate",
          title: "Single Source of Truth",
          content: "Since React state drives the input value, you can inspect, modify, format, or validate the input value in real-time before it renders."
        },
        {
          level: "advanced",
          title: "Uncontrolled Components & Refs",
          content: "Uncontrolled components let the DOM handle form data. You access input values using React `useRef` hooks. This is useful for file uploads or simple forms."
        }
      ],
      detailedReference: {
        summary: "Controlled components bind form inputs directly to React state variables, ensuring React has full control over form data.",
        keyConcepts: [
          { term: "State Binding", definition: "Syncing form inputs with state using value and onChange hooks to control input values." }
        ],
        bestPractices: [
          "Use controlled components for most forms to support real-time validation and input formatting.",
          "Keep form state structured and local to the form component."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [text, setText] = React.useState('');

  return (
    <div style={{ padding: '16px' }}>
      <h4>Controlled Input:</h4>
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type something..."
      />
      <p style={{ marginTop: '8px' }}>
        React state value: <strong>{text || '(empty)'}</strong>
      </p>
    </div>
  );
};`
      },
      assessment: "What is the difference between a controlled and an uncontrolled component in React?"
    },
    {
      id: "w4-d4-t2",
      title: "2. Form Inputs: Inputs, Select, Checkbox",
      customComponent: "ControlledFormViz",
      explanation: "React handles different form elements (text inputs, selects, checkboxes, radios) using the same value-binding and event-handling pattern, with slight differences in property names.",
      progression: [
        {
          level: "easy",
          title: "Dropdown Selects",
          content: "Bind the `value` prop of the `<select>` element to a state variable, and handle changes using `onChange` just like text inputs."
        },
        {
          level: "intermediate",
          title: "Checkboxes & Booleans",
          content: "Checkboxes use the `checked` attribute instead of `value` to bind boolean state values, updating state on change using `e.target.checked`."
        },
        {
          level: "advanced",
          title: "Radio Button Groups",
          content: "Bind a group of radio buttons to a single state variable. React determines the active radio by matching the state value with the radio's `value` attribute."
        }
      ],
      detailedReference: {
        summary: "Form elements bind state to different attributes: value for text/selects, and checked for checkboxes/radios.",
        keyConcepts: [
          { term: "Checked Attribute", definition: "The DOM property used to track checkbox and radio selection states in React." }
        ],
        bestPractices: [
          "Always specify a name attribute on form elements to simplify change handling.",
          "Ensure select element options match the initial state type."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [role, setRole] = React.useState('student');
  const [agreed, setAgreed] = React.useState(false);

  return (
    <div style={{ padding: '16px' }}>
      <div>
        <label>Role: </label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Administrator</option>
        </select>
      </div>

      <div style={{ marginTop: '12px' }}>
        <label>
          <input 
            type="checkbox" 
            checked={agreed} 
            onChange={(e) => setAgreed(e.target.checked)} 
          />
          Agreed to Terms
        </label>
      </div>

      <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#64748b' }}>
        Selected: {role} | Terms: {agreed ? 'Accepted' : 'Declined'}
      </p>
    </div>
  );
};`
      },
      assessment: "Which event property should you read to update the state of a controlled checkbox input?"
    },
    {
      id: "w4-d4-t3",
      title: "3. Handling Forms with a Single State Object",
      customComponent: "ControlledFormViz",
      explanation: "Instead of creating separate state hooks for each form field, you can manage the entire form using a single state object, updating fields dynamically using the element's `name` attribute.",
      progression: [
        {
          level: "easy",
          title: "The Name Attribute Pattern",
          content: "Give each input a `name` attribute that matches its corresponding key in the state object (e.g. `name=\"email\"`)."
        },
        {
          level: "intermediate",
          title: "Dynamic Computed Keys",
          content: "Use computed property names to update the state object dynamically: `setForm({ ...form, [e.target.name]: value })`."
        },
        {
          level: "advanced",
          title: "Complex Forms Scalability",
          content: "Managing form state in a single object keeps state flat, simplifies reset operations, and scales easily as you add more fields."
        }
      ],
      detailedReference: {
        summary: "Manage form fields in a single state object, updating properties dynamically using name attributes and computed keys.",
        keyConcepts: [
          { term: "Computed Keys", definition: "Using square bracket syntax to evaluate key names dynamically from variables." }
        ],
        bestPractices: [
          "Match input name attributes with state object keys exactly.",
          "Remember to spread the existing state (`...prev`) to avoid overwriting other form fields during updates."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [form, setForm] = React.useState({
    fullName: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Update matching state property dynamically
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ padding: '16px' }}>
      <input 
        type="text" 
        name="fullName" 
        value={form.fullName} 
        onChange={handleChange} 
        placeholder="Full Name" 
        style={{ marginRight: '8px' }}
      />
      <input 
        type="email" 
        name="email" 
        value={form.email} 
        onChange={handleChange} 
        placeholder="Email" 
      />
      <p style={{ fontSize: '0.8rem', marginTop: '12px' }}>
        State: {JSON.stringify(form)}
      </p>
    </div>
  );
};`
      },
      assessment: "Write a change handler function that updates a single state object dynamically using e.target.name and e.target.value."
    },
    {
      id: "w4-d4-t4",
      title: "4. Client-side Form Validation Techniques",
      customComponent: "ControlledFormViz",
      explanation: "Client-side validation provides instant feedback to users as they type or when they submit a form, improving user experience and preventing invalid submissions.",
      progression: [
        {
          level: "easy",
          title: "Basic Submit Validation",
          content: "Validate form fields on submit. If checks fail, prevent form submission using `e.preventDefault()` and display error messages in the UI."
        },
        {
          level: "intermediate",
          title: "Real-time Validation Hooks",
          content: "Use `useEffect` to validate inputs as state updates, displaying error messages in real-time as users type."
        },
        {
          level: "advanced",
          title: "Touched/Blur State validation",
          content: "Track which fields have been focused and blurred (touched state). Display validation errors only after a user interacts with a field, avoiding premature warnings."
        }
      ],
      detailedReference: {
        summary: "Validate inputs dynamically using state validation checks, providing immediate visual feedback to users.",
        keyConcepts: [
          { term: "Touched State", definition: "Tracking user interaction with form inputs to show errors only after a user interacts with a field." }
        ],
        bestPractices: [
          "Provide helpful, clear error messages to guide users.",
          "Prevent form submission if any validation checks fail."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');

  const handleBlur = () => {
    if (!email.includes('@')) {
      setError('Invalid email address.');
    } else {
      setError('');
    }
  };

  return (
    <div style={{ padding: '16px' }}>
      <label>Email: </label>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleBlur}
        placeholder="user@wemade.com"
      />
      {error && <p style={{ color: 'red', margin: '4px 0', fontSize: '0.8rem' }}>{error}</p>}
    </div>
  );
};`
      },
      assessment: "Explain how to prevent a form from submitting and reloading the page when a validation check fails."
    },
    {
      id: "w4-d4-t5",
      title: "5. Form Submission & State Reset",
      customComponent: "ControlledFormViz",
      explanation: "When a form is submitted, prevent default page reload, process the data, and reset the form state back to its initial values.",
      progression: [
        {
          level: "easy",
          title: "Preventing Reloads",
          content: "Call `e.preventDefault()` in your submit handler to prevent the browser from reloading the page."
        },
        {
          level: "intermediate",
          title: "Resetting State Objects",
          content: "After processing data, reset the state variable or object back to its initial values to clear the form."
        },
        {
          level: "advanced",
          title: "Submitting to Web APIs",
          content: "Send form data to server endpoints as JSON payloads using fetch, updating UI status based on the API response."
        }
      ],
      detailedReference: {
        summary: "Prevent default form submit reloads, process inputs, and reset form states back to initial values.",
        keyConcepts: [
          { term: "Prevent Default", definition: "The event method that prevents the browser's default action (like page reloads on form submit)." }
        ],
        bestPractices: [
          "Always prevent default browser submissions in React forms.",
          "Reset form state completely after successful submission."
        ]
      },
      codeTemplate: {
        html: "",
        css: "",
        js: `const App = () => {
  const [name, setName] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting name:', name);
    // Reset state
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '16px' }}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Name"
      />
      <button type="submit">Submit</button>
    </form>
  );
};`
      },
      assessment: "Write a submit handler that prevents browser reload, logs state values, and resets state back to empty strings."
    },
    {
      id: "w4-d4-t6",
      title: "6. Assignment Task: Registration Sign-up Portal",
      explanation: "Build a user registration signup form. The form must use a single state object to manage fields (username, email, password, and agreed checkbox). Implement real-time validation checks for each field, display helper error messages, and disable the submit button until all validations pass. On successful submit, display a success message and reset the form.",
      progression: [
        {
          level: "easy",
          title: "Define Form Layout",
          content: "Create form inputs for username, email, password, and a checkbox for terms. Bind values to a single state object."
        },
        {
          level: "intermediate",
          title: "Add Validation Logic",
          content: "Add validation checks for each field (e.g. username length, valid email, password strength), displaying error messages in real-time."
        },
        {
          level: "advanced",
          title: "Submit & Reset Handlers",
          content: "Handle submissions: prevent default reload, verify validations, show a success message, and reset the form state."
        }
      ],
      codeTemplate: {
        html: "",
        css: `/* Form Styling */
.register-portal {
  max-width: 400px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  background: #1e293b;
  color: white;
  padding: 24px;
  border-radius: 12px;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}
.form-field label {
  font-size: 0.75rem;
  color: #94a3b8;
}
.form-field input {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #334155;
  background: #0f172a;
  color: white;
  outline: none;
}
.form-field input:focus {
  border-color: #00d1d1;
}
.error-msg {
  color: #f43f5e;
  font-size: 0.7rem;
}
.submit-btn {
  width: 100%;
  padding: 10px;
  background: #00d1d1;
  color: #0f172a;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
}
.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}`,
        js: `const App = () => {
  // 1. Declare single state object
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    agree: false
  });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);

  // 2. Validate form fields on state changes
  React.useEffect(() => {
    const newErrors = {};
    if (formData.username && formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters.';
    }
    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Enter a valid email containing @.';
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (formData.agree === false) {
      newErrors.agree = 'You must accept the terms.';
    }
    setErrors(newErrors);
  }, [formData]);

  // 3. Change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // 4. Submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0 && formData.username && formData.email && formData.password) {
      setSubmitted(true);
      // Reset form
      setFormData({
        username: '',
        email: '',
        password: '',
        agree: false
      });
    }
  };

  const isFormInvalid = Object.keys(errors).length > 0 || !formData.username || !formData.email || !formData.password || !formData.agree;

  return (
    <div className="register-portal">
      <h3>Signup Registration</h3>
      {submitted && (
        <div style={{ background: '#10b981', color: 'white', padding: '10px', borderRadius: '6px', marginBottom: '12px', textAlign: 'center' }}>
          Registration Successful!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange}
          />
          {errors.username && <span className="error-msg">{errors.username}</span>}
        </div>

        <div className="form-field">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange}
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange}
          />
          {errors.password && <span className="error-msg">{errors.password}</span>}
        </div>

        <div className="form-field checkbox" style={{ flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" 
            name="agree" 
            checked={formData.agree} 
            onChange={handleChange}
            id="terms-check"
          />
          <label htmlFor="terms-check" style={{ color: 'white', cursor: 'pointer' }}>I agree to terms</label>
        </div>
        {errors.agree && <span className="error-msg" style={{ display: 'block', marginBottom: '10px' }}>{errors.agree}</span>}

        <button type="submit" disabled={isFormInvalid} className="submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};`
      },
      assessment: "Checklist:\n1. Initialize a single state object to manage fields: username, email, password, agree.\n2. Handle changes dynamically using input name properties and computed keys.\n3. Validate each field in real-time, displaying helper error messages.\n4. Disable the submit button until all validation checks pass. Clear inputs on submit."
    },
    {
      id: "w4-d4-resources",
      title: "Tutor Materials & Resources",
      isResources: true,
      explanation: "This section contains the official slide decks, exercises, tutor reference guides, and student worksheets for this session.",
      tutorMaterial: {
        title: "Tutor Lesson Plan & Reference Guide",
        content: "Forms bindings diagram keys, validation schema trace procedures, common state loops, and solutions for the registration portal code.",
        duration: "15 mins",
        resources: [
          "Forms validation presentation slides (PDF)",
          "Registration Portal Solutions (ZIP)"
        ]
      }
    }
  ]
};
