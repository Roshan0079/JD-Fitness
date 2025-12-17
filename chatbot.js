// js/chatbot.js
// Lightweight local demo chatbot with keyword responses.
// Provides a floating chat button that opens a small chat panel.
// Replace with real API by setting up a serverless endpoint (instructions in README).

(function(){
  const root = document.getElementById('chatbot-root');
  if(!root) return;

  // Create elements
  const button = document.createElement('button');
  button.className = 'chatbot-button';
  button.setAttribute('aria-label','Open chat');
  button.innerHTML = '💬';

  const panel = document.createElement('div');
  panel.className = 'chatbot-panel';
  panel.setAttribute('role','dialog');
  panel.setAttribute('aria-hidden','true');
  panel.innerHTML = `
    <div class="chat-header"><strong>JD Fitness Help</strong><button class="close-chat" aria-label="Close chat">&times;</button></div>
    <div class="chat-messages" aria-live="polite" role="log"></div>
    <form class="chat-form" aria-label="Chat form">
      <input type="text" aria-label="Type your message" placeholder="Ask about pricing, join, timings..." required>
      <button type="submit">Send</button>
    </form>
  `;

  // Styles (simple, inline to keep self-contained)
  const style = document.createElement('style');
  style.textContent = `
    #chatbot-root .chatbot-button{width:56px;height:56px;border-radius:50%;background:var(--color-primary);color:#fff;border:none;box-shadow:0 8px 20px rgba(0,0,0,0.12);cursor:pointer;font-size:24px}
    #chatbot-root .chatbot-panel{width:320px;max-width:90vw;background:#fff;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.12);overflow:hidden;margin-bottom:0.5rem;display:none;flex-direction:column}
    #chatbot-root .chat-header{display:flex;justify-content:space-between;align-items:center;padding:0.5rem 0.75rem;border-bottom:1px solid #eee}
    #chatbot-root .chat-messages{padding:0.75rem;height:200px;overflow:auto}
    #chatbot-root .chat-messages .msg{margin-bottom:0.6rem}
    #chatbot-root .chat-messages .bot{color:#111}
    #chatbot-root .chat-messages .user{text-align:right;color:var(--muted)}
    #chatbot-root .chat-form{display:flex;border-top:1px solid #eee}
    #chatbot-root .chat-form input{flex:1;border:0;padding:0.6rem}
    #chatbot-root .chat-form button{border:0;padding:0 1rem;background:var(--color-primary);color:#fff}
    #chatbot-root .close-chat{background:none;border:0;font-size:20px;cursor:pointer}
  `;
  document.head.appendChild(style);

  root.appendChild(panel);
  root.appendChild(button);

  const messages = panel.querySelector('.chat-messages');
  const form = panel.querySelector('.chat-form');
  const input = form.querySelector('input');
  const closeBtn = panel.querySelector('.close-chat');

  function appendMessage(text, who='bot'){
    const el = document.createElement('div');
    el.className = 'msg ' + (who==='bot' ? 'bot' : 'user');
    el.textContent = text;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  // Keyword-based responses
  function getBotReply(text){
    const t = text.toLowerCase();
    if(/^(hi|hello|hey)\b/.test(t)) return "Hi! Welcome to JD Fitness 💪 How can I help you today? (Try: pricing, join, timings)";
    if(t.includes('pricing') || t.includes('price')) return "We have Basic ₹999/mo, Standard ₹1,799/mo (recommended), and Premium ₹2,999/mo. See the Pricing page for details.";
    if(t.includes('join') || t.includes('membership')) return "We recommend the Standard plan for beginner-to-intermediate. Want a quick trial? Visit the Pricing page or message us your number.";
    if(t.includes('timing') || t.includes('schedule') || t.includes('open')) return "We open 6am–10pm Mon–Sat. Sunday: 8am–5pm.";
    return "Sorry, I didn't catch that. Ask about 'pricing', 'join', or 'schedule'.";
  }

  // Toggle panel
  function openPanel(){
    panel.style.display='flex';
    panel.setAttribute('aria-hidden','false');
    input.focus();
  }
  function closePanel(){
    panel.style.display='none';
    panel.setAttribute('aria-hidden','true');
    button.focus();
  }

  button.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const val = input.value.trim();
    if(!val) return;
    appendMessage(val, 'user');
    input.value='';
    // simulate thinking
    appendMessage('...', 'bot');
    setTimeout(()=>{
      // remove the '...' placeholder
      const dots = messages.querySelectorAll('.bot');
      if(dots.length) dots[dots.length-1].textContent = getBotReply(val);
    }, 600);
  });

  // Accessibility: close on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      closePanel();
    }
  });

  // Provide commented example for replacing with OpenAI (do not enable here)
  /* 
    // Example: Replace getBotReply with API call
    async function queryOpenAI(prompt){
      const res = await fetch('/.netlify/functions/openai-proxy', { // your serverless proxy
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({prompt})
      });
      const data = await res.json();
      return data.response; // adjust based on your API wrapper
    }
  */
})();
