document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.element');
    const editorArea = document.getElementById('editor-area');

    elements.forEach(element => {
        element.addEventListener('dragstart', dragStart);
    });

    editorArea.addEventListener('dragover', dragOver);
    editorArea.addEventListener('drop', drop);

    function dragStart(event) {
        // Store the style property being dragged
        event.dataTransfer.setData('text/plain', event.target.getAttribute('data-style'));
    }

    function dragOver(event) {
        event.preventDefault(); // allow dropping
    }

    function drop(event) {
        event.preventDefault();
        const style = event.dataTransfer.getData('text/plain');
        const newElement = document.createElement('div');
        newElement.setAttribute('draggable', 'true');
        newElement.className = 'element'; // Apply a class for consistent styling

        // Prompt for the specific style and apply it
        applyStyle(newElement, style);

        // Add the new element to the editor area
        editorArea.appendChild(newElement);
    }

    function applyStyle(element, style) {
        // Prompt for the style value
        const defaultValue = getPromptMessage(style);
        let newValue = prompt(`Enter ${style} (default: ${defaultValue}):`, defaultValue);

        if (newValue === null) {
            return; // User cancelled the prompt
        }

        // Apply the style to the element
        element.style[style] = newValue;
        element.textContent = `Styled ${style}`;
    }

    function getPromptMessage(style) {
        const messages = {
            'color': 'Yellow',
            'font-size': '20px',
            'background-color': 'blue',
            'font-family': 'Arial, sans-serif',
            'border': '1px solid black',
            'margin': '10px',
            'padding': '10px',
            'width': '100px',
            'height': '100px',
            'text-align': 'right',
            'display': 'flex',
            'position': 'fixed',
            'top': '10px',
            'left': '10px',
            'right': '10px',
            'bottom': '10px',
            'z-index': '10',
            'overflow': 'scroll',
            'opacity': '0.5',
            'box-shadow': '2px 2px 5px #000',
            'border-radius': '10px'
        };

        return messages[style] || 'not set';
    }
});




document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.draggable-element');
    const editorAreas = document.querySelectorAll('#main-editor-area, #secondary-editor-area');

    elements.forEach(element => {
        element.addEventListener('dragstart', dragStart);
    });

    editorAreas.forEach(area => {
        area.addEventListener('dragover', dragOver);
        area.addEventListener('drop', drop);
    });

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.getAttribute('data-tag'));
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const target = event.target;

        if (target.id === 'main-editor-area' || target.id === 'secondary-editor-area') {
            const newElement = document.createElement(data);
            newElement.textContent = `This is a ${data}`;
            newElement.classList.add('draggable-element');
            newElement.setAttribute('draggable', 'true');
            newElement.addEventListener('dragstart', dragStart);
            target.appendChild(newElement);
        }
    }
});


let score = 0;

function checkAnswer(button, correctness) {
    if (correctness === 'correct') {
        button.classList.add('correct');
        score += 1;
        document.getElementById('score-count').textContent = score;
        alert('Correct!');
    } else {
        button.classList.add('incorrect');
        alert('Incorrect!');
    }
}
function checkAnswer(button, correctness) {
    if (correctness === 'correct') {
        button.classList.add('correct');
        score += 1;
        document.getElementById('score-count').textContent = score;
        document.getElementById('feedback').textContent = 'Correct!';
        button.disabled = true; // Disable button after selection
    } else {
        button.classList.add('incorrect');
        document.getElementById('feedback').textContent = 'Incorrect!';
        button.disabled = true; // Disable button after selection
    }
}


