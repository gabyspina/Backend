const socket = io();
//let user;

let newProduct = document.getElementById('carga');

// Swal.fire({
// 	title: 'Bienvenido!',
// 	input: 'text',
// 	text: 'Ingresa tu nombre de usuario',
// 	inputPlaceholder: 'Nombre de usuario',
// 	allowOutsideClick: false,
// 	allowEscapeKey: false,
// 	allowEnterKey: false,
// 	showCancelButton: false,
// 	confirmButtonText: 'Ingresar',
// 	inputValidator: (value) => {
// 		if (!value) {
// 			return 'Debes ingresar tu nombre de usuario!';
// 		} else {
// 			user = value;
// 		}
// 	},
// }).then(() => {
// 	socket.emit('newUser', user);
// });

function render(data) {
	let html = data
		.map((elem, index) => {
			return `<div id='divProducts' data-id="${index}" >
			<strong>${elem.title}</strong>
			<em>${elem.description}</em>
			<em>${elem.code}</em>
			<em>${elem.price}</em>
			<em>${elem.stock}</em>
			<em>${elem.categoty}</em>
			<em>${elem.thumbnail}</em>
			<em>${elem.status}</em>
			
			</div>`;
		})
		.join(' ');

	document.getElementById('realTimeProducts').innerHTML = html;
}

newProduct.addEventListener('submit', (e) => {
	e.preventDefault();
	const product = {
		title: document.getElementById('title').value,
		description: document.getElementById('description').value,
		code: document.getElementById('code').value,
		price: document.getElementById('price').value,
		stock: document.getElementById('stock').value,
		category: document.getElementById('category').value,
		thumbnail: document.getElementById('thumbnail').value,
		status: document.getElementById('status').value,
	};
	socket.emit('carga', product);
	newProduct.reset();
});

socket.on('realTimeProducts', (product) => {
	return render(product);
});
