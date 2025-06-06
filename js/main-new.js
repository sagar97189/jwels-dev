/*
* Luxury Jewelry Store - Main JavaScript
* A premium e-commerce website for jewelry
*/

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize navbar scroll behavior
    initNavbarScroll();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize counter animation for stats
    initCounterAnimation();
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize product card animations
    initProductAnimations();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize UPI payment system
    initUpiPayment();
    
    // Add CSS for cart icon
    addCartIconStyles();
    
    // Add padding to the body to account for the fixed navbar
    const headerHeight = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = headerHeight + 'px';
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Ensure Font Awesome is properly loaded
    ensureFontAwesome();
    
    // Initialize Add to Cart buttons
    initAddToCartButtons();

    // Initialize floating buttons and chat widget
    initFloatingButtonsAndChat();
});

// Function to initialize floating buttons and chat widget
function initFloatingButtonsAndChat() {
    console.log("Initializing floating buttons and chat widget");
    
    // Get floating buttons
    const appointmentBtn = document.getElementById('appointmentButton');
    const chatBtn = document.getElementById('chatButton');
    
    if (appointmentBtn && chatBtn) {
        // Initially hide buttons
        appointmentBtn.classList.remove('show');
        chatBtn.classList.remove('show');
        
        // Make floating buttons visible when scrolled
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                appointmentBtn.classList.add('show');
                chatBtn.classList.add('show');
            } else {
                appointmentBtn.classList.remove('show');
                chatBtn.classList.remove('show');
            }
        });
        
        // Force visibility check once on load
        setTimeout(function() {
            if (window.scrollY > 300) {
                appointmentBtn.classList.add('show');
                chatBtn.classList.add('show');
            }
            console.log("Floating buttons initialized with visibility:", window.scrollY > 300);
        }, 500);
    }
    
    // Initialize appointment button
    if (appointmentBtn) {
        appointmentBtn.addEventListener('click', function() {
            const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
            appointmentModal.show();
        });
    }
    
    // Initialize chat elements
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const chatBody = document.getElementById('chatBody');
    
    if (chatBtn && chatWidget) {
        console.log("Chat elements found:", {
            chatButton: !!chatBtn,
            chatWidget: !!chatWidget,
            closeChat: !!closeChat,
            chatInput: !!chatInput,
            sendChat: !!sendChat,
            chatBody: !!chatBody
        });
        
        // Ensure chat widget is initially hidden
        chatWidget.style.bottom = '-400px';
        chatWidget.style.opacity = '0';
        chatWidget.style.visibility = 'hidden';
        chatWidget.style.right = '20px'; // Position on right side
        
        // Toggle chat widget
        chatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("Chat button clicked");
            
            chatWidget.classList.toggle('open');
            
            if (chatWidget.classList.contains('open')) {
                chatWidget.style.bottom = '90px';
                chatWidget.style.opacity = '1';
                chatWidget.style.visibility = 'visible';
                chatWidget.style.display = 'flex';
                chatWidget.style.zIndex = '10001';
                
                // Focus on input
                setTimeout(() => {
                    if (chatInput) chatInput.focus();
                }, 300);
            } else {
                chatWidget.style.bottom = '-400px';
                chatWidget.style.opacity = '0';
                chatWidget.style.visibility = 'hidden';
            }
        });
        
        // Close chat
        if (closeChat) {
            closeChat.addEventListener('click', function() {
                chatWidget.classList.remove('open');
                chatWidget.style.bottom = '-400px';
                chatWidget.style.opacity = '0';
                chatWidget.style.visibility = 'hidden';
            });
        }
        
        // Send message function
        function sendChatMessage() {
            if (!chatInput || !chatBody) return;
            
            const message = chatInput.value.trim();
            if (message) {
                console.log("Sending message:", message);
                
                // Create message element
                const messageEl = document.createElement('div');
                messageEl.className = 'chat-message sent';
                messageEl.textContent = message;
                chatBody.appendChild(messageEl);
                
                // Clear input
                chatInput.value = '';
                
                // Scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
                
                // Simulate response after delay
                setTimeout(function() {
                    const responseEl = document.createElement('div');
                    responseEl.className = 'chat-message received';
                    responseEl.textContent = "Thank you for your message. One of our jewelry consultants will assist you shortly.";
                    chatBody.appendChild(responseEl);
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        }
        
        // Send message with button
        if (sendChat) {
            sendChat.addEventListener('click', sendChatMessage);
        }
        
        // Send message with Enter key
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendChatMessage();
                }
            });
        }
    }
}

// Function to handle navbar scroll behavior
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// Function to handle smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if it's open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Get the height of the navbar for offset
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            // Calculate the final scroll position with additional offset for better visibility
            const scrollPosition = targetElement.offsetTop - navbarHeight - 20;
            
            // Scroll smoothly to the target
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
            
            // Update active class in navbar
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
}

// Function to animate counters in the stats section
function initCounterAnimation() {
    const counterElements = document.querySelectorAll('.counter');
    
    if (counterElements.length === 0) return;
    
    const options = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const numValue = parseInt(target.getAttribute('data-count'));
                
                // Set initial value to 0
                let count = 0;
                
                // Get animation duration based on number size
                const duration = numValue > 1000 ? 2000 : 1500;
                const steps = 50; // Number of steps for the animation
                const increment = Math.ceil(numValue / steps);
                const interval = duration / steps;
                
                // Add animation visual effect
                target.style.animation = `countUp 0.5s ease-out forwards`;
                
                // Update every interval ms to create animation effect
                const updateCount = setInterval(() => {
                    count += increment;
                    
                    // If we've reached or exceeded the target, set final value and clear interval
                    if (count >= numValue) {
                        target.textContent = numValue.toLocaleString() + (target.dataset.suffix || '');
                        clearInterval(updateCount);
                    } else {
                        target.textContent = count.toLocaleString() + (target.dataset.suffix || '');
                    }
                }, interval);
                
                // Remove observer after animation
                observer.unobserve(target);
                
                // Add animation to parent box
                const parentBox = target.closest('.counter-box');
                if (parentBox) {
                    setTimeout(() => {
                        parentBox.style.transform = 'translateY(-5px)';
                        parentBox.style.boxShadow = '0 15px 30px rgba(0,0,0,0.1)';
                    }, 200);
                }
            }
        });
    }, options);
    
    // Observe each counter element
    counterElements.forEach(counter => {
        // Check if the counter has a data-count attribute
        if (counter.hasAttribute('data-count')) {
            // Initialize with 0
            counter.textContent = '0';
            
            // Start observing
            observer.observe(counter);
        }
    });
}

