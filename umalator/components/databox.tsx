import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { HorseState } from '../../components/HorseDefTypes';

interface Props {
    uma1: HorseState;
    setUma1: (uma: HorseState) => void;
    
    uma2: HorseState;
    setUma2: (uma: HorseState) => void;
    storageKey: string;
}

export function HorseStateStorageBox({ uma1, setUma1, uma2, setUma2, storageKey }: Props) {
    const [storedData, setStoredData] = useState<HorseState | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setStoredData(new HorseState(JSON.parse(saved)));
        }
    }, []);

    function saveToLocal(uma: HorseState) {
        try {
            localStorage.setItem(storageKey, JSON.stringify(uma.toJS()));
            setStoredData(uma);
        } catch (e) {
        }
    }

    function loadFromLocal(uma: HorseState, setUma: (uma: HorseState) => void) {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved) {
                setUma(new HorseState(JSON.parse(saved)));
            }
        } catch (e) {
        }
    }

    return (
        <div style={{ border: '1px solid', padding: 12, borderRadius: 6, margin: 8 }}>
            <button onClick={() => saveToLocal(uma1)}>Save 1</button>
            <button onClick={() => saveToLocal(uma2)}>Save 2</button>
            {
                storedData &&
                <>
                    <button onClick={() => loadFromLocal(storedData, setUma1)} style={{ marginLeft: 8 }}>Load to 1</button>
                    <button onClick={() => loadFromLocal(storedData, setUma2)} style={{ marginLeft: 8 }}>Load to 2</button>
                    {JSON.stringify(storedData.toJS(), null, 2)}
                </>
            }
        </div>
    );
}