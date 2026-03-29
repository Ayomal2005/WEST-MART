// ==================== DELIVERY CONFIG ====================
let bankDiscountPercent = 10;
let baseDeliveryFee = 350;

function calculateDeliveryFee(weightStr) {
    let weight = 0;
    if (weightStr && typeof weightStr === 'string') {
        const match = weightStr.match(/[\d\.]+/);
        if (match) weight = parseFloat(match[0]);
    }
    if (isNaN(weight)) weight = 0;
    if (weight <= 1) return baseDeliveryFee;
    return baseDeliveryFee + (Math.ceil(weight - 1) * 50);
}

// ==================== PRODUCT CATALOG ====================
const productsCatalog = [
    {
        id: "1",
        name: "Tactical Multi-Color Knuckle Tool",
        basePrice: 1600,
        marketPrice: 2200,
        weight: "0.2 KG",
        dimensions: "11×5×3 cm",
        description: "Versatile self-defense tool with window-breaking capability. Premium alloy construction with ergonomic grip. Lightweight and durable for everyday carry.",
        image: "https://i.ibb.co/PZmPXjCW/Gemini-Generated-Image-x6oguwx6oguwx6og.png",
        images: [
            "https://i.ibb.co/PZmPXjCW/Gemini-Generated-Image-x6oguwx6oguwx6og.png",
           
        ],
        inStock: false,
        deliveryDays: 3,
        isPremium: true
    },
    {
        id: "2",
        name: "Motorcycle Goggles Face Mask",
        basePrice: 1450,
        marketPrice: 1800,
        weight: "0.25 KG",
        dimensions: "18×14×14 cm",
        description: "PERFECTLY PROTECTS YOUR EYES: By using this open face goggle mask, you can conveniently protect your eyes from harmful rays at the same time get a unobstructed and clear view during motorcycling or skiing.",
        image: "https://bandidospitstop.com/cdn/shop/products/bsd09014.jpg?v=1755631247&width=1214",
        images: [
            "https://bandidospitstop.com/cdn/shop/products/bsd09014.jpg?v=1755631247&width=1214",
          
        ],
        inStock: true,
        deliveryDays: 5,
        isPremium: false
    },
    {
        id: "3",
        name: "Karambit Knife",
        basePrice: 1400,
        marketPrice: 1700,
        weight: "0.15 KG",
        dimensions: "14×4×14 cm",
        description: "100% SAFE: This Tactical Knife Karambit Knife Trainer is perfect for learning how to use the real thing without all the cuts and bruising to the hands. The unsharpened blade of our practice karambit trainer will keep you away from danger as a beginner.",
        image: "https://knify.gg/medias/2024/11/real-cs-karambit-knife-g2-esports-irl-2000x2000.webp",
        images: [
            "https://knify.gg/medias/2024/11/real-cs-karambit-knife-g2-esports-irl-2000x2000.webp",
         
        ],
        inStock: true,
        deliveryDays: 5,
        isPremium: true
    },
    {
        id: "4",
        name: "Devil Eye Car Light ",
        basePrice: 1900,
        marketPrice: 2400,
        weight: "0.15 KG",
        dimensions: "12×10×10 cm",
        description: "Elevate your car's appearance with demon eyes featuring various display modes,bright LED lights,and captivating patterns that are sure to turn heads.demon eyes are designed for safe and minimal heat generation,utilizing touch control and upgraded 5V USB voltage technology..",
        image: "https://laz-img-sg.alicdn.com/p/caf44df53d3b9d790ed2cf0a238815bb.jpg",
        images: [
            "https://laz-img-sg.alicdn.com/p/caf44df53d3b9d790ed2cf0a238815bb.jpg",
            "https://m.media-amazon.com/images/I/41rbWYNNCDL._QL92_SH45_SS200_.jpg",
            "https://rukminim2.flixcart.com/image/480/640/xif0q/car-fancy-light/q/m/u/2-5-xl-size-led-winking-devil-eyes-for-car-trucks-windows-original-imah8zqfjyxbg45s.jpeg?q=80"
        ],
        inStock: true,
        deliveryDays: 2,
        isPremium: true
    }
];

