import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import Viz from './Viz.jsx'

// Register only the languages the curriculum actually uses — keeps the bundle
// small instead of shipping every Prism grammar.
import powershell from 'react-syntax-highlighter/dist/esm/languages/prism/powershell'
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import csharp from 'react-syntax-highlighter/dist/esm/languages/prism/csharp'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'
import kusto from 'react-syntax-highlighter/dist/esm/languages/prism/kusto'

SyntaxHighlighter.registerLanguage('powershell', powershell)
SyntaxHighlighter.registerLanguage('docker', docker)
SyntaxHighlighter.registerLanguage('dockerfile', docker)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('env', bash)
SyntaxHighlighter.registerLanguage('csharp', csharp)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('sql', sql)
SyntaxHighlighter.registerLanguage('kusto', kusto)

function slugify(children) {
  return String(children)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

// Blocks made mostly of box-drawing / arrow characters are diagrams, not code —
// render them as a centered monospace figure instead of a syntax-highlighted block.
const DIAGRAM_CHARS = /[─│┌┐└┘├┤┬┴┼╔╗╚╝║═╦╩╠╣╬▼▲◄►><^|]/
function looksLikeDiagram(language, value) {
  if (language && language !== 'text') return false
  const lines = value.split('\n')
  if (lines.length < 3) return false
  const arty = lines.filter((l) => DIAGRAM_CHARS.test(l)).length
  return arty >= Math.max(3, lines.length * 0.4)
}

function Diagram({ value }) {
  return (
    <figure className="diagram">
      <pre>{value}</pre>
    </figure>
  )
}

function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <div className="code-block">
      <div className="code-block__bar">
        <span className="code-block__lang">{language || 'text'}</span>
        <button className="code-block__copy" onClick={copy} type="button">
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language || 'text'}
        style={oneDark}
        customStyle={{ margin: 0, borderRadius: 0, background: 'transparent', fontSize: '0.86rem' }}
        codeTagProps={{ style: { fontFamily: "'JetBrains Mono', ui-monospace, 'Cascadia Code', Menlo, Consolas, monospace" } }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  )
}

const components = {
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    const value = String(children).replace(/\n$/, '')
    if (!inline && (match || value.includes('\n'))) {
      const lang = match ? match[1] : ''
      if (lang === 'viz') return <Viz name={value} />
      if (looksLikeDiagram(lang, value)) return <Diagram value={value} />
      return <CodeBlock language={lang} value={value} />
    }
    return (
      <code className="inline-code" {...props}>
        {children}
      </code>
    )
  },
  h2({ children }) {
    return <h2 id={slugify(children)}>{children}</h2>
  },
  h3({ children }) {
    return <h3 id={slugify(children)}>{children}</h3>
  },
  table({ children }) {
    return (
      <div className="table-wrap">
        <table>{children}</table>
      </div>
    )
  },
  a({ href, children }) {
    const external = href?.startsWith('http')
    return (
      <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        {children}
      </a>
    )
  },
}

export default function Markdown({ text }) {
  return (
    <div className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </ReactMarkdown>
    </div>
  )
}
