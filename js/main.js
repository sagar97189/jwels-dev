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
    
    // Prevent all product card links from navigating to new pages
    document.querySelectorAll('.product-card a, .product-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // If this is the Add to Cart button, let its own handler handle it
            if (this.classList.contains('product-btn')) {
                return;
            }
            
            // If this is a product title link, show toast notification
            if (this.closest('.product-title')) {
                showCartNotification('Product details will be available soon');
            }
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
    console.log('Initializing Add to Cart buttons');
    // Target both types of Add to Cart buttons used throughout the site
    const addToCartButtons = document.querySelectorAll('.product-btn, .add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default to avoid page navigation
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Add to cart button clicked', this);
            
            try {
                // Get product information from the card
                const productCard = this.closest('.product-card');
                if (!productCard) {
                    console.error('Could not find product card');
                    return false;
                }
                
                const productId = Date.now(); // Use timestamp for unique ID
                
                // Handle different HTML structures
                // First try the trending products structure
                let productName, productPriceText, productPrice, productImage, productCategory;
                
                // Try to get product name from either structure
                const productNameEl = productCard.querySelector('.product-title a') || 
                                    productCard.querySelector('.product-name');
                productName = productNameEl ? productNameEl.textContent.trim() : 'Product';
                
                // Try to get price from either structure
                const productPriceEl = productCard.querySelector('.product-current-price') || 
                                     productCard.querySelector('.product-price');
                if (!productPriceEl) {
                    console.error('Could not find product price');
                    return false;
                }
                
                productPriceText = productPriceEl.textContent.trim();
                console.log('Product price text:', productPriceText);
                productPrice = parseFloat(productPriceText.replace(/[^0-9.-]+/g, ''));
                
                // Try to get image from either structure
                const productImgEl = productCard.querySelector('.product-img img') || 
                                   productCard.querySelector('img.img-fluid');
                if (!productImgEl) {
                    console.error('Could not find product image');
                    return false;
                }
                
                productImage = productImgEl.src;
                
                // Try to get category from either structure
                const productCategoryEl = productCard.querySelector('.product-category');
                productCategory = productCategoryEl ? productCategoryEl.textContent.trim() : 'Jewelry';
                
                // Create product object
                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    category: productCategory,
                    quantity: 1
                };
                
                console.log('Adding product to cart:', product);
                
                // Add to cart
                addToCart(product);
                
                // Show beautiful notification
                showAddToCartToast(product);
            } catch (error) {
                console.error('Error in Add to Cart button handler:', error);
            }
            
            return false; // Prevent any other default behavior
        });
        
        // Double-ensure no navigation happens on regular clicks
        button.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };
        
        // Disable href navigation completely by replacing with javascript:void(0)
        if (button.tagName === 'A' && button.hasAttribute('href')) {
            button.setAttribute('href', 'javascript:void(0);');
        }
    });
    
    // Add event listener for shopping cart icons in product actions
    document.querySelectorAll('.product-actions .product-action-btn').forEach(btn => {
        if (btn.querySelector('.fa-shopping-cart')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Cart icon clicked');
                
                try {
                    // Get product information from parent card
                    const productCard = this.closest('.product-card');
                    if (!productCard) {
                        console.error('Could not find product card from icon');
                        return false;
                    }
                    
                    const productId = Date.now(); // Use timestamp for unique ID
                    
                    // Handle different HTML structures
                    let productName, productPriceText, productPrice, productImage, productCategory;
                    
                    // Try to get product name from either structure
                    const productNameEl = productCard.querySelector('.product-title a') || 
                                        productCard.querySelector('.product-name');
                    productName = productNameEl ? productNameEl.textContent.trim() : 'Product';
                    
                    // Try to get price from either structure
                    const productPriceEl = productCard.querySelector('.product-current-price') || 
                                         productCard.querySelector('.product-price');
                    if (!productPriceEl) {
                        console.error('Could not find product price from icon');
                        return false;
                    }
                    
                    productPriceText = productPriceEl.textContent.trim();
                    console.log('Product price text (icon):', productPriceText);
                    productPrice = parseFloat(productPriceText.replace(/[^0-9.-]+/g, ''));
                    
                    // Try to get image from either structure
                    const productImgEl = productCard.querySelector('.product-img img') || 
                                       productCard.querySelector('img.img-fluid');
                    if (!productImgEl) {
                        console.error('Could not find product image from icon');
                        return false;
                    }
                    
                    productImage = productImgEl.src;
                    
                    // Try to get category from either structure
                    const productCategoryEl = productCard.querySelector('.product-category');
                    productCategory = productCategoryEl ? productCategoryEl.textContent.trim() : 'Jewelry';
                    
                    // Create product object
                    const product = {
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        category: productCategory,
                        quantity: 1
                    };
                    
                    console.log('Adding product to cart from icon:', product);
                    
                    // Add to cart
                    addToCart(product);
                    
                    // Show beautiful notification
                    showAddToCartToast(product);
                } catch (error) {
                    console.error('Error in cart icon handler:', error);
                }
                
                return false; // Prevent any other default behavior
            });
            
            // Double-ensure no navigation happens on regular clicks
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            };
            
            // Disable href navigation completely by replacing with javascript:void(0)
            if (btn.tagName === 'A' && btn.hasAttribute('href')) {
                btn.setAttribute('href', 'javascript:void(0);');
            }
        }
    });
    
    // Handle cart icon click for mini-cart display
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            // Only prevent default if we're not on the cart page
            if (!window.location.pathname.includes('cart.html')) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Cart icon clicked, creating mini cart');
                createMiniCart();
                return false;
            }
        });
    }
    
    // After initial setup, also add a global event listener to catch any other links in product cards
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // If the clicked element is inside a product card and is a link or button
        if (target.closest('.product-card') && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button'))) {
            // If it's not our cart icon or a link to cart.html
            const isCartLink = target.closest('.cart-icon') || (target.hasAttribute('href') && target.getAttribute('href').includes('cart.html'));
            
            if (!isCartLink) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Prevented navigation from product card link/button');
                return false;
            }
        }
    }, true); // Use capture phase to ensure we handle events first
}

