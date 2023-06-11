const socket = io();

let newProduct = document.getElementById('carga');
let productsContainer = document.getElementById('products');

function render(data) {
	const html = data
		.map((elem, index) => {
			return `<tr id='divProducts' data-id='${index}'>
    <td><strong>${elem.title}</strong></td>
    <td>${elem.price}</td>
	<td>${elem.description}</td>
	<td>${elem.category}</td>
	<td>${elem.code}</td>
	<td>${elem.stock}</td>
	<td>${elem.thumbnail}</td>
    </tr>`;
		})
		.join(' ');
	document.getElementById('realTimeProducts').innerHTML = html;
}

newProduct.addEventListener('submit', (e) => {
	e.preventDefault();
	const product = {
		title: document.getElementById('title').value,
		category: document.getElementById('category').value,
		description: document.getElementById('description').value,
		price: document.getElementById('price').value,
		code: document.getElementById('code').value,
		stock: document.getElementById('stock').value,
		thumbnail: document.getElementById('thumbnail').value,
	};

	socket.emit('carga', product);
	newProduct.reset();
});

socket.on('realTimeProducts', (data) => {
	render(data);
});