// ==================== CUSTOMER REVIEWS ====================
const customerReviews = [
    { name: "Zayn K.", rating: 5, text: "Best purchase ever! Quality is insane 🔥 Tactical knuckle feels solid.", lang: "en" },
    { name: "නිමේෂ් පෙරේරා", rating: 5, text: "ඉතා හොඳ තත්ත්වයක්! ඉක්මනින් ලැබුණා 💯 නිර්දේශ කරමි.", lang: "si" },
    { name: "Kai R.", rating: 5, text: "No cap, this is fire! Totally worth it 💪 Premium gear for great price.", lang: "en" },
    { name: "Amal S.", rating: 5, text: "Super fast delivery and excellent customer support. Will buy again!", lang: "en" },
    { name: "Hasini J.", rating: 4, text: "Flowers were fresh and beautiful, exactly as pictured. Loved it!", lang: "en" },
    { name: "Ruwan P.", rating: 5, text: "Great quality products. Highly recommended for EDC enthusiasts!", lang: "en" }
];

// ==================== GLOBAL VARIABLES ====================
let selectedProductForOrder = null;
let selectedProductId = null;

// ==================== PRODUCT RENDERING ====================
function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    if (productsCatalog.length === 0) {
        container.innerHTML = '<div class="text-center py-12 text-gray-500">No products available</div>';
        return;
    }

    let html = '';
    productsCatalog.forEach(product => {
        const isOutOfStock = !product.inStock;
        const deliveryFee = calculateDeliveryFee(product.weight);
        const marketPrice = product.marketPrice || Math.round(product.basePrice * 1.3);
        let descriptionShort = product.description;
        if (descriptionShort.length > 110) descriptionShort = descriptionShort.substring(0, 110) + '...';
        const images = product.images || [product.image];

        html += `
            <div class="product-card shadow-lg border border-gray-200 ${isOutOfStock ? 'product-out-of-stock' : ''}" data-product-id="${product.id}">
                ${isOutOfStock ? '<div class="out-of-stock-badge"><i class="fa-solid fa-ban mr-1"></i>OUT OF STOCK</div>' : ''}
                <div class="grid md:grid-cols-2 gap-0">
                    <div class="product-image-container relative">
                        <img src="${product.image}" alt="${product.name}" 
                             onerror="this.src='https://placehold.co/500x500/e2e8f0/64748b?text=West+Mart'">
                        ${product.isPremium ? '<div class="absolute top-3 left-3 z-10"><span class="badge-premium"><i class="fa-solid fa-crown mr-1"></i>PREMIUM</span></div>' : ''}
                        ${images.length > 1 ? `
                        <button type="button" onclick="event.stopPropagation(); openImageGallery('${product.id}')" 
                                class="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 hover:bg-white text-brand px-4 py-2 rounded-full text-xs font-bold shadow-lg transition-all flex items-center gap-2 z-10">
                            <i class="fa-solid fa-images"></i> View All (${images.length})
                        </button>
                        ` : ''}
                    </div>
                    <div class="p-5">
                        <h4 class="text-lg font-bold text-gray-800 leading-tight mb-2">${product.name}</h4>
                        <div class="flex items-baseline gap-2 mb-2">
                            <span class="text-brand font-black text-2xl">Rs ${product.basePrice.toLocaleString()}</span>
                            <span class="text-gray-400 text-sm line-through">Rs ${marketPrice.toLocaleString()}</span>
                        </div>
                        <p class="product-description text-gray-600 text-sm mb-3">${descriptionShort}</p>
                        <div class="grid grid-cols-2 gap-2 mb-3">
                            <div class="bg-gray-50 p-2 rounded-lg"><p class="text-[10px] text-gray-400">Weight</p><p class="text-xs font-semibold">${product.weight}</p></div>
                            <div class="bg-gray-50 p-2 rounded-lg"><p class="text-[10px] text-gray-400">Dimensions</p><p class="text-xs font-semibold">${product.dimensions}</p></div>
                        </div>
                        <div class="bg-red-50 p-2.5 rounded-lg mb-3 border border-dashed border-brand/30">
                            <span class="text-xs font-semibold">Delivery:</span> <span class="font-bold text-brand">Rs ${deliveryFee}/-</span>
                            <span class="text-[10px] text-gray-500 block mt-1">(${product.deliveryDays} days • First 1kg: Rs 350 • +Rs 50/kg)</span>
                        </div>
                        <button onclick="openPreOrderModal('${product.id}')" ${isOutOfStock ? 'disabled' : ''} class="w-full bg-brand hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            <i class="fa-regular fa-clock mr-2"></i>${isOutOfStock ? 'Out of Stock' : 'Pre-order Now'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

function getProductById(id) {
    return productsCatalog.find(p => p.id === id);
}

// ==================== IMAGE GALLERY FUNCTIONS ====================
function openImageGallery(productId) {
    const product = getProductById(productId);
    if (!product) return;
    const modal = document.getElementById('image-gallery-modal');
    const container = document.getElementById('gallery-images-container');
    const title = document.getElementById('gallery-product-title');
    if (modal && container && title) {
        title.textContent = product.name;
        const images = product.images || [product.image];
        let html = '';
        images.forEach((img, idx) => {
            html += `
                <div class="gallery-item" onclick="openImageViewer('${img.replace(/'/g, "\\'")}')">
                    <img src="${img}" alt="${product.name} ${idx + 1}" 
                         onerror="this.src='https://placehold.co/400x400/e2e8f0/64748b?text=Image'">
                </div>
            `;
        });
        container.innerHTML = html;
        modal.classList.add('active');
    }
}

function openImageViewer(imageSrc) {
    const modal = document.getElementById('image-viewer-modal');
    const img = document.getElementById('viewer-image');
    if (modal && img) {
        img.src = imageSrc;
        modal.classList.add('active');
    }
}

function closeImageGallery() {
    document.getElementById('image-gallery-modal')?.classList.remove('active');
}

function closeImageModal() {
    document.getElementById('image-viewer-modal')?.classList.remove('active');
}

// ==================== PRE-ORDER MODAL FUNCTIONS ====================
function openPreOrderModal(productId) {
    const product = getProductById(productId);
    if (!product) {
        alert('Product not found!');
        return;
    }
    if (!product.inStock) {
        alert('This product is out of stock!');
        return;
    }

    selectedProductId = productId;
    selectedProductForOrder = product;
    const deliveryFee = calculateDeliveryFee(product.weight);

    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').innerHTML = `Rs ${product.basePrice.toLocaleString()}`;
    document.getElementById('modal-product-desc').textContent = product.description;
    document.getElementById('modal-weight').textContent = product.weight;
    document.getElementById('modal-dimensions').textContent = product.dimensions;
    document.getElementById('modal-delivery').textContent = `${product.deliveryDays} Days`;
    document.getElementById('modal-delivery-fee').innerHTML = `Rs ${deliveryFee}/-`;

    const form = document.getElementById('order-form');
    if (form) form.reset();
    const qtyInput = document.getElementById('qty-input');
    if (qtyInput) qtyInput.value = 1;

    const altPhone = document.getElementById('alt-phone');
    const orderNote = document.getElementById('order-note');
    if (altPhone) altPhone.value = '';
    if (orderNote) orderNote.value = '';

    const modal = document.getElementById('preorder-modal');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        const nameField = document.getElementById('customer-name');
        if (nameField) nameField.focus();
    }, 200);
}

function closePreOrderModal() {
    const modal = document.getElementById('preorder-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedProductForOrder = null;
    selectedProductId = null;
}

// ==================== PAYMENT & SUMMARY FUNCTIONS ====================
function updatePriceSummary() {
    const qty = parseInt(document.getElementById('qty-input')?.value) || 1;
    const pmRadio = document.querySelector('input[name="paymentMethod"]:checked');
    const pm = pmRadio ? pmRadio.value : 'cod';
    const p = selectedProductForOrder;
    if (!p) return;
    const df = calculateDeliveryFee(p.weight);
    let total = 0, html = '';
    if (pm === 'bank') {
        const discounted = Math.round(p.basePrice * (1 - bankDiscountPercent / 100));
        total = (discounted * qty) + df;
        html = `<div class="space-y-2 text-sm">
                    <div class="flex justify-between"><span>🏷️ Item Price (${bankDiscountPercent}% OFF):</span><span class="font-bold">Rs ${discounted} × ${qty}</span></div>
                    <div class="flex justify-between"><span>🚚 Delivery:</span><span class="font-bold">Rs ${df}</span></div>
                    <div class="flex justify-between pt-2 border-t border-gray-600 text-lg font-bold"><span>Total:</span><span class="text-amber-400">Rs ${total.toLocaleString()}</span></div>
                </div>`;
    } else {
        total = (p.basePrice * qty) + df;
        html = `<div class="space-y-2 text-sm">
                    <div class="flex justify-between"><span>🏷️ Item Price:</span><span class="font-bold">Rs ${p.basePrice} × ${qty}</span></div>
                    <div class="flex justify-between"><span>🚚 Delivery:</span><span class="font-bold">Rs ${df}</span></div>
                    <div class="flex justify-between pt-2 border-t border-gray-600 text-lg font-bold"><span>Total (COD):</span><span class="text-brand">Rs ${total.toLocaleString()}</span></div>
                </div>`;
    }
    const summaryDiv = document.getElementById('summary-content');
    if (summaryDiv) summaryDiv.innerHTML = html;
}

function updatePaymentSelection() {
    const codRadio = document.getElementById('payment-cod');
    const bankRadio = document.getElementById('payment-bank');
    const codCard = document.getElementById('cod-card');
    const bankCard = document.getElementById('bank-card');
    if (codRadio?.checked) {
        codCard?.classList.add('selected');
        bankCard?.classList.remove('selected');
    } else if (bankRadio?.checked) {
        bankCard?.classList.add('selected');
        codCard?.classList.remove('selected');
    }
    updatePriceSummary();
}

function toggleSubmitButton() {
    const cb = document.getElementById('confirm-terms');
    const btn = document.getElementById('submit-btn');
    if (!cb || !btn) return;
    if (cb.checked && selectedProductForOrder) {
        btn.disabled = false;
        btn.classList.remove('whatsapp-btn-disabled');
        btn.classList.add('whatsapp-btn-active');
    } else {
        btn.disabled = true;
        btn.classList.remove('whatsapp-btn-active');
        btn.classList.add('whatsapp-btn-disabled');
    }
}

// ==================== ORDER SUBMISSION ====================
function submitOrder(e) {
    e.preventDefault();
    if (!selectedProductForOrder) {
        alert('Error: Product information missing');
        return;
    }
    const name = document.getElementById('customer-name')?.value.trim();
    const phone = document.getElementById('whatsapp-phone')?.value.trim();
    const altPhone = document.getElementById('alt-phone')?.value.trim();
    const city = document.getElementById('city')?.value.trim();
    const address = document.getElementById('address')?.value.trim();
    const orderNote = document.getElementById('order-note')?.value.trim();
    const qty = parseInt(document.getElementById('qty-input')?.value) || 1;
    const pmRadio = document.querySelector('input[name="paymentMethod"]:checked');
    const pm = pmRadio ? pmRadio.value : 'cod';

    if (!name || name.length < 2) {
        alert('⚠️ Please enter your full name');
        return;
    }
    if (!phone || phone.length < 10) {
        alert('⚠️ Please enter a valid phone number');
        return;
    }
    if (!city) {
        alert('⚠️ Please enter your city');
        return;
    }
    if (!address || address.length < 10) {
        alert('⚠️ Please enter a complete address');
        return;
    }

    const p = selectedProductForOrder;
    const df = calculateDeliveryFee(p.weight);
    let total = 0, paymentDetailsText = '';
    if (pm === 'bank') {
        const disc = Math.round(p.basePrice * (1 - bankDiscountPercent / 100));
        total = (disc * qty) + df;
        paymentDetailsText = `💰 *PAYMENT DETAILS:*
━━━━━━━━━━━━━━━━━━
💳 *Payment Method:* Bank Transfer
🏷️ *Item Price:* Rs ${disc} × ${qty} = Rs ${disc * qty}
🚚 *Delivery:* Rs ${df}
💵 *TOTAL TO PAY:* Rs ${total}

📌 *HOW TO PAY:*
1️⃣ *WAIT* for our WhatsApp message with bank details
2️⃣ Make full payment of *Rs ${total}* via bank transfer
3️⃣ Send us the *payment slip/screenshot* to confirm
4️⃣ We will verify and confirm your order

⏳ *After Payment Confirmation:*
• Order will be processed within 2-4 hours
• Your product will be dispatched within 24 hours
• You'll receive tracking details via WhatsApp
• Estimated delivery: ${p.deliveryDays} business days

✅ *Status Updates:* We'll notify you at every step - payment received → order processing → dispatched → out for delivery → delivered!`;
    } else {
        total = (p.basePrice * qty) + df;
        const upfrontAmount = df;
        const balanceAmount = p.basePrice * qty;
        paymentDetailsText = `💰 *PAYMENT DETAILS:*
━━━━━━━━━━━━━━━━━━
💳 *Payment Method:* Cash on Delivery
🏷️ *Item Price:* Rs ${p.basePrice} × ${qty} = Rs ${balanceAmount}
🚚 *Delivery Charge:* Rs ${df}
💵 *TOTAL:* Rs ${total}

📌 *HOW TO PAY (COD):*
1️⃣ *WAIT* for our WhatsApp message with bank details
2️⃣ Pay the *delivery charge* (Rs ${upfrontAmount}) upfront via bank transfer
3️⃣ Send us the *payment slip/screenshot* to confirm
4️⃣ Balance *Rs ${balanceAmount}* payable when product is delivered

⏳ *After Payment Confirmation:*
• We verify your upfront payment (Rs ${upfrontAmount})
• Order is confirmed and processed within 2-4 hours
• Product dispatched within 24 hours
• You'll receive tracking details via WhatsApp
• Pay remaining balance (Rs ${balanceAmount}) to the delivery rider

✅ *Status Updates:* We'll notify you at every step - payment received → order processing → dispatched → out for delivery → delivered!`;
    }

    let optionalSection = '';
    if (altPhone) optionalSection += `📞 *Alt Phone:* ${altPhone}\n`;
    if (orderNote) optionalSection += `📝 *Special Instructions:* ${orderNote}\n`;
    if (optionalSection) optionalSection = `\n━━━━━━━━━━━━━━━━━━\n📋 *ADDITIONAL INFO*\n${optionalSection}`;

    const msg = `🛒 *WEST MART PRE-ORDER*
━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${name}
📱 *WhatsApp:* ${phone}
🏙️ *City:* ${city}
📍 *Address:* ${address}
📦 *Product:* ${p.name}
🔢 *Quantity:* ${qty}
⚖️ *Weight:* ${p.weight}

${paymentDetailsText}
${optionalSection}

━━━━━━━━━━━━━━━━━━
⏰ *IMPORTANT NOTES:*
• Please WAIT for our response with bank details
• Do NOT make payment until you receive bank details
• Order is confirmed ONLY after payment verification
• For inquiries, reply to this message

Thank you for choosing West Mart! 🙏
*Your Trust - Our Value*`;

    window.open(`https://wa.me/94757424674?text=${encodeURIComponent(msg)}`, '_blank');
    closePreOrderModal();
    alert('✅ Pre-order request sent! Please check WhatsApp for payment details. WAIT for our response with bank information before making payment.');
}

