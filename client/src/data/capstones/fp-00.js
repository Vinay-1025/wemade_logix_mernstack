export const fp00Data = {
  projectCode: "FP-00",
  title: "MERN Sandbox & Reference Template",
  explanation: "This is a reference sandbox project template designed for instructors and administrators to verify submission logic, examine UI features, and test styling parameters.",
  progression: [
    {
      level: "Sandbox Phase 1",
      title: "Local Endpoint Configuration",
      content: "Ensure backend ports are set to 5000 and client Axios base URL maps to local environment."
    },
    {
      level: "Sandbox Phase 2",
      title: "Dynamic Rendering Test",
      content: "Verify that all checklist requirements render checks correctly and response fields display values."
    }
  ],
  detailedReference: {
    summary: "System reference project used strictly by administrators and QA checkers.",
    keyConcepts: [
      { term: "Sandbox Mode", definition: "A isolated environment allowing system configuration tests." }
    ],
    bestPractices: [
      "Use this layout to verify student-facing text placements."
    ]
  },
  codeTemplate: {
    html: `<!-- FP-00 Sandbox Index -->\n<div id="fp-00-root">\n  <h2>Sandbox Project Workspace</h2>\n</div>`,
    css: `/* FP-00 CSS Reference */\n#fp-00-root {\n  padding: 1.5rem;\n  border: 2px dashed #0047ab;\n}`,
    js: `// FP-00 Sandbox Init\nconsole.log("FP-00 Sandbox active.");`
  },
  assessment: "Verify that UI components respond appropriately to submission actions."
};
export default fp00Data;
