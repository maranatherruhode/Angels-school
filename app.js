const $$=s=>[...document.querySelectorAll(s)],esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const get=async f=>{try{return await(await fetch('/content/'+f+'.json')).json()}catch(e){return{}}};
const paras=t=>String(t||'').split(/\n\s*\n/).map(p=>'<p>'+esc(p).replace(/\n/g,'<br>')+'</p>').join('');
(async()=>{
const [s,p,b,n,g]=await Promise.all(['settings','pages','boarding','news','gallery'].map(get)),D={s,p,b};
const wa=(s.whatsapp||'').replace(/\D/g,'').replace(/^0/,'263');
const L={tel:'tel:'+(s.phone||'').replace(/[^\d+]/g,''),wa:wa?'https://wa.me/'+wa:'',mail:s.email?'mailto:'+s.email:'',fb:s.facebook,map:s.maps_link,gbp:s.google_business,fees:s.fees_pdf};
$$('[data-t]').forEach(e=>{const[k,f]=e.dataset.t.split('.');const v=D[k]?.[f];if(v)e.textContent=v});
$$('[data-m]').forEach(e=>{const[k,f]=e.dataset.m.split('.');e.innerHTML=paras(D[k]?.[f])});
$$('[data-l]').forEach(e=>{const[k,f]=e.dataset.l.split('.');e.innerHTML=(D[k]?.[f]||[]).map(i=>'<li>'+esc(i)+'</li>').join('')});
$$('[data-a]').forEach(e=>{const h=L[e.dataset.a];if(h)e.href=h;else if(e.dataset.a!=='tel'&&e.dataset.a!=='wa')e.style.display='none'});
const news=(n.items||[]).slice().sort((a,c)=>String(c.date).localeCompare(String(a.date)));
const card=i=>'<article class="news"><h3>'+esc(i.title)+'</h3><small>'+esc(String(i.date).slice(0,10))+'</small>'+(i.photo?'<p><img src="'+esc(i.photo)+'" alt="'+esc(i.title)+'"></p>':'')+paras(i.story)+'</article>';
const nl=document.getElementById('news-list');if(nl)nl.innerHTML=news.map(card).join('')||'<p>No news yet.</p>';
const nh=document.getElementById('news-home');if(nh)nh.innerHTML=news.slice(0,2).map(card).join('');
const gl=document.getElementById('gallery-list');if(gl)gl.innerHTML=(g.items||[]).map(i=>'<figure><img loading="lazy" src="'+esc(i.photo)+'" alt="'+esc(i.caption)+'"><figcaption>'+esc(i.caption)+'</figcaption></figure>').join('')||'<p>Photos coming soon.</p>';
})();
if(window.netlifyIdentity)netlifyIdentity.on('init',u=>{if(!u)netlifyIdentity.on('login',()=>location.href='/admin/')});
