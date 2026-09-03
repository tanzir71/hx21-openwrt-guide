import { CopyCode } from './copy-code';
import { buildLlmPrompt, promptRevision } from '@/lib/llm-prompt';
import { platformUi } from '@/lib/platform-content';
import type { Locale, Platform } from '@/lib/locale';

export function LlmPrompt({
  locale,
  platform,
}: {
  locale: Locale;
  platform: Platform;
}) {
  const bn = locale === 'bn';
  const t = platformUi(locale, platform);
  return (
    <section className="llm-prompt" aria-labelledby="llm-prompt-title">
      <div className="prepare-panel">
        <div>
          <h3 id="llm-prompt-title">
            {bn ? 'কপি করুন, তারপর সহকারীকে দিন' : 'Copy it into your assistant'}
          </h3>
          <p>
            {bn
              ? 'উপরের OS বাছুন, পুরো প্রম্পট কপি করে স্থানীয় shell/browser ব্যবহার করতে পারে এমন সহকারীকে দিন। প্রম্পটে দুই OS-এর পথই আছে; সহকারী আসল পরিবেশ যাচাই করবে। সাধারণ চ্যাটেও এটি একবারে একটি নির্দেশনা দেবে।'
              : 'Choose your OS above, then copy the full prompt into an assistant with local shell/browser access. It includes both OS branches and verifies the actual environment. In a regular chat, it guides you through one action at a time.'}
          </p>
          <p>
            {bn
              ? 'প্রম্পটের নির্দেশনা ইংরেজিতে, তবে সহকারীকে বাংলায় উত্তর দিতে বলা হয়েছে। কোনো credential এখানে লিখতে হবে না। কেবল prompt কপি হয়; এই পেজ কোনো LLM service-এ তথ্য পাঠায় না।'
              : 'No credentials are needed on this page. Copying transfers only the prompt; this page does not send data to an LLM service.'}
          </p>
        </div>
      </div>
      <ol className="prompt-checkpoints">
        <li>
          {bn
            ? 'OS, tool ও chat-এর সংযোগ যাচাই'
            : 'Check OS, tools and the connection carrying the chat'}
        </li>
        <li>
          {bn
            ? 'SSH, ব্যক্তিগত backup ও image/signature যাচাই'
            : 'Establish SSH, private backups and verified images/signatures'}
        </li>
        <li>
          {bn
            ? 'অনুমোদিত install-এর প্রতিটি ধাপ পরীক্ষা'
            : 'Verify each authorized installation stage'}
        </li>
        <li>
          {bn
            ? 'নিজস্ব network role, Wi-Fi, client test ও cleanup'
            : 'Configure the chosen network role, Wi-Fi, client tests and cleanup'}
        </li>
      </ol>
      <p className="scope-note">
        {bn
          ? 'সহকারীকে যথাযথ tool access দিতে হবে। কেবল লাগানো ও OS administrator prompt অনুমোদন আপনার কাজ। প্রতিটি destructive ধাপের আগে আলাদা সিদ্ধান্ত থাকবে; একটি prompt hardware compatibility বা recovery-এর নিশ্চয়তা দেয় না।'
          : 'The assistant needs suitable tool access. You handle cables and OS administrator prompts. Each destructive stage has its own decision checkpoint; a prompt cannot guarantee hardware compatibility or recovery.'}
      </p>
      <p className="prompt-meta">
        {bn ? 'প্রম্পট সংস্করণ' : 'Prompt revision'}: {promptRevision} ·{' '}
        {platform === 'windows' ? 'Windows' : 'macOS'} ·{' '}
        {bn ? 'উত্তর: বাংলা' : 'Replies: English'}
      </p>
      <CopyCode
        scrollable
        text={buildLlmPrompt(locale, platform)}
        label={bn ? 'সম্পূর্ণ LLM প্রম্পট' : 'Complete LLM prompt'}
        labels={{ ...t, copy: bn ? 'পুরো প্রম্পট কপি' : 'Copy full prompt' }}
      />
    </section>
  );
}
