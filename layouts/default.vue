<template lang="pug">
  .app
    m-canvas
    m-cursor-outer
    m-cursor
    m-toolbar
    m-notification
    .scroll-container
      nuxt
    m-footer
</template>

<script>
// Components
import mCanvas from "@/components/mCanvas";
import mCursorOuter from "@/components/mCursorOuter";
import mCursor from "@/components/mCursor";
import mToolbar from "@/components/mToolbar";
import mFooter from "@/components/mFooter";
import mNotification from "@/components/mNotification";

export default {
  name: "DefaultLayout",

  components: {
    mCanvas,
    mCursorOuter,
    mCursor,
    mToolbar,
    mFooter,
    mNotification
  }
};
</script>
