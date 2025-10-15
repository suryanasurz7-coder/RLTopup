// ===== KONFIGURASI =====
const NOMOR_WHATSAPP_ADMIN = '6285767809692';
const DATA_GAMES = [
  { id:'mlbb', name:'Mobile Legends', image:'https://i.ibb.co/fH0s4Vt/mlbb.jpg', products:[
    {name:'86 Diamonds',price:'Rp 20.000'},
    {name:'514 Diamonds',price:'Rp 110.000'}
  ]},
  { id:'ff', name:'Free Fire', image:'https://i.ibb.co/0mRVgwV/ff.jpg', products:[
    {name:'140 Diamonds',price:'Rp 19.000'},
    {name:'720 Diamonds',price:'Rp 95.000'}
  ]}
];
const DATA_PAYMENTS = [
  {id:'dana',name:'Dana'},
  {id:'gopay',name:'GoPay'},
  {id:'ovo',name:'OVO'},
  {id:'qris',name:'QRIS'}
];
const SLIDER_IMAGES = [
  'https://i.ibb.co/TK1hB8F/slide1.jpg',
  'https://i.ibb.co/J5STsFd/slide2.jpg'
];

// ===== LOGIKA =====
function renderSlider(){
  const slider=document.getElementById('imageSlider');
  slider.innerHTML='';
  SLIDER_IMAGES.forEach(u=>{
    const s=document.createElement('div');
    s.className='slide';
    s.innerHTML=`<img src="${u}" alt="Promo">`;
    slider.appendChild(s);
  });
}
function renderGames(){
  const grid=document.getElementById('gameList');
  grid.innerHTML='';
  DATA_GAMES.forEach(g=>{
    const card=document.createElement('div');
    card.className='game-card';
    card.innerHTML=`<img src="${g.image}" width="60" height="60"><h3>${g.name}</h3><small>Klik untuk top up</small>`;
    card.onclick=()=>orderNow(g.name);
    grid.appendChild(card);
  });
}
function orderNow(nama){
  const msg=`Halo Admin RLTopup, saya ingin top up ${nama}. Mohon informasi lebih lanjut.`;
  window.location.href=`https://wa.me/${NOMOR_WHATSAPP_ADMIN}?text=${encodeURIComponent(msg)}`;
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('chatLink').href=`https://wa.me/${NOMOR_WHATSAPP_ADMIN}`;
  renderSlider(); renderGames();
});