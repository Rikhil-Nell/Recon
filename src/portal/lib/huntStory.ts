export interface HuntStoryBeat {
    title: string;
    lines: string[];
}

export const HUNT_STORY_BEATS: Record<number, HuntStoryBeat> = {
    1: {
        title: 'Cipher Strip',
        lines: [
            'Start with the oldest field cipher in the folder.',
            'The men are dancing for a reason.',
        ],
    },
    2: {
        title: 'Unknown Symbols',
        lines: [
            'Not every alphabet looks like letters.',
            'Some of them came out of a cartridge.',
        ],
    },
    3: {
        title: 'Signal Posture',
        lines: [
            'Read the positions, not the costume.',
            'The body is the message.',
        ],
    },
    4: {
        title: 'Moon Script',
        lines: [
            'Curves, crescents, and fragments.',
            'Translate the pattern before you move on.',
        ],
    },
    5: {
        title: 'Dot Matrix',
        lines: [
            'The page looks silent until you read the dots.',
            'Optical ciphers still count as ciphers.',
        ],
    },
    6: {
        title: 'Decoy Scan',
        lines: [
            'The first scan is supposed to waste your time.',
            'Look past the obvious payload.',
        ],
    },
    7: {
        title: 'Metadata Trail',
        lines: [
            'The image is only half the evidence.',
            'The rest is hiding in the file itself.',
        ],
    },
};

export function getHuntStoryBeat(sortOrder: number): HuntStoryBeat | null {
    return HUNT_STORY_BEATS[sortOrder] ?? null;
}
