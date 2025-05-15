/**
 * Luxury Jewelry Store - Payment Gateway Module
 * Handles various payment methods including UPI
 */

class PaymentGateway {
    constructor() {
        this.apiEndpoint = 'api/verify-upi-payment.php';
        this.upiId = '8920869673@hdfc';
        this.merchantName = 'Luxury Jewels Pvt. Ltd';
        this.currency = 'INR';
        this.cartItems = this.getCartItems();
        
        // Initialize immediately if we're on the checkout page
        if (window.location.pathname.includes('checkout')) {
            this.init();
        } else {
            // Add event listener for checkout button if we're not on checkout page
            document.addEventListener('DOMContentLoaded', () => {
                const checkoutBtn = document.querySelector('.checkout');
                if (checkoutBtn) {
                    checkoutBtn.addEventListener('click', () => {
                        window.location.href = 'checkout.html';
                    });
                }
            });
        }
    }

    init() {
        console.log('Initializing payment gateway...');
        
        // Listen for payment method selection
        const paymentMethods = document.querySelectorAll('.payment-method-option');
        if (paymentMethods.length > 0) {
            paymentMethods.forEach(method => {
                method.addEventListener('click', (e) => {
                    this.selectPaymentMethod(e.currentTarget.dataset.method);
                });
            });
        }

        // Initialize UPI payment button if present
        const payUpiBtn = document.querySelector('.pay-upi-btn');
        if (payUpiBtn) {
            payUpiBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.processUpiPayment();
            });
        }

        // Initialize dynamic QR code generation
        this.setupDynamicQrCode();
        
        // Update cart total and order summary
        this.updateOrderSummary();
        
        // Set UPI ID in all locations
        this.updateUpiIdDisplay();
        
        // Initialize UPI deep link button
        this.initUpiDeepLink();
    }
    
    // Initialize UPI deep link button
    initUpiDeepLink() {
        const openUpiAppBtn = document.querySelector('.open-upi-app');
        if (openUpiAppBtn) {
            openUpiAppBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get current transaction ID and amount
                const transactionId = document.getElementById('upi-transaction-id').value || this.generateTransactionId();
                const amountInput = document.getElementById('upi-amount');
                const amount = amountInput ? amountInput.value : this.calculateCartTotal();
                
                // Generate UPI payment link
                const upiLink = this.getUpiPaymentString(amount, transactionId);
                
                // Open UPI app
                window.location.href = upiLink;
            });
        }
    }
    
    // Update UPI ID in all locations on the page
    updateUpiIdDisplay() {
        const upiIdElements = document.querySelectorAll('#upiId, .upi-id, #upi-id');
        upiIdElements.forEach(element => {
            if (element.tagName === 'INPUT') {
                element.value = this.upiId;
            } else if (element.classList.contains('upi-id')) {
                element.textContent = `UPI ID: ${this.upiId}`;
            } else {
                element.textContent = this.upiId;
            }
        });
        
        // Also update the copy input field
        const upiIdInput = document.getElementById('upiIdInput');
        if (upiIdInput) {
            upiIdInput.value = this.upiId;
        }
    }
    
    // Get cart items from localStorage
    getCartItems() {
        try {
            return JSON.parse(localStorage.getItem('luxuryJewelsCart')) || [];
        } catch (e) {
            console.error('Error parsing cart items:', e);
            return [];
        }
    }
    
    // Calculate cart total
    calculateCartTotal() {
        return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Update order summary on checkout page
    updateOrderSummary() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;
        
        // Refresh cart items from localStorage
        this.cartItems = this.getCartItems();
        
        // Clear current items
        cartItemsContainer.innerHTML = '';
        
        if (this.cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            
            // Show message to add items to cart
            const checkoutSection = document.querySelector('.checkout-section .container .row');
            if (checkoutSection) {
                checkoutSection.innerHTML = `
                    <div class="col-12 text-center my-5">
                        <div class="alert alert-info">
                            <h4><i class="fas fa-shopping-cart me-2"></i> Your cart is empty</h4>
                            <p>Add some products to your cart before proceeding to checkout.</p>
                            <a href="index.html" class="btn btn-primary mt-3">Continue Shopping</a>
                        </div>
                    </div>
                `;
            }
            return;
        }
        
        // Calculate cart totals
        let subtotal = 0;
        
        // Add each item to the summary
        this.cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h5>${item.name}</h5>
                    <p class="cart-item-price">₹${item.price.toLocaleString()}</p>
                    <div class="cart-item-quantity">Qty: ${item.quantity}</div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Update totals
        const subtotalElement = document.querySelector('.total-row:nth-child(1) span:last-child');
        const grandTotalElement = document.querySelector('.grand-total span:last-child');
        const modalAmountElement = document.getElementById('modal-amount');
        const upiAmountInput = document.getElementById('upi-amount');
        
        if (subtotalElement) subtotalElement.textContent = `₹${subtotal.toLocaleString()}`;
        if (grandTotalElement) grandTotalElement.textContent = `₹${subtotal.toLocaleString()}`;
        if (modalAmountElement) modalAmountElement.textContent = subtotal.toLocaleString();
        if (upiAmountInput) upiAmountInput.value = subtotal;
        
        // Generate a transaction ID for this order
        const transactionIdInput = document.getElementById('upi-transaction-id');
        if (transactionIdInput) {
            transactionIdInput.value = this.generateTransactionId();
        }
    }

    // Method to select payment option
    selectPaymentMethod(method) {
        console.log('Selected payment method:', method);
        
        // Show the appropriate payment form
        const paymentForms = document.querySelectorAll('.payment-form');
        paymentForms.forEach(form => {
            form.style.display = 'none';
        });

        const selectedForm = document.querySelector(`.payment-form[data-method="${method}"]`);
        if (selectedForm) {
            selectedForm.style.display = 'block';
        }

        // Highlight the selected payment method
        const paymentMethods = document.querySelectorAll('.payment-method-option');
        paymentMethods.forEach(methodEl => {
            methodEl.classList.remove('active');
        });

        const selectedMethod = document.querySelector(`.payment-method-option[data-method="${method}"]`);
        if (selectedMethod) {
            selectedMethod.classList.add('active');
        }

        // If UPI selected, generate new QR code
        if (method === 'upi') {
            this.generateUpiQrCode();
        }
    }

    // Setup dynamic QR code generation
    setupDynamicQrCode() {
        const amountInput = document.getElementById('upi-amount');
        if (amountInput) {
            amountInput.addEventListener('change', () => {
                this.generateUpiQrCode();
                
                // Also update the modal amount display
                const modalAmountElement = document.getElementById('modal-amount');
                if (modalAmountElement) {
                    modalAmountElement.textContent = parseInt(amountInput.value).toLocaleString();
                }
            });
        }
    }

    // Generate UPI QR code based on amount
    generateUpiQrCode(amount = '') {
        console.log('Generating UPI QR code...');
        
        const amountInput = document.getElementById('upi-amount');
        if (amountInput) {
            amount = amountInput.value || '';
        }

        const transactionId = this.generateTransactionId();
        const qrData = this.getUpiPaymentString(amount, transactionId);
        
        // Log the UPI data for debugging
        console.log('Generated UPI payment data:', qrData);
        
        // Update transaction ID in the form
        const transactionIdInput = document.getElementById('upi-transaction-id');
        if (transactionIdInput) {
            transactionIdInput.value = transactionId;
        }
        
        // Update QR code using QR server API
        const qrCodeImage = document.querySelector('.qr-code-container img');
        if (qrCodeImage) {
            // In a real implementation, update the QR code image
            qrCodeImage.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=250x250`;
            
            // Log the URL for debugging
            console.log('QR Code URL:', qrCodeImage.src);
            
            // Update mobile payment button href
            const openUpiAppBtn = document.querySelector('.open-upi-app');
            if (openUpiAppBtn) {
                openUpiAppBtn.href = qrData;
            }
        }
    }

    // Build UPI payment string for QR code
    getUpiPaymentString(amount, transactionId) {
        const upiData = {
            pa: this.upiId, // payee address
            pn: this.merchantName, // payee name
            tn: `Jewelry Purchase #${transactionId}`, // transaction note
            am: amount, // amount
            cu: this.currency, // currency
            tr: transactionId // transaction reference
        };
        
        let upiString = 'upi://pay?';
        for (const [key, value] of Object.entries(upiData)) {
            if (value) {
                upiString += `${key}=${encodeURIComponent(value)}&`;
            }
        }
        
        return upiString.slice(0, -1); // Remove trailing &
    }

    // Process UPI payment
    processUpiPayment() {
        console.log('Processing UPI payment...');
        
        const amountInput = document.getElementById('upi-amount');
        const transactionIdInput = document.getElementById('upi-transaction-id');
        
        if (!amountInput || !transactionIdInput) {
            this.showPaymentError('Missing required elements for payment processing');
            return;
        }
        
        const amount = amountInput.value;
        const transactionId = transactionIdInput.value || this.generateTransactionId();
        
        if (!amount) {
            this.showPaymentError('Please enter an amount');
            return;
        }
        
        // Show loading indicator
        this.showPaymentLoading(true);
        
        // Verify payment with the server
        this.verifyUpiPayment(transactionId, amount)
            .then(response => {
                this.showPaymentLoading(false);
                
                if (response.success) {
                    this.showPaymentSuccess(response);
                    
                    // Clear cart after successful payment
                    localStorage.setItem('luxuryJewelsCart', JSON.stringify([]));
                    this.cartItems = [];
                } else {
                    this.showPaymentError(response.message || 'Payment verification failed');
                }
            })
            .catch(error => {
                this.showPaymentLoading(false);
                this.showPaymentError('An error occurred during payment processing');
                console.error('Payment error:', error);
            });
    }

    // Verify UPI payment with the server
    verifyUpiPayment(transactionId, amount) {
        console.log('Verifying UPI payment:', { transactionId, amount });
        
        const paymentData = {
            transactionId: transactionId,
            upiId: this.upiId,
            amount: amount,
            timestamp: Math.floor(Date.now() / 1000)
        };
        
        return fetch(this.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(paymentData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
    }

    // Helper to generate transaction ID
    generateTransactionId() {
        return 'TXN' + Date.now() + Math.floor(Math.random() * 1000);
    }

    // UI Helpers
    showPaymentLoading(isLoading) {
        const loadingIndicator = document.querySelector('.payment-loading');
        if (loadingIndicator) {
            loadingIndicator.style.display = isLoading ? 'flex' : 'none';
        }
    }

    showPaymentSuccess(response) {
        console.log('Payment successful:', response);
        
        const successElement = document.querySelector('.payment-success');
        if (successElement) {
            const transactionIdEl = successElement.querySelector('.transaction-id');
            if (transactionIdEl) {
                transactionIdEl.textContent = response.transactionId;
            }
            
            successElement.style.display = 'block';
            
            // Hide payment form
            const paymentForm = document.querySelector('.payment-form[data-method="upi"]');
            if (paymentForm) {
                paymentForm.style.display = 'none';
            }
            
            // Show order confirmation message
            const checkoutSection = document.querySelector('.checkout-section .container .row');
            if (checkoutSection) {
                const orderConfirmation = document.createElement('div');
                orderConfirmation.className = 'col-12 mt-4';
                orderConfirmation.innerHTML = `
                    <div class="alert alert-success text-center">
                        <h4><i class="fas fa-check-circle me-2"></i> Order Placed Successfully!</h4>
                        <p>Thank you for your purchase. Your order has been received and is being processed.</p>
                        <p>Transaction ID: <strong>${response.transactionId}</strong></p>
                        <div class="mt-4">
                            <a href="index.html" class="btn btn-primary">Continue Shopping</a>
                        </div>
                    </div>
                `;
                
                // Replace checkout content with confirmation
                checkoutSection.innerHTML = '';
                checkoutSection.appendChild(orderConfirmation);
            }
        }
    }

    showPaymentError(message) {
        console.error('Payment error:', message);
        
        const errorElement = document.querySelector('.payment-error');
        if (errorElement) {
            const errorMessageEl = errorElement.querySelector('.error-message');
            if (errorMessageEl) {
                errorMessageEl.textContent = message;
            }
            
            errorElement.style.display = 'block';
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                errorElement.style.display = 'none';
            }, 5000);
        }
    }
}

// Initialize payment gateway when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing payment gateway...');
    window.paymentGateway = new PaymentGateway();
    
    // Initialize UPI copy function
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
}); 