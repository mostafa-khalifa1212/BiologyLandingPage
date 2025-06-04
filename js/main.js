document.addEventListener('DOMContentLoaded', function() {
    const modalOverlay = document.getElementById('popup-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalRegisterButton = document.getElementById('modal-register-button'); // Button inside modal

    if (!modalOverlay) {
        console.error("Modal overlay element (#popup-modal) not found!");
        return; // Stop if main modal element is missing
    }
    if (!modalCloseButton) {
        console.error("Modal close button (#modal-close-button) not found!");
        // Optionally, still allow modal to show, but log error
    }
    if (!modalRegisterButton) {
        console.error("Modal register button (#modal-register-button) not found!");
        // Optionally, still allow modal to show, but log error
    }

    // Function to show the modal
    const showModal = () => {
        if (modalOverlay) { // Check again in case it was initially missing but now available (less likely with DOMContentLoaded)
            modalOverlay.style.display = 'flex'; // Use flex to center content
        }
    };

    // Function to hide the modal
    const hideModal = () => {
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    };

    // Show modal on page load
    // Consider adding a delay or localStorage check here for better UX in a real application
    // For now, show it directly as per subtask.
    showModal();

    // Event listener for the close button
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', hideModal);
    }

    // Event listener for the "Register Now" button inside the modal
    if (modalRegisterButton) {
        modalRegisterButton.addEventListener('click', function() {
            hideModal();
            // The href="#free-notes" on the anchor tag will handle the navigation
        });
    }

    // Optional: Close modal if user clicks outside the modal content
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) { // Check if the click is on the overlay itself
                hideModal();
            }
        });
    }

    // Placeholder for form submission handling (from a potential future subtask)
    // const registrationForm = document.getElementById('registration-form');
    // if (registrationForm) {
    //     registrationForm.addEventListener('submit', function(event) {
    //         event.preventDefault(); // Prevent default form submission
    //         // Add form processing logic here
    //         console.log('Form submitted (not really, this is a placeholder)');
    //         // document.getElementById('thank-you-message').style.display = 'block';
    //         // registrationForm.reset();
    //     });
    // }
});
