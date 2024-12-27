import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generatePassword } from '@utils/generatePassword';
import { generateCharset } from '@utils/generateCharset';

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
        state: false,
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

const passwordLength = 16;
const recommendedPasswordLength = 16;
const minPasswordLength = 10;
const maxPasswordLength = 64;

export const useSettings = create(
    persist(
        (set, get) => ({
            settings,
            passwordLength,
            recommendedPasswordLength,
            minPasswordLength,
            maxPasswordLength,

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

            setPasswordLength: (passwordLength) =>
                set(() => ({
                    passwordLength,
                })),

            getSetting: (setting) => get().settings[setting],
            setSetting: (setting, value) =>
                set((state) => ({
                    settings: { ...state.settings, [setting]: value },
                })),
        }),
        {
            name: 'settings',
        }
    )
);

export const usePassword = create((set) => ({
    password: '',
    generatePassword: () => {
        set(() => {
            const setting = useSettings.getState().settings;
            const passwordLength = useSettings.getState().passwordLength;
            const charset = generateCharset(setting);
            const password = generatePassword(charset, passwordLength);
            return { password };
        });
    },
}));

// export const useCrigneMode = create((set) => ({
//     cringeMode: false,
//     activeCringeMode: () => {
//         set(() => ({
//             cringeMode: true,
//         }));
//     },
// }));
