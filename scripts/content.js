const loop = setInterval(waitForDomUpdate, 1000);

function addFilterField() {
    const tables = document.querySelectorAll('table.css-gncwal');

    let tableNumber = 1;
    tables.forEach(table => {
        var filterId = `legendFilter+${tableNumber++}`;
        let inputField = document.getElementById(filterId);
        if (!inputField) {
            inputField = document.createElement('input');
            inputField.type = 'text';
            inputField.placeholder = 'Filter legends';
            inputField.style.border = "1px solid white";
            inputField.id = filterId;

            table.parentNode.insertBefore(inputField.cloneNode(), table);

            inputField = document.getElementById(inputField.id);
            inputField.addEventListener('input', () => {
                filterTable(inputField);
            });
        }
    });
}

function filterTable(filterInput) {
    const filterText = filterInput.value.toLowerCase();
    const rows = filterInput.parentNode.querySelectorAll("table tr");

    for (let i = 1; i < rows.length; i++) { // starting from 1 to exclude the table header row
        const cells = rows[i].querySelectorAll("td");
        let match = false;

        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].textContent.toLowerCase();

            if (cellText.includes(filterText)) {
                match = true;
                break;
            }
        }

        if (match) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function waitForDomUpdate() {
    try {
        const pageToolbar = document.querySelector('.page-toolbar');

        var btn = document.createElement("button");
        btn.innerText = "Add Filters";

        btn.addEventListener('click', () => {
            addFilterField();
        });

        const lastChild = pageToolbar.lastElementChild;
        lastChild.insertBefore(btn, lastChild.firstChild);

        clearInterval(loop);
    }
    catch (e) {
        console.error(e);
    }
}