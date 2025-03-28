import { defaultParameters } from '@utils/defaultParameters';
import { generateCharset } from '@utils/generateCharset';
import { generatePassword } from '@utils/generatePassword';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const {
    passwordLength,
    recommendedPasswordLength,
    minPasswordLength,
    maxPasswordLength,
    minValue,
    maxValue,
    passwordCount,
} = defaultParameters;

const letters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '1234567890';
const specialSymbols = '!@#$%^&*()-_+=;:,./?\\|`~[]{}';

const settings = {
    upperCase: {
        title: 'Прописные буквы',
        charset: letters.toUpperCase(),
        state: true,
    },
    lowerCase: {
        title: 'Строчные буквы',
        charset: letters,
        state: true,
    },
    numbers: {
        title: 'Цифры',
        charset: numbers,
        state: true,
    },
    specialSymbols: {
        title: 'Специальные символы',
        charset: specialSymbols,
        state: true,
    },
};

function validateState(state) {
    let {
        minPasswordLength,
        maxPasswordLength,
        passwordLength,
        recommendedPasswordLength,
        passwordCount,
    } = state;

    passwordCount = Math.max(minValue, passwordCount);
    passwordCount = Math.min(passwordCount, maxValue);

    minPasswordLength = Math.max(minValue, minPasswordLength);
    minPasswordLength = Math.min(minPasswordLength, maxPasswordLength - 1);

    maxPasswordLength = Math.max(minPasswordLength + 1, maxPasswordLength);
    maxPasswordLength = Math.min(maxPasswordLength, maxValue);

    passwordLength = Math.max(
        minPasswordLength,
        Math.min(passwordLength, maxPasswordLength)
    );

    recommendedPasswordLength = Math.max(
        minPasswordLength,
        Math.min(recommendedPasswordLength, maxPasswordLength)
    );

    return {
        ...state,
        minPasswordLength,
        maxPasswordLength,
        passwordLength,
        recommendedPasswordLength,
        passwordCount,
    };
}

export const useSettings = create(
    persist(
        (set, get) => ({
            minValue,
            maxValue,

            settings,
            passwordLength,
            minPasswordLength,
            maxPasswordLength,
            recommendedPasswordLength,
            passwordCount,

            setPasswordCount: (newCount) =>
                set((state) =>
                    validateState({
                        ...state,
                        passwordCount: newCount,
                    })
                ),

            setMinPasswordLength: (newMin) =>
                set((state) =>
                    validateState({
                        ...state,
                        minPasswordLength: newMin,
                    })
                ),

            setMaxPasswordLength: (newMax) =>
                set((state) =>
                    validateState({
                        ...state,
                        maxPasswordLength: newMax,
                    })
                ),

            setPasswordLength: (newLength) =>
                set((state) =>
                    validateState({
                        ...state,
                        passwordLength: newLength,
                    })
                ),

            setRecommendedPasswordLength: (newRecLength) =>
                set((state) =>
                    validateState({
                        ...state,
                        recommendedPasswordLength: newRecLength,
                    })
                ),

            onlyOneStateTrue: false,
            checkOnlyOneStateTrue: () => {
                set(() => {
                    const settings = get().settings;
                    let trueCount = 0;
                    for (const key in settings) {
                        if (settings[key].state) {
                            trueCount++;
                        }
                    }
                    return { onlyOneStateTrue: trueCount === 1 };
                });
            },

            getSetting: (setting) => get().settings[setting],
            setSetting: (setting, value) =>
                set((state) => ({
                    settings: { ...state.settings, [setting]: value },
                })),
        }),
        {
            name: 'settings',
            merge: (persistedState, currentState) => {
                if (!persistedState) return currentState;
                const merged = {
                    ...currentState,
                    ...persistedState,
                    settings: {
                        ...currentState.settings,
                        ...persistedState.settings,
                    },
                };
                return validateState(merged);
            },
        }
    )
);

export const usePassword = create((set) => ({
    passwords: [],
    generatePassword: () => {
        set(() => {
            const setting = useSettings.getState().settings;
            const passwordLength = useSettings.getState().passwordLength;
            const passwordCount = useSettings.getState().passwordCount;
            const charset = generateCharset(setting);

            const passwords = [];

            for (let i = 0; i < passwordCount; i++) {
                const password = generatePassword(charset, passwordLength);
                passwords.push(password);
            }
            return { passwords };
        });
    },
}));

export const useCrigneMode = create((set) => ({
    cringeMode: false,
    activeCringeMode: () => {
        set(() => ({
            cringeMode: true,
        }));
    },
}));

export const useAdvancedMode = create(
    persist(
        (set) => ({
            advancedMode: false,
            setAdvancedMode: (advancedMode) => {
                set(() => ({
                    advancedMode,
                }));
            },
        }),
        {
            name: 'advancedMode',
        }
    )
);

export const useLanguage = create(
    persist(
        (set) => ({
            language: 'ru',
            setLanguage: (language) => {
                set(() => ({
                    language,
                }));
            },
        }),
        {
            name: 'language',
        }
    )
);

export const useModal = create((set) => ({
    isOpenModal: false,
    setIsOpenModal: (isOpenModal) => {
        set(() => ({
            isOpenModal,
        }));
    },
}));
