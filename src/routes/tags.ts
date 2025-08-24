import AddonProp from "./AddonProp.svelte";
import AlertProp from "./AlertProp.svelte";
import FlagProp from "./FlagProp.svelte";
import FoxProp from "./FoxProp.svelte";
import LeafProp from "./LeafProp.svelte";
import MapProp from "./MapProp.svelte";
import MonetizedProp from "./MonetizedProp.svelte";
import OssProp from "./OSSProp.svelte";
import RpProp from "./RPProp.svelte";
import ScriptProp from "./ScriptProp.svelte";
import ServerProp from "./ServerProp.svelte";
import UtilityProp from "./UtilityProp.svelte";
import VersionTagProp from "./VersionTagProp.svelte";

export default {
    "SERVER": {
        prop: ServerProp,
        class: "variant-soft-primary",
        activeClass: "variant-filled-primary"
    },
    "ADDON": {
        prop: AddonProp,
        class: "variant-soft-secondary",
        activeClass: "variant-filled-secondary"
    },
    "SCRIPT": {
        prop: ScriptProp,
        class: "variant-soft-secondary",
        activeClass: "variant-filled-secondary"
    },
    "UTILITY": {
        prop: UtilityProp,
        class: "variant-soft-tertiary",
        activeClass: "variant-filled-tertiary"
    },
    "RESOURCEPACK": {
        prop: RpProp,
        class: "variant-soft-success",
        activeClass: "variant-filled-success"
    },
    "MAP": {
        prop: MapProp,
        class: "variant-soft-warning",
        activeClass: "variant-filled-warning"
    },
    "JOKE": {
        prop: FlagProp,
        class: "variant-soft-error",
        activeClass: "variant-filled-error"
    },
    "FILLER": {
        prop: FlagProp,
        class: "variant-soft-error",
        activeClass: "variant-filled-error"
    },
    "FUN": {
        prop: FlagProp,
        class: "variant-soft-error",
        activeClass: "variant-filled-error"
    },
    "SKINPACK": {
        prop: RpProp,
        class: "variant-soft-success",
        activeClass: "variant-filled-success"
    },
    "FOX": {
        prop: FoxProp,
        class: "variant-soft-tertiary",
        activeClass: "variant-filled-tertiary"
    },
    "CATGIRL": {
        prop: FoxProp,
        class: "variant-soft-secondary",
        activeClass: "variant-filled-secondary"
    },
    "ADLINK": {
        prop: AlertProp,
        class: "variant-soft-warning",
        activeClass: "variant-filled-warning"
    },
    "PAID": {
        prop: MonetizedProp,
        class: "variant-soft-success",
        activeClass: "variant-filled-success"
    },
    "PARTIALLY PAID": {
        prop: MonetizedProp,
        class: "variant-soft-warning",
        activeClass: "variant-filled-warning"
    },
    "FORK": {
        prop: OssProp,
        class: "variant-soft-primary",
        activeClass: "variant-filled-primary"
    },
    "EXTERNAL DOWNLOAD": {
        prop: AlertProp,
        class: "variant-soft-warning",
        activeClass: "variant-filled-warning"
    },
    "WIP": {
        prop: FlagProp,
        class: "variant-soft-error",
        activeClass: "variant-filled-error"
    },
    "MEOW": {
        prop: FoxProp,
        class: "variant-soft-primary",
        activeClass: "variant-filled-primary"
    },
    "BETA": {
        prop: VersionTagProp,
        class: "variant-soft-primary",
        activeClass: "variant-filled-primary"
    },
    "ALPHA": {
        prop: VersionTagProp,
        class: "variant-soft-secondary",
        activeClass: "variant-filled-secondary"
    },
    "EARLY ACCESS": {
        prop: VersionTagProp,
        class: "variant-soft-tertiary",
        activeClass: "variant-filled-tertiary"
    },
    "ESSENTIALS": {
        prop: UtilityProp,
        class: "variant-soft-tertiary",
        activeClass: "variant-filled-tertiary"
    },
    "LEAF": {
        prop: LeafProp,
        class: "variant-soft-success",
        activeClass: "variant-filled-success"
    }
}