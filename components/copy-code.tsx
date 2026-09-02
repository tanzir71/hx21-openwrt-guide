'use client';
import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function CopyCode({
  text,
  label,
  labels,
}: {
  text: string;
  label?: string;
  labels: { copy: string; copied: string; copyFailed: string };
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
  }
  return (
    <div className="code-block">
      {label ? <div className="code-label">{label}</div> : null}
      <div className="code-row">
        <code dir="ltr">{text}</code>
        <Button
          variant="ghost"
          size="sm"
          onClick={copy}
          aria-label={labels.copy}
        >
          {status === 'copied' ? <Check /> : <Copy />}
          <span>{status === 'copied' ? labels.copied : labels.copy}</span>
        </Button>
      </div>
      <output className="copy-status" aria-live="polite">
        {status === 'error'
          ? labels.copyFailed
          : status === 'copied'
            ? labels.copied
            : ''}
      </output>
    </div>
  );
}
