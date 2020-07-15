const icons = `
    <svg class="tooltip__icon">
        <path
          d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
          fill-rule="evenodd"
        ></path>
      </svg>
      <svg class="tooltip__icon">
        <path
          d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
          fill-rule="evenodd"
        ></path>
      </svg>
      <svg class="tooltip__icon">
        <path
          d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
          fill-rule="evenodd"
        ></path>
      </svg>
      <svg class="tooltip__icon">
        <path
          d="M19.074 21.117c-1.244 0-2.432-.37-3.532-1.096a7.792 7.792 0 0 1-.703-.52c-.77.21-1.57.32-2.38.32-4.67 0-8.46-3.5-8.46-7.8C4 7.7 7.79 4.2 12.46 4.2c4.662 0 8.457 3.5 8.457 7.803 0 2.058-.85 3.984-2.403 5.448.023.17.06.35.118.55.192.69.537 1.38 1.026 2.04.15.21.172.48.058.7a.686.686 0 0 1-.613.38h-.03z"
          fill-rule="evenodd"
        ></path>
      </svg>
`;

const tooltip = document.createElement("div");
tooltip.classList.add("tooltip");
tooltip.innerHTML = icons;

const tooltipTail = document.createElement("div");
tooltipTail.classList.add("tooltip__tail");

document.addEventListener("mouseup", () => {
  const selection = document.getSelection();
  const anchorNode = selection.anchorNode;
  const focusNode = selection.focusNode;
  if (anchorNode != focusNode) return;

  //   const selectedText = anchorNode.data.substring(
  //     selection.anchorOffset,
  //     selection.focusOffset
  //   );

  const rangeRect = selection.getRangeAt(0).getClientRects()[0];
  document.body.append(tooltip);
  document.body.append(tooltipTail);

  const y = rangeRect.y;
  const x = rangeRect.x + rangeRect.width / 2;
  const tooltipWidth = tooltip.offsetWidth;
  const tooltipHeight = tooltip.offsetHeight;
  const tooltipTialWidth = tooltipTail.offsetWidth;
  const tooltipTialHeight = tooltipTail.offsetHeight;

  tooltip.style.top = `${y - tooltipHeight - tooltipTialHeight / 2}px`;
  tooltip.style.left = `${x - tooltipWidth / 2}px`;
  tooltipTail.style.top = `${y - tooltipTialHeight / 2}px`;
  tooltipTail.style.left = `${x - tooltipTialWidth / 2}px`;
});
