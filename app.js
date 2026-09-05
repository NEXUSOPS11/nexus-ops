const cfg = window.NEXUS_CONFIG || {};
const botUrl = cfg.botInviteUrl || '#';
const discordUrl = cfg.discordSupportUrl || '#';
['inviteBotHero','inviteBotBottom'].forEach(id=>{const el=document.getElementById(id); if(el) el.href=botUrl;});
['discordTop','discordBottom','goDiscord'].forEach(id=>{const el=document.getElementById(id); if(el) el.href=discordUrl;});

const modal=document.getElementById('purchaseModal');
const form=document.getElementById('orderForm');
const result=document.getElementById('orderResult');
const selectedPlan=document.getElementById('selectedPlan');
const selectedPrice=document.getElementById('selectedPrice');
const orderText=document.getElementById('orderText');
const toast=document.getElementById('toast');
let current={days:90,price:12900};
const won=n=>new Intl.NumberFormat('ko-KR').format(n);

function openModal(days,price){
  current={days:Number(days),price:Number(price)};
  selectedPlan.textContent=`PRO ${current.days}일`;
  selectedPrice.textContent=`₩${won(current.price)}`;
  form.hidden=false; result.hidden=true; modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  setTimeout(()=>document.getElementById('discordName').focus(),100);
}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
document.querySelectorAll('.buy-btn').forEach(btn=>btn.addEventListener('click',()=>{const card=btn.closest('.price-card');openModal(card.dataset.plan,card.dataset.price);}));
document.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

form.addEventListener('submit',e=>{
  e.preventDefault();
  const discordName=document.getElementById('discordName').value.trim();
  const serverName=document.getElementById('serverName').value.trim();
  const depositorName=document.getElementById('depositorName').value.trim();
  const serverId=document.getElementById('serverId').value.trim();
  const now=new Date();
  const stamp=`${String(now.getFullYear()).slice(-2)}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}`;
  const rand=Math.random().toString(36).slice(2,7).toUpperCase();
  const orderId=`NXO-${stamp}-${rand}`;
  orderText.value=[
    '🛒 NEXUS OPS PRO 구매 신청',
    '',
    `주문번호: ${orderId}`,
    `플랜: PRO ${current.days}일`,
    `금액: ₩${won(current.price)}`,
    `Discord: ${discordName}`,
    `적용 서버: ${serverName}`,
    `입금자명: ${depositorName}`,
    `서버 ID: ${serverId || '미입력'}`,
    '',
    '카카오뱅크 입금 계좌 안내를 부탁드립니다.'
  ].join('\n');
  form.hidden=true; result.hidden=false;
});

document.getElementById('copyOrder').addEventListener('click',async()=>{
  try{await navigator.clipboard.writeText(orderText.value);}catch{orderText.select();document.execCommand('copy');}
  toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),1500);
});

const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
