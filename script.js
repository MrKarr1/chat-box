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
        // function poiur afficher un message dans le chat
        const msg = document.createElement('div');
        msg.className = sender === 'Maxime' ? 'message bot' : 'message user';
        // ajout la classe messsage bot  si c'est un message du bot sinon messsage user
        msg.textContent = `${sender}: ${message}`;
        // ajout le texte du message
        chatContainer.appendChild(msg);
        // ajout le message au chat
        chatContainer.scrollTop = chatContainer.scrollHeight;
        // faire défiler le chat vers le bas

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

        const autresOptions = options.filter(option => option !== 'cv' && !optionsExclues.includes(option));
        const cvOption = options.includes('cv') && !optionsExclues.includes('cv');

        autresOptions.forEach(option => {
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

        if (autresOptions.length === 0 && cvOption) {
            const btn = document.createElement('button');
            btn.textContent = 'cv';
            btn.addEventListener('click', () => {
                const oldButtons = chatContainer.querySelectorAll('button');
                oldButtons.forEach(b => b.remove());
                afficherMessage('Vous', 'cv');
                afficherMessage('Maxime', data.options['cv'], 'cv');
            });
            chatContainer.appendChild(btn);
        }
    }
});
