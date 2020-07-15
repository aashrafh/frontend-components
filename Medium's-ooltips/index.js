const icons = `
<div class="tooltip__icon">
<svg class="tooltip__icon__svg">
  <path
    d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
    fill-rule="evenodd"
  ></path>
</svg>
</div>
<div class="tooltip__icon">
<svg class="tooltip__icon__svg">
  <path
    d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
    fill-rule="evenodd"
  ></path>
</svg>
</div>
<div class="tooltip__icon">
<svg class="tooltip__icon__svg">
  <path
    d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
    fill-rule="evenodd"
  ></path>
</svg>
</div>
<div class="tooltip__divider"></div>
<div class="tooltip__icon">
<svg class="tooltip__icon__svg">
  <path
    d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
    fill-rule="evenodd"
  ></path>
</svg>
</div>
`;

const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
tooltip.innerHTML = icons;

const tooltipTail = document.createElement("div");
tooltipTail.classList.add("tooltip__tail");

const articleElement = document.querySelector("article");

const removeTooltip = () => {
  if (document.body.contains(tooltip)) {
    tooltip.style.top = null;
    tooltip.style.left = null;
    tooltipTail.style.top = null;
    tooltipTail.style.left = null;
    document.body.removeChild(tooltip);
    document.body.removeChild(tooltipTail);
  }
};

let endOfSelection = false;

const displayTooltip = () => {
  const selection = document.getSelection();
  const rangeRect = selection.getRangeAt(0).getClientRects();

  document.body.append(tooltip);
  document.body.append(tooltipTail);

  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  const tooltipTialWidth = tooltipTail.offsetWidth;
  const tooltipTialHeight = tooltipTail.offsetHeight;

  const parentElement = selection.anchorNode.parentElement;
  const y = rangeRect[0].y;
  const x =
    rangeRect.length > 1
      ? parentElement.offsetLeft + parentElement.offsetWidth / 2
      : rangeRect[0].x + rangeRect[0].width / 2;

  tooltip.style.top = `${y - tooltipHeight - tooltipTialHeight / 2}px`;
  tooltip.style.left = `${x - tooltipWidth / 2}px`;
  tooltipTail.style.top = `${y - tooltipTialHeight / 2}px`;
  tooltipTail.style.left = `${x - tooltipTialWidth / 2}px`;
};

document.addEventListener("mouseup", () => {
  if (endOfSelection) displayTooltip();
  else removeTooltip();
  endOfSelection = false;
});
document.addEventListener("selectionchange", e => {
  const selection = document.getSelection();
  if (selection.type !== "Range") {
    removeTooltip();
    return;
  }

  if (selection.anchorNode != selection.focusNode) {
    endOfSelection = false;
    return;
  }

  endOfSelection = true;
});
