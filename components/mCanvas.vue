<template lang="pug"></template>

<script>
import { TweenLite, Linear } from "gsap";

export default {
  name: "MCanvas",

  data: () => ({
    app: null,
    x: 700,
    y: 400,
    options: {
      mask_scale: 1,
      bg_scale: 1,
      displacementSpriteX: 0,
      displacementSpriteY: 0
    }
  }),

  mounted() {
    /* global PIXI */
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      autoResize: true,
      resolution: devicePixelRatio
    });
    document.body.appendChild(this.app.view);

    this.app.stage.interactive = true;

    // const cells = PIXI.Sprite.from("/images/green-texture-1.jpg");
    const cells = PIXI.Sprite.from("/images/blue-texture-1.png");

    cells.scale.set(1.5);
    cells.width = this.app.screen.width;
    cells.height = this.app.screen.height;

    const mask = PIXI.Sprite.from("/images/black-texture-2.jpg");
    mask.width = this.app.screen.width;
    mask.height = this.app.screen.height;

    cells.mask = mask;

    const displacementSprite = PIXI.Sprite.from("/images/displacement-2.jpg");
    // Make sure the sprite is wrapping.
    displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    const displacementFilter = new PIXI.filters.DisplacementFilter(
      displacementSprite
    );

    displacementSprite.position = cells.position;
    displacementSprite.width = this.app.screen.width;
    displacementSprite.height = this.app.screen.height;

    this.app.stage.addChild(displacementSprite);

    cells.filters = [displacementFilter];

    displacementFilter.scale.x = 0;
    displacementFilter.scale.y = 30;

    this.app.stage.addChild(mask, cells);

    this.app.ticker.add(delta => {
      if (displacementSprite.x === 0) {
        TweenLite.to(this.options, 60, {
          displacementSpriteX: 400,
          ease: Linear.linear
        });
      } else if (displacementSprite.x === 400) {
        TweenLite.to(this.options, 60, {
          displacementSpriteX: 0,
          ease: Linear.linear
        });
      }
      if (displacementSprite.y === 0) {
        TweenLite.to(this.options, 10, {
          displacementSpriteY: 100,
          ease: Linear.linear
        });
      } else if (displacementSprite.y === 100) {
        TweenLite.to(this.options, 10, {
          displacementSpriteY: 0,
          ease: Linear.linear
        });
      }
      displacementSprite.x = this.options.displacementSpriteX;
      displacementSprite.y = this.options.displacementSpriteY;
    });
  }
};
</script>

<style lang="sass">
canvas
  position: absolute
  top: 0
  left: 0
  opacity: 1
  z-index: 0
</style>
