document.addEventListener('DOMContentLoaded', function() {
    const countDownDate = new Date("July 15, 2025 00:00:00").getTime();
    const countdownDisplay = document.getElementById("countdown-timer-display");
    const countdownPopup = document.getElementById('countdown-popup');
    const closeCountdownBtn = document.getElementById('close-countdown-popup');

    if (!countdownDisplay) {
        console.error("Countdown display element not found! Make sure an element with id='countdown-timer-display' exists.");
        return;
    }

    if (countdownPopup && closeCountdownBtn) {
        closeCountdownBtn.addEventListener('click', function() {
            countdownPopup.style.display = 'none';
        });
    }

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            countdownDisplay.innerHTML = "The event has started!";
            if (interval) { // Check if interval is defined before clearing
                clearInterval(interval); // Stop the interval
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            // const seconds = Math.floor((distance % (1000 * 60)) / 1000); // Seconds still not required

            countdownDisplay.innerHTML = `Time Left: ${days}d ${hours}h ${minutes}m`;
    };

    // Store interval in a variable that updateCountdown can access for clearing
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display immediately
});
