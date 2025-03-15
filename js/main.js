const subjects = {
    "Chemistry": [
        "Atomic structure", "Classification of elements", "Chemical bonding and shape", "Oxidation reduction",
        "States of matter", "Chemical equilibrium", "Hydrogen", "Oxygen", "Nitrogen", "Halogen", "Carbon",
        "Phosphorus", "Sulphur", "Metallurgy", "Alkali earth metal", "Alkaline earth metal", "Sodium postassium pump",
        "Sodium glucose pump", "Basic inorganic", "Isomerism", "Alkane", "Alkene", "Alkyne", "Benzene",
        "Manufacturing of chemicals", "Fertilizer", "Foreign element"
    ],
    "Physics": [
        "Kinematics", "Dynamics", "Work energy and power", "Circular motion", "Gravitaion", "Elasticity",
        "Heat and temperature", "Thermal expansion", "Rate of heat flow", "Quantity of heat energy", "Ideal gas",
        "Reflection if curve mirror", "Refraction and plane surface", "Refraction through prism", "Lenses",
        "Dispersion", "Electric charge", "Electric field", "Potential energy", "Capacitor", "Nuclear physics",
        "Direct current (DC)", "Solids", "Recent trend in physics"
    ],
    "Nepali": ["Author"],
    "English": ["Authors", "Word meaning"],
    "Math": [
        "Logic and set", "Real number", "Function", "Curve sketching", "Sequence and series", "Matrix",
        "Qadratic", "Complex number", "Trigonometry", "Analytical Geometry", "Coordinate in space", "Vectors",
        "Statistics", "Limit", "Derivate", "Integration", "Numerical computation", "Numerical integration",
        "Statistics", "Dynamic"
    ],
    "Biology": [
        "Bio molecules", "Cell", "Fungi", "Lichen", "Algae", "Bryophyta", "Pteridophytes", "Gymnosperm",
        "Angiosperms", "Monera", "Virus", "Ecosystem", "Ecological adaptation", "Ecological imbalances",
        "Vegetation", "Life and it's orgin", "Evidence of evolution", "Theories of evolution", "Human evolution",
        "Protista", "Animlia", "Earthworm", "Frog", "Animal adaptation", "Animal behaviour", "Environmental pollution",
        "Conservativation biology", "Wildlife"
    ]
};

const subjectsDiv = document.getElementById("subjects");
const startBtn = document.getElementById("start-btn");
let selectedTopics = [];

Object.keys(subjects).forEach(subject => {
    const subjectDiv = document.createElement("div");
    subjectDiv.className = "subject";
    subjectDiv.textContent = subject;
    
    const topicsDiv = document.createElement("div");
    topicsDiv.className = "topics";
    
    subjects[subject].forEach(topic => {
        const topicDiv = document.createElement("div");
        topicDiv.className = "topic";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = `${subject.toLowerCase()}/${topic.toLowerCase().replace(/ /g, '-')}`;
        checkbox.addEventListener("change", updateStartButton);
        topicDiv.appendChild(checkbox);
        topicDiv.appendChild(document.createTextNode(topic));
        topicsDiv.appendChild(topicDiv);
    });
    
    subjectDiv.addEventListener("click", () => {
        topicsDiv.style.display = topicsDiv.style.display === "block" ? "none" : "block";
    });
    
    subjectDiv.appendChild(topicsDiv);
    subjectsDiv.appendChild(subjectDiv);
});

function updateStartButton() {
    selectedTopics = Array.from(document.querySelectorAll("input[type='checkbox']:checked")).map(cb => cb.value);
    startBtn.disabled = selectedTopics.length === 0;
}

startBtn.addEventListener("click", () => {
    localStorage.setItem("selectedTopics", JSON.stringify(selectedTopics));
    window.location.href = "flashcards.html";
});
