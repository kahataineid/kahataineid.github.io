var cards = {
  1: {
  src: 'images/adha_card.png',
  nameX: 0.50,
  nameY: 0.870,
  fontSize: 20,
  maxWidthRatio: 0.52,
  nameColor: '#ffffff',
  previewTop: '85%'
},
  2: {
    src: 'images/new_adha_card.png',

    /* بعد الحفظ */
    nameX: 0.50,
    nameY: 0.870,
    fontSize: 20,

    maxWidthRatio: 0.52,
    nameColor: '#ffffff',

    /* قبل الحفظ */
    previewTop: '85%',
    previewLeft: '55%'
  }
};

var selectedCard = 1;

function selectCard(num) {
  selectedCard = num;

  document.getElementById('previewImg').src = cards[num].src;

  document.getElementById('employeeName').style.top =
    cards[num].previewTop;

  document.getElementById('employeeName').style.left =
    cards[num].previewLeft || '55%';

  

  document.getElementById('thumb1').classList.toggle('active', num === 1);
  document.getElementById('thumb2').classList.toggle('active', num === 2);
}

document.getElementById('nameInput').addEventListener('input', function () {
  document.getElementById('employeeName').textContent = this.value;
  document.getElementById('error-msg').style.display = 'none';
});

async function downloadCard() {
  var name = document.getElementById('nameInput').value.trim();
  if (!name) {
    document.getElementById('error-msg').style.display = 'block';
    document.getElementById('nameInput').focus();
    return;
  }

  var img = document.getElementById('previewImg');
  if (!img.complete) { alert('الصورة لم تتحمل بعد'); return; }

  try {
    await document.fonts.load('bold 40px PingARBold');
    await document.fonts.ready;
  } catch(e) {}

  var cfg = cards[selectedCard];
  var canvas = document.getElementById('canvas');
  var nW = img.naturalWidth;
  var nH = img.naturalHeight;
  canvas.width  = nW;
  canvas.height = nH;

  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, nW, nH);

  var RECT_X   = nW * cfg.nameX;
  var RECT_Y   = nH * cfg.nameY;
  // حجم الخط بناءً على عرض الصورة الفعلي (4500px)
  var fontSize = Math.round(cfg.fontSize * (nW / 380));
  var maxWidth = nW * cfg.maxWidthRatio;

  ctx.font         = fontSize + 'px PingARBold, Cairo, Arial, sans-serif';
  ctx.fillStyle    = cfg.nameColor;
  ctx.textAlign    = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, RECT_X, RECT_Y, maxWidth);

  var a    = document.createElement('a');
  a.download = 'eid_card.png';
  a.href     = canvas.toDataURL('image/png');
  a.click();
}
