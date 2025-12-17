// js/form.js
// Handles contact form submission to Formspree with graceful local fallback (demo).

document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const statusDiv = document.getElementById('formStatus');

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const formData = new FormData(form);
    statusDiv.hidden = false;
    statusDiv.textContent = 'Sending...';

    try {
      // Use fetch to Formspree endpoint provided in form action attribute
      const action = form.getAttribute('action');
      if(action && action.includes('formspree.io')){
        const res = await fetch(action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: formData
        });
        if(res.ok){
          statusDiv.textContent = 'Thanks! Your message was sent successfully.';
          form.reset();
        } else {
          const data = await res.json();
          statusDiv.textContent = data.error || 'Submission failed. Please try again later.';
        }
      } else {
        // Local fallback (demo): save to localStorage
        const entry = {};
        formData.forEach((v,k)=>entry[k]=v);
        const saved = JSON.parse(localStorage.getItem('jd-contact-messages') || '[]');
        saved.push({ ...entry, time: new Date().toISOString() });
        localStorage.setItem('jd-contact-messages', JSON.stringify(saved));
        statusDiv.textContent = 'Message saved locally (demo). Replace action with Formspree endpoint to enable email sending.';
        form.reset();
      }
    } catch (err) {
      console.error(err);
      statusDiv.textContent = 'An error occurred. Message not sent.';
    }

    setTimeout(()=>{ statusDiv.hidden = true; }, 5000);
  });
});
