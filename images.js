// Fotografías realistas de demostración para ModaConnect.
// URLs directas de images.unsplash.com para evitar redirecciones de /download.
const demoImages={
  b1:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
  b2:'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
  b3:'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=85',
  b4:'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85',
  b5:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85',
  b6:'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=1000&q=85',
  b7:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85',
  b8:'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=85',
  p1:'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85',
  p2:'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
  p3:'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=1000&q=85',
  p4:'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=85',
  p5:'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85',
  p6:'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1000&q=85',
  p7:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85',
  p8:'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=85',
  p9:'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=85',
  p10:'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=85'
};
const heroImage='https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=88';
function productImage(p){return demoImages[p.id]||''}
function imageMarkup(p,detail=false){const img=productImage(p);return img?`<img src="${img}" alt="${p.name}" ${detail?'':'loading="lazy"'} style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`:''}
renderProducts=function(){
 const list=products().filter(p=>(filter==='Todos'||p.cat===filter)&&(`${p.name} ${p.cat}`).toLowerCase().includes(query));
 $('#products').innerHTML=list.map(p=>`<article class="card"><div class="product-photo" onclick="openProduct('${p.id}')">${imageMarkup(p)}<div class="placeholder" style="display:none;align-items:center;justify-content:center;height:100%">${p.name}<br><small>Imagen no disponible</small></div>${p.tag?`<span class="tag">${p.tag}</span>`:''}<button class="choose">${p.gallery?'VER MUESTRARIO':'ELEGIR OPCIONES'}</button></div><div class="card-info"><div class="card-meta"><div><span class="cat">${p.cat}</span><h3>${p.name}</h3></div>${p.price?`<span class="price">${money(p.price)}</span>`:''}</div><div class="swatches">${p.colors.map(c=>`<span class="swatch" title="${c[0]}" style="background:${c[1]}"></span>`).join('')}<small>${p.colors.length} color${p.colors.length===1?'':'es'}</small></div></div></article>`).join('')||'<p>No encontramos productos.</p>';
};
openProduct=function(id){
 const p=products().find(x=>x.id===id);if(!p)return;const color=p.colors[0][0],sizes=sizesFor(p,color);
 $('#productDetail').innerHTML=`<div class="detail"><div class="detail-photo">${imageMarkup(p,true)}<div class="placeholder" style="display:none;align-items:center;justify-content:center;height:100%">${p.name}<br><small>Imagen no disponible</small></div></div><div class="detail-copy"><p class="eyebrow">${p.cat} · ${plan==='basic'?'PLAN BÁSICO':'PLAN PREMIUM'}</p><h2>${p.name}</h2>${p.price?`<p class="detail-price">${money(p.price)}</p>`:''}<p>${p.desc}</p><p class="option-title">COLOR: <b id="selectedColorLabel">${color}</b></p><div class="color-options">${p.colors.map((c,i)=>`<button class="option ${i===0?'active':''}" onclick="selectColor('${p.id}','${c[0]}',this)"><span class="swatch" style="display:inline-block;background:${c[1]};vertical-align:middle;margin-right:7px"></span>${c[0]}</button>`).join('')}</div>${p.gallery?'<div class="notice">Esta categoría es únicamente de exhibición. Las telas se muestran como muestrario y no se venden desde el catálogo.</div>':`<p class="option-title">TALLA</p><div id="sizeOptions" class="size-options">${sizeButtons(sizes)}</div><div class="notice">${plan==='premium'?'Disponibilidad controlada por variante de color y talla.':'La disponibilidad se confirma con la tienda.'}</div><button id="addDetail" class="add-detail" onclick="addSelected('${p.id}')">AGREGAR A LA BOLSA — ${money(p.price)}</button>`}</div></div>`;$('#productModal').classList.remove('hidden');
};
const hero=$('.hero-image');if(hero){hero.style.backgroundImage=`linear-gradient(90deg,rgba(20,18,15,.08),rgba(20,18,15,.20)),url('${heroImage}')`;hero.style.backgroundSize='cover';hero.style.backgroundPosition='center';const ph=hero.querySelector('.hero-placeholder');if(ph)ph.style.display='none';}
renderProducts();