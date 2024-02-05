<template>
  <div class="post-page">
    <div class="container post-page-container">
      <button class="button post-page__back" @click="goBack">Back</button>
      <PostItem v-if="post" :post="post" disabled />
      <MainLoader v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import PostItem from "@/components/PostItem.vue";
import { Post, usePostsStore } from "@/stores/posts";
import { defineProps, onMounted, ref, Ref } from "vue";
import MainLoader from "@/components/MainLoader.vue";
import router from "@/router";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const postsStore = usePostsStore();
const post: Ref<Post | undefined> = ref();

async function goBack() {
  await router.push({ name: "home" });
}

onMounted(async () => {
  post.value = await postsStore.getPostById(parseInt(props.id) || 0);
  if (!post.value) {
    await goBack();
  }
});
</script>

<style lang="sass" scoped>
.post-page
  &__back
    margin-right: auto

  &-container
    display: flex
    flex-direction: column
    align-items: center
    gap: 20px
</style>