// Function to initialize scroll reveal animations
function initScrollReveal() {
    // Elements to animate when they come into view
    const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .collection-card, .product-card, .testimonial-card, .feature-box');
    
    if (animateElements.length === 0) return;
    
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add appropriate animation class based on element type
                const element = entry.target;
                
                if (element.classList.contains('section-title')) {
                    element.classList.add('animate-fadeInUp');
                } else if (element.classList.contains('section-subtitle')) {
                    element.classList.add('animate-fadeInUp', 'delay-1');
                } else if (element.classList.contains('collection-card')) {
                    element.classList.add('animate-fadeInUp');
                    // Add sequential delay based on index
                    const cards = document.querySelectorAll('.collection-card');
                    const index = Array.from(cards).indexOf(element);
                    element.classList.add(`delay-${index % 4}`);
                } else if (element.classList.contains('product-card')) {
                    element.classList.add('animate-fadeInUp');
                    // Add sequential delay based on index
                    const cards = document.querySelectorAll('.product-card');
                    const index = Array.from(cards).indexOf(element);
                    element.classList.add(`delay-${index % 4}`);
                } else if (element.classList.contains('testimonial-card')) {
                    element.classList.add('animate-fadeInUp');
                    // Add sequential delay based on index
                    const cards = document.querySelectorAll('.testimonial-card');
                    const index = Array.from(cards).indexOf(element);
                    element.classList.add(`delay-${index % 3}`);
                } else if (element.classList.contains('feature-box')) {
                    element.classList.add('animate-fadeInUp');
                    // Add sequential delay based on index
                    const boxes = document.querySelectorAll('.feature-box');
                    const index = Array.from(boxes).indexOf(element);
                    element.classList.add(`delay-${index % 4}`);
                }
                
                // Stop observing after animation is applied
                observer.unobserve(element);
            }
        });
    }, options);
    
    // Observe each element
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Function to initialize product card animations
function initProductAnimations() {
    // Animate the product tags with floating effect
    const productTags = document.querySelectorAll('.product-tag');
    productTags.forEach(tag => {
        tag.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add shine effect to product prices
    const productPrices = document.querySelectorAll('.product-price');
    productPrices.forEach(price => {
        price.addEventListener('mouseover', function() {
            this.style.backgroundSize = '200% auto';
            this.style.animation = 'shine 1.5s linear';
        });
        
        price.addEventListener('mouseout', function() {
            this.style.animation = 'none';
        });
    });
    
    // Add pulse animation to "Add to Cart" buttons on hover
    const addButtons = document.querySelectorAll('.product-btn');
    addButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.animation = 'pulse 0.8s ease-in-out infinite';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.animation = 'none';
        });
    });
    
    // Add click event to shopping cart icons in product actions
    document.querySelectorAll('.product-actions .product-action-btn').forEach(btn => {
        if (btn.querySelector('.fa-shopping-cart')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product details from parent card
                const card = this.closest('.product-card');
                if (!card) return;
                
                const productTitle = card.querySelector('.product-title a');
                const productName = productTitle ? productTitle.textContent : 'Product';
                const productPriceElement = card.querySelector('.product-current-price');
                const productPrice = productPriceElement ? productPriceElement.textContent : '$0.00';
                const productCategory = card.querySelector('.product-category').textContent;
                const productImg = card.querySelector('.product-img img').src;
                
                // Extract price value
                const priceValue = parseInt(productPrice.replace(/[^0-9]/g, ''));
                
                // Create product object
                const product = {
                    id: Date.now(),
                    name: productName,
                    category: productCategory,
                    image: productImg,
                    price: priceValue,
                    quantity: 1
                };
                
                // Add to cart
                window.addToCart ? window.addToCart(product) : addToCart(product);
                
                // Show notification
                window.showNotification ? window.showNotification(`${productName} added to cart`) : showNotification(`${productName} added to cart`);
            });
        }
    });
    
    // Initialize Quick View functionality
    initQuickView();
}

// Quick View functionality
function initQuickView() {
    // Product quick view buttons
    const quickViewButtons = document.querySelectorAll('.product-action-btn:nth-child(2)');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productImage = productCard.querySelector('.product-img img').src;
            const productTitle = productCard.querySelector('.product-title a').innerText;
            const currentPrice = productCard.querySelector('.product-current-price').innerText;
            
            // Set quick view data
            document.getElementById('quickViewImage').src = productImage;
            document.getElementById('quickViewTitle').innerText = productTitle;
            document.querySelector('.quick-view-price .current-price').innerText = currentPrice;
            
            // Show quick view modal
            const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
            quickViewModal.show();
        });
    });
}

// Function to change quick view image
function changeQuickViewImage(thumbnail) {
    // Update main image
    document.getElementById('quickViewImage').src = thumbnail.src;
    
    // Update active thumbnail
    document.querySelectorAll('.quick-view-thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// Quantity selector for quick view
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.quantity-selector')) {
        // Decrease quantity
        document.querySelector('.quantity-btn.decrease').addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });
        
        // Increase quantity
        document.querySelector('.quantity-btn.increase').addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value);
            input.value = value + 1;
        });
        
        // Allow only numeric input
        document.querySelector('.quantity-input').addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value === '' || parseInt(this.value) < 1) {
                this.value = 1;
            }
        });
    }
    
    // Initialize quick view
    initQuickView();
});

// Function to initialize hover effects
function initHoverEffects() {
    // Add parallax effect to collection images on mouse move
    const collectionCards = document.querySelectorAll('.collection-card');
    
    collectionCards.forEach(card => {
        const img = card.querySelector('img');
        
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardCenterX = cardRect.left + cardRect.width / 2;
            const cardCenterY = cardRect.top + cardRect.height / 2;
            
            const moveX = (e.clientX - cardCenterX) / 20;
            const moveY = (e.clientY - cardCenterY) / 20;
            
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        });
        
        card.addEventListener('mouseleave', function() {
            img.style.transform = 'translate(0, 0) scale(1)';
        });
    });
    
    // Add 3D tilt effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const cardRect = card.getBoundingClientRect();
            const cardWidth = cardRect.width;
            const cardHeight = cardRect.height;
            
            const mouseX = e.clientX - cardRect.left;
            const mouseY = e.clientY - cardRect.top;
            
            const rotateY = ((mouseX / cardWidth) - 0.5) * 10;
            const rotateX = ((0.5 - (mouseY / cardHeight))) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Function to initialize UPI payment functionality
function initUpiPayment() {
    // Handle UPI App opening
    const openUpiAppBtn = document.querySelector('.open-upi-app');
    if (openUpiAppBtn) {
        openUpiAppBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const upiId = document.getElementById('upiId').textContent || '8920869673@hdfc';
            const merchantName = 'Luxury Jewels Pvt. Ltd';
            const transactionNote = 'Payment for Jewelry';
            
            // Get amount if available
            let amount = '';
            const amountElement = document.getElementById('modal-amount');
            if (amountElement) {
                amount = amountElement.textContent.replace(/[^0-9]/g, '');
            }
            
            // Create UPI deep link
            const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&tn=${encodeURIComponent(transactionNote)}&am=${amount}&cu=INR`;
            
            // Open UPI app with the link
            window.location.href = upiLink;
        });
    }
    
    // Enable UPI ID copy functionality
    window.copyUpiId = function() {
        const upiIdInput = document.getElementById('upiIdInput');
        const copyAlert = document.querySelector('.copy-alert');
        
        if (!upiIdInput || !copyAlert) return;
        
        // Select the text
        upiIdInput.select();
        upiIdInput.setSelectionRange(0, 99999); // For mobile devices
        
        // Copy the text
        navigator.clipboard.writeText(upiIdInput.value)
            .then(() => {
                // Show success message
                copyAlert.style.display = 'block';
                
                // Hide message after 3 seconds
                setTimeout(() => {
                    copyAlert.style.display = 'none';
                }, 3000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                
                // Fallback for browsers that don't support clipboard API
                document.execCommand('copy');
                
                // Show success message
                copyAlert.style.display = 'block';
                
                // Hide message after 3 seconds
                setTimeout(() => {
                    copyAlert.style.display = 'none';
                }, 3000);
            });
    };
    
    // Set UPI ID in various places
    const upiIdElements = document.querySelectorAll('#upiId, .upi-id');
    const clientUpiId = '8920869673@hdfc';
    
    upiIdElements.forEach(element => {
        if (element.tagName === 'INPUT') {
            element.value = clientUpiId;
        } else if (element.classList.contains('upi-id')) {
            element.textContent = `UPI ID: ${clientUpiId}`;
        } else {
            element.textContent = clientUpiId;
        }
    });
    
    // Also update the copy input field
    const upiIdInput = document.getElementById('upiIdInput');
    if (upiIdInput) {
        upiIdInput.value = clientUpiId;
    }
    
    // Handle payment method animation
    const paymentIcons = document.querySelectorAll('.payment-icon');
    paymentIcons.forEach((icon, index) => {
        // Add staggered animation delay
        icon.classList.add(`delay-${index % 4}`);
        
        // Add hover effect
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Create server-side verification for UPI payments
    // This would typically be implemented in a separate server-side script
    function verifyUpiPayment(transactionId, upiId, amount) {
        // In a real implementation, this would make a server call to verify payment
        // with your payment gateway provider or UPI service
        
        return new Promise((resolve, reject) => {
            // Simulate server verification
            setTimeout(() => {
                if (transactionId && upiId && amount) {
                    resolve({
                        success: true,
                        message: 'Payment verified successfully',
                        transactionId: transactionId
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Payment verification failed'
                    });
                }
            }, 1000);
        });
    }
    
    // Handle dynamic UPI QR code generation
    function generateUpiQrCode(amount, transactionId) {
        const upiId = document.getElementById('upiId').textContent;
        const merchantName = 'Luxury Jewels Pvt. Ltd';
        const transactionNote = `Jewelry Purchase #${transactionId}`;
        
        // In a real implementation, this would generate a QR code for the specific transaction
        // For demonstration, we're just showing how it would be structured
        
        const upiPaymentData = {
            pa: upiId, // payee address (UPI ID)
            pn: merchantName, // payee name
            tn: transactionNote, // transaction note
            am: amount, // amount
            cu: 'INR', // currency
            tr: transactionId // transaction reference
        };
        
        // This would typically connect to a UPI service or payment gateway API
        console.log('UPI Payment Data:', upiPaymentData);
        
        // The returned URL would be used to generate a QR code
        return `upi://pay?pa=${upiPaymentData.pa}&pn=${encodeURIComponent(upiPaymentData.pn)}&tn=${encodeURIComponent(upiPaymentData.tn)}&am=${upiPaymentData.am}&cu=${upiPaymentData.cu}&tr=${upiPaymentData.tr}`;
    }
}

