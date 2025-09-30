/*---------------------------toggle icon bar ---------------------------*/

let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

/*---------------------------scroll section active link ---------------------------*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            if(id) {
                let activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if(activeLink) {
                    activeLink.classList.add('active');
                }
            }
        }
    });
    /*---------------------------sticky nav bar ---------------------------*/
    let header = document.querySelector('header');
    header.classList.toggle('sticky',window.scrollY > 100);

    /*---------------------------remove toggle icon and navbar ---------------------------*/
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');

};

/*------------------- scroll reveal js ----------------------*/
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal('.home-content, heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'buttom' });
ScrollReveal().reveal('.home-content h1, .about-img, h2', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/*------------------- typed js ----------------------*/
const typed = new Typed('.multiple-text',{
    strings: ['Computer Engineer', 'Web Developer', 'AI/ML enthusiast'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true,
});

/*------------------- open PDF file ----------------------*/
document.querySelector('.download-btn').addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default link behavior
    
    // Open PDF in a new tab
    window.open('assets/Dipesh_Singh_CV.pdf', '_blank');
});

/*------------------- read more functionality ----------------------*/
document.querySelector('.read-more-btn').addEventListener('click', function(e) {
    e.preventDefault();
    
    const moreContent = document.querySelector('.more-content');
    const btn = this;
    
    if (moreContent.style.display === 'none' || moreContent.style.display === '') {
        moreContent.style.display = 'block';
        btn.textContent = 'Read Less';
    } else {
        moreContent.style.display = 'none';
        btn.textContent = 'Read More';
    }
});

/*------------------- contact form functionality ----------------------*/
// Initialize EmailJS
(function() {
    emailjs.init("tLAaxgjefwO-EJcIA"); // Replace with your EmailJS public key
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('input[type="submit"]');
    const originalText = submitBtn.value;
    
    // Show loading state
    submitBtn.value = 'Sending...';
    submitBtn.disabled = true;
    
    // Send email using EmailJS
    emailjs.sendForm('service_vzo1sak', 'template_eayg7xq', this)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully! I\'ll get back to you soon.');
            document.getElementById('contact-form').reset();
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            alert('Failed to send message. Please try again or contact me directly.');
        })
        .finally(function() {
            // Reset button state
            submitBtn.value = originalText;
            submitBtn.disabled = false;
        });
});

/*------------------- copy to clipboard functionality ----------------------*/
document.querySelectorAll('.copy-item').forEach(item => {
    item.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-copy');
        const isEmail = textToCopy.includes('@');
        
        // Copy to clipboard
        copyToClipboard(textToCopy).then(() => {
            showCopyMessage(this, isEmail ? 'Email copied!' : 'Phone copied!');
        }).catch(() => {
            showCopyMessage(this, 'Failed to copy');
        });
    });
});

function copyToClipboard(text) {
    return new Promise((resolve, reject) => {
        if (navigator.clipboard && window.isSecureContext) {
            // Modern way
            navigator.clipboard.writeText(text).then(resolve).catch(reject);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.top = '0';
            textArea.style.left = '0';
            textArea.style.opacity = '0';
            
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                document.body.removeChild(textArea);
                if (successful) {
                    resolve();
                } else {
                    reject();
                }
            } catch (err) {
                document.body.removeChild(textArea);
                reject(err);
            }
        }
    });
}

function showCopyMessage(element, message) {
    // Add copied class for visual feedback
    element.classList.add('copied');
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'copy-tooltip';
    tooltip.textContent = message;
    
    element.appendChild(tooltip);
    
    // Show tooltip
    setTimeout(() => {
        tooltip.classList.add('show');
    }, 10);
    
    // Remove after desired duration
    setTimeout(() => {
        tooltip.classList.remove('show');
        setTimeout(() => {
            if (tooltip.parentElement) {
                tooltip.parentElement.removeChild(tooltip);
            }
            element.classList.remove('copied');
        }, 300);
    }, 1000); // Changed from 2000ms (2 seconds) to 1000ms (1 second)
}