// Pictorial Drag-and-Drop functionality
document.addEventListener('DOMContentLoaded', () => {
    const draggableItems = document.querySelectorAll('.pictorial-draggable');
    const dropTargets = document.querySelectorAll('.pictorial-drop-target');

    draggableItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
    });

    dropTargets.forEach(target => {
        target.addEventListener('dragover', dragOver);
        target.addEventListener('drop', drop);
    });

    function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.getAttribute('data-tag'));
        event.target.classList.add('dragging');
    }

    function dragEnd(event) {
        event.target.classList.remove('dragging');
    }

    function dragOver(event) {
        event.preventDefault();
        event.target.classList.add('over');
    }

    function drop(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const droppedElement = document.querySelector(`.pictorial-draggable[data-tag="${data}"]`);
        const target = event.target;

        if (target.classList.contains('pictorial-drop-target') && target.getAttribute('data-tag') === data) {
            target.innerHTML = `<img src="${droppedElement.querySelector('img').src}" alt="${droppedElement.querySelector('p').textContent}" class="pictorial-icon"><p>${droppedElement.querySelector('p').textContent}</p>`;
            target.classList.remove('over');
            droppedElement.style.display = 'none'; // Hide the dragged element
        }
    }

    // Restart button functionality
    document.getElementById('pictorial-restart-button').addEventListener('click', () => {
        document.querySelectorAll('.pictorial-draggable').forEach(item => {
            item.style.display = 'flex'; // Show all draggable items
        });

        document.querySelectorAll('.pictorial-drop-target').forEach(target => {
            target.innerHTML = `<p>Drop ${target.getAttribute('data-tag').replace('item', 'Item ')} Here</p>`;
            target.classList.remove('over');
        });
    });

    // Next button functionality
    document.getElementById('pictorial-next-button').addEventListener('click', () => {
        alert('Proceeding to the next test!');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.matching-item');
    const targets = document.querySelectorAll('.matching-target');
    let draggedItem = null;

    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            draggedItem = item;
            item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
    });

    targets.forEach(target => {
        target.addEventListener('dragover', (e) => {
            e.preventDefault();
            target.classList.add('over');
        });

        target.addEventListener('dragleave', () => {
            target.classList.remove('over');
        });

        target.addEventListener('drop', () => {
            target.classList.remove('over');
            if (draggedItem && target.dataset.match === draggedItem.dataset.match) {
                target.textContent = draggedItem.textContent;
                target.classList.add('matched');
                draggedItem.classList.add('matched');
                draggedItem.remove();
                draggedItem = null;
            }
        });
    });



    document.getElementById('matching-restart-button').addEventListener('click', () => {
        const termsContainer = document.getElementById('terms-container');
        const definitionsContainer = document.getElementById('definitions-container');

        termsContainer.innerHTML = `
            <h3>Terms</h3>
            <div class="matching-item" draggable="true" data-match="term1">HTML</div>
            <div class="matching-item" draggable="true" data-match="term2">CSS</div>
            <div class="matching-item" draggable="true" data-match="term3">JavaScript</div>
            <div class="matching-item" draggable="true" data-match="term4">Bootstrap</div>
            <div class="matching-item" draggable="true" data-match="term5">jQuery</div>
            <div class="matching-item" draggable="true" data-match="term6">React</div>
            <div class="matching-item" draggable="true" data-match="term7">Node.js</div>
            <div class="matching-item" draggable="true" data-match="term8">Angular</div>
            <div class="matching-item" draggable="true" data-match="term9">Sass</div>
            <div class="matching-item" draggable="true" data-match="term10">TypeScript</div>
            <div class="matching-item" draggable="true" data-match="term11">Vue.js</div>
            <div class="matching-item" draggable="true" data-match="term12">PHP</div>
        `;

        definitionsContainer.innerHTML = `
            <h3>Definitions</h3>
            <div class="matching-target" data-match="term1">HyperText Markup Language</div>
            <div class="matching-target" data-match="term2">Cascading Style Sheets</div>
            <div class="matching-target" data-match="term3">Programming Language for Web</div>
            <div class="matching-target" data-match="term4">Front-end Framework</div>
            <div class="matching-target" data-match="term5">JavaScript Library</div>
            <div class="matching-target" data-match="term6">JavaScript Library for UI</div>
            <div class="matching-target" data-match="term7">JavaScript Runtime Environment</div>
            <div class="matching-target" data-match="term8">Front-end Framework by Google</div>
            <div class="matching-target" data-match="term9">CSS Preprocessor</div>
            <div class="matching-target" data-match="term10">JavaScript Superset</div>
            <div class="matching-target" data-match="term11">Progressive Framework</div>
            <div class="matching-target" data-match="term12">Server-Side Scripting Language</div>
        `;

        initializeDragAndDrop();
    });

    function initializeDragAndDrop() {
        items.forEach(item => {
            item.addEventListener('dragstart', () => {
                draggedItem = item;
                item.classList.add('dragging');
            });

            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
        });

        targets.forEach(target => {
            target.addEventListener('dragover', (e) => {
                e.preventDefault();
                target.classList.add('over');
            });

            target.addEventListener('dragleave', () => {
                target.classList.remove('over');
            });

            target.addEventListener('drop', () => {
                target.classList.remove('over');
                if (draggedItem && target.dataset.match === draggedItem.dataset.match) {
                    target.textContent = draggedItem.textContent;
                    target.classList.add('matched');
                    draggedItem.classList.add('matched');
                    draggedItem.remove();
                    draggedItem = null;
                }
            });
        });
    }

    initializeDragAndDrop();
});
