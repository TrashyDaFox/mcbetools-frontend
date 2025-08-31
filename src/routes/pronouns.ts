type Pronoun = {
    key: string;
    description: string;
    normative: string;
    pronoun_subject: string;
    pronoun_object: string;
    possessive_determiner: string;
    possessive_pronoun: string;
    reflexive: string;
    plural: string;
    pluralHonorific: string;
    pronounceable: string;
    history?: string;
    thirdForm?: string;
    smallForm?: string;
    sourcesInfo?: string;
}

export const pronounsList: Pronoun[] = [
	{
		key: 'he,he/him',
		description: 'Normative “he/him”',
		normative: 'TRUE',
		pronoun_subject: 'he',
		pronoun_object: 'him',
		possessive_determiner: 'his',
		possessive_pronoun: 'his',
		reflexive: 'himself',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE'
	},
	{
		key: 'she,she/her',
		description: 'Normative “she/her”',
		normative: 'TRUE',
		pronoun_subject: 'she',
		pronoun_object: 'her',
		possessive_determiner: 'her',
		possessive_pronoun: 'hers',
		reflexive: 'herself',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE'
	},
	{
		key: 'they,they/them',
		description: 'Singular “they”',
		normative: 'TRUE',
		pronoun_subject: 'they',
		pronoun_object: 'them',
		possessive_determiner: 'their',
		possessive_pronoun: 'theirs',
		reflexive: 'themselves',
		plural: 'TRUE',
		pluralHonorific: 'TRUE',
		pronounceable: 'TRUE',
		history:
			"Singular “they” has been used in English to describe an unspecified person {https://www.academicwritingsuccess.com/the-astonishing-history-of-singular-they/=since the late 1300s} (it's even older than singular “you”!). Nowadays, it's the most popular choice among people who prefer gender neutral forms. It starts being {https://www.merriam-webster.com/words-at-play/singular-nonbinary-they=accepted by dictionaries} too.@It is also common to use {/they/them/themself=“themself”} as a reflexive form.",
		thirdForm: '',
		smallForm: 'reflexive',
		sourcesInfo:
			"This list of sources includes both the version with {/they=“themselves”} and {/they/them/themselves=“themself”}, as well as those that don't happen to use reflexive."
	},
	{
		key: 'they/them/themself',
		description: 'Singular “they”',
		normative: 'TRUE',
		pronoun_subject: 'they',
		pronoun_object: 'them',
		possessive_determiner: 'their',
		possessive_pronoun: 'theirs',
		reflexive: 'themself',
		plural: 'TRUE',
		pluralHonorific: 'TRUE',
		pronounceable: 'TRUE',
		history:
			"Singular “they” has been used in English to describe an unspecified person {https://www.academicwritingsuccess.com/the-astonishing-history-of-singular-they/=since the late 1300s} (it's even older than singular “you”!). Nowadays, it's the most popular choice among people who prefer gender neutral forms. It starts being {https://www.merriam-webster.com/words-at-play/singular-nonbinary-they=accepted by dictionaries} too.@It is also common to use {/they=“themselves”} as a reflexive form.",
		thirdForm: '',
		smallForm: 'reflexive',
		sourcesInfo:
			"This list of sources includes both the version with {/they=“themselves”} and {/they/them/themselves=“themself”}, as well as those that don't happen to use reflexive."
	},
	{
		key: 'it,it/it,it/its',
		description: 'Personal “it”',
		normative: 'TRUE',
		pronoun_subject: 'it',
		pronoun_object: 'it',
		possessive_determiner: 'its',
		possessive_pronoun: 'its',
		reflexive: 'itself',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			"Although “it” is normally used for objects, not people, some actually do like being called that way. If someone wants you to call it “it”, it's not offensive – it's actually respectful. But remember that it/its pronouns have a history of transphobic use, so only with people who explicitly wish it."
	},
	{
		key: "one,one/one's",
		description: 'Specific “one”',
		normative: 'TRUE',
		pronoun_subject: 'one',
		pronoun_object: 'one',
		possessive_determiner: "one's",
		possessive_pronoun: "one's",
		reflexive: 'oneself',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			'“One” is used in formal English when talking about a general or a hypothetical person. Recently people started using “one” also as their personal pronoun.'
	},
	{
		key: 'ae,æ,ae/aer,æ/ær',
		description: 'Neopronoun “ae” / “æ”',
		normative: 'FALSE',
		pronoun_subject: 'ae|eɪ',
		pronoun_object: 'aer|ɛɹ',
		possessive_determiner: 'aer|ɛɹ',
		possessive_pronoun: 'aers|ɛɹz',
		reflexive: 'aerself|ɛɹˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			"Created by David Lindsay for a 1920 novel <em>A Voyage to Arcturus</em>, where it's used by an alien, third-sex species."
	},
	{
		key: 'co,co/cos',
		description: 'Neopronoun “co/cos”',
		normative: 'FALSE',
		pronoun_subject: 'co|ko',
		pronoun_object: 'co|ko',
		possessive_determiner: 'cos|koz',
		possessive_pronoun: "co's|koz",
		reflexive: 'coself|koˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history: 'Created by Mary Orovan in 1970, derived from the Indo-European <em>*ko</em>.'
	},
	{
		key: 'e,e/em/eir',
		description: 'Spivak pronouns',
		normative: 'FALSE',
		pronoun_subject: 'e|i',
		pronoun_object: 'em|ɛm',
		possessive_determiner: 'eir|ɛɹ',
		possessive_pronoun: 'eirs|ɛɹz',
		reflexive: 'emself|ɛmˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			'Coined by Michael Spivak in 1990 for his manual <em>The Joy of TeX</em> to avoid gendering people in the examples.',
		thirdForm: 'possessive_determiner'
	},
	{
		key: 'e/em/es',
		description: 'Neopronoun “e/em/es”',
		normative: 'FALSE',
		pronoun_subject: 'e|i',
		pronoun_object: 'em|ɛm',
		possessive_determiner: 'es|iz',
		possessive_pronoun: 'ems|ɛmz',
		reflexive: 'emself|ɛmˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			'First coined by {https://blogs.illinois.edu/view/25/667453458=Francis Augustus Brewsterin in 1841}, but also often credited to {https://medium.com/matthews-place/the-history-of-neopronouns-366b1fee48c4=James Rogers in 1890}. Since then multiple versions were created, differing in declension and capitalisation.',
		thirdForm: 'possessive_determiner'
	},
	{
		key: 'ey,ey/em',
		description: 'Elverson pronouns',
		normative: 'FALSE',
		pronoun_subject: 'ey|eɪ',
		pronoun_object: 'em|ɛm',
		possessive_determiner: 'eir|ɛɹ',
		possessive_pronoun: 'eirs|ɛɹz',
		reflexive: 'emself|ɛmˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			'{https://web.archive.org/web/20211130005355/https://research.cristanwilliams.com/2012/02/24/1975-transgender-cross-gender/=Coined by Christine M. Elverson} in 1975 for a contest to create an alternative to the singular {/they=they}. Those forms are created by dropping “th” from “they”.'
	},
	{
		key: 'fae,fæ,fae/faer,fæ/fær',
		description: 'Neopronoun “fae/faer”',
		normative: 'FALSE',
		pronoun_subject: 'fae|feɪ',
		pronoun_object: 'faer|fɛɹ',
		possessive_determiner: 'faer|fɛɹ',
		possessive_pronoun: 'faers|fɛɹz',
		reflexive: 'faerself|fɛɹˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history: 'Created in 2014 by Tumblr user shadaras.'
	},
	{
		key: 'hu,hu/hum',
		description: 'Humanist pronouns',
		normative: 'FALSE',
		pronoun_subject: 'hu|hju',
		pronoun_object: 'hum|hjum',
		possessive_determiner: 'hus|hjuz',
		possessive_pronoun: 'hus|hjuz',
		reflexive: 'huself|hjuˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history: 'Coined by Sasha Newborn in 1982, based on the word “human”.'
	},
	{
		key: 'ne,ne/nem',
		description: 'Neopronoun “ne/nem”',
		normative: 'FALSE',
		pronoun_subject: 'ne|ni',
		pronoun_object: 'nem|nəm',
		possessive_determiner: 'nir|nəɹ',
		possessive_pronoun: 'nirs|nəɹz',
		reflexive: 'nemself|nəmˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE'
	},
	{
		key: 'ne/nir',
		description: 'Neopronoun “ne/nir”',
		normative: 'FALSE',
		pronoun_subject: 'ne|ni',
		pronoun_object: 'nir|nəɹ',
		possessive_determiner: 'nir|nəɹ',
		possessive_pronoun: 'nirs|nəɹz',
		reflexive: 'nirself|nəɹˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE'
	},
	{
		key: 'per,per/per',
		description: 'Person pronouns',
		normative: 'FALSE',
		pronoun_subject: 'per|pəɹ',
		pronoun_object: 'per|pəɹ',
		possessive_determiner: 'per|pəɹ',
		possessive_pronoun: 'pers|pəɹz',
		reflexive: 'perself|pəɹˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			'Coined by John Clark in an issue of the <em>Newsletter of the American Anthropological Association</em> in 1972, derived from the word “person”.'
	},
	{
		key: 's/he,s/he/hir',
		description: 'Neopronoun “s/he”',
		normative: 'FALSE',
		pronoun_subject: 's/he|shi',
		pronoun_object: 'hir|hɪɹ',
		possessive_determiner: 'hir|hɪɹ',
		possessive_pronoun: 'hirs|hɪɹz',
		reflexive: 'hirself|hɪɹˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE'
	},
	{
		key: 'thon,thon/thons',
		description: 'Neopronoun “thon”',
		normative: 'FALSE',
		pronoun_subject: 'thon|ðɑn',
		pronoun_object: 'thon|ðɑn',
		possessive_determiner: 'thons|ðɑnz',
		possessive_pronoun: "thon's|ðɑnz",
		reflexive: 'thonself|ðɑnˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			'Created by Charles Crozat Converse in 1858, thon/thons/thonself is one of the first known examples of creating a gender neutral pronoun. “Thon” is a contraction of “that one”.'
	},
	{
		key: 've,ve/ver',
		description: 'Neopronoun “ve/ver”',
		normative: 'FALSE',
		pronoun_subject: 've|vi',
		pronoun_object: 'ver|vəɹ',
		possessive_determiner: 'vis|viz',
		possessive_pronoun: 'vis|viz',
		reflexive: 'verself|vəɹˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			'Used eg. by Greg Egan in <em>Distress</em> (1995) and <em>Diaspora</em> (1998), and by Keri Hulme in <em>The Bone People</em> (1984).'
	},
	{
		key: 'vi,vi/vir',
		description: 'Neopronoun “vi/vir”',
		normative: 'FALSE',
		pronoun_subject: 'vi|vi',
		pronoun_object: 'vir|viɹ',
		possessive_determiner: 'vis|viz',
		possessive_pronoun: 'virs|viɹz',
		reflexive: 'virself|viɹˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE'
	},
	{
		key: 'vi/vim',
		description: 'Neopronoun “vi/vim”',
		normative: 'FALSE',
		pronoun_subject: 'vi|vi',
		pronoun_object: 'vim|vɪm',
		possessive_determiner: 'vis|vɪs',
		possessive_pronoun: 'vims|vɪms',
		reflexive: 'vimself|vɪmˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE'
	},
	{
		key: 'xe,xe/xem',
		description: 'Neopronoun “xe/xem”',
		normative: 'FALSE',
		pronoun_subject: 'xe|zi',
		pronoun_object: 'xem|zɛm',
		possessive_determiner: 'xyr|ziɹ',
		possessive_pronoun: 'xyrs|ziɹz',
		reflexive: 'xemself|zɛmˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history: 'Coined by Don Rickter in an issue of <em>Unitarian Universalist</em> in 1973.'
	},
	{
		key: 'ze,ze/hir',
		description: 'Neopronoun “ze/hir”',
		normative: 'FALSE',
		pronoun_subject: 'ze|zi',
		pronoun_object: 'hir|hɪɹ',
		possessive_determiner: 'hir|hɪɹ',
		possessive_pronoun: 'hirs|hɪɹz',
		reflexive: 'hirself|hɪɹˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			'<em>Hir</em> was first proposed {https://blogs.illinois.edu/view/25/809608=in 1920} in <em>Sacramento Bee</em>. Spelt as <em>hier</em>, it was proposed in {https://public.oed.com/blog/new-words-in-the-oed-march-2019/=1910} in Baltimore <em>Sun</em>.'
	},
	{
		key: 'ze/zir',
		description: 'Neopronoun “ze/zir”',
		normative: 'FALSE',
		pronoun_subject: 'ze|zi',
		pronoun_object: 'zir|zəɹ',
		possessive_determiner: 'zir|zəɹ',
		possessive_pronoun: 'zirs|zəɹz',
		reflexive: 'zirself|zəɹˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			'Derived from {ze/hir=ze/hir} {https://public.oed.com/blog/new-words-in-the-oed-march-2019/=in the 1990s}, with a history reaching as far back as {https://blogs.illinois.edu/view/25/705317=1848}. {https://www.pugetsound.edu/sites/default/files/2022-11/history-of-gender-neutral-pronoun.pdf=Coining in 1972}, as <em>ze/zim/zees/zeeself</em>, was based on the German plural 3rd person pronoun <em>sie</em>.'
	},
	{
		key: 'zhe,zhe/zher',
		description: 'Neopronoun “zhe/zher”',
		normative: 'FALSE',
		pronoun_subject: 'zhe|ʒi',
		pronoun_object: 'zher|ʒəɹ',
		possessive_determiner: 'zher|ʒəɹ',
		possessive_pronoun: 'zhers|ʒəɹz',
		reflexive: 'zherself|ʒəɹˈsɛlf',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE'
	},
	{
		key: 'ki,ki/kin',
		description: 'Kinship pronouns',
		normative: 'FALSE',
		pronoun_subject: 'ki',
		pronoun_object: 'kin',
		possessive_determiner: 'kins',
		possessive_pronoun: 'kins',
		reflexive: 'kinself',
		plural: 'FALSE',
		pluralHonorific: 'FALSE',
		pronounceable: 'TRUE',
		history:
			'{https://www.yesmagazine.org/issue/together-earth/2015/03/30/alternative-grammar-a-new-language-of-kinship=Created by Robin Wall Kimmerer} to counteract the objectification of the natural world and to recognise living beings as distinct from inanimate objects (“it”). The pronoun set was {https://karahuntermoon.com/2023/05/19/more-on-ki-and-kin-pronouns/=adjusted by Kara Huntermoon} to make it more consistent with existing English grammar rules.'
	}
];

export const normaliseKey = (key: string): string => {
    return key.toLowerCase();
};

// pronounsData = your big array of objects from pronouns.tsv


// Build a set of all valid variations
// function buildPronounSet(pronounsData:Pronoun[]) {
// 	const set = new Set();

// 	for (const entry of pronounsData) {
// 		// keys can be "he,he/him" or "they,they/them/themself"
// 		const parts = entry.key.split(","); // comma = alias
// 		for (const part of parts) {
// 			set.add(part.trim().toLowerCase());
// 		}
// 	}

// 	return set;
// }
const MAX_TOKEN_LENGTH = 32;
const MAX_PARTS = 5;
const normalize = (s:string) => (s || '').normalize('NFC').replace(/\uFEFF/g, '').trim().toLowerCase();
const isEmoji = (s:string) => /\p{Extended_Pictographic}/u.test(s);
const tokenRegex = /^[\p{L}\p{N}\-'\u2019\u2018]+$/u;
const splitAliases = (raw:string) => (raw || '').replace(/،/g, ',').split(',').map(a => normalize(a)).filter(Boolean);
const extractTokensFromField = (field:string) => {
    if (!field) return [];
    return field
      .split('|')                      // pick alternatives (take each alt)
      .flatMap((alt:string) => alt.split('/'))  // split slash-separated orthographies
      .map((x:string) => normalize(x))
      .filter(Boolean);
  };
  type Config = {
    maxParts?: number;
  }
// Validate against that set
function makePronounValidator(pronounsData:Pronoun[] = [], options:Config = {}) {
	// const validPronouns = buildPronounSet(pronounsData);
    const maxParts = options.maxParts ?? MAX_PARTS;
    const validMap = new Map(); // canonical string -> entry
    const tokenSet = new Set(); // single-token forms (he, him, they, etc.)
    for (const entry of pronounsData) {
        // 1) aliases from `key` column (comma separated)
        const aliases = splitAliases(entry.key);
        for (const a of aliases) {
          // add exact alias
          validMap.set(a, entry);
    
          // if alias has slashes, add progressive prefixes and the individual components
          if (a.includes('/')) {
            const parts = a.split('/').map(x => x.trim()).filter(Boolean);
            for (let i = 1; i <= parts.length; i++) {
              const join = parts.slice(0, i).join('/');
              validMap.set(join, entry);
            }
            for (const p of parts) tokenSet.add(p);
          } else {
            tokenSet.add(a);
          }
        }
        const subj = extractTokensFromField(entry.pronoun_subject);
        const obj = extractTokensFromField(entry.pronoun_object);
        const possDet = extractTokensFromField(entry.possessive_determiner);
        const possPron = extractTokensFromField(entry.possessive_pronoun);
        const refl = extractTokensFromField(entry.reflexive);
        for (const t of [...subj, ...obj, ...possDet, ...possPron, ...refl]) {
            tokenSet.add(t);
        }
        if (subj.length && obj.length) validMap.set(`${subj[0]}/${obj[0]}`, entry);
        if (subj.length && possDet.length) validMap.set(`${subj[0]}/${possDet[0]}`, entry);
    }
  /** normalize user input -> try many tolerant transforms */
  return function validatePronounsInput(rawInput: string) {
    if (!rawInput && rawInput !== '') return false;
    const input = normalize(rawInput);

    if (!input) return false;

    // quick exact whitelist hit
    if (validMap.has(input)) return true;

    // allow space/comma separated variants -> convert to slash-style and re-check
    const replaced = input.replace(/[,\s]+/g, '/'); // "ki kin" -> "ki/kin", "ki,ki/kin" -> "ki/ki/kin"
    if (validMap.has(replaced)) return true;

    // if user typed a single token like "she" or "him", accept if it matches a known token
    if (!input.includes('/')) {
      if (tokenSet.has(input)) return true;
      // also accept single emoji
      if (isEmoji(input)) return true;
      return false;
    }

    // now it's a slash-based input. be permissive but safe:
    const parts = input.split('/').map(p => p.trim()).filter(Boolean);
    if (parts.length < 2 || parts.length > maxParts) return false;

    // every part must be either emoji or allowed token pattern and not too long
    for (const p of parts) {
      if (p.length === 0 || p.length > MAX_TOKEN_LENGTH) return false;
      if (isEmoji(p)) continue;
      if (!tokenRegex.test(p)) {
        // allow entries that contain some unicode char like "æ" (covered by \p{L}), else reject
        return false;
      }
    }

    // if structure looks legit, accept (fallback for valid slash patterns not exactly in TSV)
    return true;
  };
}

// Example usage:
export const validatePronoun = makePronounValidator(pronounsList);