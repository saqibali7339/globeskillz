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
  // Contact form -> WhatsApp prefill (no backend needed)
  var f=document.getElementById('brief');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();var d=new FormData(f),lines=['Hi Saqib, new project brief from globeskillz.com:'];
    d.forEach(function(val,key){if(val)lines.push(key+': '+val)});
    window.open('https://wa.me/923215454557?text='+encodeURIComponent(lines.join('\n')),'_blank','noopener');
  })}
})();
