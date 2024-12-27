import { GenerateButton } from '@components/GenerateButton';
import { Header } from '@components/Header';
import { Password } from '@components/Password';
import { Settings } from '@components/Settings';
import { Slider } from '@components/Slider';
import { useCrigneMode } from '@store/store';
import { useKonamiCode } from '@hooks/useKonamiCode';
import { playWisp } from '@utils/playWisp';

function App() {
    const activeCringeMode = useCrigneMode((state) => state.activeCringeMode);

    useKonamiCode(() => {
        playWisp();
        activeCringeMode();
    });

    return (
        <>
            <Header />
            <Password />
            <Slider />
            <Settings />
            <GenerateButton />
        </>
    );
}

export default App;
