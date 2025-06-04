document.addEventListener('DOMContentLoaded', function() {
    // Modal Elements
    const modalOverlay = document.getElementById('popup-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalRegisterButton = document.getElementById('modal-register-button');

    // Form Elements
    const registrationForm = document.getElementById('registration-form');
    const thankYouMessage = document.getElementById('thank-you-message'); // This element will be used for success/error messages
    const showFormButton = document.getElementById('show-registration-form-btn');

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

    // Show/Hide Registration Form Logic
    if (showFormButton && registrationForm) {
        showFormButton.addEventListener('click', function() {
            showFormButton.style.display = 'none'; // Hide the button
            registrationForm.style.display = 'block'; // Show the form
        });
    } else {
        if (!showFormButton) console.error("Show registration form button (#show-registration-form-btn) not found!");
        // Error for registrationForm already handled below
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

            const submitButton = registrationForm.querySelector('button[type="submit"]');
            if(submitButton) submitButton.disabled = true;
            thankYouMessage.textContent = 'Submitting...';
            thankYouMessage.className = 'thank-you-message-submitting';
            thankYouMessage.style.display = 'block';


            fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(errData => {
                        throw new Error(errData.message || `Server error: ${response.status}`);
                    });
                }
                return response.json();
            })
            .then(data => {
                registrationForm.style.display = 'none';
                thankYouMessage.textContent = data.message || 'Thank you for registering! Your download will start shortly.';
                thankYouMessage.className = 'thank-you-message-success';
                thankYouMessage.style.display = 'block';

                const link = document.createElement('a');
                link.href = 'assets/free_chapter1.pdf';
                link.download = 'Chapter1-Respiration-Energy-Notes.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                thankYouMessage.textContent = error.message || 'An error occurred. Please try again.';
                thankYouMessage.className = 'thank-you-message-error';
                thankYouMessage.style.display = 'block';

                if(submitButton) submitButton.disabled = false;
            });
        });
    } else {
        if (!registrationForm) console.error("Registration form (#registration-form) not found!");
        if (!thankYouMessage) console.error("Thank you message element (#thank-you-message) not found for form status!");
    }

    // Header scroll effect
    const header = document.getElementById('main-header');
    const headerScrollThreshold = 50; // Pixels to scroll before changing header

    if (header) {
        const handleScroll = () => {
            if (window.scrollY > headerScrollThreshold) {
                header.classList.add('bg-[#1e1e3f]', 'shadow-md');
                // To use backdrop-blur, ensure the background color has alpha, e.g., header.classList.add('bg-[#1e1e3f]/90', 'backdrop-blur-sm');
            } else {
                header.classList.remove('bg-[#1e1e3f]', 'shadow-md');
                // header.classList.remove('bg-[#1e1e3f]/90', 'backdrop-blur-sm');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check in case page is loaded already scrolled
    } else {
        console.error("Header element with ID 'main-header' not found for scroll effect.");
    }
});
