// Get the student profile form
const studentForm = document.getElementById("studentForm");

// Listen for when the student activates the submit event
studentForm.addEventListener("submit", function(event) {
    // This prevents the page from refreshing once the button's pressed
    event.preventDefault();

    // Collect the info entered by the student saved as text
    const studentProfile = {
        major: document.getElementById("major").value,
        credits: document.getElementById("credits").value,
        courses: document.getElementById("courses").value,
        career: document.getElementById("career").value,
        skills: document.getElementById("skills").value
    };

    // Turn studentProfile object into a JSON string to store in localStorage
    localStorage.setItem("studentProfile", JSON.stringify(studentProfile));

    // Alert the student to know their profile is saved
    alert("Your student profile has been saved!")
});