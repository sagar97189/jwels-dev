// Add scroll-to-top button
window.onload = function() {
    // Create the button element
    var scrollBtn = document.createElement('div');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.id = 'fixed-scroll-btn';
    
    // Style the button
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = '30px';
    scrollBtn.style.right = '30px';
    scrollBtn.style.width = '50px';
    scrollBtn.style.height = '50px';
    scrollBtn.style.backgroundColor = '#d4af37';
    scrollBtn.style.color = 'white';
    scrollBtn.style.borderRadius = '50%';
    scrollBtn.style.display = 'flex';
    scrollBtn.style.alignItems = 'center';
    scrollBtn.style.justifyContent = 'center';
    scrollBtn.style.cursor = 'pointer';
    scrollBtn.style.zIndex = '999999';
    scrollBtn.style.fontSize = '20px';
    scrollBtn.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    
    // Add click event
    scrollBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    // Add to document
    document.body.appendChild(scrollBtn);
}; 