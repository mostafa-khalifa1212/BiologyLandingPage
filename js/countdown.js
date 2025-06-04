document.addEventListener('DOMContentLoaded', function() {
    const countDownDate = new Date("July 15, 2025 00:00:00").getTime();
    const countdownDisplay = document.getElementById("countdown-timer-display");

    if (!countdownDisplay) {
        console.error("Countdown display element not found! Make sure an element with id='countdown-timer-display' exists.");
        return;
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
        // const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)); // Not required by issue
        // const seconds = Math.floor((distance % (1000 * 60)) / 1000); // Not required by issue

        countdownDisplay.innerHTML = `Time Left: ${days}d ${hours}h`;
    };

    // Store interval in a variable that updateCountdown can access for clearing
    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call to display immediately
});
