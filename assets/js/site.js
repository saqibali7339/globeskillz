// Globe Skillz — tiny progressive-enhancement script (site works without it)
(function(){
  var nav=document.querySelector('.nav'),btn=document.querySelector('.menu-btn');
  if(btn){btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)})}
  document.querySelectorAll('.has-mega>button').forEach(function(b){
    b.addEventListener('click',function(e){var li=b.parentNode,o=li.classList.toggle('open');b.setAttribute('aria-expanded',o);e.stopPropagation()})
  });
  document.addEventListener('click',function(){document.querySelectorAll('.has-mega.open').forEach(function(li){li.classList.remove('open')})});
  // Video modal for GSC case videos
  var modal=document.querySelector('.vmodal');
  if(modal){
    var v=modal.querySelector('video');
    document.querySelectorAll('[data-video]').forEach(function(t){
      t.addEventListener('click',function(){v.src=t.getAttribute('data-video');modal.classList.add('open');v.play().catch(function(){})})
    });
    var close=function(){v.pause();v.removeAttribute('src');v.load();modal.classList.remove('open')};
    modal.querySelector('button').addEventListener('click',close);
    modal.addEventListener('click',function(e){if(e.target===modal)close()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }
  // Preselect the service dropdown from ?service=<slug> (pricing/service CTAs)
  (function(){var s=document.getElementById('f-svc');if(!s)return;var q=new URLSearchParams(location.search).get('service');if(!q)return;var map={'shopify-seo':'Shopify SEO Services','shopify-seo-audit':'Shopify SEO Audit','shopify-technical-seo':'Shopify Technical SEO','shopify-on-page-seo':'Collection & Product SEO','shopify-content-seo':'Shopify Content SEO','shopify-link-building':'Shopify Link Building','shopify-international-seo':'International Shopify SEO','shopify-ai-search-optimization':'AI Search Optimization','shopify-development':'Shopify Store Development','shopify-theme-customization':'Theme Customization & Liquid','shopify-speed-optimization':'Shopify Speed Optimization','shopify-migration':'Migration to Shopify (SEO-Safe)','shopify-maintenance-support':'Shopify Maintenance & Support'};var v=map[q];if(!v)return;for(var i=0;i<s.options.length;i++){if(s.options[i].value===v){s.selectedIndex=i;break;}}})();
  // Hero animation: desktop only (hero is two-column above 1080px). On mobile
  // nothing is injected, so the player script and the .lottie file are never
  // downloaded; CSS also hides the box at <=1080px (covers window resizes).
  (function(){var box=document.getElementById('heroLottie');if(!box)return;var mq=window.matchMedia('(min-width:1081px)'),done=false;
    function load(){if(done)return;done=true;var s=document.createElement('script');s.type='module';s.src='https://cdn.jsdelivr.net/npm/@dotlottie/player-component@latest/dist/dotlottie-player.mjs';document.head.appendChild(s);
      var p=document.createElement('dotlottie-player');p.setAttribute('src',box.getAttribute('data-src'));p.setAttribute('autoplay','');p.setAttribute('loop','');p.style.cssText='width:100%;height:100%;display:block';box.appendChild(p);}
    if(mq.matches)load();else if(mq.addEventListener)mq.addEventListener('change',function(e){if(e.matches)load();});})();
  // Contact form -> FormSubmit email to info@globeskillz.com (AJAX; native POST fallback)
  var f=document.getElementById('brief');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();var btn=f.querySelector('button[type=submit]'),old=btn.innerHTML;
    var d={Name:document.getElementById('f-name').value,Email:document.getElementById('f-email').value,Store:document.getElementById('f-url').value,Service:document.getElementById('f-svc').value,Budget:document.getElementById('f-budget').value,Markets:document.getElementById('f-market').value,Message:document.getElementById('f-msg').value,_subject:'New brief from globeskillz.com'};
    btn.disabled=true;btn.innerHTML='Sending\u2026';
    fetch('https://formsubmit.co/ajax/info@globeskillz.com',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)}).then(function(res){if(!res.ok)throw new Error('send failed');btn.innerHTML='\u2713 Sent \u2014 I\'ll reply within 24h';f.reset();}).catch(function(){btn.disabled=false;btn.innerHTML=old;var p=f.querySelector('.form-note');if(p)p.innerHTML='Could not send automatically. Please email your brief directly to <a href="mailto:info@globeskillz.com">info@globeskillz.com</a>.';});
  })}
})();
