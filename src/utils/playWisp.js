import wisp from '@assets/wisp.mp3';

export function playWisp() {
    const audio = new Audio(wisp);
    audio.play();
}
