import React, { useState } from 'react';
import './App.css';

function App() {
  const [subject, setSubject] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cos, setCOs] = useState(['']);
  const [modules, setModules] = useState([]);
  const [nextGroupNumber, setNextGroupNumber] = useState(1);

  const markPresets = {
    'a, b, c, d (5 marks each)': [5, 5, 5, 5],
    'a, b (10 marks each)': [10, 10],
    'a, b, c (7,7,6 marks)': [7, 7, 6],
    'a, b, c (8,8,4 marks)': [8, 8, 4]
  };

  const addCO = () => setCOs([...cos, '']);

  const updateCO = (i, val) => {
    const updated = [...cos];
    updated[i] = val;
    setCOs(updated);
  };

  const generateQuestions = (prefix, marksList) => {
    return marksList.map((mark, i) => ({
      label: `${prefix}${String.fromCharCode(97 + i)}`,
      text: '',
      marks: mark,
      co: ''
    }));
  };

  const addEmptyModule = () => {
    setModules([
      ...modules,
      {
        title: `Module ${modules.length + 1}`,
        pattern: '',
        groups: []
      }
    ]);
  };

  const setModulePatternAndGenerate = (modIndex, pattern) => {
    const marksList = markPresets[pattern];
    const group1 = generateQuestions((nextGroupNumber).toString(), marksList);
    const group2 = generateQuestions((nextGroupNumber + 1).toString(), marksList);

    const updatedModules = [...modules];
    updatedModules[modIndex].pattern = pattern;
    updatedModules[modIndex].groups = [group1, group2];
    setModules(updatedModules);

    setNextGroupNumber(nextGroupNumber + 2);
  };

  const updateQuestion = (modIndex, groupIndex, qIndex, key, val) => {
    const updatedModules = [...modules];
    updatedModules[modIndex].groups[groupIndex][qIndex][key] = val;
    setModules(updatedModules);
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Faculty Portal</h2>
        <p>Question Paper Builder</p>
      </div>

      <div className="main-content">
        <h1>📘 Question Paper Builder</h1>

        <label>Subject Name:</label>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} />

        <label>Subject Code:</label>
        <input value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} />

        <label>General Instructions:</label>
        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={3} />

        <h3>📌 Course Outcomes (COs)</h3>
        {cos.map((co, i) => (
          <input
            key={i}
            value={co}
            onChange={(e) => updateCO(i, e.target.value)}
            placeholder={`CO${i + 1}`}
          />
        ))}
        <button onClick={addCO}>➕ Add CO</button>

        <h3>📚 Modules</h3>
        <button onClick={addEmptyModule}>➕ Add Module</button>

        {modules.map((mod, modIndex) => (
          <div key={modIndex} className="module-box">
            <h4>{mod.title}</h4>
            {mod.groups.length === 0 ? (
              <>
                <label>Choose Question Pattern:</label>
                <select
                  value={mod.pattern}
                  onChange={(e) => setModulePatternAndGenerate(modIndex, e.target.value)}
                >
                  <option value="">-- Select Marks Distribution --</option>
                  {Object.keys(markPresets).map((label, i) => (
                    <option key={i} value={label}>{label}</option>
                  ))}
                </select>
              </>
            ) : (
              mod.groups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {group.map((q, qIndex) => (
                    <div key={qIndex} className="question-row">
                      <label>{q.label})</label>
                      <input
                        value={q.text}
                        onChange={(e) => updateQuestion(modIndex, groupIndex, qIndex, 'text', e.target.value)}
                        placeholder="Question text"
                      />
                      <input
                        value={q.co}
                        onChange={(e) => updateQuestion(modIndex, groupIndex, qIndex, 'co', e.target.value)}
                        placeholder="CO"
                        className="small"
                      />
                      <input
                        type="number"
                        value={q.marks}
                        onChange={(e) => updateQuestion(modIndex, groupIndex, qIndex, 'marks', parseInt(e.target.value) || 0)}
                        className="small"
                      />
                    </div>
                  ))}
                  {groupIndex === 0 && <p className="or-text"><strong>-- OR --</strong></p>}
                </div>
              ))
            )}
          </div>
        ))}

        <hr />
        <h2>🖨 Question Paper Preview</h2>
        <div className="preview">
          <h3>{subject} ({subjectCode})</h3>
          <p>{instructions}</p>

          <h4>Course Outcomes:</h4>
          <ul>
            {cos.map((co, i) => <li key={i}>{co}</li>)}
          </ul>

          {modules.map((mod, modIndex) => (
            <div key={modIndex}>
              <h4>{mod.title}</h4>

              {mod.groups.length === 0 ? (
                <em>Pattern not selected yet</em>
              ) : (
                <>
                  {mod.groups[0].map((q, i) => (
                    <div key={i}>
                      {q.label}) {q.text} <strong>[{q.marks} marks]</strong> <em>CO: {q.co || 'N/A'}</em>
                    </div>
                  ))}

                  <p className="or-text"><strong>-- OR --</strong></p>

                  {mod.groups[1].map((q, i) => (
                    <div key={i}>
                      {q.label}) {q.text} <strong>[{q.marks} marks]</strong> <em>CO: {q.co || 'N/A'}</em>
                    </div>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;