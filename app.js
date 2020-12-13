const box = document.getElementById('box');
const resTopLeft = document.getElementById('res-top-left');
const resTopRight = document.getElementById('res-top-right');
const resBottomLeft = document.getElementById('res-bottom-left');
const resBottomRight = document.getElementById('res-bottom-right');

let originalBoxRight = null;
let boxTranslateXLeft = 0;

let originalBoxBottom = null;
let boxTranslateYBottom = 0;

resBottomRight.addEventListener('mousedown', () => {
  originalBoxRight = null;
  const resize = ({ clientX, clientY }) => {
    const { left, top } = box.getBoundingClientRect();
    box.style.width = `${clientX - left}px`;
    box.style.height = `${clientY - top}px`;
  };
  const stopResize = () => window.removeEventListener('mousemove', resize);
  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
});

resBottomLeft.addEventListener('mousedown', () => {
  originalBoxBottom = null;

  const resize = ({ clientX, clientY }) => {
    const { right, left, top } = box.getBoundingClientRect();

    if (!originalBoxRight) {
      originalBoxRight = right;
    } else {
      // Handle the x-axis
      const difference = clientX - left;
      boxTranslateXLeft += difference;
      box.style.width = `${originalBoxRight - clientX}px`;
      box.style.transform = boxTranslateYBottom
        ? `translateX(${boxTranslateXLeft}px) translateY(${boxTranslateYBottom}px)`
        : `translateX(${boxTranslateXLeft}px)`;
      // Handle the y-axis
      box.style.height = `${clientY - top}px`;
    }
  };

  const stopResize = () => window.removeEventListener('mousemove', resize);
  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
});

resTopLeft.addEventListener('mousedown', () => {
  originalBoxRight = null;
  originalBoxBottom = null;
  const resize = ({ clientX, clientY }) => {
    const { right, left, bottom, top } = box.getBoundingClientRect();

    if (!originalBoxRight) {
      originalBoxRight = right;
    } else if (!originalBoxBottom) {
      originalBoxBottom = bottom;
    } else {
      // handle the x-axis
      box.style.width = `${originalBoxRight - clientX}px`;
      const difference = clientX - left;
      boxTranslateXLeft += difference;
      box.style.transform = boxTranslateYBottom
        ? `translateX(${boxTranslateXLeft}px) translateY(${boxTranslateYBottom}px)`
        : `translateX(${boxTranslateXLeft}px)`;

      console.log('boxTranslateXLeft', boxTranslateXLeft);
      // handle the y-axis
      box.style.height = `${originalBoxBottom - clientY}px`;
      const differenceY = clientY - top;
      boxTranslateYBottom += differenceY;
      box.style.transform = boxTranslateXLeft
        ? `translateY(${boxTranslateYBottom}px) translateX(${boxTranslateXLeft}px)`
        : `translateY(${boxTranslateYBottom}px)`;
    }
  };

  const stopResize = () => window.removeEventListener('mousemove', resize);
  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
});

resTopRight.addEventListener('mousedown', () => {
  originalBoxBottom = null;
  const resize = ({ clientX, clientY }) => {
    const { left, bottom, top } = box.getBoundingClientRect();

    if (!originalBoxBottom) {
      originalBoxBottom = bottom;
    } else {
      // handle the x-axis
      box.style.width = `${clientX - left}px`;
      // handle the y-axis
      box.style.height = `${originalBoxBottom - clientY}px`;
      const difference = top - clientY;
      boxTranslateYBottom -= difference;
      box.style.transform = boxTranslateXLeft
        ? `translateX(${boxTranslateXLeft}px) translateY(${boxTranslateYBottom}px)`
        : `translateY(${boxTranslateYBottom}px)`;
    }
  };

  const stopResize = () => window.removeEventListener('mousemove', resize);
  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
});
