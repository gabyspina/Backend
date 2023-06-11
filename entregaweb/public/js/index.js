const socket = io();
let newProduct = document.getElementById('form');

function render(data) {
	// Genero el html
	const html = data
		.map((elem, index) => {
			// Recorro el array de productos y genero el html
			return `<div id="divProductos" data-id="${index}">
				<strong>${elem.title} </strong>
                <em>${elem.category} </em>
				<em>${elem.description} </em>
				<em>$${elem.price} </em>
				<em>${elem.code} </em>
				<em>${elem.stock} </em>
            </div>`;
		})
		.join(' '); // Convierto el array de strings en un string

	// Inserto el html en el elemento con id realTimeProducts
	document.getElementById('realTimeProducts').innerHTML = html;

	socket.on('deleteProduct', (data) => render(data));
	socket.on('modifyProduct', (data) => render(data));
}

newProduct.addEventListener('submit', (event) => {
	event.preventDefault();

	const title = document.querySelector('input[name="title"]').value;
	const category = document.querySelector('input[name="category"]').value;
	const description = document.querySelector('input[name="description"]').value;
	const price = document.querySelector('input[name="price"]').value;
	const code = document.querySelector('input[name="code"]').value;
	const stock = document.querySelector('input[name="stock"]').value;

	const product = {
		title,
		category,
		description,
		price,
		code,
		stock,
	};

	socket.emit('addProduct', product);
	newProduct.reset();
	Swal.fire({
		title: 'Alta de producto',
		text: '¡Producto agregado!',
		icon: 'success',
	});
});

socket.on('realTimeProducts', (data) => {
	render(data);
});
