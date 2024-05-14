document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/events');
    const data = await response.json();
    displayEventsAsGrid(data);
  } catch (error) {
    console.error('Error loading events:', error.message);
  }
});

const eventsContainer = document.getElementById('events-container');
const paginationButtons = document.getElementById('pagination-buttons');
const sortingButtons = document.getElementById('sorting-buttons');

let currentPage = 1;
const eventsPerPage = 12;
let currentSortOption = 'title'; // Default sorting option

const loadEvents = async (page, sortBy) => {
  try {
    const response = await fetch(`/events?page=${page}&limit=${eventsPerPage}&sortBy=${sortBy}`);
    const data = await response.json();
    displayEventsAsGrid(data);
  } catch (error) {
    console.error('Error loading events:', error.message);
  }
};

const displayEventsAsGrid = (events) => {
  eventsContainer.innerHTML = '';
  const eventsGrid = document.createElement('div');
  eventsGrid.classList.add('events-grid');
  events.forEach((event) => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Description:</strong> ${event.description}</p>
      <p><strong>Date:</strong> ${event.event_date}</p>
      <p><strong>Organizer:</strong> ${event.organizer}</p>
      <button class="register-btn" data-id="${event.id}">Register</button>
      <button class="view-btn" data-id="${event.id}">View Registrations</button>
    `;
    eventsGrid.appendChild(eventElement);
  });
  eventsContainer.appendChild(eventsGrid);
};

const createPaginationButtons = (totalPages) => {
  paginationButtons.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      loadEvents(currentPage, currentSortOption);
    });
    paginationButtons.appendChild(button);
  }
};

const createSortingButtons = () => {
  sortingButtons.innerHTML = '';
  const sortOptions = ['title', 'event_date', 'organizer']; // Sorting options
  sortOptions.forEach((option) => {
    const button = document.createElement('button');
    button.textContent = option.charAt(0).toUpperCase() + option.slice(1); // Capitalize first letter
    button.addEventListener('click', () => {
      currentSortOption = option;
      loadEvents(currentPage, currentSortOption);
    });
    sortingButtons.appendChild(button);
  });
};

loadEvents(currentPage, currentSortOption);
createPaginationButtons(2);
createSortingButtons();

document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('register-btn')) {
    const eventId = event.target.dataset.id;
    window.location.href = `/registration.html?eventId=${eventId}`;
  } else if (event.target.classList.contains('view-btn')) {
    const eventId = event.target.dataset.id;
    window.location.href = `/registration_list.html?eventId=${eventId}`;
  }
});
