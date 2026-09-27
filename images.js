// Fotografías demostrativas para la demo pública de ModaConnect.
// Se usan imágenes de Unsplash únicamente como contenido visual de muestra.
const demoImages={
  b1:'https://unsplash.com/photos/man-wearing-black-suit-jacket-6anudmpILw4/download?force=true&w=1000',
  b2:'https://unsplash.com/photos/woman-wearing-red-dress-LU4sEkmqqAI/download?force=true&w=1000',
  b3:'https://unsplash.com/photos/man-wearing-white-dress-shirt-and-black-necktie-NbtIDoFKGO8/download?force=true&w=1000',
  b4:'https://unsplash.com/photos/person-wearing-black-pants-7YVZYZeITc8/download?force=true&w=1000',
  b5:'https://unsplash.com/photos/brown-leather-handbag-on-white-surface-p8Drpg_duLw/download?force=true&w=1000',
  b6:'https://unsplash.com/photos/woman-wearing-white-long-sleeved-shirt-W7b3eDUb_2I/download?force=true&w=1000',
  b7:'https://unsplash.com/photos/person-wearing-white-sneakers-HGgsNCbH2Rs/download?force=true&w=1000',
  b8:'https://unsplash.com/photos/pair-of-brown-leather-dress-shoes-164_6wVEHfI/download?force=true&w=1000',
  p1:'https://unsplash.com/photos/a-woman-in-a-red-dress-posing-for-a-picture-Uxx2qBU7yVA/download?force=true&w=1000',
  p2:'https://unsplash.com/photos/man-in-black-suit-jacket-and-black-pants-9dI3g8owHiI/download?force=true&w=1000',
  p3:'https://unsplash.com/photos/man-wearing-brown-coat-WWesmHEgXDs/download?force=true&w=1000',
  p4:'https://unsplash.com/photos/man-wearing-white-dress-shirt-and-black-necktie-NbtIDoFKGO8/download?force=true&w=1000',
  p5:'https://unsplash.com/photos/silver-colored-cufflinks-on-white-surface-KgLtFCgfC28/download?force=true&w=1000',
  p6:'https://unsplash.com/photos/gray-and-black-plaid-textile-ZRns2R5azu0/download?force=true&w=1000',
  p7:'https://unsplash.com/photos/white-sneakers-XUaUn2NVAGM/download?force=true&w=1000',
  p8:'https://unsplash.com/photos/brown-leather-dress-shoes-on-brown-wooden-floor-qvWjGmoXg6M/download?force=true&w=1000',
  p9:'https://unsplash.com/photos/person-wearing-black-pants-7YVZYZeITc8/download?force=true&w=1000',
  p10:'https://unsplash.com/photos/brown-leather-belt-on-white-surface-cAtzHUz7Z8g/download?force=true&w=1000'
};

function productImage(p){return demoImages[p.id]||''}

renderProducts=function(){
  const list=products().filter(p=>(filter==='Todos'||p.cat===filter)&&(`${p.name} ${p.cat}`).toLowerCase().includes(query));
  $('#products').innerHTML=list.map(p=>`<article class="card"><div class="product-photo" onclick="openProduct('${p.id}')">${productImage(p)?`<img src="${productImage(p)}" alt="${p.name}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`:''}<div class="placeholder" style="${productImage(p)?'display:none':''}">${p.name}<br><small>Fotografía demostrativa</small></div>${p.tag?`<span class="tag">${p.tag}</span>`:''}<button class="choose">${p.gallery?'VER MUESTRARIO':'ELEGIR OPCIONES'}</button></div><div class="card-info"><div class="card-meta"><div><span class="cat">${p.cat}</span><h3>${p.name}</h3></div>${p.price?`<span class="price">${money(p.price)}</span>`:''}</div><div class="swatches">${p.colors.map(c=>`<span class="swatch" title="${c[0]}" style="background:${c[1]}"></span>`).join('')}<small>${p.colors.length} color${p.colors.length===1?'':'es'}</small></div></div></article>`).join('')||'<p>No encontramos productos.</p>';
};

openProduct=function(id){
  const p=products().find(x=>x.id===id);if(!p)return;
  const color=p.colors[0][0],sizes=sizesFor(p,color),img=productImage(p);
  $('#productDetail').innerHTML=`<div class="detail"><div class="detail-photo">${img?`<img src="${img}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">`:''}<div class="placeholder" style="${img?'display:none':''}">${p.name}<br><small>Imagen principal</small></div></div><div class="detail-copy"><p class="eyebrow">${p.cat} · ${plan==='basic'?'PLAN BÁSICO':'PLAN PREMIUM'}</p><h2>${p.name}</h2>${p.price?`<p class="detail-price">${money(p.price)}</p>`:''}<p>${p.desc}</p><p class="option-title">COLOR: <b id="selectedColorLabel">${color}</b></p><div class="color-options">${p.colors.map((c,i)=>`<button class="option ${i===0?'active':''}" onclick="selectColor('${p.id}','${c[0]}',this)"><span class="swatch" style="display:inline-block;background:${c[1]};vertical-align:middle;margin-right:7px"></span>${c[0]}</button>`).join('')}</div>${p.gallery?'<div class="notice">Esta categoría es únicamente de exhibición. Las telas se muestran como muestrario y no se venden desde el catálogo.</div>':`<p class="option-title">TALLA</p><div id="sizeOptions" class="size-options">${sizeButtons(sizes)}</div><div class="notice">${plan==='premium'?'Disponibilidad controlada por variante de color y talla.':'La disponibilidad se confirma con la tienda.'}</div><button id="addDetail" class="add-detail" onclick="addSelected('${p.id}')">AGREGAR A LA BOLSA — ${money(p.price)}</button>`}</div></div>`;
  $('#productModal').classList.remove('hidden');
};

const hero=$('.hero-image');
if(hero){
  hero.style.backgroundImage="linear-gradient(90deg,rgba(20,18,15,.08),rgba(20,18,15,.18)),url('https://unsplash.com/photos/clothing-rack-with-neutral-colored-dresses-and-a-cactus-Apw4z0D9xVE/download?force=true&w=1600')";
  hero.style.backgroundSize='cover';
  hero.style.backgroundPosition='center';
  const placeholder=hero.querySelector('.hero-placeholder');
  if(placeholder) placeholder.style.display='none';
}
renderProducts();