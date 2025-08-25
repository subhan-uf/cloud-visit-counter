// Replace this with your API Gateway Invoke URL
const API_URL = "https://ii8cstrbwd.execute-api.us-east-1.amazonaws.com/api/counter";

const $ = (id) => document.getElementById(id);
const delay = (ms) => new Promise(res => setTimeout(res, ms));

const ui = {
  setLoading(on){
    $("spinner").style.display = on ? "inline-block" : "none";
    $("refresh").disabled = on;
  },
  setStatus(msg, kind=""){
    const el = $("status");
    el.className = `status ${kind}`;
    el.textContent = msg ?? "";
  },
  setApiLink(url){
    const a = $("apiLink");
    a.href = url; a.textContent = "Open API";
  },
  animateCount(from, to, dur=500){
    const el = $("count");
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const val = Math.round(from + (to - from) * p);
      el.textContent = val.toLocaleString();
      if(p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
};

// ------- data fetch -------
async function getCount(){
  const res = await fetch(API_URL);
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if(typeof json?.visits !== "number") throw new Error("Bad payload");
  return json.visits;
}

// ------- wire up UI -------
let lastVal = 0;

async function loadCount(){
  ui.setLoading(true);
  ui.setStatus("Loading…");
  try{
    ui.setApiLink(API_URL);
    const val = await getCount();
    ui.animateCount(lastVal, val);
    lastVal = val;
    ui.setStatus("OK", "ok");
  }catch(err){
    $("count").textContent = "—";
    ui.setStatus(`Error: ${err.message || err}`, "err");
  }finally{
    ui.setLoading(false);
  }
}

// ✅ Refresh button now reloads the page
$("refresh").addEventListener("click", () => {
  window.location.reload();
});

$("copyApi").addEventListener("click", async () => {
  try{
    await navigator.clipboard.writeText(API_URL);
    ui.setStatus("API URL copied", "ok");
  }catch{
    ui.setStatus("Couldn’t copy API URL", "err");
  }
});

// Load on first page visit
loadCount();
