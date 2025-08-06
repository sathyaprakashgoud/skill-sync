import { useState } from "react";
import jsPDF from "jspdf";

function App() {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("My SkillSync Resume", 20, 20);

    doc.setFontSize(14);
    skills.forEach((skill, index) => {
      doc.text(`${index + 1}. ${skill}`, 20, 40 + index * 10);
    });

    doc.save("SkillSync_Resume.pdf");
  };

  return (
    <div style={styles.container}>
      <h1>💡 SkillSync</h1>
      <p>Showcase your skills in one place.</p>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter a skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          style={styles.input}
        />
        <button onClick={addSkill} style={styles.button}>Add</button>
      </div>

      <div style={styles.cardContainer}>
        {skills.map((skill, index) => (
          <div key={index} style={styles.card}>
            <span>{skill}</span>
            <button onClick={() => removeSkill(index)} style={styles.deleteButton}>❌</button>
          </div>
        ))}
      </div>

      {skills.length > 0 && (
        <button style={styles.pdfButton} onClick={handleDownloadPDF}>
          📄 Download as PDF
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "2rem",
    maxWidth: "600px",
    margin: "auto",
  },
  inputContainer: {
    marginTop: "1.5rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    width: "60%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cardContainer: {
    marginTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#f1f1f1",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "4px",
    color: "white",
    cursor: "pointer",
  },
  pdfButton: {
    marginTop: "2rem",
    padding: "0.7rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default App;
