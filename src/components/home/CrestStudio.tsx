'use client';

import { useState } from 'react';
import Crest3D from './Crest3D';

export function CrestStudio() {
    const [recording, setRecording] = useState(false);
    const [model, setModel] = useState<'crest' | 'letters'>('crest');
    return <>
        <div className="studio-model-selector" role="group" aria-label="Model">
            <button disabled={recording} type="button" aria-pressed={model === 'crest'} onClick={() => setModel('crest')}>Full crest</button>
            <button disabled={recording} type="button" aria-pressed={model === 'letters'} onClick={() => setModel('letters')}>ΑΚΣ letters</button>
        </div>
        <Crest3D studio variant={model} onRecordingChange={setRecording} />
    </>;
}
