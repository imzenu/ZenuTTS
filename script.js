const PLAY_ICON = "▶";
const STOP_ICON = "■";
const COPIED_LABEL_MS = 1500;

const messageBox = document.getElementById("message");
const outputBox = document.getElementById("output");
const charCount = document.getElementById("count");
const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");

let selectedVoice = null;
let playingSample = null; // { audio, button } while a voice sample is playing


// ===== Helpers =====

function cloneTemplate(templateId) {
  return document.getElementById(templateId).content.firstElementChild.cloneNode(true);
}

function asTag(name) {
  return `[${name}] `;
}

// A row from a <template> whose radio button calls onSelect when chosen.
function createChoiceRow(templateId, isSelected, onSelect) {
  const row = cloneTemplate(templateId);
  const radio = row.querySelector("input");
  radio.checked = isSelected;
  radio.onchange = onSelect;
  return row;
}


// ===== Voice samples =====

function stopSample() {
  if (!playingSample) return;
  playingSample.audio.pause();
  playingSample.button.textContent = PLAY_ICON;
  playingSample = null;
}

function toggleSample(button, sampleUrl) {
  const wasPlayingThisSample = playingSample && playingSample.button === button;
  stopSample();
  if (wasPlayingThisSample) return;

  const audio = new Audio(sampleUrl);
  playingSample = { audio, button };
  button.textContent = STOP_ICON;
  audio.onended = stopSample;
  audio.play().catch(() => {
    if (playingSample && playingSample.audio === audio) stopSample();
  });
}


// ===== Message and output =====

function typedMessage() {
  return messageBox.value.trim();
}

function outputText() {
  return selectedVoice.prefix + typedMessage();
}

function clearOutput() {
  outputBox.textContent = "";
  copyButton.disabled = true;
}

function updateMessageState() {
  const charsLeft = TTS_BUILDER.maxChars - outputText().length;
  charCount.textContent = `${charsLeft} left`;
  charCount.classList.toggle("over", charsLeft < 0);
  generateButton.disabled = typedMessage() === "" || charsLeft < 0;
  clearOutput();
}

function insertTagAtCursor(tag) {
  messageBox.setRangeText(asTag(tag), messageBox.selectionStart, messageBox.selectionEnd, "end");
  messageBox.focus();
  updateMessageState();
}

function generateOutput() {
  outputBox.textContent = outputText();
  copyButton.disabled = false;
}

function copyOutput() {
  navigator.clipboard.writeText(outputBox.textContent).then(() => {
    copyButton.textContent = "Copied!";
    setTimeout(() => { copyButton.textContent = "Copy"; }, COPIED_LABEL_MS);
  });
}


// ===== Suggested emotions and sounds =====

function createTagChip(tag) {
  const chip = document.createElement("button");
  chip.className = "tag";
  chip.textContent = tag;
  chip.draggable = true;
  chip.onclick = () => insertTagAtCursor(tag);
  chip.ondragstart = (event) => event.dataTransfer.setData("text/plain", asTag(tag));
  return chip;
}

function renderTags(tags) {
  document.getElementById("tags").replaceChildren(...tags.map(createTagChip));
}


// ===== Voices =====

function createVoiceRow(voice, isSelected) {
  const row = createChoiceRow("voice-template", isSelected, () => selectVoice(voice));
  row.querySelector(".name").textContent = voice.name;
  row.querySelector(".description").textContent = voice.description;

  const playButton = row.querySelector(".play");
  if (voice.sample) {
    playButton.onclick = () => toggleSample(playButton, voice.sample);
  } else {
    playButton.remove();
  }
  return row;
}

function selectVoice(voice) {
  selectedVoice = voice;
  document.getElementById("selected-voice").textContent = voice.name;
  renderTags(voice.tags);
  updateMessageState();
}


// ===== Redeems =====

function createRedeemRow(redeem, isSelected) {
  const row = createChoiceRow("redeem-template", isSelected, () => selectRedeem(redeem));
  row.querySelector(".name").textContent = redeem.name;
  return row;
}

function selectRedeem(redeem) {
  stopSample();
  const voiceRows = redeem.voices.map((voice, index) => createVoiceRow(voice, index === 0));
  document.getElementById("voices").replaceChildren(...voiceRows);
  selectVoice(redeem.voices[0]);
}


// ===== Startup =====

function showPageText() {
  document.title = TTS_BUILDER.title;
  document.getElementById("title").textContent = TTS_BUILDER.title;
  document.getElementById("intro").textContent = TTS_BUILDER.intro;
}

function start() {
  showPageText();

  const redeemRows = TTS_BUILDER.redeems.map((redeem, index) => createRedeemRow(redeem, index === 0));
  document.getElementById("redeems").replaceChildren(...redeemRows);

  messageBox.oninput = updateMessageState;
  generateButton.onclick = generateOutput;
  copyButton.onclick = copyOutput;

  selectRedeem(TTS_BUILDER.redeems[0]);
}

start();