// Beautiful toast notification for added product
function showAddToCartToast(product) {
    // Remove any existing toast
    const existingToast = document.querySelector('.add-to-cart-toast');
    if (existingToast) {
        document.body.removeChild(existingToast);
    }
    
    // Create toast container
    const toast = document.createElement('div');
    toast.className = 'add-to-cart-toast';
    
    // Set toast styles
    toast.style.position = 'fixed';
    toast.style.top = '20px';
    toast.style.right = '-400px'; // Start off-screen
    toast.style.width = '350px';
    toast.style.backgroundColor = 'white';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    toast.style.padding = '15px';
    toast.style.zIndex = '10000';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.transition = 'right 0.5s ease';
    
    // Create toast content
    toast.innerHTML = `
        <div style="width: 60px; height: 60px; overflow: hidden; border-radius: 4px; margin-right: 15px; flex-shrink: 0;">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="flex-grow: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <h4 style="margin: 0; font-size: 16px; color: #333;">${product.name}</h4>
                <button class="toast-close" style="background: none; border: none; cursor: pointer; font-size: 16px; color: #999;">&times;</button>
            </div>
            <p style="margin: 0 0 5px; color: #666; font-size: 13px;">${product.category}</p>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="color: #d4af37; font-weight: 600;">$${parseFloat(product.price).toLocaleString()}</div>
                <div style="background-color: #4caf50; color: white; padding: 3px 8px; border-radius: 4px; font-size: 12px;">
                    <i class="fas fa-check" style="margin-right: 4px;"></i> Added to cart
                </div>
            </div>
        </div>
    `;
    
    // Add toast to document
    document.body.appendChild(toast);
    
    // Trigger reflow
    void toast.offsetWidth;
    
    // Animate in
    setTimeout(() => {
        toast.style.right = '20px';
    }, 10);
    
    // Add close button event listener
    const closeButton = toast.querySelector('.toast-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            toast.style.right = '-400px';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 500);
        });
    }
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.style.right = '-400px';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 500);
        }
    }, 5000);
}

