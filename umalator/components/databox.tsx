import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { HorseState, SkillSet } from '../../components/HorseDefTypes';
import { Record, Set as ImmSet, Map as ImmMap } from 'immutable';
import umas from '../../umas.json';
import icons from '../../icons.json';


interface Props {
    uma1: HorseState;
    setUma1: (uma: HorseState) => void;
    
    uma2: HorseState;
    setUma2: (uma: HorseState) => void;
    storageKey: string;
}

function deserializeUma(json:string): HorseState {
	const o = JSON.parse(json);
	return new HorseState(o)
		.set('skills', SkillSet(o.skills))
		.set('forcedSkillPositions', ImmMap(o.forcedSkillPositions || {}))
}

export function HorseStateStorageBox({ uma1, setUma1, uma2, setUma2, storageKey }: Props) {
    const [storedData, setStoredData] = useState<HorseState | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            setStoredData(deserializeUma(saved));
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
                setUma(deserializeUma(saved));
            }
        } catch (e) {
        }
    }
    console.log(storedData)
    console.log(umas)

    return (
        <div style={{ border: '1px solid', padding: 12, borderRadius: 6, margin: 8 }}>
            <button onClick={() => saveToLocal(uma1)}>Save 1</button>
            <button onClick={() => saveToLocal(uma2)}>Save 2</button>
            {
                storedData &&
                <>
                    <button onClick={() => loadFromLocal(storedData, setUma1)} style={{ marginLeft: 8 }}>Load to 1</button>
                    <button onClick={() => loadFromLocal(storedData, setUma2)} style={{ marginLeft: 8 }}>Load to 2</button>
                    {storedData.outfitId ? 
                        <>
							<div data-uma-id={storedData.outfitId} class="umaSuggestion">
								<img src={icons[storedData.outfitId]} />
                                <span>
                                    {umas[storedData.outfitId.slice(0,4)].outfits[storedData.outfitId]} {umas[storedData.outfitId.slice(0,4)].name[1]}
                                </span>
							</div>
                        </>
                    : 
                        null
                    }

                </>
            }
        </div>
    );
}