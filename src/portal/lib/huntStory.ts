export interface HuntStoryBeat {
    title: string;
    lines: string[];
}

export const HUNT_STORY_BEATS: Record<number, HuntStoryBeat> = {
    1: {
        title: 'NFCC START',
        lines: [
            'The flaws were not in the tools. They were in the applications.',
        ],
    },
    2: {
        title: 'Trace One',
        lines: [
            'They left their mark where no one looks for logic.',
        ],
    },
    3: {
        title: 'Trace Two',
        lines: [
            'They modified the system. But traces do not disappear.',
        ],
    },
    4: {
        title: 'False Calm',
        lines: [
            'No exploits. No traces.',
            'Just a player... or so it seemed.',
        ],
    },
    5: {
        title: 'Room Player',
        lines: [
            'Everyone played the game.',
            'One played the room.',
            'Look for the guy with the hidden QR on his shirt.',
        ],
    },
    6: {
        title: 'Vertical Move',
        lines: [
            'They did not stay on one level.',
            'Neither should you.',
        ],
    },
    7: {
        title: 'Blind Spot',
        lines: [
            "You've seen this a hundred times.",
            'Never looked twice.',
        ],
    },
    8: {
        title: 'Obvious Trap',
        lines: [
            'Somewhere dumb.',
            'Should it be this obvious??',
        ],
    },
    9: {
        title: 'Backtrack',
        lines: [
            'Not everything moves forward.',
            'Ah shit, here we go again.',
            'Back at the dock.',
        ],
    },
    10: {
        title: 'Final Sweep',
        lines: [
            'You now have all the traces.',
            'Reconstruct the path and finish the hunt.',
        ],
    },
};

export function getHuntStoryBeat(sortOrder: number): HuntStoryBeat | null {
    return HUNT_STORY_BEATS[sortOrder] ?? null;
}
