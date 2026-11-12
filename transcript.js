
const uploadForm = document.querySelector('.main-content form');
const uploadButton = uploadForm.querySelector('button');

// backend part pending
const ENABLE_BACKEND_UPLOAD = false;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// input file
const transcriptFile = document.createElement('input');
transcriptFile.type = 'file';
transcriptFile.accept = '.pdf,application/pdf';
transcriptFile.hidden = true;
uploadForm.appendChild(transcriptFile);

//status message
const fileStatus = document.createElement('p');
fileStatus.setAttribute('role', 'status');
fileStatus.setAttribute('aria-live', 'polite');
fileStatus.textContent = 'No transcript selected.';
uploadForm.insertAdjacentElement('afterend', fileStatus);

// button for changing the selected file
const changeButton = document.createElement('button');
changeButton.type = 'button';
changeButton.textContent = 'Choose Different File';
changeButton.hidden = true;
uploadForm.appendChild(changeButton);

let selectedFile = null;

// update messages on the page
function showStatus(message) {
    fileStatus.textContent = message;
}

// Validate the selected PDF
function validateTranscript(file) {
    if (!file) {
        return 'Please select a transcript.';
    }

    if (!file.name.toLowerCase().endsWith('.pdf') ||
        (file.type && file.type !== 'application/pdf')) {
        return 'Only PDF files are accepted.';
    }

    if (file.size === 0) {
        return 'The selected file is empty.';
    }

    if (file.size > MAX_FILE_SIZE) {
        return 'The PDF cannot exceed 10 MB.';
    }

    return null;
}

// Reset the upload interface
function resetSelection() {
    selectedFile = null;
    transcriptFile.value = '';
    uploadButton.textContent = '+ Upload Transcript';
    changeButton.hidden = true;
}

// Handle file selection
transcriptFile.addEventListener('change', () => {
    const file = transcriptFile.files[0];

    if (!file) return;

    const error = validateTranscript(file);

    if (error) {
        resetSelection();
        showStatus(error);
        return;
    }

    selectedFile = file;

    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

    showStatus(
        `Selected: ${file.name} (${sizeMB} MB). Ready to upload.`
    );

    uploadButton.textContent = 'Upload Selected Transcript';
    changeButton.hidden = false;
});

// Allow students to select another document
changeButton.addEventListener('click', () => {
    transcriptFile.click();
});

// Handle upload button
uploadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // First click opens file picker
    if (!selectedFile) {
        transcriptFile.click();
        return;
    }

    const error = validateTranscript(selectedFile);

    if (error) {
        showStatus(error);
        return;
    }

    // Frontend testing until backend is ready
    if (!ENABLE_BACKEND_UPLOAD) {
        showStatus(
            `PDF validated successfully: ${selectedFile.name}. ` +
            'Server upload is not connected yet.'
        );
        return;
    }

    // Prepare document for backend
    const formData = new FormData();
    formData.append('transcript', selectedFile);

    showStatus('Uploading transcript...');
    uploadButton.disabled = true;

    try {
        const response = await fetch('/api/transcripts', {
            method: 'POST',
            body: formData
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(result.error || 'Upload failed.');
        }

        if (!result.id) {
            throw new Error('Server did not confirm the upload.');
        }

        showStatus(`Transcript saved successfully!`);
        resetSelection();

    } catch (error) {
        showStatus(`Upload failed: ${error.message}`);
    } finally {
        uploadButton.disabled = false;
    }
});
