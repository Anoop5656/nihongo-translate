// ============================================================
// BLEU SCORE ENGINE — NihongoTranslate
// Implements sentence-level BLEU with 1-4 gram precision
// ============================================================

function tokenizeJa(str) {
  return str.replace(/[。、！？\s　]/g, '').split('');
}

function getNgrams(tokens, n) {
  const ngrams = {};
  for (let i = 0; i <= tokens.length - n; i++) {
    const gram = tokens.slice(i, i + n).join('|');
    ngrams[gram] = (ngrams[gram] || 0) + 1;
  }
  return ngrams;
}

function modifiedPrecision(hypTokens, refTokens, n) {
  if (hypTokens.length < n) return 0;
  const hypGrams = getNgrams(hypTokens, n);
  const refGrams = getNgrams(refTokens, n);
  let matched = 0, total = 0;
  for (const [gram, count] of Object.entries(hypGrams)) {
    total += count;
    matched += Math.min(count, refGrams[gram] || 0);
  }
  return total === 0 ? 0 : matched / total;
}

function computeBLEU(hypStr, refStr) {
  const hyp = tokenizeJa(hypStr);
  const ref = tokenizeJa(refStr);
  if (!hyp.length || !ref.length) return { score: 0, precision1: 0, precision2: 0, bp: 0, hypLen: 0, refLen: 0 };
  const bp = hyp.length >= ref.length ? 1 : Math.exp(1 - ref.length / hyp.length);
  const p1 = modifiedPrecision(hyp, ref, 1);
  const p2 = modifiedPrecision(hyp, ref, 2);
  const p3 = modifiedPrecision(hyp, ref, 3);
  const p4 = modifiedPrecision(hyp, ref, 4);
  const precisions = [p1, p2, p3, p4].filter(p => p > 0);
  let geoMean = 0;
  if (precisions.length > 0) {
    geoMean = Math.exp(precisions.reduce((s, p) => s + Math.log(p), 0) / precisions.length);
  }
  return {
    score:      Math.round(bp * geoMean * 100),
    precision1: Math.round(p1 * 100),
    precision2: Math.round(p2 * 100),
    bp:         Math.round(bp * 100),
    hypLen:     hyp.length,
    refLen:     ref.length,
  };
}

function findBestReference(inputEn) {
  const norm = inputEn.toLowerCase().trim().replace(/[.,!?]/g, '');
  for (const p of PHRASES) {
    if (p.en.toLowerCase().replace(/[.,!?]/g, '') === norm) return p.ja;
  }
  for (const v of VOCAB) {
    const keys = v.en.toLowerCase().split(' / ');
    if (keys.some(k => k.trim() === norm)) return v.ja;
  }
  return null;
}

function renderBLEUScore(inputEn, translatedJa) {
  const panel = document.getElementById('bleuPanel');
  const toggle = document.getElementById('bleuToggle');
  if (!panel || !toggle || !toggle.checked) return;

  const ref = findBestReference(inputEn);
  if (!ref) {
    panel.innerHTML =
      '<div class="bleu-na">ℹ️ No reference found for this input — BLEU requires a known translation in the database.</div>';
    return;
  }
  if (!translatedJa) {
    panel.innerHTML = '<div class="bleu-na">Translate first to see BLEU score.</div>';
    return;
  }

  const r = computeBLEU(translatedJa, ref);
  let quality = '', qualClass = '';
  if      (r.score >= 80) { quality = '🟢 Excellent'; qualClass = 'bleu-excellent'; }
  else if (r.score >= 60) { quality = '🟡 Good';       qualClass = 'bleu-good'; }
  else if (r.score >= 40) { quality = '🟠 Fair';       qualClass = 'bleu-fair'; }
  else if (r.score >= 20) { quality = '🔴 Poor';       qualClass = 'bleu-poor'; }
  else                    { quality = '⚫ Very Low';   qualClass = 'bleu-verylow'; }

  panel.innerHTML = [
    '<div class="bleu-header">',
    '  <span class="bleu-title">📊 BLEU Score</span>',
    '  <span class="bleu-badge ' + qualClass + '">' + quality + '</span>',
    '</div>',
    '<div class="bleu-score-big">' + r.score + '<span class="bleu-score-unit">/100</span></div>',
    '<div class="bleu-bar-wrap">',
    '  <div class="bleu-bar-track">',
    '    <div class="bleu-bar-fill ' + qualClass + '" style="width:' + r.score + '%"></div>',
    '  </div>',
    '</div>',
    '<div class="bleu-breakdown">',
    '  <div class="bleu-metric"><span class="bleu-metric-label">Unigram precision</span><span class="bleu-metric-val">' + r.precision1 + '%</span></div>',
    '  <div class="bleu-metric"><span class="bleu-metric-label">Bigram precision</span><span class="bleu-metric-val">' + r.precision2 + '%</span></div>',
    '  <div class="bleu-metric"><span class="bleu-metric-label">Brevity penalty</span><span class="bleu-metric-val">' + r.bp + '%</span></div>',
    '  <div class="bleu-metric"><span class="bleu-metric-label">Output length</span><span class="bleu-metric-val">' + r.hypLen + ' chars</span></div>',
    '</div>',
    '<div class="bleu-reference">',
    '  <span class="bleu-ref-label">📖 Reference translation:</span>',
    '  <span class="bleu-ref-ja">' + ref + '</span>',
    '</div>',
    '<div class="bleu-note">BLEU measures n-gram overlap with the reference. Score ≥ 60 is good for a dictionary-based system.</div>',
  ].join('\n');
}
