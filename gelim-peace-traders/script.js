// Cart Management
let cart = [];

// DOM Elements
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
const productsGrid = document.getElementById('productsGrid');
const orderItems = document.getElementById('orderItems');
const orderTotal = document.getElementById('orderTotal');
const cartCount = document.getElementById('cartCount');
const floatingCart = document.getElementById('floatingCart');
const categoryPills = document.querySelectorAll('.category-pill');
const addToOrderBtns = document.querySelectorAll('.add-to-order');

// Mobile Navigation Toggle
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Category Filter
categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
        categoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        const category = pill.dataset.category;
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            if (category === 'all' || product.dataset.category === category) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        });

        // Scroll to products section
        document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Add to Cart
addToOrderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = parseFloat(btn.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        updateCart();
        showAddedFeedback(btn);
    });
});

// Show Added Feedback
function showAddedFeedback(btn) {
    const originalText = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = '#43a047';
    btn.style.color = '#fff';

    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
    }, 1000);
}

// Update Cart Display
function updateCart() {
    const sendOrderBtn = document.getElementById('sendOrder');
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

    if (cart.length === 0) {
        orderItems.innerHTML = '<p class="empty-cart">Your cart is empty. Add products to get started!</p>';
        orderTotal.textContent = 'KES 0';
        sendOrderBtn.disabled = true;
        sendOrderBtn.style.opacity = '0.5';
        sendOrderBtn.style.cursor = 'not-allowed';
        return;
    }

    sendOrderBtn.disabled = false;
    sendOrderBtn.style.opacity = '1';
    sendOrderBtn.style.cursor = 'pointer';

    let html = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;

        html += `
            <div class="order-item">
                <div class="order-item-info">
                    <span class="order-item-name">${item.name}</span>
                    <div class="order-item-qty">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span>${item.qty} kg</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span class="order-item-price">KES ${itemTotal}</span>
                    <button class="remove-item" onclick="removeItem(${index})">×</button>
                </div>
            </div>
        `;
    });

    orderItems.innerHTML = html;
    orderTotal.textContent = `KES ${total}`;
}

// Update Quantity
function updateQty(index, change) {
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
    updateCart();
}

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Copy Till Number
function copyTill() {
    const tillNumber = document.getElementById('tillNumber').textContent;
    navigator.clipboard.writeText(tillNumber).then(() => {
        alert('Till number copied to clipboard!');
    });
}

// Scroll to Payment Section
floatingCart.addEventListener('click', () => {
    document.getElementById('payment').scrollIntoView({ behavior: 'smooth' });
});

// Send Order via WhatsApp
document.getElementById('sendOrder').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Please add items to your cart first!');
        return;
    }

    let message = '🛒 *New Order from Gelim Peace Traders | GPT*\n\n';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        message += `• ${item.name} - ${item.qty}kg @ KES ${item.price} = KES ${itemTotal}\n`;
    });

    message += `\n*Total: KES ${total}*\n\nPlease confirm availability.`;

    // Replace with actual WhatsApp number
    const phoneNumber = '254716636455';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            navLinks.classList.remove('active');
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(26, 45, 90, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(26, 45, 90, 0.08)';
    }
});

// Generate QR Codes
document.addEventListener('DOMContentLoaded', () => {
    // Check if QRCode library is available
    if (typeof QRCode !== 'undefined') {
        // WhatsApp QR Code
        const whatsappQR = document.getElementById('whatsappQR');
        if (whatsappQR) {
            new QRCode(whatsappQR, {
                text: 'https://wa.me/254716636455',
                width: 100,
                height: 100,
                colorDark: '#25D366',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        }

        // Website QR Code
        const websiteQR = document.getElementById('websiteQR');
        if (websiteQR) {
            new QRCode(websiteQR, {
                text: 'https://gelim-peace-traders.vercel.app',
                width: 100,
                height: 100,
                colorDark: '#1a2d5a',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        }
    }

    // Initialize send order button as disabled (cart is empty on page load)
    const sendOrderBtn = document.getElementById('sendOrder');
    if (sendOrderBtn) {
        sendOrderBtn.disabled = true;
        sendOrderBtn.style.opacity = '0.5';
        sendOrderBtn.style.cursor = 'not-allowed';
    }
});

// PWA Install Banner Logic
let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');
const dismissBtn = document.getElementById('dismissBtn');

// Apple device detection
const isAppleDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
    (navigator.vendor && navigator.vendor.indexOf('Apple') > -1 && !/Chrome/.test(navigator.userAgent));

function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');
}

function wasBannerDismissed() {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (!dismissed) return false;

    const dismissedDate = new Date(parseInt(dismissed));
    const daysSinceDismissed = (Date.now() - dismissedDate) / (1000 * 60 * 60 * 24);
    return daysSinceDismissed < 0.1; // Re-show after ~2 hours for testing
}

let bannerShown = false;
function showInstallBanner() {
    if (bannerShown) return;
    if (!isAppInstalled() && !wasBannerDismissed() && installBanner) {
        bannerShown = true;
        setTimeout(() => {
            installBanner.classList.add('show');
            console.log('PWA Banner shown');
        }, 1000);
    }
}

function hideInstallBanner() {
    if (installBanner) {
        installBanner.classList.remove('show');
    }
}

// Android/Chrome/PC/Edge - This event makes direct install possible
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt fired - Direct install ready');
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
});

// Install button
if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log('Direct install result:', outcome);
            deferredPrompt = null;
            hideInstallBanner();
        } else if (isAppleDevice) {
            alert('To Install GPT App:\n\n1. Tap the Share button\n2. Select "Add to Home Screen"');
        } else {
            alert('To install:\n\n1. Click the browser menu (⋮)\n2. Select "Install Gelim Peace Traders" or "Add to Home Screen"');
        }
    });
}

// Dismiss button
if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
        localStorage.setItem('pwa-install-dismissed', Date.now().toString());
        hideInstallBanner();
    });
}

// FALLBACK: Show banner for ALL devices after 2 seconds if beforeinstallprompt hasn't fired
// This ensures the banner shows on Safari, Firefox, or when PWA criteria aren't met
setTimeout(() => {
    if (!bannerShown && !isAppInstalled() && !wasBannerDismissed()) {
        console.log('Fallback: showing banner for all devices');
        showInstallBanner();
    }
}, 2000);

// Hide banner if app gets installed
window.addEventListener('appinstalled', () => {
    hideInstallBanner();
    console.log('App was installed');
});

// Clear dismissal for fresh testing (remove this line in production)
localStorage.removeItem('pwa-install-dismissed');
