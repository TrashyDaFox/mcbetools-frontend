import AddonProp from "./AddonProp.svelte";
import AlertProp from "./AlertProp.svelte";
import CatProp from "./CatProp.svelte";
import FlagProp from "./FlagProp.svelte";
import FoxProp from "./FoxProp.svelte";
import LeafProp from "./LeafProp.svelte";
import MapProp from "./MapProp.svelte";
import MonetizedProp from "./MonetizedProp.svelte";
import MoonProp from "./MoonProp.svelte";
import OssProp from "./OSSProp.svelte";
import RpProp from "./RPProp.svelte";
import ScriptProp from "./ScriptProp.svelte";
import ServerProp from "./ServerProp.svelte";
import SparkleProp from "./SparkleProp.svelte";
import StarProp from "./StarProp.svelte";
import UtilityProp from "./UtilityProp.svelte";
import VersionTagProp from "./VersionTagProp.svelte";

export default {
    "SERVER": {
        prop: ServerProp,
        class: "variant-soft-primary",
        activeClass: "variant-filled-primary",
        localizedName: "Server"
    },
    "ADDON": {
        prop: AddonProp,
        class: "variant-soft-secondary",
        activeClass: "variant-filled-secondary",
        localizedName: "Addon"
    },
    "SCRIPT": {
        prop: ScriptProp,
        class: "variant-soft-secondary",
        activeClass: "variant-filled-secondary",
        localizedName: "Script"
    },
    "UTILITY": {
        prop: UtilityProp,
        class: "variant-soft-tertiary",
        activeClass: "variant-filled-tertiary",
        localizedName: "Utility"
    },
    "RESOURCEPACK": {
        prop: RpProp,
        class: "variant-soft-success",
        activeClass: "variant-filled-success",
        localizedName: "Resource Pack"
    },
    "MAP": {
        prop: MapProp,
        class: "variant-soft-warning",
        activeClass: "variant-filled-warning",
        localizedName: "Map"
    },
    "JOKE": {
        prop: FlagProp,
        class: "variant-soft-quinary",
        activeClass: "variant-filled-quinary",
        localizedName: "Joke Projects"
    },
    "FILLER": {
        prop: FlagProp,
        class: "variant-soft-error",
        activeClass: "variant-filled-error",
        localizedName: "Filler Content"
    },
    "FUN": {
        prop: SparkleProp,
        class: "variant-soft-septenary",
        activeClass: "variant-filled-septenary",
        localizedName: "Fun"
    },
    "SKINPACK": {
        prop: RpProp,
        class: "variant-soft-success",
        activeClass: "variant-filled-success",
        localizedName: "Skin Pack"
    },
    "FOX": {
        prop: FoxProp,
        class: "variant-soft-tertiary",
        activeClass: "variant-filled-tertiary",
        localizedName: "Fox"
    },
    "CATGIRL": {
        prop: FoxProp,
        class: "variant-soft-secondary",
        activeClass: "variant-filled-secondary",
        localizedName: "Catgirl"
    },
    "ADLINK": {
        prop: AlertProp,
        class: "variant-soft-warning",
        activeClass: "variant-filled-warning",
        localizedName: "Ad Link"
    },
    "PAID": {
        prop: MonetizedProp,
        class: "variant-soft-success",
        activeClass: "variant-filled-success",
        localizedName: "Paid Content"
    },
    "PARTIALLY PAID": {
        prop: MonetizedProp,
        class: "variant-soft-warning",
        activeClass: "variant-filled-warning",
        localizedName: "Partially Paid"
    },
    "FORK": {
        prop: OssProp,
        class: "variant-soft-nonary",
        activeClass: "variant-filled-nonary",
        localizedName: "Forked Project"
    },
    "EXTERNAL DOWNLOAD": {
        prop: AlertProp,
        class: "variant-soft-warning",
        activeClass: "variant-filled-warning",
        localizedName: "External Download"
    },
    "WIP": {
        prop: FlagProp,
        class: "variant-soft-error",
        activeClass: "variant-filled-error",
        localizedName: "Work in Progress"
    },
    "MEOW": {
        prop: FoxProp,
        class: "variant-soft-primary",
        activeClass: "variant-filled-primary",
        localizedName: "Meow"
    },
    "BETA": {
        prop: VersionTagProp,
        class: "variant-soft-primary",
        activeClass: "variant-filled-primary",
        localizedName: "Beta Version"
    },
    "ALPHA": {
        prop: VersionTagProp,
        class: "variant-soft-secondary",
        activeClass: "variant-filled-secondary",
        localizedName: "Alpha Version"
    },
    "EARLY ACCESS": {
        prop: VersionTagProp,
        class: "variant-soft-tertiary",
        activeClass: "variant-filled-tertiary",
        localizedName: "Early Access"
    },
    "ESSENTIALS": {
        prop: UtilityProp,
        class: "variant-soft-tertiary",
        activeClass: "variant-filled-tertiary",
        localizedName: "Essentials"
    },
    "LEAF": {
        prop: LeafProp,
        class: "variant-soft-success",
        activeClass: "variant-filled-success",
        localizedName: "Leaf"
    },
    "FEATURED": {
        prop: StarProp,
        class: "variant-filled-warning",
        activeClass: "variant-filled",
        localizedName: "Featured"
    },
    "LEGENDARY": {
        prop: StarProp,
        class: "variant-filled-primary",
        activeClass: "variant-filled",
        localizedName: "Legendary"
    },
    "MYTHIC": {
        prop: MoonProp,
        class: "variant-filled-success",
        activeClass: "variant-filled",
        localizedName: "Mythic"
    },
    "PLASMATIC": {
        prop: MoonProp,
        class: "variant-soft-senary",
        activeClass: "variant-filled-senary",
        localizedName: "Plasmatic"
    },
    "CELESTIAL": {
        prop: MoonProp,
        class: "variant-soft-nonary",
        activeClass: "variant-filled-nonary",
        localizedName: "Celestial"
    },
    "VANILLA_IMPROVEMENTS": {
        prop: SparkleProp,
        class: "variant-soft-octonary",
        activeClass: "variant-filled-octonary",
        localizedName: "Vanilla+"
    },
    "HIGH_END": {
        prop: SparkleProp,
        class: "variant-soft-septenary",
        activeClass: "variant-filled-septenary",
        localizedName: "High End"
    },
    "CUTE": {
        prop: CatProp,
        class: "variant-soft-senary",
        activeClass: "variant-filled-senary",
        localizedName: "Kawaii"
    },
    "COLLAB": {
        prop: SparkleProp,
        class: "variant-soft-nonary",
        activeClass: "variant-filled-nonary",
        localizedName: "Collab"
    },
    "PVP": {
        prop: FlagProp,
        class: "variant-soft-error",
        activeClass: "variant-filled-error",
        localizedName: "PvP"
    },
    "MINIGAME": {
        prop: SparkleProp,
        class: "variant-soft-warning",
        activeClass: "variant-filled-warning",
        localizedName: "Minigame"
    },
    "SURVIVAL": {
        prop: LeafProp,
        class: "variant-soft-success",
        activeClass: "variant-filled-success",
        localizedName: "Survival"
    },
    "CREATIVE": {
        prop: SparkleProp,
        class: "variant-soft-secondary",
        activeClass: "variant-filled-secondary",
        localizedName: "Creative"
    },
    "SKYGEN": {
        prop: StarProp,
        class: "variant-soft-primary",
        activeClass: "variant-filled-primary",
        localizedName: "SkyGen"
    },
    "ROLEPLAY": {
        prop: SparkleProp,
        class: "variant-soft-tertiary",
        activeClass: "variant-filled-tertiary",
        localizedName: "Roleplay"
    },
    "LIFESTEAL": {
        prop: AlertProp,
        class: "variant-soft-error",
        activeClass: "variant-filled-error",
        localizedName: "Lifesteal"
    },
    "SKYBLOCK": {
        prop: MapProp,
        class: "variant-soft-primary",
        activeClass: "variant-filled-primary",
        localizedName: "Skyblock"
    }

}
