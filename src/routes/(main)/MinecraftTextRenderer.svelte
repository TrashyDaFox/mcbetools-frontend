<script>
    import { onMount } from 'svelte';
  
    export let text;
  
    const colorMap = {
      '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
      '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
      '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
      'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF',
      'g': '#DDD605', 'h': '#E3D4D1', 'i': '#CECACA', 'j': '#443A3B',
      'm': '#971607', 'n': '#B4684D', 'p': '#DEB12D', 'q': '#47A036',
      's': '#2CBAA8', 't': '#21497B', 'u': '#9A5CC6',
    };
  
    const formatMap = {
      'l': 'font-weight: bold;',
      'o': 'font-style: italic;',
      'k': 'obfuscated',
    };
  
    const escapeHtml = (txt) =>
      txt.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
    const obfChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{};:<>?/\\|~';
  
    function scramble(text) {
      return [...text].map(() => obfChars[Math.floor(Math.random() * obfChars.length)]).join('');
    }
  
    function enhance(node) {
      const elements = node.querySelectorAll('obf-text');
      elements.forEach(el => {
        const span = document.createElement('span');
        span.style = el.getAttribute('style') || '';
        const original = el.getAttribute('text') || '';
        span.classList.add('obfuscated-text');
        span.dataset.original = original;
        span.textContent = scramble(original);
        el.replaceWith(span);
  
        let interval = setInterval(() => {
          span.textContent = scramble(original);
        }, 75);
  
        el._cleanup = () => clearInterval(interval);
      });
  
      return {
        destroy() {
          elements.forEach(el => el._cleanup && el._cleanup());
        }
      };
    }
    function renderText(inputText) {
  let output = '';
  let currentColor = '';
  let currentFormats = [];

//   inputText = inputText;
  const segments = inputText.split(/§/g);

  output += `<span class="mojang-text">${escapeHtml(segments[0]).replace(/ /g, spaceSpan())}</span>`;

  for (let i = 1; i < segments.length; i++) {
    const segment = segments[i];
    if (segment.length === 0) continue;

    const code = segment[0];
    const textContent = escapeHtml(segment.slice(1)).replace(/ /g, spaceSpan());

    if (colorMap[code]) {
      currentColor = colorMap[code];
      currentFormats = [];
    } else if (formatMap[code]) {
      if (formatMap[code] === 'obfuscated') {
        currentFormats.push('obfuscated');
      } else {
        currentFormats.push(formatMap[code]);
      }
    } else if (code === 'r') {
      currentColor = '';
      currentFormats = [];
    }

    let style = currentColor ? `color: ${currentColor};` : '';
    let isObfuscated = false;

    for (let fmt of currentFormats) {
      if (fmt === 'obfuscated') {
        isObfuscated = true;
      } else {
        style += fmt;
      }
    }

    if (isObfuscated) {
      output += `<obf-text style="${style}" text="${textContent}"></obf-text>`;
    } else {
      output += `<span style="${style}">${textContent}</span>`;
    }
  }

  const lines = output.split('\n');
return lines.map(line => `<div class="mc-line">${line ? line : "&nbsp;"}</div>`).join('');

}

function spaceSpan() {
  return `<span class="mc-space">&nbsp;</span>`;
}
  </script>
  
  <div use:enhance class="mojang-text">{@html renderText(text)}</div>
  
  <style>
    @font-face {
      font-family: 'Mojang';
      src: url('/Mojang-Regular.ttf') format('truetype');
      font-weight: normal;
    }
  
    @font-face {
      font-family: 'Mojang';
      src: url('/Mojang-Bold.ttf') format('truetype');
      font-weight: bold;
    }
  
    :global(.obfuscated-text) {
      font-family: 'Mojang', monospace;
      display: inline-block;
      white-space: pre;
    }
  
    :global(span.mojang-text), :global(div.mojang-text), :global(div.mojang-text *) {
      font-family: 'Mojang', monospace;
    }
    :global(.mc-space) {
  display: inline-block;
  width: 5px; /* adjust to Minecraft-accurate spacing */
}

  </style>