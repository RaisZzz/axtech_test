<template>
  <div class="posts" ref="postsList" @scroll="onPostsScroll">
    <div class="container posts-list">
      <input
        v-model="postsSearch"
        type="text"
        class="input"
        placeholder="Search..."
      />
      <PostItem v-for="post in postsStore.posts" :post="post" :key="post.id" />
      <MainLoader v-if="postsStore.postsLoading" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePostsStore } from "@/stores/posts";
import { onMounted, Ref, ref, watch } from "vue";
import PostItem from "@/components/PostItem.vue";
import MainLoader from "@/components/MainLoader.vue";
import router from "@/router";

const postsStore = usePostsStore();
const postsList: Ref<HTMLDivElement | undefined> = ref<HTMLDivElement>();
const postsSearch: Ref<string> = ref("");
const postsSearchTimer: Ref<number | undefined> = ref();

onMounted(() => {
  if (!postsList.value) {
    return;
  }

  postsList.value.scrollTop = postsStore.postsScrollTop;

  postsStore.getPosts();
});

watch(postsSearch, async () => {
  await router.push({ name: "home", query: { q: postsSearch.value } });
  clearTimeout(postsSearchTimer.value);
  postsSearchTimer.value = setTimeout(() => {
    postsStore.clearAllPosts();
    postsStore.getPosts();
  }, 1000);
});

function onPostsScroll(): void {
  if (!postsList.value) {
    return;
  }

  const scrollTop: number = postsList.value.scrollTop;
  postsStore.postsScrollTop = scrollTop;
  const scrollHeight: number = postsList.value.scrollHeight;
  const height: number = postsList.value.clientHeight;

  if (scrollTop + height - scrollHeight >= -200) {
    postsStore.getPosts();
  }
}
</script>

<style lang="sass" scoped>
.posts
  height: 100vh
  width: 100%
  overflow-y: auto

  &-list
    width: 100%
    display: flex
    flex-direction: column
    align-items: center
    gap: 20px
</style>
