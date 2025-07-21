import AddonProp from "./AddonProp.svelte";
import AlertProp from "./AlertProp.svelte";
import FlagProp from "./FlagProp.svelte";
import FoxProp from "./FoxProp.svelte";
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
        class: "variant-soft-primary"
    },
    "ADDON": {
        prop: AddonProp,
        class: "variant-soft-secondary"
    },
    "SCRIPT": {
        prop: ScriptProp,
        class: "variant-soft-secondary"
    },
    "UTILITY": {
        prop: UtilityProp,
        class: "variant-soft-tertiary"
    },
    "RESOURCEPACK": {
        prop: RpProp,
        class: "variant-soft-success"
    },
    "MAP": {
        prop: MapProp,
        class: "variant-soft-warning"
    },
    "JOKE": {
        prop: FlagProp,
        class: "variant-soft-error"
    },
    "FILLER": {
        prop: FlagProp,
        class: "variant-soft-error"
    },
    "FUN": {
        prop: FlagProp,
        class: "variant-soft-error"
    },
    "SKINPACK": {
        prop: RpProp,
        class: "variant-soft-success"
    },
    "FOX": {
        prop: FoxProp,
        class: "variant-soft-tertiary"
    },
    "CATGIRL": {
        prop: FoxProp,
        class: "variant-soft-secondary"
    },
    "ADLINK": {
        prop: AlertProp,
        class: "variant-soft-warning"
    },
    "PAID": {
        prop: MonetizedProp,
        class: "variant-soft-success"
    },
    "PARTIALLY PAID": {
        prop: MonetizedProp,
        class: "variant-soft-warning"
    },
    "FORK": {
        prop: OssProp,
        class: "variant-soft-primary"
    },
    "EXTERNAL DOWNLOAD": {
        prop: AlertProp,
        class: "variant-soft-warning"
    },
    "WIP": {
        prop: FlagProp,
        class: "variant-soft-error"
    },
    "MEOW": {
        prop: FoxProp,
        class: "variant-soft-primary"
    },
    "BETA": {
        prop: VersionTagProp,
        class: "variant-soft-primary"
    },
    "ALPHA": {
        prop: VersionTagProp,
        class: "variant-soft-secondary"
    },
    "EARLY ACCESS": {
        prop: VersionTagProp,
        class: "variant-soft-tertiary"
    },
    "ESSENTIALS": {
        prop: UtilityProp,
        class: "variant-soft-tertiary"
    },
}