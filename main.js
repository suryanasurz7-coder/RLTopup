// ===================== KONFIGURASI =====================
const NOMOR_WHATSAPP_ADMIN = '6285767809692';

const DATA_GAMES = [
  {
    id:'mlbb',
    name:'Mobile Legends',
    image:'https://i.ibb.co/fH0s4Vt/mlbb.jpg',
    products:[
      {name:'86 Diamonds',price:'Rp 20.000'},
      {name:'172 Diamonds',price:'Rp 38.000'},
      {name:'257 Diamonds',price:'Rp 56.000'},
      {name:'514 Diamonds',price:'Rp 110.000'}
    ]
  },
  {
    id:'ff',
    name:'Free Fire',
    image:'https://i.ibb.co/0mRVgwV/ff.jpg',
    products:[
      {name:'70 Diamonds',price:'Rp 10.000'},
      {name:'140 Diamonds',price:'Rp 19.000'},
      {name:'355 Diamonds',price:'Rp 48.000'},
      {name:'720 Diamonds',price:'Rp 95.000'}
    ]
  }
];

const DATA_PAYMENTS = [
  {id:'dana',name:'Dana'},
  {id:'gopay',name:'GoPay'},
  {id:'ovo',name:'OVO'},
  {id:'qris',name:'QRIS'},
  {id:'bank',name:'Bank Transfer'}
];

const SLIDER_IMAGES = [
  'https://i.ibb.co/TK1hB8F/slide1.jpg',
  'https://i.ibb.co/J5STsFd/slide2.jpg',
  'https://i.ibb.co/7bYhvC9/slide3.jpg'
];

// ===================== LOGIKA =====================
let selectedProduct=null,selectedPayment=null,currentSlide=0,sliderInterval;

function renderSlider(){
  const s=document.getElementById('imageSlider'); s.innerHTML='';
  SLIDER_IMAGES.forEach(url=>{
    const d=document.createElement('div');d.className='slide';
    d.innerHTML=`<img src="${url}" alt="Promo">`; s.appendChild(d);
  });
  updateSlide(); startAutoSlide();
}
function updateSlide(){document.getElementById('imageSlider').style.transform=`translateX(-${currentSlide*100}%)`}
function nextSlide(){currentSlide=(currentSlide+1)%SLIDER_IMAGES.length;updateSlide()}
function prevSlide(){currentSlide=(currentSlide-1+SLIDER_IMAGES.length)%SLIDER_IMAGES.length;updateSlide()}
function startAutoSlide(){stopAutoSlide();sliderInterval=setInterval(()=>nextSlide(),5000)}
function stopAutoSlide(){if(sliderInterval)clearInterval(sliderInterval)}

function renderGames(){
  const grid=document.getElementById('gameList'); grid.innerHTML='';
  DATA_GAMES.forEach(g=>{
    const card=document.createElement('div');
    card.className='game-card';
    card.innerHTML=`<img src="${g.image}" alt="${g.name}" width="60" height="60"><h3>${g.name}</h3><small>Klik untuk top up</small>`;
    card.onclick=()=>showProducts(g);
    grid.appendChild(card);
  });
}

function showProducts(item){
  document.getElementById('gameSelection').style.display='none';
  const section=document.getElementById('productSection'); section.style.display='block';
  document.getElementById('sliderWrap').style.display='none';
  section.innerHTML=`
    <div class="panel">
      <div class="top-row">
        <div class="selected-game">
          <img src="${item.image}" alt="${item.name}">
          <h2>${item.name}</h2>
        </div>
        <button class="back-btn" onclick="backHome()">← Kembali</button>
      </div>
      <div class="order-wrap">
        <div>
          <div class="field"><label>ID Player / Email</label><input id="userId" placeholder="Masukkan ID Game"></div>
          <div class="field"><label>Server ID (opsional)</label><input id="serverId" placeholder="Masukkan Server (opsional)"></div>
          <div class="field"><label>Pilih Produk</label>
            <div class="products-grid" id="productList">
              ${item.products.map((p,i)=>`<div class="product-card" onclick="selectProduct(this,${i},'${item.id}')"><div class='title'>${p.name}</div><div class='price'>${p.price}</div></div>`).join('')}
            </div>
          </div>
          <div class="field"><label>Metode Pembayaran</label>
            <div class="payment-grid" id="paymentList">
              ${DATA_PAYMENTS.map((p,i)=>`<div class="payment-card" onclick="selectPayment(this,${i})">${p.name}</div>`).join('')}
            </div>
          </div>
          <button class="btn-primary" onclick="orderNow('${item.name}')">Bayar via WhatsApp</button>
        </div>
        <div>
          <div class="panel" style="padding:12px">
            <h3 style="margin:0 0 8px">Info Pesanan</h3>
            <p id="orderPreview" style="color:var(--muted);font-size:14px">Belum ada produk dipilih.</p>
          </div>
        </div>
      </div>
    </div>`;
}

function selectProduct(el,i,id){
  document.querySelectorAll('#productList .product-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); const item=DATA_GAMES.find(x=>x.id===id);
  selectedProduct=item.products[i]; updatePreview();
}
function selectPayment(el,i){
  document.querySelectorAll('#paymentList .payment-card').forEach(c=>c.classList.remove('active'));
  el.classList.add('active'); selectedPayment=DATA_PAYMENTS[i]; updatePreview();
}
function updatePreview(){
  const id=document.getElementById('userId')?.value.trim()||'',server=document.getElementById('serverId')?.value.trim()||'';
  const p=document.getElementById('orderPreview');
  let text='';
  if(selectedProduct) text+=`Produk: ${selectedProduct.name}\nHarga: ${selectedProduct.price}\n`;
  if(selectedPayment) text+=`Metode: ${selectedPayment.name}\n`;
  if(id) text+=`ID: ${id}\n`;
  if(server) text+=`Server: ${server}\n`;
  p.textContent=text||'Belum ada produk dipilih.';
}
function orderNow(itemName){
  const id=document.getElementById('userId').value.trim();
  if(!id) return alert('Masukkan ID Player dulu.');
  if(!selectedProduct) return alert('Pilih produk dulu.');
  if(!selectedPayment) return alert('Pilih metode pembayaran dulu.');
  const server=document.getElementById('serverId').value.trim();
  const msg=`Halo kak, saya ingin top up:%0A%0AGame: ${encodeURIComponent(itemName)}%0AID: ${encodeURIComponent(id)}${server?`%0AServer: ${encodeURIComponent(server)}`:''}%0AProduk: ${encodeURIComponent(selectedProduct.name)}%0AHarga: ${encodeURIComponent(selectedProduct.price)}%0AMetode: ${encodeURIComponent(selectedPayment.name)}`;
  window.open(`https://wa.me/${NOMOR_WHATSAPP_ADMIN}?text=${msg}`,'_blank');
}
function backHome(){
  document.getElementById('productSection').style.display='none';
  document.getElementById('gameSelection').style.display='block';
  document.getElementById('sliderWrap').style.display='block';
  renderGames();
}

document.addEventListener('DOMContentLoaded',()=>{