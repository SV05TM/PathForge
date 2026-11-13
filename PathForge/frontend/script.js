// Get the student profile form
const studentForm = document.getElementById("studentForm");

// Listen for when the student activates the submit event
studentForm.addEventListener("submit", function(event) {
    // This prevents the page from refreshing once the button's pressed
    event.preventDefault();

    // Collect the info entered by the student saved as text
    const studentProfile = {
        credits: document.getElementById("credits").value,
        courses: document.getElementById("courses").value,
        career: document.getElementById("career").value,
        skills: document.getElementById("skills").value
    };

    // Turn studentProfile object into a JSON string to store in localStorage
    localStorage.setItem("studentProfile", JSON.stringify(studentProfile));
    fetch("http://localhost:3000/postRequest", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(studentProfile)
    })
    .then(response => response.json())
    .then(data => {
        sessionStorage.setItem("progressData", JSON.stringify(data));
        alert("Your student profile has been saved!");
        window.location.href = "progress.html";

    });
});