const $ = (id) => document.getElementById(id);
const num = (id) => Math.max(0, Number($(id).value) || 0);
const money = (n) => new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(Number.isFinite(n)?n:0);
const pct = (n) => `${(Number.isFinite(n)?n:0).toLocaleString('es-CO',{maximumFractionDigits:1})}%`;
function calculateProfit(){
  const price=num('price'), costs=num('productCost')+num('shipping')+num('adCost')+num('otherCost');
  const profit=price-costs;
  $('profit').textContent=money(profit);
  $('margin').textContent=price?pct(profit/price*100):'—';
  $('breakEven').textContent=money(costs);
}
function calculateDelivery(){
  const sent=num('sent'), delivered=Math.min(num('delivered'),sent), failed=sent-delivered;
  const rate=sent?delivered/sent*100:0;
  const result=delivered*num('deliveredProfit')-failed*num('failedCost');
  $('deliveryRate').textContent=pct(rate);
  $('failed').textContent=failed.toLocaleString('es-CO');
  $('batchResult').textContent=money(result);
}
function calculateAds(){
  const spend=num('spend'), chats=num('chats'), sales=num('sales'), avg=num('averageOrder');
  $('costChat').textContent=chats?money(spend/chats):'—';
  $('cpa').textContent=sales?money(spend/sales):'—';
  $('roas').textContent=spend?`${(sales*avg/spend).toLocaleString('es-CO',{maximumFractionDigits:2})}x`:'—';
}
function update(){calculateProfit();calculateDelivery();calculateAds();}
document.querySelectorAll('input').forEach(input=>input.addEventListener('input',update));
update();
