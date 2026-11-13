const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const errorMessage = document.getElementById("courses-error");
    errorMessage.textContent = "";

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

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(data?.error || `Server returned ${response.status}.`);
        }

        if (!data?.progress) {
            throw new Error("The server did not return degree progress.");
}
        localStorage.setItem("studentProfile", JSON.stringify(studentProfile));
        sessionStorage.setItem("progressData", JSON.stringify(data));
        window.location.href = "progress.html";
       } catch (error) {
        errorMessage.textContent = `Could not calculate progress. ${error.message}`;
    }
});