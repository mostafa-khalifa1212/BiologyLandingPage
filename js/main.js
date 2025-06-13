document.addEventListener('DOMContentLoaded', function() {
    // Modal Elements
    const modalOverlay = document.getElementById('popup-modal');
    const modalCloseButton = document.getElementById('modal-close-button');
    const modalRegisterButton = document.getElementById('modal-register-button');

    // Free Notes Registration Form Elements
    const registrationForm = document.getElementById('modal-registration-form');
    const thankYouMessage = document.getElementById('modal-message-area'); // Use the correct message area
    const showFormButton = document.getElementById('show-registration-form-btn');

    // Registration Modal Logic
    const registrationModalOverlay = document.getElementById('registration-modal-overlay');
    const registrationModalContent = document.getElementById('registration-modal-content');
    const registrationModalCloseBtn = document.getElementById('registration-modal-close-btn');

    // Modal Logic for onload banner
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
    if (showFormButton && registrationModalOverlay && registrationModalContent && registrationModalCloseBtn) {
        showFormButton.addEventListener('click', function() {
            registrationModalOverlay.classList.remove('hidden');
            setTimeout(() => {
                registrationModalContent.classList.remove('scale-95', 'opacity-0');
                registrationModalContent.classList.add('scale-100', 'opacity-100');
                registrationModalContent.scrollTop = 0;
            }, 10);
        });
        registrationModalCloseBtn.addEventListener('click', function() {
            registrationModalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                registrationModalOverlay.classList.add('hidden');
            }, 200);
        });
        registrationModalOverlay.addEventListener('click', function(event) {
            if (event.target === registrationModalOverlay) {
                registrationModalContent.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    registrationModalOverlay.classList.add('hidden');
                }, 200);
            }
        });
    } else {
        if (!showFormButton) console.error("Show registration form button (#show-registration-form-btn) not found!");
        if (!registrationModalOverlay) console.error("Registration modal overlay (#registration-modal-overlay) not found!");
        if (!registrationModalContent) console.error("Registration modal content (#registration-modal-content) not found!");
        if (!registrationModalCloseBtn) console.error("Registration modal close button (#registration-modal-close-btn) not found!");
    }

    // Free Notes Form Submission Handling
    if (registrationForm && thankYouMessage) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            if (!registrationForm.checkValidity()) {
                registrationForm.reportValidity();
                return;
            }
            const formData = {
                name: registrationForm.name.value,
                email: registrationForm.email.value,
                phone: registrationForm.phone.value,
            };
            const submitButton = registrationForm.querySelector('button[type="submit"]');
            if(submitButton) submitButton.disabled = true;
            thankYouMessage.textContent = 'Submitting...';
            thankYouMessage.className = 'thank-you-message-submitting';
            thankYouMessage.style.display = 'block';
            fetch('https://mostafakhbiobackend.netlify.app/.netlify/functions/register', {
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
                thankYouMessage.textContent = `Thank you for registering! Your notes are now available for download.`;
                thankYouMessage.className = 'thank-you-message-success';
                thankYouMessage.style.display = 'block';
                const link = document.createElement('a');
                link.href = 'assets/Ch1 Respiration&Energy NOTES.pdf';
                link.download = 'Ch1 Respiration&Energy NOTES.pdf';
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
        if (!registrationForm) console.error("Registration form (#modal-registration-form) not found!");
        if (!thankYouMessage) console.error("Thank you message element (#modal-message-area) not found for form status!");
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

    // --- Course Registration Modal Logic ---
    const showCourseButton = document.getElementById('show-course-registration-btn');
    const courseModalOverlay = document.getElementById('course-registration-modal-overlay');
    const courseModalContent = document.getElementById('course-registration-modal-content');
    const courseModalCloseBtn = document.getElementById('course-registration-modal-close-btn');

    if (showCourseButton && courseModalOverlay && courseModalContent && courseModalCloseBtn) {
        showCourseButton.addEventListener('click', function() {
            courseModalOverlay.classList.remove('hidden');
            setTimeout(() => {
                courseModalContent.classList.remove('scale-95', 'opacity-0');
                courseModalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        });

        courseModalCloseBtn.addEventListener('click', function() {
            courseModalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                courseModalOverlay.classList.add('hidden');
            }, 200);
        });

        courseModalOverlay.addEventListener('click', function(event) {
            if (event.target === courseModalOverlay) {
                courseModalContent.classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    courseModalOverlay.classList.add('hidden');
                }, 200);
            }
        });
    }

    // Hamburger menu logic
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    
    function openMobileMenu() {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenuOverlay.classList.remove('hidden');
        setTimeout(() => {
            mobileMenuOverlay.classList.add('opacity-100');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.remove('opacity-100');
        setTimeout(() => {
            mobileMenuOverlay.classList.add('hidden');
        }, 300);
        document.body.style.overflow = '';
    }
    if (hamburgerBtn && mobileMenu && mobileMenuOverlay && mobileMenuClose) {
        hamburgerBtn.addEventListener('click', openMobileMenu);
        mobileMenuClose.addEventListener('click', closeMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        // Close menu on nav link click (for smooth UX)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        // Close menu if resizing above md breakpoint
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                closeMobileMenu();
            }
        });
    }

    // --- Free Notes Modal Form Validation ---
    const modalName = document.getElementById('modal-name');
    const modalEmail = document.getElementById('modal-email');
    const modalPhone = document.getElementById('modal-phone');
    const modalConsent = document.getElementById('modal-consent');
    const modalSubmitBtn = document.getElementById('modal-submit-btn');

    function checkModalFormValidity() {
        const allFilled = modalName.value.trim() && modalEmail.value.trim() && modalPhone.value.trim();
        const consentChecked = modalConsent.checked;
        if (allFilled && consentChecked) {
            modalSubmitBtn.disabled = false;
            modalSubmitBtn.classList.remove('bg-gray-500', 'cursor-not-allowed', 'opacity-60');
            modalSubmitBtn.classList.add('bg-[#1E90FF]', 'hover:bg-[#187bcd]', 'cursor-pointer', 'transition-colors', 'duration-300');
        } else {
            modalSubmitBtn.disabled = true;
            modalSubmitBtn.classList.add('bg-gray-500', 'cursor-not-allowed', 'opacity-60');
            modalSubmitBtn.classList.remove('bg-[#1E90FF]', 'hover:bg-[#187bcd]', 'cursor-pointer', 'transition-colors', 'duration-300');
        }
    }

    [modalName, modalEmail, modalPhone, modalConsent].forEach(el => {
        el.addEventListener('input', checkModalFormValidity);
        el.addEventListener('change', checkModalFormValidity);
    });
    // --- End Free Notes Modal Form Validation ---
});
