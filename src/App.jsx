import { GenerateButton } from '@components/GenerateButton';
import { Header } from '@components/Header';
import { LocalesButton } from '@components/LocalesButton';
import { Password } from '@components/Password';
import { Settings } from '@components/Settings';
import { Slider } from '@components/Slider';
import { useKonamiCode } from '@hooks/useKonamiCode';
import { useCrigneMode } from '@store/store';
import { playWisp } from '@utils/playWisp';

function App() {
    const activeCringeMode = useCrigneMode((state) => state.activeCringeMode);

    useKonamiCode(() => {
        playWisp();
        activeCringeMode();
    });

    return (
        <>
            <LocalesButton />
            <Header />
            <Password />
            <Slider />
            <Settings />
            <GenerateButton />
        </>
    );
}

export default App;
