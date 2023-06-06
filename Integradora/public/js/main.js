const socket = io();
let user;

const inputMje = document.getElementById('message');

Swal.fire({
	title: 'Bienvenido!',
	input: 'text',
	text: 'Ingresa tu nombre de usuario',
	inputPlaceholder: 'Nombre de usuario',
	allowOutsideClick: false,
	allowEscapeKey: false,
	allowEnterKey: false,
	showCancelButton: false,
	confirmButtonText: 'Ingresar',
	inputValidator: (value) => {
		if (!value) {
			return 'Debes ingresar tu nombre de usuario!';
		} else {
			user = value;
		}
	},
}).then(() => {
	socket.emit('newUser', user);
});

function sendMessage() {
	let msj = inputMje.value;
	if (msj.trim().length > 0) {
		socket.emit('message', { msj, user });
		inputMje.value = '';
	}
}

function renderMessages(messages) {
	let html = messages
		.map((m) => {
			return `
            <div>
                <strong>${m.user}</strong>
                <span>${m.msj}</span>
            </div>
        `;
		})
		.join(' ');
	document.getElementById('messages').innerHTML = html;
}

inputMje.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		sendMessage();
	}
});

socket.on('messages', (data) => {
	renderMessages(data);
});
