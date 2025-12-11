import { useState } from 'react';
import { downloadConfig, copyToClipboard } from '../utils/configGenerator';

interface ConfigPreviewProps {
  config: string;
}

export function ConfigPreview({ config }: ConfigPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(config);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    downloadConfig(config, 'logid.cfg');
  };

  return (
    <div className="config-preview">
      <div className="preview-header">
        <h3>Generated Configuration</h3>
        <div className="preview-actions">
          <button className="action-btn copy-btn" onClick={handleCopy}>
            {copied ? '✓ Copied!' : 'Copy to Clipboard'}
          </button>
          <button className="action-btn download-btn" onClick={handleDownload}>
            Download logid.cfg
          </button>
        </div>
      </div>
      <div className="preview-content">
        <pre><code>{config}</code></pre>
      </div>
      <div className="preview-instructions">
        <h4>Installation Instructions</h4>
        <ol>
          <li>Save the configuration file as <code>/etc/logid.cfg</code></li>
          <li>
            Restart the logid service:
            <pre>sudo systemctl restart logid</pre>
          </li>
          <li>
            Or reload the configuration:
            <pre>sudo pkill -HUP logid</pre>
          </li>
        </ol>
        <p className="note">
          Make sure you have <a href="https://github.com/PixlOne/logiops" target="_blank" rel="noopener noreferrer">logiops</a> installed on your system.
        </p>
      </div>
    </div>
  );
}