// Initialize Add to Cart Functionality
function initAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.product-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get product information from the card
            const productCard = this.closest('.product-card');
            const productId = parseFloat(productCard.dataset.id || Math.random() * 1000);
            const productName = productCard.querySelector('.product-title a').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-current-price').textContent.replace(/[^0-9.-]+/g, ''));
            const productImage = productCard.querySelector('.product-img img').src;
            const productCategory = productCard.querySelector('.product-category') ? 
                                    productCard.querySelector('.product-category').textContent : 'Jewelry';
            
            // Create product object
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                category: productCategory,
                quantity: 1
            };
            
            // Add to cart
            addToCart(product);
            
            // Show notification
            showCartNotification(`Added ${productName} to cart!`);
        });
    });
    
    // Add event listener for shopping cart icons in product actions
    document.querySelectorAll('.product-actions .fa-shopping-cart').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get product information from parent card
            const productCard = this.closest('.product-card');
            const productId = parseFloat(productCard.dataset.id || Math.random() * 1000);
            const productName = productCard.querySelector('.product-title a').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-current-price').textContent.replace(/[^0-9.-]+/g, ''));
            const productImage = productCard.querySelector('.product-img img').src;
            const productCategory = productCard.querySelector('.product-category') ? 
                                    productCard.querySelector('.product-category').textContent : 'Jewelry';
            
            // Create product object
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage,
                category: productCategory,
                quantity: 1
            };
            
            // Add to cart
            addToCart(product);
            
            // Show notification
            showCartNotification(`Added ${productName} to cart!`);
        });
    });
}

// Add a product to the cart
function addToCart(product) {
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('luxuryJewelsCart')) || [];
    
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
        // Increase quantity if product already exists
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add the new product
        cart.push(product);
    }
    
    // Save cart to localStorage
    localStorage.setItem('luxuryJewelsCart', JSON.stringify(cart));
    
    // Update cart UI
    updateCartCount();
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('luxuryJewelsCart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Display the cart count
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
        cartBadge.style.display = cartCount > 0 ? 'flex' : 'none';
    }
}

// Show cart notification
function showCartNotification(message) {
    let notification = document.querySelector('.cart-notification');
    
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'cart-notification';
        document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    notification.style.opacity = '1';
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 2000);
}

// Initialize mini cart
function initMiniCart() {
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            // If we're not on the cart page, show the mini cart
            if (!window.location.pathname.includes('cart.html')) {
                e.preventDefault();
                
                createMiniCart();
            }
        });
    }
    
    // Close mini-cart when clicking outside
    document.addEventListener('click', function(e) {
        const miniCart = document.querySelector('.mini-cart');
        const cartIcon = document.querySelector('.cart-icon');
        
        if (miniCart && cartIcon && !miniCart.contains(e.target) && !cartIcon.contains(e.target)) {
            miniCart.classList.remove('show');
            
            // Remove the mini-cart from DOM after transition
            setTimeout(() => {
                if (miniCart.parentNode) {
                    miniCart.parentNode.removeChild(miniCart);
                }
            }, 300);
        }
    });
}

// Create mini cart
function createMiniCart() {
    // Remove existing mini cart if any
    const existingMiniCart = document.querySelector('.mini-cart');
    if (existingMiniCart) {
        existingMiniCart.parentNode.removeChild(existingMiniCart);
    }
    
    // Get cart items
    const cart = JSON.parse(localStorage.getItem('luxuryJewelsCart')) || [];
    
    // Create mini cart element
    const miniCart = document.createElement('div');
    miniCart.className = 'mini-cart';
    
    // Create mini cart header
    const miniCartHeader = document.createElement('div');
    miniCartHeader.className = 'mini-cart-header';
    miniCartHeader.innerHTML = `
        <h3>Your Cart (${cart.reduce((total, item) => total + item.quantity, 0)})</h3>
        <button class="mini-cart-close"><i class="fas fa-times"></i></button>
    `;
    miniCart.appendChild(miniCartHeader);
    
    // Create mini cart items container
    const miniCartItems = document.createElement('div');
    miniCartItems.className = 'mini-cart-items';
    
    if (cart.length === 0) {
        // Show empty cart message
        const emptyCartMessage = document.createElement('div');
        emptyCartMessage.className = 'mini-cart-empty';
        emptyCartMessage.innerHTML = `
            <i class="fas fa-shopping-cart"></i>
            <p>Your cart is empty</p>
            <a href="products.html" class="btn btn-primary btn-sm">Browse Products</a>
        `;
        miniCartItems.appendChild(emptyCartMessage);
    } else {
        // Add items to mini cart
        cart.forEach(item => {
            const miniCartItem = document.createElement('div');
            miniCartItem.className = 'mini-cart-item';
            miniCartItem.innerHTML = `
                <div class="mini-cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="mini-cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="mini-cart-item-price">â,1${item.price.toLocaleString()}</div>
                    <div class="mini-cart-item-quantity">
                        <button class="mini-cart-quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="mini-cart-quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="mini-cart-item-remove" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            `;
            miniCartItems.appendChild(miniCartItem);
        });
    }
    
    miniCart.appendChild(miniCartItems);
    
    // Create mini cart footer
    if (cart.length > 0) {
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        
        const miniCartFooter = document.createElement('div');
        miniCartFooter.className = 'mini-cart-footer';
        miniCartFooter.innerHTML = `
            <div class="mini-cart-subtotal">
                <span>Subtotal</span>
                <span>â,1${subtotal.toLocaleString()}</span>
            </div>
            <a href="cart.html" class="btn btn-primary mini-cart-checkout">Checkout</a>
            <a href="cart.html" class="mini-cart-view-cart">View Cart</a>
        `;
        miniCart.appendChild(miniCartFooter);
    }
    
    // Add mini cart to the document
    document.body.appendChild(miniCart);
    
    // Show mini cart after a brief delay (for animation)
    setTimeout(() => {
        miniCart.classList.add('show');
    }, 10);
    
    // Add event listeners for mini cart interactions
    miniCart.querySelector('.mini-cart-close').addEventListener('click', function() {
        miniCart.classList.remove('show');
        
        // Remove the mini-cart from DOM after transition
        setTimeout(() => {
            miniCart.parentNode.removeChild(miniCart);
        }, 300);
    });
    
    // Add event listeners for quantity buttons
    const quantityButtons = miniCart.querySelectorAll('.mini-cart-quantity-btn');
    quantityButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseFloat(this.dataset.id);
            const isPlus = this.classList.contains('plus');
            
            // Find the product in the cart
            const cartItems = JSON.parse(localStorage.getItem('luxuryJewelsCart')) || [];
            const itemIndex = cartItems.findIndex(item => item.id === itemId);
            
            if (itemIndex === -1) return;
            
            if (isPlus) {
                // Increase quantity
                cartItems[itemIndex].quantity += 1;
            } else {
                // Decrease quantity
                cartItems[itemIndex].quantity -= 1;
                
                // Remove item if quantity is 0
                if (cartItems[itemIndex].quantity <= 0) {
                    cartItems.splice(itemIndex, 1);
                }
            }
            
            // Update localStorage
            localStorage.setItem('luxuryJewelsCart', JSON.stringify(cartItems));
            
            // Recreate mini cart to reflect changes
            createMiniCart();
            
            // Update cart count
            updateCartCount();
        });
    });
    
    // Add event listeners for remove buttons
    const removeButtons = miniCart.querySelectorAll('.mini-cart-item-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseFloat(this.dataset.id);
            
            // Find the product in the cart
            const cartItems = JSON.parse(localStorage.getItem('luxuryJewelsCart')) || [];
            const itemIndex = cartItems.findIndex(item => item.id === itemId);
            
            if (itemIndex === -1) return;
            
            // Get product name for notification
            const productName = cartItems[itemIndex].name;
            
            // Remove item from cart
            cartItems.splice(itemIndex, 1);
            
            // Update localStorage
            localStorage.setItem('luxuryJewelsCart', JSON.stringify(cartItems));
            
            // Show notification
            showCartNotification(`Removed ${productName} from cart!`);
            
            // Recreate mini cart to reflect changes
            createMiniCart();
            
            // Update cart count
            updateCartCount();
        });
    });
}

