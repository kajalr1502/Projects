document.getElementById('save-entry').addEventListener('click', function () {
    const journalText = document.getElementById('journal-text').value;
    const mood = document.getElementById('mood').value;

    // Check if journal entry is not empty
    if (journalText.trim() === '') {
        alert('Please write something for your journal!');
        return;
    }

    const saveButton = document.getElementById('save-entry');
    saveButton.textContent = 'Saving...';
    saveButton.disabled = true;

    // Create an object to hold the journal entry and mood
    const entry = {
        text: journalText,
        mood: mood,
        date: new Date().toLocaleDateString()
    };

    // Get existing entries from localStorage
    let entries = JSON.parse(localStorage.getItem('entries')) || [];

    // Add the new entry to the list
    entries.push(entry);

    // Save the updated entries back to localStorage
    localStorage.setItem('entries', JSON.stringify(entries));

    // Clear the journal input field
    document.getElementById('journal-text').value = '';

    // Refresh the entries list
    displayEntries();

    // Restore the button state
    setTimeout(() => {
        saveButton.textContent = 'Save Entry';
        saveButton.disabled = false;
    }, 1000); // Wait 1 second before re-enabling the button
});

// Display saved journal entries
function displayEntries() {
    const entriesList = document.getElementById('entries-list');
    entriesList.innerHTML = ''; // Clear existing content

    const entries = JSON.parse(localStorage.getItem('entries')) || [];

    entries.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('entry');

        const entryHeader = document.createElement('h3');
        entryHeader.textContent = `${entry.date} - Mood: ${entry.mood}`;

        const entryText = document.createElement('p');
        entryText.textContent = entry.text;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️ Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteEntry(index);
        });

        entryElement.appendChild(entryHeader);
        entryElement.appendChild(entryText);
        entryElement.appendChild(deleteBtn);

        entriesList.appendChild(entryElement);
    });
}
// Initial display of entries when the page loads
displayEntries();

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.splice(index, 1); // Remove entry at that index
    localStorage.setItem('entries', JSON.stringify(entries));
    displayEntries(); // Refresh the UI
}

