document.addEventListener('DOMContentLoaded', () => {
    const textArea = document.getElementById('text-to-speak');
    const speakButton = document.getElementById('speak-button');
    const themeButton = document.getElementById('theme-button');
    let speaking = false;

    // Theme switching functionality
    let isDarkMode = false;
    themeButton.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode');
        themeButton.innerHTML = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    });

    // Background gradient changes
    const lightGradients = [
        'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        'linear-gradient(135deg, #E3FDF5 0%, #FFE6FA 100%)',
        'linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)',
        'linear-gradient(135deg, #FFF1EB 0%, #ACE0F9 100%)'
    ];

    const darkGradients = [
        'linear-gradient(135deg, #1663af 0%, #3498db 100%)',
        'linear-gradient(135deg, #0580fc 0%, #db6334 100%)',
        'linear-gradient(135deg, #0580fc 0%, #fa4d08 100%)',
        'linear-gradient(135deg, #141E30 0%, #243B55 100%)'
    ];

    let currentGradientIndex = 0;

    function changeBackground() {
        const gradients = isDarkMode ? darkGradients : lightGradients;
        currentGradientIndex = (currentGradientIndex + 1) % gradients.length;
        document.body.style.background = gradients[currentGradientIndex];
    }

    // Change background every 3 seconds
    setInterval(changeBackground, 3000);

    // Speech synthesis functionality
    if ('speechSynthesis' in window) {
        const synthesis = window.speechSynthesis;

        speakButton.addEventListener('click', () => {
            if (speaking) {
                synthesis.cancel();
                speaking = false;
                speakButton.innerHTML = '<span class="icon">🔊</span> Speak';
                return;
            }

            const text = textArea.value.trim();
            
            if (text) {
                const utterance = new SpeechSynthesisUtterance(text);
                
                utterance.onstart = () => {
                    speaking = true;
                    speakButton.innerHTML = '<span class="icon">⏹️</span> Stop';
                };

                utterance.onend = () => {
                    speaking = false;
                    speakButton.innerHTML = '<span class="icon">🔊</span> Speak';
                };

                synthesis.speak(utterance);
            }
        });
    } else {
        speakButton.disabled = true;
        speakButton.textContent = 'Speech synthesis not supported';
        textArea.placeholder = 'Sorry, your browser does not support text-to-speech functionality.';
    }
});