// ==================== REVIEWS RENDERING ====================
function renderReviews() {
    const track = document.getElementById('reviews-track');
    if (!track) return;
    let html = '';
    const allReviews = [...customerReviews, ...customerReviews];
    allReviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        html += `<div class="review-card"><div class="flex items-center gap-2 mb-2"><div class="w-10 h-10 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold">${review.name.charAt(0)}</div><div><p class="font-semibold text-sm">${review.name}</p><div class="review-stars text-xs">${stars}</div></div></div><p class="text-sm text-gray-600">"${review.text}"</p></div>`;
    });
    track.innerHTML = html;
}

// ==================== SEARCH FUNCTIONALITY ====================
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.product-card').forEach(card => {
                const productId = card.getAttribute('data-product-id');
                const product = getProductById(productId);
                if (product) {
                    const match = product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
                    card.style.display = match ? '' : 'none';
                }
            });
        });
    }
}

// ==================== EVENT LISTENERS & INITIALIZATION ====================
window.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderReviews();
    setupSearch();

    document.getElementById('discount-display').textContent = bankDiscountPercent + '%';
    document.getElementById('qty-input')?.addEventListener('input', updatePriceSummary);
    document.querySelectorAll('input[name="paymentMethod"]').forEach(r => r.addEventListener('change', updatePaymentSelection));
    document.getElementById('confirm-terms')?.addEventListener('change', toggleSubmitButton);

    document.getElementById('preorder-modal')?.addEventListener('click', e => {
        if (e.target.id === 'preorder-modal') closePreOrderModal();
    });
    document.getElementById('image-viewer-modal')?.addEventListener('click', e => {
        if (e.target.id === 'image-viewer-modal') closeImageModal();
    });
    document.getElementById('image-gallery-modal')?.addEventListener('click', e => {
        if (e.target.id === 'image-gallery-modal') closeImageGallery();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closePreOrderModal();
            closeImageModal();
            closeImageGallery();
        }
    });
});
