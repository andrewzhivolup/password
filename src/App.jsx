import { GenerateButton } from '@components/GenerateButton';
import { Header } from '@components/Header';
import { Password } from '@components/Password';
import { Settings } from '@components/Settings';
import { Slider } from '@components/Slider';

function App() {
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
