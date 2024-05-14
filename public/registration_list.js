document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/registrations');
        const data = await response.json();
        displayRegistrations(data);

        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', () => {
            const searchString = searchInput.value.toLowerCase();
            const filteredRegistrations = data.filter(registration => {
                return (
                    registration.full_name.toLowerCase().includes(searchString) ||
                    registration.email.toLowerCase().includes(searchString)
                );
            });
            displayRegistrations(filteredRegistrations);
        });
    } catch (error) {
        console.error('Error loading registrations:', error.message);
    }
});

const displayRegistrations = (registrations) => {
    const registrationList = document.getElementById('registration-list');
    registrationList.innerHTML = '';
    registrations.forEach(registration => {
        const registrationElement = document.createElement('div');
        registrationElement.classList.add('registration-item');
        registrationElement.innerHTML = `
            <strong>Full Name:</strong> ${registration.full_name}<br>
            <strong>Email:</strong> ${registration.email}<br>
            <strong>Date of Birth:</strong> ${registration.dob}<br>
            <strong>Source:</strong> ${registration.source}<br><br>
        `;
        registrationList.appendChild(registrationElement);
    });
};
