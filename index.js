// script.js

document.addEventListener('DOMContentLoaded', function () {
    const profileForm = document.getElementById('profile-form');
    const playersList = document.getElementById('players');
    
    profileForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const contact = document.getElementById('contact').value;
        const gameMode = document.getElementById('game-mode').value;

        const newPlayer = {
            username,
            contact,
            gameMode
        };

        try {
            // Send player data to the server
            const response = await fetch('/api/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlayer)
            });

            const result = await response.json();

            if (result.success) {
                // Update the UI or perform any other actions on success
                console.log('Player added successfully');
            } else {
                console.error('Failed to add player:', result.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
