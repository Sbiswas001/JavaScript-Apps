document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const wordCount = document.getElementById('word-count');
    const charCount = document.getElementById('char-count');
    const sentenceCount = document.getElementById('sentence-count');

    function updateCounts() {
        const text = textInput.value.trim();
        
        // Count characters (excluding spaces)
        const chars = text.replace(/\s/g, '').length;
        charCount.textContent = chars;

        // Count words
        const words = text ? text.split(/\s+/).length : 0;
        wordCount.textContent = words;

        // Count sentences (looking for ., !, ?)
        const sentences = text ? text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length : 0;
        sentenceCount.textContent = sentences;
    }

    // Update counts on input
    textInput.addEventListener('input', updateCounts);
});