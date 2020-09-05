import faker from 'faker';

const tbody = document.querySelector('tbody');

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
            <button class="delete">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
    </tr>
`
        )
        .join('');
};


const editPartner = (id) => {
    // code edit function here
    return new Promise(async function(resolve) {
        const popup = document.createElement('form');
        let person = persons.find(person => person.id === id);
        popup.classList.add('popup');
        const html = `
		<fieldset>
			<label for="lastname">Last Name</label>
			<input type="text" name="lastname" id="lastname" value="${person.lastName}">
			<label for="firstname">First name</label>
			<input type="text" name="firstname" id="firstname" value="${person.firstName}">
			<label for="job">Job</label>
			<input type="text" name="job" id="job" value="${person.jobTitle}">
			<label for="area">Job area</label>
			<input type="text" name="area" id="area" value="${person.jobArea}">
			<label for="number">Phone Number</label>
			<input type="text" name="number" id="number" value="${person.phoneNumber}">
		</fieldset>
	<div>
		<button type="submit">Submit</button>
		<button class="cancel">Cancel</button>
	</div>
		`;
        popup.insertAdjacentHTML('afterbegin', html);
        console.log(popup);
        const parent = document.querySelector('body');
        parent.appendChild(popup);
        popup.classList.add('open');
        if (options.cancel) {
            const skipButton = e.target.closest('button.cancel');
            // we use firstElementChild but not firstChild bec firstElementChild is a key word to grab an element. FirstChild is to grab a node( )
            // TODO: listen for a click on that cancel button
            skipButton.addEventListener("click", () => {
                    resolve(null);
                    destroyPopup(popup);
                },
                // This will allow the addEventListener run just once
                { once: true });
        }
        console.log(skipButton);
    })

};
async function destroyPopup(popup) {
    popup.classList.remove("open");
    // wait for one second to do its works
    await wait(1000);
    // remove the popup entirely
    popup.remove();
    popup = null;
}


const handleEdit = (event) => {
    const iconEdit = event.target.closest('button.edit');
    if (iconEdit) {
        editPartner();
    }
}

window.addEventListener('click', handleEdit);

const editPartnerPopup = (e) => {
    // create edit popup here
    const formEl = e.currentTarget;
    const lastNameInput = document.querySelector('.lastname');
    let editedPerson = {
        lastName: `${formEl.lastname.value}`,
        firstName: `${formEl.firstname.value}`,
        job: `${formEl.job.value}`,
        area: `${formEl.area.value}`,
        phone: `${formEl.number.value}`,
    }
    lastNameInput
};

const deletePartner = () => {
    // code delete function gere
    return new Promise(async function(resolve) {
        const deletePopup = document.createElement('div');
        deletePopup.classList.add('deletepopup');
        const html = `
			<p>Are you sure you want to delete this</p>
			<button class="yes">Yes</button>
			<button class="no">No</button>
		`;
        deletePopup.insertAdjacentHTML("afterbegin", html);
        const parentEl = document.querySelector('body');
        parentEl.appendChild(deletePopup);
        console.log(deletePopup);
        deletePopup.classList.add('open');
    })
};
const handleDelete = (e) => {
    const delteIcon = e.target.closest('button.delete');
    if (delteIcon) {
        deletePartner();
    }
}
window.addEventListener('click', handleDelete);

const deleteDeletePopup = () => {
    // create confirmation popup here
};



displayList(persons);