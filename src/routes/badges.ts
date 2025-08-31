import CatgirlBadge from "./(main)/(profiles)/@[user]/badges/CatgirlBadge.svelte";
import FemaleGenderBadge from "./(main)/(profiles)/@[user]/badges/FemaleGenderBadge.svelte";
import FoxBadge from "./(main)/(profiles)/@[user]/badges/FoxBadge.svelte";
import Transgender from "./(main)/(profiles)/@[user]/badges/Transgender.svelte";

export default {
    FOX: {
        icon: "/strawberryfox.jpg",
        displayName: "Fox",
        component: FoxBadge
    },
    MYTHIC_LUNR: {
        icon: "https://cdn3.emoji.gg/emojis/49760-purple-moon.png",
        displayName: "Mythic Lunr",
        description: "Get a project featured with mythic."
    },
    LEGENDARY_CREATOR: {
        icon: "https://cdn3.emoji.gg/emojis/858089-pixelstarblue.png",
        displayName: "Legendary Creator",
        description: "Get a project featured with legendary"
    },
    FAV_CREATOR: {
        icon: "https://cdn3.emoji.gg/emojis/51519-pastelstar.png",
        displayName: "Favorite Creator",
        description: "This user is a trusted creator by the MCBETools staff!"
    },
    BIRTHDAY: {
        icon: "https://cdn3.emoji.gg/emojis/55494-cakey.png",
        displayName: "Birthday",
        description: "Today is this users special day!"
    },
    CATGIRL: {
        icon: "https://i.ibb.co/Q70tKg9/584ac4673ac3a570f94a6671.png",
        displayName: "Catgirl",
        component: CatgirlBadge
    },
    FEMALE: {
        icon: "https://cdn3.emoji.gg/emojis/28497-cutelittleheart.gif",
        displayName: "Female",
        description: "Secret :3",
        component: FemaleGenderBadge
    },
    CREATOR: {
        icon: "/creatorbadge.png",
        displayName: "Creator",
        description: "This person is a verified creator!"
    },
    AGENDER: {
        selectable: true,
        icon: "/pride/agender.gif",
        displayName: "Agender <3",
        description: "This user is a part of the agender community",
        component: Transgender
    },
    AROMANTIC: {
        selectable: true,
        icon: "/pride/aromantic.gif",
        displayName: "Aromantic <3",
        description: "This user is a part of the aromantic community",
        component: Transgender
    },
    ASEXUAL: {
        selectable: true,
        icon: "/pride/asexual.gif",
        displayName: "Asexual <3",
        description: "This user is a part of the asexual community",
        component: Transgender
    },
    BIGENDER: {
        selectable: true,
        icon: "/pride/bigender.gif",
        displayName: "Bigender <3",
        description: "This user is a part of the bigender community",
        component: Transgender
    },
    BISEXUAL: {
        selectable: true,
        icon: "/pride/bisexual.gif",
        displayName: "Bisexual <3",
        description: "This user is a part of the bisexual community",
        component: Transgender
    },
    TRANS: {
        selectable: true,
        icon: "/pride/transgender.gif",
        displayName: "Trans <3",
        description: "This user is a part of the transgender community",
        component: Transgender
    },

    DEMIBOY: {
        selectable: true,
        icon: "/pride/demiboy.gif",
        displayName: "Demiboy <3",
        description: "This user is a part of the demiboy community",
        component: Transgender
    },
    DEMIGIRL: {
        selectable: true,
        icon: "/pride/demigirl.gif",
        displayName: "Demigirl <3",
        description: "This user is a part of the demigirl community",
        component: Transgender
    },
    DEMINONBINARY: {
        selectable: true,
        icon: "/pride/deminonbinary.gif",
        displayName: "Deminonbinary <3",
        description: "This user is a part of the deminonbinary community",
        component: Transgender
    },
    DEMISEXUAL: {
        selectable: true,
        icon: "/pride/demisexual.gif",
        displayName: "Demisexual <3",
        description: "This user is a part of the demisexual community",
        component: Transgender
    },
    GAY: {
        selectable: true,
        icon: "/pride/gay.gif",
        displayName: "Gay <3",
        description: "This user is a part of the gay community",
        component: Transgender
    },
    GENDERFLUID: {
        selectable: true,
        icon: "/pride/genderfluid.gif",
        displayName: "Genderfluid <3",
        description: "This user is a part of the genderfluid community",
        component: Transgender
    },
    GENDERQUEER: {
        selectable: true,
        icon: "/pride/genderqueer.gif",
        displayName: "Genderqueer <3",
        description: "This user is a part of the genderqueer community",
        component: Transgender
    },
    INTERSEX: {
        selectable: true,
        icon: "/pride/intersex.gif",
        displayName: "Intersex <3",
        description: "This user is a part of the intersex community",
        component: Transgender
    },
    LESBIAN: {
        selectable: true,
        icon: "/pride/lesbian.gif",
        displayName: "Lesbian <3",
        description: "This user is a part of the lesbian community",
        component: Transgender
    },
    NONBINARY: {
        selectable: true,
        icon: "/pride/nonbinary.gif",
        displayName: "Nonbinary <3",
        description: "This user is a part of the nonbinary community",
        component: Transgender
    },
    OMNISEXUAL: {
        selectable: true,
        icon: "/pride/omnisexual.gif",
        displayName: "Omnisexual <3",
        description: "This user is a part of the omnisexual community",
        component: Transgender
    },
    PANSEXUAL: {
        selectable: true,
        icon: "/pride/pansexual.gif",
        displayName: "Pansexual <3",
        description: "This user is a part of the pansexual community",
        component: Transgender
    },
    PLURAL: {
        selectable: true,
        icon: "/pride/plural.gif",
        displayName: "Plural <3",
        description: "This user is a part of the plural community",
        component: Transgender
    },
    POLYAMOROUS: {
        selectable: true,
        icon: "/pride/polyamorous.gif",
        displayName: "Polyamorous <3",
        description: "This user is a part of the polyamorous community",
        component: Transgender
    },
    POLYSEXUAL: {
        selectable: true,
        icon: "/pride/polysexual.gif",
        displayName: "Polysexual <3",
        description: "This user is a part of the polysexual community",
        component: Transgender
    },
    BETA_USER: {
        icon: "https://cdn3.emoji.gg/emojis/50195-pxl-primo.png",
        displayName: "Beta User",
        description: "This was one of the first users on MCBETools (account made before January 1, 2025)"
    },
    DEV: {
        icon: "https://cdn3.emoji.gg/emojis/7404-oldofficecomputer.png",
        displayName: "MCBETOOLS DEVELOPER"
    },
    SUPPORTER_TIER1: {
        icon: "https://cdn3.emoji.gg/emojis/7695-lightorangespinningpixelheart.gif",
        displayName: "Supporter (Tier I)",
        description: "WIP"
    },
    SUPPORTER_TIER2: {
        icon: "https://cdn3.emoji.gg/emojis/8853-limespinningpixelheart.gif",
        displayName: "Supporter (Tier II)",
        description: "WIP"
    },
    SUPPORTER_TIER3: {
        icon: "https://cdn3.emoji.gg/emojis/10173-pinkpixelheart.gif",
        displayName: "Supporter (Tier III)",
        description: "WIP"
    },
    SUPPORTER_TIER4: {
        icon: "https://cdn3.emoji.gg/emojis/6132-lightblue-heartspin.gif",
        displayName: "Supporter (Tier IV)",
        description: "SECRETTTT"
    },

    BETA_TESTER: {
        icon: "https://cdn3.emoji.gg/emojis/99124-catsweet.gif",
        displayName: "Beta Tester",
        description: "This user is a beta tester for MCBETools (very unfortunate, i know)"
    },

}