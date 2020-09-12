import faker from 'faker';

const tbody = document.querySelector('tbody');
const parent = document.querySelector('body');

let persons = Array.from({ length: 10 }, () => {
    return {
        id: faker.random.uuid(),
        lastName: faker.name.lastName(),
        firstName: faker.name.firstName(),
        jobTitle: faker.name.jobTitle(),
        jobArea: faker.name.jobArea(),
        phone: faker.phone.phoneNumber(),
        picture: faker.image.avatar(100, 100),
    };
});

const displayList = data => {
    tbody.innerHTML = data
        .map(
            (person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td class="lastname">${person.lastName}</td>
        <td class="firstname">${person.firstName}</td>
        <td class="job">${person.jobTitle}</td>
        <td class="area">${person.jobArea}</td>
        <td class="phone">${person.phone}</td>
        <td>
            <button class="edit" value="${person.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete" value="${person.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
    </tr>
`
        )
        .join('');
};

const editPartner = (e) => {
    // grab the icon edit and set the condition edit
    const iconEdit = e.target.closest('button.edit');
    if (iconEdit) {
        const editTbleRow = e.target.closest('tr');
        const idToEdit = editTbleRow.dataset.id; // the id of the item to delete
        editPartnerPopup(idToEdit);
    }
};

window.addEventListener('click', editPartner);


const editPartnerPopup = idToEdit => {
    // create the popup and show it with conditions
    return new Promise(async function(resolve) {
        //create the popup form
        const popup = document.createElement('form');
        let person = persons.find(person => person.id === idToEdit);
        const html = `
        <ul class="form">
            <li>
			    <label for="lastName">Last Name:</label>
                <input type="text" name="lastName" id="lastname" value="${person.lastName}">
            </li>
            <li>
			    <label for="firstName">First Name:</label>
                <input type="text" name="firstName" id="firstname" value="${person.firstName}">
            </li>
            <li>
			    <label for="jobTitle">Job title:</label>
                <input type="text" name="jobTitle" id="job" value="${person.jobTitle}">
            </li>
            <li>
			    <label for="jobArea">Job area:</label>
                <input type="text" name="jobArea" id="area" value="${person.jobArea}">
            </li>
            <li>
			    <label for="phoneNumber">Phone Number:</label>    
                <input type="text" name="phoneNumber" id="number" value="${person.phone}">
            </li>
		</ul>
        <div>
            <button type="submit">Submit</button>
            <button class="cancel">Cancel</button>
        </div>
		`;
        popup.insertAdjacentHTML('afterbegin', html);
        parent.appendChild(popup);
        popup.classList.add('popup');
        popup.classList.add('open');
        popup.addEventListener('submit', e => {
            e.preventDefault();
            resolve();
            person.lastName = popup.lastName.value;
            person.firstName = popup.firstName.value;
            person.jobArea = popup.jobArea.value;
            person.jobTitle = popup.jobTitle.value;
            person.phone = popup.phoneNumber.value;
            displayList(persons);
            console.log(person);
            destroyPopup(popup);
        }, { once: true });
        if (popup.cancel) {
            popup.cancel.addEventListener('click', function() {
                resolve(null);
                destroyPopup(popup);
            }, { once: true });
        }
    })
};

async function destroyPopup(popup) {
    popup.classList.remove('open');
    popup.remove();
    popup = null;
}

//delete partner when clicking the icon delete
const deletePartener = e => {
    const iconDelt = e.target.closest('.delete');
    if (iconDelt) {
        const tableRow = e.target.closest('tr');
        console.log(tableRow);
        console.log(tableRow.dataset.id);
        const idToDelete = tableRow.dataset.id;
        deletePartenerPopup(idToDelete);
    }
}

window.addEventListener('click', deletePartener);

const deletePartenerPopup = idToDelete => {
    return new Promise(async function(resolve) {
        const deletePopup = document.createElement('div');
        // find the id to delete
        let personToDelet = persons.find(person => person.id === idToDelete);
        deletePopup.classList.add('popup');
        const html = `
                    <div>
                        <p>Do you really want to delete ${personToDelet.lastName} ${personToDelet.firstName}?</p>
                        <ul class="buttonDelt">
                            <li>
                                <button class="yes">Yes</button>
                            </li>
                            <li>
                                <button class="cancel">Cancel</button>
                            </li>
                    </div>
                `;
        deletePopup.insertAdjacentHTML('afterbegin', html);
        deletePopup.addEventListener('click', (e) => {
            if (e.target.matches('.yes')) {
                let filteredPerson = persons.filter(pers => pers.id !== idToDelete);
                displayList(filteredPerson);
                console.log(filteredPerson);
                destroyPopup(deletePopup);
            }

            // when cancel deleting
            if (e.target.matches('.cancel')) {
                destroyPopup(deletePopup);
            }
        })
        resolve();
        parent.appendChild(deletePopup)
        deletePopup.classList.add('open');
    });
};

displayList(persons);