const progress = JSON.parse(sessionStorage.getItem("progressData"));

if (progress) {
    document.getElementById("cs-core-text").textContent = `${progress.progress.cs_core}/32 credits`;
    document.getElementById("cs-core-progress").value = progress.progress.cs_core;

    document.getElementById("senior-cs-text").textContent = `${progress.progress.senior_cs}/12 credits`;
    document.getElementById("senior-cs-progress").value = progress.progress.senior_cs;

    document.getElementById("math-text").textContent = `${progress.progress.mathematics}/17 credits`;
    document.getElementById("math-progress").value = progress.progress.mathematics;

    document.getElementById("stats-text").textContent = `${progress.progress.stats}/3 credits`;
    document.getElementById("stats-progress").value = progress.progress.stats;

    document.getElementById("cs-related-text").textContent = `${progress.progress.cs_related}/6 credits`;
    document.getElementById("cs-related-progress").value = progress.progress.cs_related;

    document.getElementById("natural-science-text").textContent = `${progress.progress.natural_science}/12 credits`;
    document.getElementById("natural-science-progress").value = progress.progress.natural_science;

    document.getElementById("mason-core-text").textContent = `${progress.progress.additional_mason_core}/24 credits`;
    document.getElementById("mason-core-progress").value = progress.progress.additional_mason_core;
}