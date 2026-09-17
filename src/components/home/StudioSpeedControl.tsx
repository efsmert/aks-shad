'use client';

import { useId, useRef, useState } from 'react';

export function StudioSpeedControl({ value, onChange }: { value: number; onChange: (value: number) => void }) {
    const id = useId();
    const [draft, setDraft] = useState<string | null>(null);
    const dragging = useRef(false);
    const commit = () => {
        const parsed = Number(draft);
        if (draft?.trim() && Number.isFinite(parsed)) onChange(Math.min(4, Math.max(.25, parsed)));
        setDraft(null);
    };

    return <div className="studio-speed">
        <label htmlFor={`${id}-slider`}>Lighting speed</label>
        <div className="studio-speed-track">
            <input id={`${id}-slider`} type="range" min={-100} max={100} step={1}
                value={Math.log(value) / Math.log(4) * 100}
                aria-valuetext={`${value.toFixed(2)} times normal speed`}
                onPointerDown={() => { dragging.current = true; }}
                onPointerUp={() => { dragging.current = false; }}
                onKeyDown={() => { dragging.current = false; }}
                onChange={event => {
                    const position = Number(event.target.value);
                    setDraft(null);
                    // Equal travel on either side of 1×, with a small magnetic center.
                    onChange(dragging.current && Math.abs(position) <= 3 ? 1 : Number((4 ** (position / 100)).toFixed(2)));
                }} />
            <div className="studio-speed-scale" aria-hidden="true"><span>0.25×</span><span>1×</span><span>4×</span></div>
        </div>
        <div className="studio-speed-value">
            <input type="number" aria-label="Exact lighting speed" min={.25} max={4} step={.01}
                value={draft ?? value.toFixed(2)}
                onChange={event => {
                    setDraft(event.target.value);
                    const next = Number(event.target.value);
                    if (next >= .25 && next <= 4) onChange(next);
                }}
                onBlur={commit}
                onKeyDown={event => { if (event.key === 'Enter') event.currentTarget.blur(); }} />
            <span aria-hidden="true">×</span>
        </div>
        <button type="button" onClick={() => { setDraft(null); onChange(1); }}>Reset 1×</button>
    </div>;
}
