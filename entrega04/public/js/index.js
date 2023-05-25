const socket = io();

let newProduct = document.getElementById('form');

function render(data) {
	const html = data
		.map((elem, index) => {
			return `<tr>
    <td>${elem.title}</td>
    <td>${elem.price}</td>
    <td><img src="${elem.thumbnail}" width="50px" height="50px"></td>
    </tr>`;
		})
		.join(' ');
	document.getElementById('products').innerHTML = html;

	socket.emit('delete-product', id);
	socket.emit('update-product', data);
}

newProduct.addEventListener('submit', (e) => {
	e.preventDefault();
	const title = document.querySelector('input[name="title"]').value;
	const category = document.querySelector('input[name="category"]').value;
	const description = document.querySelector('input[name="description"]').value;
	const price = document.querySelector('input[name="price"]').value;
	const code = document.querySelector('input[name="code"]').value;
	const stock = document.querySelector('input[name="stock"]').value;

	const product = {
		title: title,
		category: category,
		description: description,
		price: price,
		code: code,
		stock: stock,
	};

	socket.emit('new-product', product);
	newProduct.reset();
	Swal.fire({
		icon: 'success',
		title: 'Producto agregado',
		text: 'El producto se agregó correctamente',
	});
});

socket.on('products', (data) => {
	render(data);
});