// Add a product to the cart
function addToCart(product) {
    console.log('Adding to cart:', product);
    
    try {
        // Get current cart from localStorage
        let cart = JSON.parse(localStorage.getItem('luxuryJewelsCart')) || [];
        
        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(item => 
            item.name === product.name && 
            item.price === product.price
        );
        
        if (existingProductIndex !== -1) {
            // Increase quantity if product already exists
            cart[existingProductIndex].quantity += 1;
            console.log('Increased quantity for existing product in cart:', cart[existingProductIndex]);
        } else {
            // Add the new product
            cart.push(product);
            console.log('Added new product to cart:', product);
        }
        
        // Save cart to localStorage
        localStorage.setItem('luxuryJewelsCart', JSON.stringify(cart));
        
        // Update cart UI
        updateCartCount();
        
        // Create mini cart if it exists on page
        if (document.querySelector('.cart-icon')) {
            console.log('Showing mini cart after adding item');
            createMiniCart();
        }
        
        return true;
    } catch (error) {
        console.error('Error adding to cart:', error);
        showCartNotification('Error adding to cart. Please try again.');
        return false;
    }
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
    console.log('Showing notification:', message);
    
    // Remove any existing notifications
    const existingNotification = document.querySelector('.cart-notification');
    if (existingNotification) {
        document.body.removeChild(existingNotification);
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    
    // Apply direct styles
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'rgba(77, 175, 124, 0.95)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
    notification.style.zIndex = '10000';
    notification.style.display = 'block';
    notification.style.opacity = '1';
    notification.style.fontWeight = '500';
    notification.style.textAlign = 'center';
    notification.style.minWidth = '250px';
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Hide after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Create mini cart
function createMiniCart() {
    console.log('Creating mini cart');
    
    try {
        // Remove existing mini cart if any
        const existingMiniCart = document.querySelector('.mini-cart');
        if (existingMiniCart) {
            existingMiniCart.parentNode.removeChild(existingMiniCart);
        }
        
        // Get cart items
        const cart = JSON.parse(localStorage.getItem('luxuryJewelsCart')) || [];
        console.log('Creating mini cart with items:', cart);
        
        // Create mini cart element
        const miniCart = document.createElement('div');
        miniCart.className = 'mini-cart';
        
        // Set explicit styles to ensure visibility
        miniCart.style.position = 'fixed';
        miniCart.style.top = '80px';
        miniCart.style.right = '20px'; // Start visible immediately
        miniCart.style.width = '350px';
        miniCart.style.backgroundColor = 'white';
        miniCart.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        miniCart.style.borderRadius = '10px';
        miniCart.style.zIndex = '9999';
        miniCart.style.display = 'flex';
        miniCart.style.flexDirection = 'column';
        miniCart.style.maxHeight = 'calc(100vh - 100px)';
        miniCart.style.overflow = 'hidden';
        miniCart.style.padding = '15px';
        
        // Create mini cart header
        const miniCartHeader = document.createElement('div');
        miniCartHeader.className = 'mini-cart-header';
        miniCartHeader.style.display = 'flex';
        miniCartHeader.style.justifyContent = 'space-between';
        miniCartHeader.style.alignItems = 'center';
        miniCartHeader.style.marginBottom = '15px';
        miniCartHeader.innerHTML = `
            <h3 style="margin: 0; font-size: 18px;">Your Cart (${cart.reduce((total, item) => total + item.quantity, 0)})</h3>
            <button class="mini-cart-close" style="background: none; border: none; cursor: pointer;"><i class="fas fa-times"></i></button>
        `;
        miniCart.appendChild(miniCartHeader);
        
        // Create mini cart items container
        const miniCartItems = document.createElement('div');
        miniCartItems.className = 'mini-cart-items';
        miniCartItems.style.maxHeight = '300px';
        miniCartItems.style.overflowY = 'auto';
        
        if (cart.length === 0) {
            // Show empty cart message
            const emptyCartMessage = document.createElement('div');
            emptyCartMessage.className = 'mini-cart-empty';
            emptyCartMessage.style.textAlign = 'center';
            emptyCartMessage.style.padding = '20px 0';
            emptyCartMessage.innerHTML = `
                <i class="fas fa-shopping-cart" style="font-size: 30px; color: #ddd; margin-bottom: 10px;"></i>
                <p style="margin-bottom: 15px;">Your cart is empty</p>
                <a href="products.html" class="btn btn-primary btn-sm" style="display: inline-block; padding: 8px 16px; background: linear-gradient(45deg, #d4af37, #f5cc59); color: white; border-radius: 4px; text-decoration: none;">Browse Products</a>
            `;
            miniCartItems.appendChild(emptyCartMessage);
        } else {
            // Add items to mini cart
            cart.forEach(item => {
                const miniCartItem = document.createElement('div');
                miniCartItem.className = 'mini-cart-item';
                miniCartItem.style.display = 'flex';
                miniCartItem.style.alignItems = 'center';
                miniCartItem.style.marginBottom = '15px';
                miniCartItem.style.padding = '10px';
                miniCartItem.style.borderBottom = '1px solid #eee';
                miniCartItem.innerHTML = `
                    <div class="mini-cart-item-img" style="width: 60px; height: 60px; margin-right: 10px;">
                        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 4px;">
                    </div>
                    <div class="mini-cart-item-details" style="flex: 1;">
                        <h4 style="margin: 0 0 5px; font-size: 14px;">${item.name}</h4>
                        <div class="mini-cart-item-price" style="font-weight: bold; color: #d4af37;">$${parseFloat(item.price).toLocaleString()}</div>
                        <div class="mini-cart-item-quantity" style="display: flex; align-items: center; margin-top: 5px;">
                            <button class="mini-cart-quantity-btn minus" data-id="${item.id}" style="width: 24px; height: 24px; border: 1px solid #ddd; background: none; cursor: pointer;">-</button>
                            <span style="margin: 0 8px;">${item.quantity}</span>
                            <button class="mini-cart-quantity-btn plus" data-id="${item.id}" style="width: 24px; height: 24px; border: 1px solid #ddd; background: none; cursor: pointer;">+</button>
                        </div>
                    </div>
                    <button class="mini-cart-item-remove" data-id="${item.id}" style="background: none; border: none; color: #999; cursor: pointer;"><i class="fas fa-trash"></i></button>
                `;
                miniCartItems.appendChild(miniCartItem);
            });
        }
        
        miniCart.appendChild(miniCartItems);
        
        // Create mini cart footer
        if (cart.length > 0) {
            const subtotal = cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
            
            const miniCartFooter = document.createElement('div');
            miniCartFooter.className = 'mini-cart-footer';
            miniCartFooter.style.marginTop = '15px';
            miniCartFooter.style.paddingTop = '15px';
            miniCartFooter.style.borderTop = '1px solid #eee';
            miniCartFooter.innerHTML = `
                <div class="mini-cart-subtotal" style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                    <span style="font-weight: bold;">Subtotal</span>
                    <span style="font-weight: bold; color: #d4af37;">$${subtotal.toLocaleString()}</span>
                </div>
                <a href="cart.html" class="btn btn-primary mini-cart-checkout" style="display: block; width: 100%; padding: 10px; background: linear-gradient(45deg, #d4af37, #f5cc59); color: white; text-align: center; border-radius: 4px; margin-bottom: 10px; text-decoration: none;">Checkout</a>
                <a href="cart.html" class="mini-cart-view-cart" style="display: block; text-align: center; color: #333; text-decoration: none;">View Cart</a>
            `;
            miniCart.appendChild(miniCartFooter);
        }
        
        // Add mini cart to the document
        document.body.appendChild(miniCart);
        
        // Add event listeners for mini cart interactions
        const closeButton = miniCart.querySelector('.mini-cart-close');
        if (closeButton) {
            closeButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('Close button clicked');
                // Animate out
                miniCart.style.right = '-350px';
                
                // Remove after animation
                setTimeout(() => {
                    if (miniCart.parentNode) {
                        miniCart.parentNode.removeChild(miniCart);
                    }
                }, 300);
            });
        }
        
        // Add quantity change handlers
        miniCart.querySelectorAll('.mini-cart-quantity-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const itemId = this.getAttribute('data-id');
                const isPlus = this.classList.contains('plus');
                
                updateCartItemQuantity(itemId, isPlus);
                
                // Recreate the mini cart to reflect changes
                createMiniCart();
            });
        });
        
        // Add remove item handlers
        miniCart.querySelectorAll('.mini-cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const itemId = this.getAttribute('data-id');
                removeCartItem(itemId);
                
                // Recreate the mini cart to reflect changes
                createMiniCart();
            });
        });
        
        // Prevent cart from closing when clicking inside it
        miniCart.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
    } catch (error) {
        console.error('Error creating mini cart:', error);
    }
}

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
