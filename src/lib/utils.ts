export async function setConsole() {
  if (process.env.NODE_ENV === "development") {
    const { default: VConsole } = await import("vconsole");
    const vConsole = new VConsole({
      defaultPlugins: ["system", "network", "element", "storage"],
      maxLogNumber: 5000,
      onReady() {
        vConsole.setSwitchPosition(50, 100);
      },
    });
  }
}

export function randomString(
  length = 32,
  chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
): string {
  let result = "";
  for (let i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
