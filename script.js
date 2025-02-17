document.getElementById('language-dropdown').addEventListener('change', function () {
    const language = this.value;

    const translations = {
        en: {
            clothing: 'Clothing',
            heading: 'Unleash Your Style',
            paragraph: 'Explore the latest trends and timeless classics. Discover what suits you best.',
            bannerTitle: 'Unleash Your Style',
            exploreButton: 'Explore Now',
            cartTitle: 'Shopping Cart',
            closeButton: 'CLOSE',
            checkoutButton: 'Check Out',
            products: [
                'Pain Coffee', 'Black Coffee', '3KG of Black Coffee', '2KG of Black Coffee',
                'Matte Coffee', 'Matte Coffee', '2KG of Coffee King', 'Muir Wood 0.5KG',
            ],
        },
        es: {
            clothing: 'Ropa',
            heading: 'Da rienda suelta a tu estilo',
            paragraph: 'Explora las últimas tendencias y los clásicos atemporales. Descubre lo que mejor se adapta a ti.',
            bannerTitle: 'Desata tu Estilo',
            exploreButton: 'Explorar Ahora',
            cartTitle: 'Carrito de Compras',
            closeButton: 'CERRAR',
            checkoutButton: 'Finalizar Compra',
            products: [
                'Café de Dolor', 'Café Negro', '3KG de Café Negro', '2KG de Café Negro',
                'Café Mate', 'Café Mate', '2KG de Café Rey', 'Madera de Muir 0.5KG',
            ],
        },
        fr: {
            clothing: 'Vêtements',
            heading: 'Libérez votre style',
            paragraph: 'Explorez les dernières tendances et les classiques intemporels. Découvrez ce qui vous convient le mieux.',
            bannerTitle: 'Libérez votre Style',
            exploreButton: 'Explorer Maintenant',
            cartTitle: 'Panier',
            closeButton: 'FERMER',
            checkoutButton: 'Passer à la Caisse',
            products: [
                'Café de la Douleur', 'Café Noir', '3KG de Café Noir', '2KG de Café Noir',
                'Café Mat', 'Café Mat', '2KG de Roi Café', 'Bois de Muir 0.5KG',
            ],
        },
        de: {
            clothing: 'Kleidung',
            heading: 'Entfesseln Sie Ihren Stil',
            paragraph: 'Entdecken Sie die neuesten Trends und zeitlosen Klassiker. Finden Sie heraus, was am besten zu Ihnen passt.',
            bannerTitle: 'Entfesseln Sie Ihren Stil',
            exploreButton: 'Jetzt Entdecken',
            cartTitle: 'Einkaufswagen',
            closeButton: 'SCHLIESSEN',
            checkoutButton: 'Zur Kasse',
            products: [
                'Schmerzkafé', 'Schwarzer Kaffee', '3KG Schwarzer Kaffee', '2KG Schwarzer Kaffee',
                'Matte Kaffee', 'Matte Kaffee', '2KG Kaffeekönig', 'Muir Holz 0.5KG',
            ],
        },
        ar: {
            clothing: 'ملابس',
            heading: 'أطلق العنان لأسلوبك',
            paragraph: 'استكشف أحدث الصيحات والقطع الكلاسيكية الخالدة. واكتشف ما يناسبك بشكل أفضل.',
            bannerTitle: 'أطلق العنان لأسلوبك',
            exploreButton: 'استكشاف الآن',
            cartTitle: 'عربة التسوق',
            closeButton: 'إغلاق',
            checkoutButton: 'الدفع',
            products: [
                'قهوة الألم', 'قهوة سوداء', '3 كيلو قهوة سوداء', '2 كيلو قهوة سوداء',
                'قهوة ماتيه', 'قهوة ماتيه', '2 كيلو ملك القهوة', 'خشب موير 0.5 كجم',
            ],
        },
    };

    // Update heading and paragraph in the first banner
    document.getElementById('heading').textContent = translations[language].heading;
    document.getElementById('paragraph').textContent = translations[language].paragraph;

    // Update text for the Explore button
    document.querySelector('.banner-button').textContent = translations[language].exploreButton;

    // Update text in the shopping cart
    document.querySelector('.cartTab h1').textContent = translations[language].cartTitle;
    document.querySelector('.btn .close').textContent = translations[language].closeButton;
    document.querySelector('.btn .checkOut').textContent = translations[language].checkoutButton;

    // Update text for the dropdown menus
    document.querySelector('#clothing_selector option[value="clothing"]').textContent = translations[language].clothing;

    // Update product names dynamically
    const productItems = document.querySelectorAll('.listProduct .item');
    translations[language].products.forEach((productName, index) => {
        if (productItems[index]) {
            productItems[index].querySelector('h2').textContent = productName;
        }
    });
});

// Keep the rest of your existing code untouched


let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCart = document.querySelector('.icon-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');
let products = [];
let cart = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    if (products.length > 0) {
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
            listProductHTML.appendChild(newProduct);
        });
    }
};

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
});

const addToCart = (product_id) => {
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length <= 0) {
        cart = [{ product_id: product_id, quantity: 1 }];
    } else if (positionThisProductInCart < 0) {
        cart.push({ product_id: product_id, quantity: 1 });
    } else {
        cart[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
};

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            newItem.innerHTML = `
                <div class="image"><img src="${info.image}"></div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>`;
            listCartHTML.appendChild(newItem);
        });
    }
    iconCartSpan.innerText = totalQuantity;
};

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantityCart(product_id, type);
    }
});

const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        let info = cart[positionItemInCart];
        if (type === 'plus') {
            info.quantity += 1;
        } else {
            let newQuantity = info.quantity - 1;
            if (newQuantity > 0) {
                info.quantity = newQuantity;
            } else {
                cart.splice(positionItemInCart, 1);
            }
        }
    }
    addCartToHTML();
    addCartToMemory();
};

const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            addDataToHTML();

            if (localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        });
};
initApp();
