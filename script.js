window.addEventListener('DOMContentLoaded', function () {

    let data = null;
    let optionsExclues = [];

    const chatContainer = document.querySelector('#chat-box');
    const chatReponse = document.querySelector('#reponse-options');

    fetch('data.json')
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            afficherMessage('Maxime', data.introduction);
        })
        .catch(error => {
            console.error('Erreur de chargement du JSON :', error);
            afficherMessage('Maxime', "Désolé, je ne peux pas charger mes données.");
        });

    function afficherMessage(sender, message, optionCliquee = null) {
        const msg = document.createElement('div');
        msg.className = sender === 'Maxime' ? 'message bot' : 'message user';
        msg.textContent = `${sender}: ${message}`;
        chatContainer.appendChild(msg);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        chatReponse.innerHTML = '';
        if (sender === 'Maxime') {
            if (optionCliquee) {
                optionsExclues.push(optionCliquee);
            }
            afficherOptions(Object.keys(data.options), optionsExclues);
        }
    }

    function afficherOptions(options, optionsExclues = []) {
        chatReponse.innerHTML = '';

        options
            .filter(option => !optionsExclues.includes(option))
            .forEach(option => {
                const btn = document.createElement('button');
                btn.textContent = option;
                btn.addEventListener('click', () => {
                    const oldButtons = chatContainer.querySelectorAll('button');
                    oldButtons.forEach(b => b.remove());
                    afficherMessage('Vous', option);
                    afficherMessage('Maxime', data.options[option], option);
                });
                chatContainer.appendChild(btn);
            });
    }
});
