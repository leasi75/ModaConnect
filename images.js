// Imágenes locales de demostración para ModaConnect.
// Se sirven desde el mismo proyecto para evitar dependencias externas.
const demoImages={
  b1:'assets/products/novedades.jpg',
  b2:'assets/products/vestidos.jpg',
  b3:'assets/products/camisas.jpg',
  b4:'assets/products/pantalones.jpg',
  b5:'assets/products/bolsas.jpg',
  b6:'assets/products/camisas.jpg',
  b7:'assets/products/calzado.jpg',
  b8:'assets/products/calzado.jpg',
  p1:'assets/products/vestidos.jpg',
  p2:'assets/products/trajes.jpg',
  p3:'assets/products/sacos.jpg',
  p4:'assets/products/camisas.jpg',
  p5:'assets/products/accesorios.jpg',
  p6:'assets/products/telas.jpg',
  p7:'assets/products/calzado.jpg',
  p8:'assets/products/calzado.jpg',
  p9:'assets/products/pantalones.jpg',
  p10:'assets/products/accesorios.jpg'
};
const heroImage='assets/products/hero.jpg';
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