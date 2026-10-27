// v2 shared behaviour — added after usability testing
(function(){
  // 1. Scroll-spy: highlight the nav link for the section in view
  function spy(selector){
    var links=[].slice.call(document.querySelectorAll(selector));
    if(!links.length||!('IntersectionObserver' in window))return;
    var map={};
    links.forEach(function(a){var id=(a.getAttribute('href')||'').split('#')[1];var el=id&&document.getElementById(id);if(el)map[id]={a:a,el:el};});
    var ids=Object.keys(map);
    function update(){
      var current=null,line=window.innerHeight*0.35;
      ids.forEach(function(id){var r=map[id].el.getBoundingClientRect();if(r.top<=line&&r.bottom>line)current=id;});
      if(window.innerHeight+window.scrollY>=document.body.scrollHeight-4)current=ids[ids.length-1];
      ids.forEach(function(id){var a=map[id].a;if(id===current){if(!a.hasAttribute('aria-current')){a.setAttribute('aria-current','location');var row=a.parentElement;if(row&&row.scrollWidth>row.clientWidth){row.scrollTo({left:a.offsetLeft-row.clientWidth/2+a.offsetWidth/2,behavior:'smooth'});}}}else a.removeAttribute('aria-current');});
    }
    window.addEventListener('scroll',update,{passive:true});update();
  }
  spy('[data-spy] a[href*="#"]');

  // 2. Copy-email buttons with visible + announced confirmation
  [].forEach.call(document.querySelectorAll('[data-copy]'),function(btn){
    var status=document.getElementById(btn.getAttribute('aria-describedby'));
    btn.addEventListener('click',function(){
      var text=btn.getAttribute('data-copy');
      function done(){btn.textContent='Copied ✓';if(status)status.textContent='Email address copied to clipboard';setTimeout(function(){btn.textContent='Copy email';},2200);}
      if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(text).then(done,fallback);}else fallback();
      function fallback(){var t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.appendChild(t);t.select();try{document.execCommand('copy');}catch(e){}document.body.removeChild(t);done();}
    });
  });
})();
