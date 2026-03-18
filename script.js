// ====== عداد الإعلان ======
(function () {
  var s  = 5;
  var t  = document.getElementById('eid-timer');
  var o  = document.getElementById('eid-overlay');

  var iv = setInterval(function () {
    s--;
    t.textContent = '⏱ ' + s;
    if (s <= 0) {
      clearInterval(iv);
      o.style.opacity = '0';
      setTimeout(function () {
        o.style.display = 'none';
        document.getElementById('lights-page1').style.display = 'block';
        document.getElementById('bunting-right').style.display = 'block';
        document.getElementById('bunting-left').style.display  = 'block';
        document.getElementById('lights-wrap').style.display   = 'none';
      }, 600);
    }
  }, 1000);
})();

// ====== الموقع الرئيسي ======
const nameForm     = document.getElementById("nameForm");
const nameInput    = document.getElementById("nameInput");
const employeeName = document.getElementById("employeeName");
const saveBtn      = document.getElementById("saveBtn");
const canvas       = document.getElementById("canvas");
const img          = document.querySelector(".greeting-img");

nameForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var name = nameInput.value.trim();
  if (!name) return;

  employeeName.textContent = name;
  document.getElementById("page1").classList.remove("active");
  document.getElementById("page2").classList.add("active");
  document.getElementById('lights-page1').style.display = 'none';
  document.getElementById('bunting-right').style.display = 'none';
  document.getElementById('bunting-left').style.display  = 'none';
  document.getElementById('lights-wrap').style.display   = 'block';
});

saveBtn.addEventListener("click", async function () {
  if (!img.complete) { alert("الصورة لم تتحمل بعد"); return; }

  try {
    await document.fonts.load("bold 15px PingARBold");
    await document.fonts.ready;
  } catch(e) {}

  const nW = img.naturalWidth;
  const nH = img.naturalHeight;

  canvas.width  = nW;
  canvas.height = nH;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, nW, nH);

  const isMobile = window.innerWidth <= 900;
  const RECT_X   = nW * 0.50;
  const RECT_Y   = nH * (isMobile ? 0.862 : 0.864);
  const fontSize = Math.round(15 * (nW / 380));
  const maxWidth = nW * 0.52;

  ctx.font         = `${fontSize}px PingARBold, Cairo, Arial, sans-serif`;
  ctx.fillStyle    = "#ffffff";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(employeeName.textContent, RECT_X, RECT_Y, maxWidth);

  const a    = document.createElement("a");
  a.download = "eid_card.png";
  a.href     = canvas.toDataURL("image/png");
  a.click();
});
