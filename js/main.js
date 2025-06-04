document.addEventListener('DOMContentLoaded', function() {
    // Modal Elements
    const modalOverlay = document.getElementById('popup-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalRegisterButton = document.getElementById('modal-register-button');

    // Form Elements
    const registrationForm = document.getElementById('registration-form');
    const thankYouMessage = document.getElementById('thank-you-message'); // This element will be used for success/error messages

    // Modal Logic
    if (modalOverlay && modalCloseButton && modalRegisterButton) {
        const showModal = () => {
            modalOverlay.style.display = 'flex';
        };

        const hideModal = () => {
            modalOverlay.style.display = 'none';
        };

        showModal();

        modalCloseButton.addEventListener('click', hideModal);

        modalRegisterButton.addEventListener('click', function() {
            hideModal();
        });

        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                hideModal();
            }
        });
    } else {
        if (!modalOverlay) console.error("Modal overlay element (#popup-modal) not found!");
        if (!modalCloseButton) console.error("Modal close button (#modal-close-button) not found!");
        if (!modalRegisterButton) console.error("Modal register button (#modal-register-button) not found!");
    }

    // Form Submission Handling with Fetch API
    if (registrationForm && thankYouMessage) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            if (!registrationForm.checkValidity()) {
                registrationForm.reportValidity(); // Show native browser validation errors
                return;
            }

            const formData = {
                name: registrationForm.name.value,
                email: registrationForm.email.value,
                phone: registrationForm.phone.value,
                school: registrationForm.school.value,
                interest: registrationForm.interest.value
            };

            // Optional: Add a loading state to the UI here
            // For example, disable the submit button and show a spinner
            const submitButton = registrationForm.querySelector('button[type="submit"]');
            if(submitButton) submitButton.disabled = true;
            thankYouMessage.textContent = 'Submitting...';
            thankYouMessage.className = 'thank-you-message-submitting'; // A neutral class
            thankYouMessage.style.display = 'block';


            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                // Check if the response is ok (status in the range 200-299)
                // Then parse it as JSON
                if (!response.ok) {
                    // If not OK, parse JSON to get error message, then throw an error to be caught by .catch
                    return response.json().then(errData => {
                        // Use errData.message if available, otherwise a default server error message
                        throw new Error(errData.message || `Server error: ${response.status}`);
                    });
                }
                return response.json(); // If OK, parse JSON for success message
            })
            .then(data => { // This 'data' is the parsed JSON from a successful response (status 201)
                registrationForm.style.display = 'none'; // Hide the form
                thankYouMessage.textContent = data.message || 'Thank you for registering! Your download will start shortly.';
                thankYouMessage.className = 'thank-you-message-success'; // Apply success class
                thankYouMessage.style.display = 'block';


                // Trigger PDF download
                const link = document.createElement('a');
                link.href = 'assets/free_chapter1.pdf';
                link.download = 'Chapter1-Respiration-Energy-Notes.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // No need to re-enable submitButton here as the form is hidden
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                // Display the error message (from server or network error)
                thankYouMessage.textContent = error.message || 'An error occurred. Please try again.';
                thankYouMessage.className = 'thank-you-message-error'; // Apply error class
                thankYouMessage.style.display = 'block';

                if(submitButton) submitButton.disabled = false; // Re-enable submit button on error
            });
        });
    } else {
        if (!registrationForm) console.error("Registration form (#registration-form) not found!");
        if (!thankYouMessage) console.error("Thank you message element (#thank-you-message) not found for form status!");
    }
});
