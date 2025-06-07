const promptInput = document.getElementById('prompt-input');
const generateBtn = document.getElementById('generate-btn');
const imageDisplay = document.getElementById('image-display');
const placeholderText = document.getElementById('placeholder-text');
const loadingText = document.getElementById('loading-text');

generateBtn.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();

    if (!prompt) {
        alert('Please enter a prompt.');
        return;
    }

    // Clear previous content and show loading state
    imageDisplay.innerHTML = '';
    placeholderText.style.display = 'none';
    loadingText.style.display = 'block';
    generateBtn.disabled = true;

    try {
        // Call the AI image generation API
        // Note: The websim.imageGen function uses the platform's integrated
        // image generation capabilities, which typically leverage advanced models
        // like OpenAI's DALL-E 3 implicitly. There isn't a specific 'gpt-4o'
        // model parameter for image generation via this function, as gpt-4o is
        // primarily a language model.
        const result = await websim.imageGen({
            prompt: prompt,
            aspect_ratio: "1:1" // Default to square, could add options later
            // Add more options like size, transparency if needed
            // Currently, model selection is not an exposed parameter for websim.imageGen
        });

        if (result && result.url) {
            // Display the generated image
            const img = document.createElement('img');
            img.src = result.url;
            img.alt = prompt; // Use prompt as alt text
            imageDisplay.appendChild(img);
            loadingText.style.display = 'none';
        } else {
            // Handle cases where API returns no URL
             imageDisplay.innerHTML = '<p style="color: red;">Error generating image. Please try again.</p>';
             loadingText.style.display = 'none';
             placeholderText.style.display = 'none'; // Hide placeholder on error
        }

    } catch (error) {
        console.error('Error generating image:', error);
        imageDisplay.innerHTML = '<p style="color: red;">An error occurred while generating the image.</p>';
        loadingText.style.display = 'none';
        placeholderText.style.display = 'none'; // Hide placeholder on error
    } finally {
        generateBtn.disabled = false; // Re-enable button
    }
});

// Show placeholder text initially
placeholderText.style.display = 'block';