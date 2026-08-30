const products=[
{id:1,name:"Vestido Aurora",cat:"Vestidos",price:899,emoji:"👗"},
{id:2,name:"Blusa Siena",cat:"Blusas",price:549,emoji:"👚"},
{id:3,name:"Pantalón Roma",cat:"Pantalones",price:699,emoji:"👖"},
{id:4,name:"Vestido Verona",cat:"Vestidos",price:949,emoji:"👗"},
{id:5,name:"Blusa Milano",cat:"Blusas",price:499,emoji:"👚"},
{id:6,name:"Pantalón Capri",cat:"Pantalones",price:749,emoji:"👖"},
{id:7,name:"Bolsa Siena",cat:"Accesorios",price:599,emoji:"👜"},
{id:8,name:"Lentes Roma",cat:"Accesorios",price:399,emoji:"🕶️"}
];
let cart=[];
const money=n=>n.toLocaleString("es-MX",{style:"currency",currency:"MXN"});
function renderProducts(){
 const cat=document.getElementById("categoryFilter").value;
 const list=cat==="Todos"?products:products.filter(p=>p.cat===cat);
 document.getElementById("products").innerHTML=list.map(p=>`<article class="card">
 <div class="photo">${p.emoji}</div><div class="info"><div class="category">${p.cat}</div>
 <h3>${p.name}</h3><div class="price">${money(p.price)}</div>
 <button class="add" onclick="add(${p.id})">Agregar al pedido</button></div></article>`).join("");
}
function add(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});renderCart();openCart()}
function change(id,d){const i=cart.findIndex(x=>x.id===id);if(i<0)return;cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);renderCart()}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-line"><div><b>${x.name}</b><br>${money(x.price)} × ${x.qty}</div><div class="qty"><button onclick="change(${x.id},-1)">−</button> ${x.qty} <button onclick="change(${x.id},1)">+</button></div></div>`).join(""):"<p>Tu carrito está vacío.</p>";
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartBtn").onclick=openCart;document.getElementById("closeCart").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;document.getElementById("categoryFilter").onchange=renderProducts;
document.getElementById("whatsappBtn").onclick=()=>{
 if(!cart.length)return alert("Agrega al menos una prenda.");
 const name=document.getElementById("customerName").value.trim()||"Cliente";
 const note=document.getElementById("customerNote").value.trim();
 const lines=cart.map(x=>`• ${x.name} x${x.qty} — ${money(x.price*x.qty)}`).join("\n");
 const total=money(cart.reduce((s,x)=>s+x.price*x.qty,0));
 const msg=`Hola, soy ${name}. Quiero realizar este pedido desde ModaConnect:\n\n${lines}\n\nTotal: ${total}${note?`\n\nIndicaciones: ${note}`:""}`;
 window.open("https://wa.me/5210000000000?text="+encodeURIComponent(msg),"_blank");
};
renderProducts();renderCart();
