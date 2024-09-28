import { v4 } from "uuid";

export function generateUniqueId(prefix) {
  return prefix + "-" + v4();
}
