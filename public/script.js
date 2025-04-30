document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const amountInput = document.getElementById('amount');
    const userMessageInput = document.getElementById('user-message');
    const convertBtn = document.getElementById('convert-btn');
    const askBtn = document.getElementById('ask-btn');
    const toggleInputBtn = document.getElementById('toggle-input-btn');
    const simpleInputDiv = document.getElementById('simple-input');
    const chatInputDiv = document.getElementById('chat-input');
    const resultDiv = document.getElementById('result');
    const resultAmount = document.getElementById('result-amount');
    const resultRate = document.getElementById('result-rate');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    
    // Toggle between simple input and chat input
    toggleInputBtn.addEventListener('click', () => {
        if (simpleInputDiv.style.display === 'none') {
            // Switch to simple mode
            simpleInputDiv.style.display = 'block';
            chatInputDiv.style.display = 'none';
            toggleInputBtn.textContent = 'Switch to Chat Mode';
        } else {
            // Switch to chat mode
            simpleInputDiv.style.display = 'none';
            chatInputDiv.style.display = 'block';
            toggleInputBtn.textContent = 'Switch to Simple Mode';
        }
        
        // Hide result and error when switching modes
        resultDiv.style.display = 'none';
        error.style.display = 'none';
    });
    
    // Convert button click handler (Simple mode)
    convertBtn.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        
        // Validate input
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount');
            return;
        }
        
        // Create a message for the backend that will trigger the function call
        const message = {
            role: "user",
            parts: [{ text: `Convert ${amount} INR to USD` }]
        };
        
        // Process the conversion
        processConversion(message);
    });
    
    // Ask button click handler (Chat mode)
    askBtn.addEventListener('click', () => {
        const userMessage = userMessageInput.value.trim();
        
        if (!userMessage) {
            alert('Please enter a message');
            return;
        }
        
        // Create message object for the backend
        const message = {
            role: "user",
            parts: [{ text: userMessage }]
        };
        
        // Process the conversion
        processConversion(message);
    });
    
    // Function to handle the conversion process
    async function processConversion(message) {
        // Show loading and hide results/errors
        loading.style.display = 'block';
        resultDiv.style.display = 'none';
        error.style.display = 'none';
        
        try {
            // Make API call to the backend server
            const response = await fetch('/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            
            if (!response.ok) {
                throw new Error('Server responded with an error');
            }
            
            const data = await response.json();
            
            // Check if conversion was successful
            if (data.success) {
                // Display the result
                resultAmount.textContent = `₹${data.inr} = $${data.usd}`;
                resultRate.textContent = `Current exchange rate applied`;
                resultDiv.style.display = 'block';
            } else {
                // Show error message from server
                error.textContent = data.message || 'Could not process conversion request';
                error.style.display = 'block';
            }
        } catch (err) {
            console.error('Error:', err);
            error.textContent = 'Failed to connect to the server. Please try again later.';
            error.style.display = 'block';
        } finally {
            // Hide loading indicator
            loading.style.display = 'none';
        }
    }
});