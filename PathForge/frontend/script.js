const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const studentProfile = {
        credits: document.getElementById("credits").value,
        courses: document.getElementById("courses").value,
        career: document.getElementById("career").value,
        skills: document.getElementById("skills").value
    };

    try {
        const response = await fetch("http://localhost:3000/api/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(studentProfile)
        });

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem("studentProfile", JSON.stringify(studentProfile));
        sessionStorage.setItem("progressData", JSON.stringify(data));
        window.location.href = "progress.html";
    } catch (error) {
        alert(`Could not calculate progress: ${error.message}`);
    }
});