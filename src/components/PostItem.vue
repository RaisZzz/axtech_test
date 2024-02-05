<template>
  <RouterLink class="post" :class="{ disabled }" :to="`/${post.id}`">
    <div class="post-top">
      <p class="post__id">#{{ post.id }}</p>
      <p class="post__user">@user_{{ post.userId }}</p>
    </div>
    <p class="post__title">{{ post.title }}</p>
    <p class="post__body">{{ post.body }}</p>
  </RouterLink>
</template>

<script setup lang="ts">
import { Post } from "@/stores/posts";
import { defineProps } from "vue";

defineProps({
  post: {
    type: Post,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="sass" scoped>
@import "@/assets/sass/variables"

.post
  width: 100%
  padding: 20px
  border-radius: 10px
  background-color: $surface
  color: $on-surface
  box-shadow: 0 0 10px 1px rgba(0,0,0,0.1)

  &-top
    display: flex
    align-items: center
    gap: 10px
    margin-bottom: 10px

  &__id
    font-size: 14px
    opacity: 0.5

  &__user
    color: $link

  &__title
    font-size: 17px
    font-weight: 600
    margin-bottom: 10px

  &__body
    font-size: 16px
    opacity: 0.8
</style>
