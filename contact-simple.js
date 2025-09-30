/*------------------- Simple mailto contact form ----------------------*/
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const phone = formData.get('user_phone');
    const subject = formData.get('email_subject');
    const message = formData.get('message');
    
    const emailBody = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:your-email@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    
    window.location.href = mailtoLink;
});