// Initialize product animations
function initProductAnimations() {
    // Add hover effect to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
    
    // Initialize quick view functionality
    const quickViewButtons = document.querySelectorAll('.quick-view-btn');
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get product information
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title a').textContent;
            const productPrice = productCard.querySelector('.product-current-price').textContent;
            const productImage = productCard.querySelector('.product-img img').src;
            
            // Create quick view modal
            const quickViewModal = document.createElement('div');
            quickViewModal.className = 'quick-view-modal';
            quickViewModal.innerHTML = `
                <div class="quick-view-content">
                    <button class="quick-view-close"><i class="fas fa-times"></i></button>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="quick-view-image">
                                <img src="${productImage}" alt="${productName}" class="quick-view-main-image">
                                <div class="quick-view-thumbnails">
                                    <img src="${productImage}" alt="${productName}" class="active" onclick="changeQuickViewImage(this, '${productImage}')">
                                    <img src="https://via.placeholder.com/100x100/d4af37/ffffff?text=Jewelry" alt="${productName}" onclick="changeQuickViewImage(this, 'https://via.placeholder.com/500x500/d4af37/ffffff?text=Jewelry')">
                                    <img src="https://via.placeholder.com/100x100/444444/ffffff?text=Jewelry" alt="${productName}" onclick="changeQuickViewImage(this, 'https://via.placeholder.com/500x500/444444/ffffff?text=Jewelry')">
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="quick-view-details">
                                <h2>${productName}</h2>
                                <div class="quick-view-price">${productPrice}</div>
                                <div class="quick-view-rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span>(25 reviews)</span>
                                </div>
                                <div class="quick-view-description">
                                    <p>This exquisite piece showcases exceptional craftsmanship with attention to detail. Perfect for adding a touch of luxury to any occasion, this timeless design combines elegance with contemporary style.</p>
                                </div>
                                <div class="quick-view-options">
                                    <div class="quick-view-size">
                                        <span>Size:</span>
                                        <select class="form-select">
                                            <option>Select Size</option>
                                            <option>Small</option>
                                            <option>Medium</option>
                                            <option>Large</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="quick-view-quantity">
                                    <span>Quantity:</span>
                                    <div class="quantity-selector">
                                        <button class="quantity-btn minus">-</button>
                                        <input type="text" class="quantity-input" value="1" readonly>
                                        <button class="quantity-btn plus">+</button>
                                    </div>
                                </div>
                                <div class="quick-view-actions">
                                    <button class="btn btn-primary add-to-cart-btn">
                                        <i class="fas fa-shopping-cart"></i> Add to Cart
                                    </button>
                                    <button class="btn btn-outline-secondary wishlist-btn">
                                        <i class="far fa-heart"></i>
                                    </button>
                                </div>
                                <div class="quick-view-meta">
                                    <div class="quick-view-category">
                                        <span>Category:</span> Jewelry
                                    </div>
                                    <div class="quick-view-sku">
                                        <span>SKU:</span> JW-12345
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add quick view modal to the document
            document.body.appendChild(quickViewModal);
            
            // Show quick view modal after a brief delay (for animation)
            setTimeout(() => {
                quickViewModal.classList.add('show');
                document.body.classList.add('modal-open');
            }, 10);
            
            // Add event listener for close button
            quickViewModal.querySelector('.quick-view-close').addEventListener('click', function() {
                quickViewModal.classList.remove('show');
                
                // Remove modal-open class from body
                document.body.classList.remove('modal-open');
                
                // Remove quick view modal from DOM after transition
                setTimeout(() => {
                    quickViewModal.parentNode.removeChild(quickViewModal);
                }, 300);
            });
            
            // Add event listeners for quantity buttons
            const quantityInput = quickViewModal.querySelector('.quantity-input');
            
            quickViewModal.querySelector('.quantity-btn.minus').addEventListener('click', function() {
                let quantity = parseInt(quantityInput.value);
                if (quantity > 1) {
                    quantityInput.value = quantity - 1;
                }
            });
            
            quickViewModal.querySelector('.quantity-btn.plus').addEventListener('click', function() {
                let quantity = parseInt(quantityInput.value);
                quantityInput.value = quantity + 1;
            });
            
            // Add event listener for add to cart button
            quickViewModal.querySelector('.add-to-cart-btn').addEventListener('click', function() {
                // Get selected quantity
                const quantity = parseInt(quantityInput.value);
                
                // Get product ID or generate a random one
                const productId = productCard.dataset.id || Math.random() * 1000;
                
                // Create product object
                const product = {
                    id: parseFloat(productId),
                    name: productName,
                    price: parseFloat(productPrice.replace(/[^0-9.-]+/g, '')),
                    image: productImage,
                    category: 'Jewelry',
                    quantity: quantity
                };
                
                // Add to cart
                addToCart(product);
                
                // Show notification
                showCartNotification(`Added ${productName} to cart!`);
                
                // Close quick view modal
                quickViewModal.querySelector('.quick-view-close').click();
            });
        });
    });
}

// Helper function to change quick view main image
window.changeQuickViewImage = function(thumbnail, imageSrc) {
    // Remove active class from all thumbnails
    const thumbnails = document.querySelectorAll('.quick-view-thumbnails img');
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to the clicked thumbnail
    thumbnail.classList.add('active');
    
    // Update main image
    document.querySelector('.quick-view-main-image').src = imageSrc;
};

// Scroll to Top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const rootElement = document.documentElement;
    
    // Function that handles scroll logic
    function handleScroll() {
        // Calculate scroll percentage
        const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        const scrollPercent = (window.scrollY / scrollTotal) * 100;
        
        // Show button when page is scrolled down 400px
        if (window.scrollY > 400) {
            if (!scrollToTopBtn.classList.contains('visible')) {
                scrollToTopBtn.classList.add('visible');
                // Add entrance animation
                scrollToTopBtn.style.animation = 'fadeInRotate 0.6s forwards';
            }
            
            // Add pulse animation when deep scrolled (over 1000px)
            if (window.scrollY > 1000) {
                if (!scrollToTopBtn.classList.contains('pulse')) {
                    scrollToTopBtn.classList.add('pulse');
                }
            } else {
                scrollToTopBtn.classList.remove('pulse');
            }
            
            // Change icon when near bottom (over 80% scrolled)
            if (scrollPercent > 80) {
                scrollToTopBtn.innerHTML = '<i class="fas fa-rocket"></i>';
                scrollToTopBtn.style.transform = 'rotate(45deg)';
            } else {
                scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
                scrollToTopBtn.style.transform = 'rotate(0deg)';
            }
            
        } else {
            if (scrollToTopBtn.classList.contains('visible')) {
                // Add exit animation
                scrollToTopBtn.style.animation = 'fadeOutRotate 0.6s forwards';
                setTimeout(() => {
                    scrollToTopBtn.classList.remove('visible');
                    scrollToTopBtn.classList.remove('pulse');
                }, 500);
            }
        }
    }
    
    // Function to scroll to top smoothly
    function scrollToTop() {
        // Add click effect
        scrollToTopBtn.style.transform = 'scale(0.8)';
        setTimeout(() => {
            scrollToTopBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Scroll animation
        const scrollDuration = 2000; // Increased from 1000ms to 2000ms for slower scrolling
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        
        // For browsers that don't support smooth scrolling
        if (typeof window.scrollTo !== 'function' || !('scrollBehavior' in document.documentElement.style)) {
            // Fallback with manual animation
            const scrollInterval = setInterval(function() {
                if (window.scrollY !== 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval);
                    // Trigger confetti when reaching the top
                    triggerScrollConfetti();
                }
            }, 15);
        } else {
            // Modern browsers with smooth scrolling
            rootElement.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            
            // Set a timeout to trigger the confetti effect when scrolling is likely to be complete
            setTimeout(() => {
                if (window.scrollY < 10) {
                    triggerScrollConfetti();
                }
            }, scrollDuration);
        }
        
        // Always trigger confetti with the rocket icon
        if (scrollToTopBtn.innerHTML.includes('rocket')) {
            triggerScrollConfetti();
        }
    }
    
    // Function to trigger confetti effect
    function triggerScrollConfetti() {
        // Create 100 confetti particles (increased from 50)
        for (let i = 0; i < 100; i++) {
            createConfettiParticle();
        }
    }
    
    // Function to create a single confetti particle
    function createConfettiParticle() {
        // Gold, silver, jewelry-inspired colors
        const colors = [
            '#c0a87f', // Gold
            '#e1c38d', // Light gold
            '#d4af37', // Classic gold
            '#c0c0c0', // Silver
            '#e5e4e2', // Platinum
            '#b9f2ff', // Diamond blue
            '#e0115f', // Ruby
            '#50c878', // Emerald
            '#4b0082', // Amethyst
            '#ffffff'  // White
        ];
        
        const particle = document.createElement('div');
        
        // Random properties with more variety
        const type = Math.random() > 0.5 ? 'circle' : 'square';
        const size = Math.random() * 15 + 5; // Larger size range
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 4 + 2; // Longer animation
        const rotationSpeed = Math.random() * 360;
        const rotationDirection = Math.random() > 0.5 ? 1 : -1;
        
        // Set CSS
        particle.style.position = 'fixed';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${left}vw`;
        particle.style.bottom = '0';
        particle.style.borderRadius = type === 'circle' ? '50%' : '0';
        particle.style.zIndex = '998';
        particle.style.transform = 'scale(0)';
        particle.style.animation = `confetti-${type} ${duration}s ease-out forwards`;
        
        // Add a subtle shimmer effect
        particle.style.boxShadow = `0 0 5px ${color}`;
        
        // Add to body
        document.body.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // Add enhanced keyframe animations for confetti
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes confetti-circle {
            0% {
                transform: scale(0) rotate(0deg);
                bottom: 0;
                opacity: 1;
            }
            100% {
                transform: scale(1) rotate(${Math.random() * 720 - 360}deg);
                bottom: 100vh;
                opacity: 0;
            }
        }
        
        @keyframes confetti-square {
            0% {
                transform: scale(0) rotate(0deg);
                bottom: 0;
                opacity: 1;
            }
            50% {
                transform: scale(0.5) rotate(${Math.random() * 360}deg);
                bottom: 50vh;
                opacity: 0.8;
            }
            100% {
                transform: scale(1) rotate(${Math.random() * 720}deg);
                bottom: 100vh;
                opacity: 0;
            }
        }
        
        @keyframes fadeInRotate {
            0% {
                opacity: 0;
                transform: translateY(20px) rotate(360deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
        }
        
        @keyframes fadeOutRotate {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(20px) rotate(-360deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Register events
    scrollToTopBtn.addEventListener("click", scrollToTop);
    window.addEventListener("scroll", handleScroll);
    
    // Initial check in case page is already scrolled on load
    handleScroll();
}

// Function to ensure Font Awesome icons are properly loaded
function ensureFontAwesome() {
    // Check if Font Awesome is loaded
    const isFontAwesomeLoaded = (document.querySelector('i.fas') && 
                                getComputedStyle(document.querySelector('i.fas'), ':before').content !== 'none');
    
    if (!isFontAwesomeLoaded) {
        // If not loaded, try to load it
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }
    
    // Specifically check and enhance the certificate icon
    setTimeout(() => {
        const certificateStack = document.querySelector('.certificate-stack');
        const svgFallback = document.querySelector('.certificate-fallback');
        
        if (certificateStack) {
            // Check if the icon is properly rendered
            const checkIcon = certificateStack.querySelector('.fa-check');
            const certificateIcon = certificateStack.querySelector('.fa-certificate');
            
            const isIconsRendered = checkIcon && certificateIcon && 
                                   getComputedStyle(certificateIcon, ':before').content !== 'none' &&
                                   getComputedStyle(checkIcon, ':before').content !== 'none';
            
            if (!isIconsRendered && svgFallback) {
                // If the icon isn't rendered properly, show the SVG fallback
                certificateStack.style.display = 'none';
                svgFallback.style.display = 'inline-block';
                svgFallback.style.animation = 'pulse 1.5s infinite';
            } else {
                // If the icon is rendered properly, ensure proper positioning
                checkIcon.style.position = 'absolute';
                checkIcon.style.top = '50%';
                checkIcon.style.left = '50%';
                checkIcon.style.transform = 'translate(-50%, -50%)';
                checkIcon.style.fontSize = '1.2rem';
                certificateStack.style.filter = 'drop-shadow(0 0 5px rgba(200, 161, 101, 0.7))';
                
                // Hide the fallback
                if (svgFallback) {
                    svgFallback.style.display = 'none';
                }
            }
        }
    }, 500); // Check after 500ms to allow Font Awesome to load
}

// Initialize page on DOM load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initProductAnimations();
    
    // Initialize add to cart buttons
    initAddToCartButtons();
    
    // Initialize mini cart
    initMiniCart();
    
    // Update cart count
    updateCartCount();
    
    // Initialize gemstone corner animations if on index page
    if (document.querySelector('.gemstone-corner')) {
        initGemstoneTwinkle();
    }
    
    // Other initializations...
    
    // Add event listener for newsletter form if it exists
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Show success message
                alert(`Thank you for subscribing with ${email}. You will receive our latest updates and special offers!`);
                
                // Clear the form
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

// Initialize gemstone twinkle animation
function initGemstoneTwinkle() {
    const gemstones = document.querySelectorAll('.gemstone-corner');
    
    function twinkle(gemstone) {
        // Random delay before twinkling
        const delay = Math.random() * 5000 + 1000;
        
        setTimeout(() => {
            // Add twinkle class
            gemstone.classList.add('twinkle');
            
            // Remove twinkle class after animation completes
            setTimeout(() => {
                gemstone.classList.remove('twinkle');
                
                // Recursively twinkle again
                twinkle(gemstone);
            }, 1000);
        }, delay);
    }
    
    // Start twinkling for each gemstone
    gemstones.forEach(gemstone => {
        twinkle(gemstone);
    });
}

// Add CSS for the mini cart
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .mini-cart {
            position: fixed;
            top: 80px;
            right: 20px;
            width: 350px;
            background-color: white;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            border-radius: 10px;
            z-index: 1000;
            transform: translateX(120%);
            opacity: 0;
            transition: all 0.3s ease;
            max-height: calc(100vh - 100px);
            display: flex;
            flex-direction: column;
        }
        
        .mini-cart.show {
            transform: translateX(0);
            opacity: 1;
        }
        
        .mini-cart-header {
            padding: 15px;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .mini-cart-header h4 {
            margin: 0;
            font-size: 18px;
        }
        
        .mini-cart-header h3 {
            margin: 0;
            font-size: 18px;
        }
        
        .mini-cart-close {
            background: none;
            border: none;
            font-size: 16px;
            cursor: pointer;
            color: #666;
        }
        
        .mini-cart-items {
            padding: 15px;
            overflow-y: auto;
            max-height: 350px;
            flex: 1;
        }
        
        .mini-cart-empty {
            text-align: center;
            color: #999;
            padding: 20px 0;
        }
        
        .mini-cart-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding-bottom: 15px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .mini-cart-item-img {
            width: 70px;
            height: 70px;
            border-radius: 5px;
            overflow: hidden;
            margin-right: 15px;
        }
        
        .mini-cart-item-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .mini-cart-item-details {
            flex: 1;
        }
        
        .mini-cart-item-details h4 {
            margin: 0 0 5px;
            font-size: 16px;
        }
        
        .mini-cart-item-price {
            color: var(--primary-color);
            font-weight: 600;
            margin: 0 0 5px;
        }
        
        .mini-cart-item-quantity {
            display: flex;
            align-items: center;
        }
        
        .mini-cart-item-quantity button {
            width: 24px;
            height: 24px;
            background-color: #f0f0f0;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            padding: 0;
        }
        
        .mini-cart-item-quantity span {
            margin: 0 10px;
            font-size: 14px;
        }
        
        .mini-cart-item-remove {
            background: none;
            border: none;
            color: #999;
            cursor: pointer;
            padding: 5px;
            font-size: 14px;
        }
        
        .mini-cart-item-remove:hover {
            color: #ff6b6b;
        }
        
        .mini-cart-footer {
            padding: 15px;
            border-top: 1px solid #f0f0f0;
        }
        
        .mini-cart-subtotal {
            display: flex;
            justify-content: space-between;
            font-weight: 600;
            margin-bottom: 15px;
            font-size: 18px;
        }
        
        .mini-cart-actions {
            display: flex;
            gap: 10px;
        }
        
        .mini-cart-actions button {
            flex: 1;
        }
        
        .cart-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: var(--primary-color);
            color: white;
            font-size: 10px;
            font-weight: bold;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .cart-notification {
            position: fixed;
            top: 80px;
            right: 20px;
            background-color: var(--primary-color);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            z-index: 9999;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .cart-notification.show {
            transform: translateX(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
})();

// Add CSS for cart icon and navbar styling
function addCartIconStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .cart-icon {
            position: relative;
        }
        
        .cart-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: var(--primary-color);
            color: white;
            font-size: 10px;
            font-weight: bold;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .navbar-scrolled {
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding-top: 10px;
            padding-bottom: 10px;
        }
    `;
    document.head.appendChild(style);
}

// Scroll to Top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    const rootElement = document.documentElement;
    
    // Function that handles scroll logic
    function handleScroll() {
        // Calculate scroll percentage
        const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
        const scrollPercent = (window.scrollY / scrollTotal) * 100;
        
        // Show button when page is scrolled down 400px
        if (window.scrollY > 400) {
            if (!scrollToTopBtn.classList.contains('visible')) {
                scrollToTopBtn.classList.add('visible');
                // Add entrance animation
                scrollToTopBtn.style.animation = 'fadeInRotate 0.6s forwards';
            }
            
            // Add pulse animation when deep scrolled (over 1000px)
            if (window.scrollY > 1000) {
                if (!scrollToTopBtn.classList.contains('pulse')) {
                    scrollToTopBtn.classList.add('pulse');
                }
            } else {
                scrollToTopBtn.classList.remove('pulse');
            }
            
            // Change icon when near bottom (over 80% scrolled)
            if (scrollPercent > 80) {
                scrollToTopBtn.innerHTML = '<i class="fas fa-rocket"></i>';
                scrollToTopBtn.style.transform = 'rotate(45deg)';
            } else {
                scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
                scrollToTopBtn.style.transform = 'rotate(0deg)';
            }
            
        } else {
            if (scrollToTopBtn.classList.contains('visible')) {
                // Add exit animation
                scrollToTopBtn.style.animation = 'fadeOutRotate 0.6s forwards';
                setTimeout(() => {
                    scrollToTopBtn.classList.remove('visible');
                    scrollToTopBtn.classList.remove('pulse');
                }, 500);
            }
        }
    }
    
    // Function to scroll to top smoothly
    function scrollToTop() {
        // Add click effect
        scrollToTopBtn.style.transform = 'scale(0.8)';
        setTimeout(() => {
            scrollToTopBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Scroll animation
        const scrollDuration = 2000; // Increased from 1000ms to 2000ms for slower scrolling
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        
        // For browsers that don't support smooth scrolling
        if (typeof window.scrollTo !== 'function' || !('scrollBehavior' in document.documentElement.style)) {
            // Fallback with manual animation
            const scrollInterval = setInterval(function() {
                if (window.scrollY !== 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval);
                    // Trigger confetti when reaching the top
                    triggerScrollConfetti();
                }
            }, 15);
        } else {
            // Modern browsers with smooth scrolling
            rootElement.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            
            // Set a timeout to trigger the confetti effect when scrolling is likely to be complete
            setTimeout(() => {
                if (window.scrollY < 10) {
                    triggerScrollConfetti();
                }
            }, scrollDuration);
        }
        
        // Always trigger confetti with the rocket icon
        if (scrollToTopBtn.innerHTML.includes('rocket')) {
            triggerScrollConfetti();
        }
    }
    
    // Function to trigger confetti effect
    function triggerScrollConfetti() {
        // Create 100 confetti particles (increased from 50)
        for (let i = 0; i < 100; i++) {
            createConfettiParticle();
        }
    }
    
    // Function to create a single confetti particle
    function createConfettiParticle() {
        // Gold, silver, jewelry-inspired colors
        const colors = [
            '#c0a87f', // Gold
            '#e1c38d', // Light gold
            '#d4af37', // Classic gold
            '#c0c0c0', // Silver
            '#e5e4e2', // Platinum
            '#b9f2ff', // Diamond blue
            '#e0115f', // Ruby
            '#50c878', // Emerald
            '#4b0082', // Amethyst
            '#ffffff'  // White
        ];
        
        const particle = document.createElement('div');
        
        // Random properties with more variety
        const type = Math.random() > 0.5 ? 'circle' : 'square';
        const size = Math.random() * 15 + 5; // Larger size range
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 4 + 2; // Longer animation
        const rotationSpeed = Math.random() * 360;
        const rotationDirection = Math.random() > 0.5 ? 1 : -1;
        
        // Set CSS
        particle.style.position = 'fixed';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${left}vw`;
        particle.style.bottom = '0';
        particle.style.borderRadius = type === 'circle' ? '50%' : '0';
        particle.style.zIndex = '998';
        particle.style.transform = 'scale(0)';
        particle.style.animation = `confetti-${type} ${duration}s ease-out forwards`;
        
        // Add a subtle shimmer effect
        particle.style.boxShadow = `0 0 5px ${color}`;
        
        // Add to body
        document.body.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        }, duration * 1000);
    }
    
    // Add enhanced keyframe animations for confetti
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes confetti-circle {
            0% {
                transform: scale(0) rotate(0deg);
                bottom: 0;
                opacity: 1;
            }
            100% {
                transform: scale(1) rotate(${Math.random() * 720 - 360}deg);
                bottom: 100vh;
                opacity: 0;
            }
        }
        
        @keyframes confetti-square {
            0% {
                transform: scale(0) rotate(0deg);
                bottom: 0;
                opacity: 1;
            }
            50% {
                transform: scale(0.5) rotate(${Math.random() * 360}deg);
                bottom: 50vh;
                opacity: 0.8;
            }
            100% {
                transform: scale(1) rotate(${Math.random() * 720}deg);
                bottom: 100vh;
                opacity: 0;
            }
        }
        
        @keyframes fadeInRotate {
            0% {
                opacity: 0;
                transform: translateY(20px) rotate(360deg);
            }
            100% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
        }
        
        @keyframes fadeOutRotate {
            0% {
                opacity: 1;
                transform: translateY(0) rotate(0deg);
            }
            100% {
                opacity: 0;
                transform: translateY(20px) rotate(-360deg);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Register events
    scrollToTopBtn.addEventListener("click", scrollToTop);
    window.addEventListener("scroll", handleScroll);
    
    // Initial check in case page is already scrolled on load
    handleScroll();
}

// Function to ensure Font Awesome icons are properly loaded
function ensureFontAwesome() {
    // Check if Font Awesome is loaded
    const isFontAwesomeLoaded = (document.querySelector('i.fas') && 
                                getComputedStyle(document.querySelector('i.fas'), ':before').content !== 'none');
    
    if (!isFontAwesomeLoaded) {
        // If not loaded, try to load it
        const fontAwesomeLink = document.createElement('link');
        fontAwesomeLink.rel = 'stylesheet';
        fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
        document.head.appendChild(fontAwesomeLink);
    }
    
    // Specifically check and enhance the certificate icon
    setTimeout(() => {
        const certificateStack = document.querySelector('.certificate-stack');
        const svgFallback = document.querySelector('.certificate-fallback');
        
        if (certificateStack) {
            // Check if the icon is properly rendered
            const checkIcon = certificateStack.querySelector('.fa-check');
            const certificateIcon = certificateStack.querySelector('.fa-certificate');
            
            const isIconsRendered = checkIcon && certificateIcon && 
                                   getComputedStyle(certificateIcon, ':before').content !== 'none' &&
                                   getComputedStyle(checkIcon, ':before').content !== 'none';
            
            if (!isIconsRendered && svgFallback) {
                // If the icon isn't rendered properly, show the SVG fallback
                certificateStack.style.display = 'none';
                svgFallback.style.display = 'inline-block';
                svgFallback.style.animation = 'pulse 1.5s infinite';
            } else {
                // If the icon is rendered properly, ensure proper positioning
                checkIcon.style.position = 'absolute';
                checkIcon.style.top = '50%';
                checkIcon.style.left = '50%';
                checkIcon.style.transform = 'translate(-50%, -50%)';
                checkIcon.style.fontSize = '1.2rem';
                certificateStack.style.filter = 'drop-shadow(0 0 5px rgba(200, 161, 101, 0.7))';
                
                // Hide the fallback
                if (svgFallback) {
                    svgFallback.style.display = 'none';
                }
            }
        }
    }, 500); // Check after 500ms to allow Font Awesome to load
}

// Initialize gemstone corner animations
function initGemstoneAnimations() {
    const featureBoxes = document.querySelectorAll('.feature-box');
    
    featureBoxes.forEach(box => {
        // Randomly animate gemstone corners for a sparkling effect
        const gemstones = box.querySelectorAll('.gemstone-corner');
        
        gemstones.forEach(gem => {
            // Create periodic random twinkling effect
            setInterval(() => {
                // Only animate occasionally for a natural look
                if (Math.random() > 0.7) {
                    // Randomly scale and fade for twinkling effect
                    const scale = 1 + Math.random();
                    const opacity = 0.1 + Math.random() * 0.4;
                    
                    gem.style.transform = `scale(${scale})`;
                    gem.style.opacity = opacity;
                    
                    // Reset after animation
                    setTimeout(() => {
                        gem.style.transform = '';
                        gem.style.opacity = '';
                    }, 700);
                }
            }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
        });
    });
}

// Function to process credit card payment
function processCardPayment(items, total) {
    // Simulate card payment processing
    showPaymentProcessing();
    
    // Simulate API call to payment gateway
    setTimeout(() => {
        // Successful payment (in real implementation, this would be a callback from the payment gateway)
        const orderId = generateOrderId();
        completeOrder(orderId, items, total, 'Credit Card');
    }, 2000);
}

// Function to process UPI payment
function processUpiPayment(items, total) {
    // For UPI, typically show a QR code or open UPI app
    const upiModal = new bootstrap.Modal(document.getElementById('upiModal'));
    upiModal.show();
    
    // Set the amount in the modal
    const modalAmount = document.getElementById('modal-amount');
    if (modalAmount) {
        modalAmount.textContent = `â,1${total.toLocaleString()}`;
    }
    
    // In a real implementation, you would verify the UPI payment through server
    // Here we're just simulating verification when user clicks a button
    const verifyButton = document.querySelector('.verify-upi-payment');
    if (verifyButton) {
        verifyButton.addEventListener('click', function() {
            showPaymentProcessing();
            
            // Simulate verification
            setTimeout(() => {
                upiModal.hide();
                const orderId = generateOrderId();
                completeOrder(orderId, items, total, 'UPI');
            }, 1500);
        });
    }
}

// Function to process cash on delivery
function processCodPayment(items, total) {
    // Validate for COD limits
    if (total > 50000) {
        showAlert('Cash on Delivery is only available for orders under â,150,000');
        return;
    }
    
    showPaymentProcessing();
    
    // Process COD order (simulated)
    setTimeout(() => {
        const orderId = generateOrderId();
        completeOrder(orderId, items, total, 'Cash on Delivery');
    }, 1000);
}

// Show payment processing overlay
function showPaymentProcessing() {
    const overlay = document.createElement('div');
    overlay.className = 'payment-processing-overlay';
    overlay.innerHTML = `
        <div class="processing-content">
            <div class="spinner"></div>
            <h3>Processing Your Payment</h3>
            <p>Please don't close this window...</p>
        </div>
    `;
    document.body.appendChild(overlay);
}

// Complete order and show confirmation
function completeOrder(orderId, items, total, paymentMethod) {
    // Clear cart
    localStorage.removeItem('luxuryJewelsCart');
    
    // Remove processing overlay
    const overlay = document.querySelector('.payment-processing-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
    
    // Close checkout page
    const checkoutPage = document.getElementById('checkout-page');
    if (checkoutPage) {
        checkoutPage.classList.remove('active');
    }
    
    // Create order confirmation
    const confirmation = document.createElement('div');
    confirmation.className = 'order-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Order Confirmed!</h2>
            <p>Your order #${orderId} has been placed successfully</p>
            <div class="order-details">
                <div class="detail">
                    <span>Payment Method:</span>
                    <span>${paymentMethod}</span>
                </div>
                <div class="detail">
                    <span>Total Amount:</span>
                    <span>â,1${total.toLocaleString()}</span>
                </div>
                <div class="detail">
                    <span>Estimated Delivery:</span>
                    <span>${getEstimatedDelivery()}</span>
                </div>
            </div>
            <p class="confirmation-message">
                A confirmation email has been sent to your email address.
                You can track your order in the My Orders section.
            </p>
            <div class="confirmation-actions">
                <button class="btn btn-outline-primary view-order-btn">View Order</button>
                <button class="btn btn-primary continue-shopping-btn">Continue Shopping</button>
            </div>
        </div>
    `;
    document.body.appendChild(confirmation);
    
    // Update cart count
    window.updateCartCount();
    
    // Handle continuation
    const continueBtn = confirmation.querySelector('.continue-shopping-btn');
    continueBtn.addEventListener('click', () => {
        confirmation.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(confirmation);
            
            // Remove checkout page if still present
            if (checkoutPage && checkoutPage.parentNode) {
                document.body.removeChild(checkoutPage);
            }
            
            document.body.style.overflow = '';
        }, 300);
    });
    
    // Handle view order (placeholder functionality)
    const viewOrderBtn = confirmation.querySelector('.view-order-btn');
    viewOrderBtn.addEventListener('click', () => {
        alert('Order tracking feature coming soon!');
    });
}

// Generate random order ID
function generateOrderId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 2; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    result += Math.floor(100000 + Math.random() * 900000); // 6-digit number
    return result;
}

// Get estimated delivery date (7-10 days from now)
function getEstimatedDelivery() {
    const today = new Date();
    const minDays = 7;
    const maxDays = 10;
    
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + minDays);
    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + maxDays);
    
    // Format dates
    const options = { month: 'short', day: 'numeric' };
    const minDateStr = minDate.toLocaleDateString('en-US', options);
    const maxDateStr = maxDate.toLocaleDateString('en-US', options);
    
    return `${minDateStr} - ${maxDateStr}`;
}

// Show alert message
function showAlert(message) {
    const alert = document.createElement('div');
    alert.className = 'checkout-alert';
    alert.innerHTML = `
        <div class="alert-content">
            <i class="fas fa-exclamation-circle"></i>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alert);
        }, 300);
    }, 3000);
}

// Close mini cart when clicking outside
document.addEventListener('click', function(e) {
    const miniCart = document.querySelector('.mini-cart');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (miniCart && !miniCart.contains(e.target) && !cartIcon.contains(e.target)) {
        miniCart.classList.remove('show');
        setTimeout(() => {
            miniCart.parentNode.removeChild(miniCart);
        }, 300);
    }
}); 

// Make floating buttons visible on page load
document.addEventListener('DOMContentLoaded', function() {
    // Force the floating buttons to be visible
    const floatingButtons = document.querySelector('.floating-buttons');
    
    if (floatingButtons) {
        console.log("Found floating buttons");
        // Force show the buttons immediately
        floatingButtons.style.right = '30px';
        floatingButtons.classList.add('show');
    }
    
    // Chat Widget Toggle
    const chatButton = document.getElementById('chatButton');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendChat = document.getElementById('sendChat');
    const chatBody = document.getElementById('chatBody');
    
    if (chatButton && chatWidget) {
        console.log("Found chat widget elements");
        
        chatButton.addEventListener('click', function(e) {
            console.log("Chat button clicked");
            chatWidget.classList.toggle('open');
        });
        
        if (closeChat) {
            closeChat.addEventListener('click', function() {
                chatWidget.classList.remove('open');
            });
        }
        
        // Send message function
        function sendChatMessage() {
            const message = chatInput.value.trim();
            if (message) {
                // Add user message
                const userMessageDiv = document.createElement('div');
                userMessageDiv.className = 'chat-message sent';
                userMessageDiv.textContent = message;
                chatBody.appendChild(userMessageDiv);
                
                // Clear input
                chatInput.value = '';
                
                // Auto scroll to bottom
                chatBody.scrollTop = chatBody.scrollHeight;
                
                // Simulate response after a short delay
                setTimeout(function() {
                    const botMessageDiv = document.createElement('div');
                    botMessageDiv.className = 'chat-message received';
                    botMessageDiv.textContent = "Thank you for your message. One of our jewelry consultants will get back to you shortly.";
                    chatBody.appendChild(botMessageDiv);
                    
                    // Auto scroll to bottom again
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 1000);
            }
        }
        
        // Send message on button click
        if (sendChat) {
            sendChat.addEventListener('click', sendChatMessage);
        }
        
        // Send message on Enter key
        if (chatInput) {
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendChatMessage();
                }
            });
        }
    }
    
    // Appointment button functionality
    const appointmentButton = document.querySelector('.floating-btn.appointment');
    if (appointmentButton) {
        console.log("Found appointment button");
        appointmentButton.addEventListener('click', function(e) {
            console.log("Appointment button clicked");
            // Modal should be triggered via Bootstrap data attributes
            // but we'll force it here too just in case
            try {
                const appointmentModal = new bootstrap.Modal(document.getElementById('appointmentModal'));
                appointmentModal.show();
            } catch(err) {
                console.error("Error showing modal:", err);
            }
        });
    }
});

