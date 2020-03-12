<template lang="pug">
  .cursor--outer.js-cursor
</template>

<script>
export default {
  name: "MCursorOuter",

  mounted() {
    const windowW = window.innerWidth;
    const windowH = window.innerHeight;
    const maxLength = Math.max(windowW, windowH);

    const cursorWidth = 60;
    const cursorR = cursorWidth >> 1;
    const cursorDelay = 10;

    const buttons = Array.from(document.querySelectorAll(".js-button"));

    const cursor = {
      el: document.querySelector(".js-cursor"),
      x: windowW >> 1,
      y: windowH >> 1,
      scaleX: 1,
      scaleY: 1
    };

    const target = {
      x: windowW >> 1,
      y: windowH >> 1,
      width: cursorWidth,
      followMouse: true
    };

    const norm = (val, max, min) => (val - min) / (max - min);
    const toDegrees = r => r * (180 / Math.PI);
    const distanceBetween = (v1, v2) =>
      Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));

    const loop = () => {
      const destX = target.x - cursorR;
      const destY = target.y - cursorR;

      const newX = cursor.x + (destX - cursor.x) / cursorDelay;
      const newY = cursor.y + (destY - cursor.y) / cursorDelay;
      const angle = angleBetween(cursor.x, cursor.y, newX, newY);

      if (target.followMouse) {
        const distance = Math.abs(distanceBetween(target, cursor));
        const scale = norm(distance, maxLength, cursorR);
        cursor.scaleX = 1 + scale;
        cursor.scaleY = 1 - scale;
      } else {
        const targetScale = target.width / cursorWidth;

        cursor.scaleX += (targetScale - cursor.scaleX) / (cursorDelay / 2);
        cursor.scaleY = cursor.scaleX;
      }

      cursor.x = newX;
      cursor.y = newY;

      cursor.el.style.transform = `translate(${cursor.x}px, ${
        cursor.y
      }px) rotate(${toDegrees(angle)}deg) scale(${cursor.scaleX}, ${
        cursor.scaleY
      })`;

      requestAnimationFrame(loop);
    };

    const angleBetween = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1);

    const onPointerMove = e => {
      if (!target.followMouse) {
        return;
      }

      const pointer = e.touches && e.touches.length ? e.touches[0] : e;
      const { clientX: x, clientY: y } = pointer;

      target.x = x;
      target.y = y;
    };

    const onPointerOver = e => {
      const btn = e.target;
      const rect = btn.getBoundingClientRect();

      target.followMouse = false;
      target.x = rect.left + (rect.width >> 1);
      target.y = rect.top + (rect.height >> 1);

      target.width = Math.max(rect.width, rect.height) + 50;
    };

    const onPointerOut = () => {
      target.followMouse = true;
      target.width = cursorWidth;
    };

    document.body.addEventListener("mousemove", onPointerMove);
    document.body.addEventListener("touchmove", onPointerMove);

    buttons.forEach(btn => {
      btn.addEventListener("touchstart", onPointerOver);
      btn.addEventListener("mouseover", onPointerOver);

      btn.addEventListener("touchend", onPointerOut);
      btn.addEventListener("mouseout", onPointerOut);
    });

    loop();
  }
};
</script>
