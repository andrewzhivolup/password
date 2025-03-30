import { useSettings } from '@store';
import { defaultParameters } from '@utils/defaultParameters';

export const useResetSettings = () => {
    const {
        setMinPasswordLength,
        setMaxPasswordLength,
        setPasswordLength,
        setRecommendedPasswordLength,
        setPasswordCount,
    } = useSettings();

    return () => {
        const {
            passwordLength,
            recommendedPasswordLength,
            minPasswordLength,
            maxPasswordLength,
            passwordCount,
        } = defaultParameters;

        setMinPasswordLength(minPasswordLength);
        setMaxPasswordLength(maxPasswordLength);
        setPasswordLength(passwordLength);
        setRecommendedPasswordLength(recommendedPasswordLength);
        setPasswordCount(passwordCount);
    };
};
