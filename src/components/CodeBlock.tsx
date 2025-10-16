import React from 'react';

type CodeBlockProps = {
  code: string;
  language?: string;
  // accepts CSS font-size values like '14px' or '1rem', or a number which will be treated as pixels
  fontSize?: string | number;
  className?: string;
};

// Very small, dependency-free syntax highlighter for demo purposes.
// Highlights keywords, types and numbers for Java-like snippets.
export default function CodeBlock({ code, language = 'java', fontSize, className }: CodeBlockProps) {
  // escape HTML
  const esc = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // highlight only the exact tokens 'tryAgain' and 'while' in the specified red color
  const exactHighlightRegex = /\b(tryAgain|while)\b/g;

  let highlighted = esc(code).replace(
    exactHighlightRegex,
    '<span class="text-[#ff1744]">$1</span>'
  );

  const style = fontSize !== undefined
    ? { fontSize: typeof fontSize === 'number' ? `${fontSize}px` : fontSize }
    : undefined;

  return (
    <pre className={`rounded bg-transparent p-0 overflow-auto ${className ?? ''}`} style={style}>
      <code
        className="whitespace-pre"
        // dangerouslySetInnerHTML used intentionally for simple highlighting
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  );
}
