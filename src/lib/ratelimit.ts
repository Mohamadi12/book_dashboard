import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/database/redis";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1m"), //5 essaie par minute
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;