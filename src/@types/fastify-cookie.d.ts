import "@fastify/cookie";

declare module "fastify" {
  interface FastifyReply {
    setCookie(
      name: string,
      value: string,
      options?: import("@fastify/cookie").CookieOptions
    ): this;
    clearCookie(
      name: string,
      options?: import("@fastify/cookie").CookieOptions
    ): this;
  }
}
