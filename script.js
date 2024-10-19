let currentItem = '';
let currentPrice = 0;
let currentQuantity = 1;
let cart = [];

function openModal(item, price) {
    currentItem = item;
    currentPrice = price;
    currentQuantity = 1;
    document.getElementById('itemName').innerText = 'Item: ' + item;
    document.getElementById('itemPrice').innerText = 'Harga: Rp ' + price.toLocaleString();
    document.getElementById('itemQuantity').value = currentQuantity;
    document.getElementById('totalPrice').innerText = (price * currentQuantity).toLocaleString();
    $('#buyModal').modal('show');
}

function increaseQuantity() {
    currentQuantity++;
    document.getElementById('itemQuantity').value = currentQuantity;
    document.getElementById('totalPrice').innerText = (currentPrice * currentQuantity).toLocaleString();
}

function decreaseQuantity() {
    if (currentQuantity > 1) {
        currentQuantity--;
        document.getElementById('itemQuantity').value = currentQuantity;
        document.getElementById('totalPrice').innerText = (currentPrice * currentQuantity).toLocaleString();
    }
}

function addToCart() {
    const existingItemIndex = cart.findIndex(item => item.name === currentItem);
    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += currentQuantity;
    } else {
        const item = {
            name: currentItem,
            price: currentPrice,
            quantity: currentQuantity
        };
        cart.push(item);
    }
    updateCart();
    $('#buyModal').modal('hide');
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
                    ${item.name} - Rp ${item.price.toLocaleString()} x ${item.quantity}
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Hapus</button>
                `;
        cartItems.appendChild(listItem);
        totalPrice += item.price * item.quantity;
    });
    document.getElementById('cartTotalPrice').innerText = totalPrice.toLocaleString();
    document.getElementById('cartBadge').innerText = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function openCart() {
    $('#cartModal').modal('show');
}

function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja kosong!');
        return;
    }
    const cartItems = cart.map(item => `${item.name} - Rp ${item.price.toLocaleString()} x ${item.quantity}`)
        .join('\n');
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const message = `Pesanan Atas Nama: *(Tulis Nama Pesanan)*\n${cartItems}\n\nTotal: Rp ${totalPrice.toLocaleString()}`;
    const whatsappUrl = `https://wa.me/6287875369113?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    cart = [];
    updateCart();
    $('#cartModal').modal('hide');
}

function updateYear() {
    const yearSpan = document.getElementById('currentYear');
    const currentYear = new Date().getFullYear();
    yearSpan.innerText = currentYear;
}

function changeLanguage() {
    const language = document.getElementById('languageSelect').value;
    if (language === 'en') {
        document.getElementById('headerTitle').innerText = 'Food and Drink Menu';
        document.getElementById('minumanTitle').innerText = 'Drinks';
        document.getElementById('makananTitle').innerText = 'Food';
        document.getElementById('hargaEsTehManis').innerText = 'Price: Rp 10,000';
        document.getElementById('hargaKopi').innerText = 'Price: Rp 15,000';
        document.getElementById('hargaJusJeruk').innerText = 'Price: Rp 20,000';
        document.getElementById('hargaNasiGoreng').innerText = 'Price: Rp 25,000';
        document.getElementById('buyModalLabel').innerText = 'Purchase Confirmation';
        document.getElementById('addToCartButton').innerText = 'Add to Cart';
        document.getElementById('cancelButton').innerText = 'Cancel';
        document.getElementById('closeButton').innerText = 'Close';
        document.getElementById('checkoutButton').innerText = 'Checkout';
        document.querySelector('.quantity-label').innerText = 'Quantity:';
    } else {
        document.getElementById('headerTitle').innerText = 'Menu Makanan dan Minuman';
        document.getElementById('minumanTitle').innerText = 'Minuman';
        document.getElementById('makananTitle').innerText = 'Makanan';
        document.getElementById('hargaEsTehManis').innerText = 'Harga: Rp 10,000';
        document.getElementById('hargaKopi').innerText = 'Harga: Rp 15,000';
        document.getElementById('hargaJusJeruk').innerText = 'Harga: Rp 20,000';
        document.getElementById('hargaNasiGoreng').innerText = 'Harga: Rp 25,000';
        document.getElementById('buyModalLabel').innerText = 'Konfirmasi Pembelian';
        document.getElementById('addToCartButton').innerText = 'Masukkan ke Keranjang';
        document.getElementById('cancelButton').innerText = 'Batal';
        document.getElementById('closeButton').innerText = 'Tutup';
        document.getElementById('checkoutButton').innerText = 'Checkout';
        document.querySelector('.quantity-label').innerText = 'Jumlah:';
    }
}

document.addEventListener('DOMContentLoaded', updateYear);