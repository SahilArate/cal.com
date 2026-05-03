/**
 * Browser-safe version of markdownToSafeHTML.
 * Uses only browser-compatible APIs — no Node.js built-ins.
 * Use this in client components instead of markdownToSafeHTML.
 */
export function markdownToSafeHTMLClient(markdown: string | null): string {
  if (!markdown) return "";

  const html = markdown

    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")

    .replace(/\*(.*?)\*/g, "<em>$1</em>")

    .replace(/`([^`]+)`/g, "<code>$1</code>")

    .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, (_, text, url) => {
      const safeUrl = encodeURI(url).replace(/'/g, "%27");
      return `<a target='_blank' class='text-blue-500 hover:text-blue-600' href='${safeUrl}'>${text}</a>`;
    })

    .replace(/^[*-]\s+(.+)$/gm, "<li class='ul-item'>$1</li>")

    .replace(/^\d+\.\s+(.+)$/gm, "<li class='ol-item'>$1</li>")

    .replace(
      /((?:<li class='ul-item'>[\s\S]*?<\/li>\s*)+)/g,
      "<ul style='list-style-type: disc; list-style-position: inside; margin-left: 12px; margin-bottom: 4px'>$1</ul>"
    )

    .replace(
      /((?:<li class='ol-item'>[\s\S]*?<\/li>\s*)+)/g,
      "<ol style='list-style-type: decimal; list-style-position: inside; margin-left: 12px; margin-bottom: 4px'>$1</ol>"
    )

    .replace(/ class='[ou]l-item'/g, "")

    .replace(/\n/g, "<br />");

  return html;
}
