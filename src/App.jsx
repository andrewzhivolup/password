import { GenerateButton } from '@components/GenerateButton';
import { Header } from '@components/Header';
import { OverlayButtons } from '@components/OverlayButtons';
import { Password } from '@components/Password';
import { Settings } from '@components/Settings';
import { Slider } from '@components/Slider';
import { useKonamiCode } from '@hooks/useKonamiCode';
import { useColor, useCrigneMode } from '@store';
import { playWisp } from '@utils/playWisp';
import { ConfigProvider } from 'antd';

function App() {
    const activeCringeMode = useCrigneMode((state) => state.activeCringeMode);
    const primaryColor = useColor((state) => state.primaryColor);

    useKonamiCode(() => {
        playWisp();
        activeCringeMode();
    });

    return (
        <>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: primaryColor,
                        colorLink: primaryColor,
                        // colorSuccess: primaryColor,
                    },
                }}
            >
                <OverlayButtons />
                <Header />
                <Password />
                <Slider />
                <Settings />
                <GenerateButton />
            </ConfigProvider>
        </>
    );
}

export default App;
