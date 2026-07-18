document.addEventListener('DOMContentLoaded', function() {

    // STARS
    const starsEl = document.getElementById('stars');
    starsEl.style.height = document.body.scrollHeight + 'px';
    const count = Math.max(120, Math.floor((window.innerWidth * document.body.scrollHeight) / 6000));
    for (let i = 0; i < count; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const size = Math.random() * 2.5 + 0.5;
      s.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        top:${Math.random()*100}%;
        --d:${2 + Math.random()*4}s;
        --delay:-${Math.random()*4}s;
        opacity:${Math.random()*0.8 + 0.1};
      `;
      if (Math.random() < 0.2) s.style.background = '#cc88ff';
      if (Math.random() < 0.1) s.style.background = '#ff6eb4';
      starsEl.appendChild(s);
    }

    // CLOCK (12-hour)
    function updateClock() {
      const now = new Date();
      let h = now.getHours();
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
      const m = String(now.getMinutes()).padStart(2, '0');
      const sec = String(now.getSeconds()).padStart(2, '0');
      const el = document.getElementById('clock');
      if (el) el.textContent = `${h}:${m}:${sec} ${ampm}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // VISITOR COUNT (via CounterAPI — shared across all visitors, no account needed)
    const visEl = document.getElementById('visitor-num');
    if (visEl) {
      fetch('https://api.counterapi.dev/v1/nisheri-ascar.is-a.dev/visitors/up')
        .then(r => r.json())
        .then(data => {
          visEl.textContent = String(data.count).padStart(6, '0');
        })
        .catch(() => {
          visEl.textContent = '??????';
        });
    }

    // GUESTBOOK
    window.signGuestbook = function() {
      const nameEl = document.querySelector('.guestbook-form input');
      const msgEl  = document.querySelector('.guestbook-form textarea');
      const name = (nameEl ? nameEl.value.trim() : '') || 'anon';
      const msg  = msgEl ? msgEl.value.trim() : '';
      if (!msg) return;
      const entry = document.createElement('div');
      entry.style.cssText = 'border:1px solid rgba(155,48,255,0.3); padding:4px 6px; background:rgba(60,0,90,0.4);';
      entry.style.cssText = 'border:1px solid rgba(155,48,255,0.3); padding:4px 6px; background:rgba(60,0,90,0.4);';
      // Sanitize input to prevent XSS
      const safeName = document.createTextNode('★' + name + ':');
      const nameSpan = document.createElement('span');
      nameSpan.style.color = 'var(--pink)';
      nameSpan.appendChild(safeName);
      const msgSpan = document.createElement('span');
      msgSpan.style.color = 'var(--text)';
      msgSpan.textContent = ' ' + msg;
      entry.appendChild(nameSpan);
      entry.appendChild(msgSpan);
      const gbEl = document.getElementById('gb-entries');
      if (gbEl) gbEl.prepend(entry);
      if (nameEl) nameEl.value = '';
      if (msgEl) msgEl.value = '';
    };

  });