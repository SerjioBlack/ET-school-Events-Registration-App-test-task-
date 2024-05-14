document.getElementById('registration-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get form data
  const formData = new FormData(event.target);
  const fullName = formData.get('full-name');
  const email = formData.get('email');
  const dob = formData.get('dob');
  const source = formData.get('source');

  // Validate full name
  if (!fullName || fullName.trim().split(' ').length < 2) {
    alert('Please enter your full name with at least 2 words separated by a space.');
    return;
  }

  // Validate email
  if (!email || !isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Validate date of birth
  if (!dob) {
    alert('Please enter your date of birth.');
    return;
  }

  // Validate source
  if (!source) {
    alert('Please enter where you heard about the event.');
    return;
  }

  // Proceed with registration if all fields are valid
  const registrationData = {
    full_name: fullName,
    email: email,
    dob: dob,
    source: source
  };

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registrationData)
    });
    if (response.ok) {
      alert('Registration successful!');
    } else {
      const data = await response.json();
      throw new Error(data.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Error registering:', error.message);
    alert('Registration failed. Please try again.');
  }
});

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
