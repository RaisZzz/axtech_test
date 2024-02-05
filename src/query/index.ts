export enum QueryMethod {
  GET,
  POST,
  DELETE,
  PUT,
}

export class QueryOptions {
  path = "";
  method: QueryMethod = QueryMethod.GET;
  params?: Record<string, any> | null = null;
}

export default async function query(options: QueryOptions) {
  let url = `${process.env.VUE_APP_API_URL}/${options.path}`;

  if (options.method === QueryMethod.GET && !!options.params) {
    url += `?${new URLSearchParams(options.params)}`;
  }

  const response: Response = await fetch(url, {
    method: QueryMethod[options.method],
    headers: {
      "Content-Type": "application/json",
    },
    body:
      options.method === QueryMethod.GET
        ? null
        : JSON.stringify(options.params),
  });
  return await response.json();
}