// Function to initialize 360 degree product viewer
function init360ProductViewer() {
    const productViewer = document.getElementById('productViewer');
    if (!productViewer) return;
    
    const viewerImage = productViewer.querySelector('.product-360-image');
    const spinnerContainer = productViewer.querySelector('.spinner-container');
    const rotateLeftButton = document.getElementById('rotateLeft');
    const rotateRightButton = document.getElementById('rotateRight');
    const playPauseButton = document.getElementById('playPause');
    
    let images = [];
    let currentFrame = 0;
    const totalFrames = 36; // Total number of images in the 360 sequence
    let isPlaying = false;
    let autoRotateInterval;
    let isDragging = false;
    let startX = 0;
    
    // Set to false to use the actual 360 sequence images
    const usePlaceholder = false;
    
    // Preload all images or use placeholder
    function preloadImages() {
        spinnerContainer.classList.add('loading');
        
        if (usePlaceholder) {
            // Use a placeholder image for now
            const img = new Image();
            img.onload = () => {
                spinnerContainer.classList.remove('loading');
                viewerImage.src = img.src;
                console.log('Placeholder image loaded successfully.');
                
                // Create fake sequence for rotation simulation
                for (let i = 0; i < totalFrames; i++) {
                    images.push(img);
                }
            };
            img.onerror = () => {
                console.error('Error loading placeholder image');
                spinnerContainer.classList.remove('loading');
            };
            img.src = 'img/products/product-1.jpg'; // Use any existing product image
            return;
        }
        
        // Adjusted to only load existing images (currently just 1.jpg and 2.jpg)
        const imageNumbers = [1, 2]; // Add more numbers as you upload more images
        const loadPromises = [];
        
        for (let i = 0; i < imageNumbers.length; i++) {
            const imgNumber = imageNumbers[i];
            const promise = new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    console.log(`Loaded image ${imgNumber}.jpg`);
                    resolve();
                };
                img.onerror = () => {
                    console.error(`Failed to load image ${imgNumber}.jpg`);
                    resolve(); // Still resolve even on error to continue
                };
                img.src = `img/products/ring-360/${imgNumber}.jpg`;
                images.push(img);
            });
            
            loadPromises.push(promise);
        }
        
        // When all images are loaded
        Promise.all(loadPromises).then(() => {
            if (images.length > 0) {
                spinnerContainer.classList.remove('loading');
                viewerImage.src = images[0].src;
                console.log(`Successfully loaded ${images.length} product images.`);
                
                // Adjust totalFrames to match the actual number of images
                totalFrames = images.length;
            } else {
                console.error('No images were loaded successfully.');
                spinnerContainer.classList.remove('loading');
            }
        }).catch(error => {
            console.error('Error loading product images:', error);
            spinnerContainer.classList.remove('loading');
        });
    }
    
    // Show frame by index
    function showFrame(frameIndex) {
        if (images.length === 0) return;
        
        currentFrame = frameIndex;
        
        // Ensure the frame index is within bounds
        if (currentFrame < 0) currentFrame = images.length - 1;
        if (currentFrame >= images.length) currentFrame = 0;
        
        // Set the image source to the current frame
        if (images[currentFrame]) {
            // If using placeholder, simulate rotation by changing transform
            if (usePlaceholder) {
                const rotation = (currentFrame / totalFrames) * 360;
                viewerImage.style.transform = `rotate(${rotation}deg)`;
            } else {
                viewerImage.style.transform = 'none'; // Reset any transform
                viewerImage.src = images[currentFrame].src;
            }
        }
    }
    
    // Rotate left
    function rotateLeft() {
        showFrame(currentFrame - 1);
    }
    
    // Rotate right
    function rotateRight() {
        showFrame(currentFrame + 1);
    }
    
    // Toggle auto rotation
    function toggleAutoRotate() {
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            autoRotateInterval = setInterval(rotateRight, 100);
        } else {
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            clearInterval(autoRotateInterval);
        }
    }
    
    // Mouse & Touch Events
    function handleDragStart(e) {
        isDragging = true;
        startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        
        // Change cursor while dragging
        productViewer.style.cursor = 'grabbing';
        
        // Stop auto-rotation when user interacts
        if (isPlaying) {
            toggleAutoRotate();
        }
        
        // Add events for move and end
        if (e.type === 'touchstart') {
            document.addEventListener('touchmove', handleDragMove);
            document.addEventListener('touchend', handleDragEnd);
        } else {
            document.addEventListener('mousemove', handleDragMove);
            document.addEventListener('mouseup', handleDragEnd);
        }
        
        // Prevent default to avoid selection
        e.preventDefault();
    }
    
    function handleDragMove(e) {
        if (!isDragging) return;
        
        const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const deltaX = x - startX;
        
        // Only rotate if the movement is significant
        if (Math.abs(deltaX) > 5) {
            const framesToMove = Math.floor(deltaX / 10);
            
            if (framesToMove !== 0) {
                showFrame(currentFrame - framesToMove);
                startX = x;
            }
        }
    }
    
    function handleDragEnd() {
        isDragging = false;
        productViewer.style.cursor = 'grab';
        
        // Remove event listeners
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleDragMove);
        document.removeEventListener('touchend', handleDragEnd);
    }
    
    // Initialize events
    rotateLeftButton.addEventListener('click', rotateLeft);
    rotateRightButton.addEventListener('click', rotateRight);
    playPauseButton.addEventListener('click', toggleAutoRotate);
    
    // Drag events
    productViewer.addEventListener('mousedown', handleDragStart);
    productViewer.addEventListener('touchstart', handleDragStart);
    
    // Initial image loading
    preloadImages();
    
    // Add fallback for missing images
    viewerImage.onerror = function() {
        viewerImage.src = 'img/products/product-placeholder.jpg';
        console.error('Error loading 360 product images');
    };
    
    // Clean up function to remove event listeners
    return function cleanup() {
        if (autoRotateInterval) clearInterval(autoRotateInterval);
        rotateLeftButton.removeEventListener('click', rotateLeft);
        rotateRightButton.removeEventListener('click', rotateRight);
        playPauseButton.removeEventListener('click', toggleAutoRotate);
        productViewer.removeEventListener('mousedown', handleDragStart);
        productViewer.removeEventListener('touchstart', handleDragStart);
    };
}

// Initialize document event listeners
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize navbar scroll behavior
    initNavbarScroll();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize counter animation for stats
    initCounterAnimation();
    
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize product card animations
    initProductAnimations();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize UPI payment system
    initUpiPayment();
    
    // Add CSS for cart icon
    addCartIconStyles();
    
    // Add padding to the body to account for the fixed navbar
    const headerHeight = document.querySelector('.navbar').offsetHeight;
    document.body.style.paddingTop = headerHeight + 'px';
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Ensure Font Awesome is properly loaded
    ensureFontAwesome();
    
    // Initialize Add to Cart buttons
    initAddToCartButtons();

    // Initialize floating buttons and chat widget
    initFloatingButtonsAndChat();
    
    // Initialize 360 degree product viewer
    init360ProductViewer();
});
