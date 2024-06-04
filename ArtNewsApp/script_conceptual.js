function generateWords() {
    const theme = document.getElementById('themeInput').value;
    fetch('/generate-related-words', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({theme: theme})
    })
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('wordsContainer');
        container.innerHTML = '<h2>Related Words:</h2>';
        data.words.forEach(word => {
            const p = document.createElement('p');
            p.textContent = word;
            container.appendChild(p);
        });
    })
    .catch(error => console.error('Error:', error));
}

function generateConceptualIdea() {
    const theme = document.getElementById('themeInput').value;
    const imagery = document.getElementById('imageryInput').value;
    fetch('/generate-conceptual-idea', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({theme: theme, imagery: imagery, referenceConceptual: 'Example Artist Statement', referenceVisual: 'Example Visual Style'})
    })
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('ideaContainer');
        container.innerHTML = '<h2>Conceptual Idea:</h2>';
        const p = document.createElement('p');
        p.textContent = data.description;
        container.appendChild(p);
    })
    .catch(error => console.error('Error:', error));
}
