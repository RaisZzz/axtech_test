import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import query, { QueryMethod } from "@/query";
import router from "@/router";

export class Post {
  id: number;
  userId: number;
  title: string;
  body: string;

  constructor(id: number, userId: number, title: string, body: string) {
    this.id = id;
    this.userId = userId;
    this.title = title;
    this.body = body;
  }
}

const postsPerPage = 20;
export const usePostsStore = defineStore("posts", () => {
  const posts: Ref<Post[]> = ref([]);
  const postsLoading: Ref<boolean> = ref(false);
  const allPostsLoaded: Ref<boolean> = ref(false);
  const postsScrollTop: Ref<number> = ref(0);

  function addPostIfNotExist(post: Post): void {
    const postExistIndex: number = posts.value.findIndex(
      (p: Post): boolean => p.id === post.id
    );
    if (postExistIndex >= 0) {
      posts.value[postExistIndex] = post;
    } else {
      posts.value.push(post);
    }
  }

  function clearAllPosts(): void {
    posts.value = [];
    allPostsLoaded.value = false;
  }

  async function getPosts(): Promise<void> {
    if (postsLoading.value || allPostsLoaded.value) {
      return;
    }

    postsLoading.value = true;

    const currentPage: number = posts.value.length / postsPerPage + 1;
    const searchQuery = router.currentRoute.value.query.q;
    const postsSearchParams: Record<string, string | number> = {
      _per_page: postsPerPage,
      _page: currentPage,
    };
    if (searchQuery && searchQuery.length) {
      postsSearchParams.title = searchQuery.toString();
    }
    const response = await query({
      method: QueryMethod.GET,
      path: "posts",
      params: postsSearchParams,
    });

    if (Array.isArray(response?.data)) {
      response.data.forEach(
        (post: Record<string, number | string> | undefined) => {
          if (post) {
            addPostIfNotExist(getPostFromJson(post));
          }
        }
      );

      if (response.pages <= currentPage) {
        allPostsLoaded.value = true;
      }
    } else {
      allPostsLoaded.value = true;
    }

    postsLoading.value = false;
  }

  async function getPostById(id: number): Promise<Post | undefined> {
    const response = await query({
      method: QueryMethod.GET,
      path: "posts",
      params: { id },
    });
    if (Array.isArray(response) && response.length) {
      const jsonPost = response[0];
      return getPostFromJson(jsonPost);
    }
  }

  function getPostFromJson(json: Record<string, number | string>): Post {
    return new Post(
      parseInt(json.id.toString()) || 0,
      parseInt(json.userId.toString()) || 0,
      json.title?.toString(),
      json.body?.toString()
    );
  }

  return {
    posts,
    postsLoading,
    allPostsLoaded,
    postsScrollTop,
    clearAllPosts,
    getPosts,
    getPostById,
  };
});
