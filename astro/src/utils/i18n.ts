enum Lang {
  en = "en",
  fr = "fr",
}
const LANGS = Object.values(Lang);

export enum TranslationKeys {
  AppName,
  AppDescription,
  AudioNotSupported,
  CannotDisplayBinary,
  ContentCopiedToClipboard,
  Copy,
  Download,
  EnterText,
  EnterTextPlaceholder,
  FileIsPasswordProtected,
  Filename,
  FilenamePlaceholder,
  HomePage,
  IncorrectPassword,
  InvalidKeyFormat,
  KeyGeneration,
  NewKey,
  NotFound,
  NotFoundMessage,
  Optional,
  Password,
  PasswordPlaceholder,
  PasswordProtected,
  PasswordRequired,
  ReturnTo,
  Search,
  SelectFile,
  Share,
  Unlock,
  Upload,
  UrlCopiedToClipboard,
  VideoNotSupported,
}

const TRANSLATIONS: { [l in Lang]: { [k in TranslationKeys]: string } } = {
  en: {
    [TranslationKeys.AppName]: "Partag'Express",
    [TranslationKeys.AppDescription]: "Send files the easy way",
    [TranslationKeys.AudioNotSupported]:
      "Your browser does not support audio elements.",
    [TranslationKeys.CannotDisplayBinary]:
      "Binary file. Cannot display content.",
    [TranslationKeys.ContentCopiedToClipboard]: "Content copied to clipboard !",
    [TranslationKeys.Copy]: "Copy",
    [TranslationKeys.Download]: "Download",
    [TranslationKeys.EnterText]: "or enter some text",
    [TranslationKeys.EnterTextPlaceholder]: "Enter your text here...",
    [TranslationKeys.FileIsPasswordProtected]:
      "This file is password protected.",
    [TranslationKeys.Filename]: "Filename",
    [TranslationKeys.FilenamePlaceholder]: "e.g.: notes.txt",
    [TranslationKeys.HomePage]: "homepage",
    [TranslationKeys.IncorrectPassword]:
      "Incorrect password. Please try again.",
    [TranslationKeys.InvalidKeyFormat]:
      "Invalid key format. Please use the format: aaaa-bbb-ccccc-dddd",
    [TranslationKeys.KeyGeneration]: "Key generation",
    [TranslationKeys.NewKey]: "Generate new key",
    [TranslationKeys.NotFound]: "Not Found",
    [TranslationKeys.NotFoundMessage]:
      "The page you are looking for does not exist ! Please check the URL or return to the",
    [TranslationKeys.Optional]: "optional",
    [TranslationKeys.Password]: "Password",
    [TranslationKeys.PasswordPlaceholder]: "Enter a password...",
    [TranslationKeys.PasswordProtected]: "Password protected",
    [TranslationKeys.PasswordRequired]: "A password is required",
    [TranslationKeys.ReturnTo]: "Return to the",
    [TranslationKeys.Search]: "Search",
    [TranslationKeys.SelectFile]: "Select a file",
    [TranslationKeys.Share]: "Share",
    [TranslationKeys.Unlock]: "Unlock",
    [TranslationKeys.Upload]: "Upload",
    [TranslationKeys.UrlCopiedToClipboard]: "URL copied to clipboard",
    [TranslationKeys.VideoNotSupported]:
      "Your browser does not support video elements.",
  },
  fr: {
    [TranslationKeys.AppName]: "Partag'Express",
    [TranslationKeys.AppDescription]: "Envoyer des fichiers simplement",
    [TranslationKeys.AudioNotSupported]:
      "Votre navigateur ne peut pas lire les fichiers audio.",
    [TranslationKeys.CannotDisplayBinary]:
      "Fichier binaire. Impossible d'afficher le contenu.",
    [TranslationKeys.ContentCopiedToClipboard]:
      "Contenu copié dans le presse-papier !",
    [TranslationKeys.Copy]: "Copier",
    [TranslationKeys.Download]: "Télécharger",
    [TranslationKeys.EnterText]: "ou entrez du texte",
    [TranslationKeys.EnterTextPlaceholder]: "Entrez votre texte ici...",
    [TranslationKeys.FileIsPasswordProtected]:
      "Ce fichier est protégé par un mot de passe.",
    [TranslationKeys.Filename]: "Nom du fichier",
    [TranslationKeys.FilenamePlaceholder]: "par ex.: notes.txt",
    [TranslationKeys.HomePage]: "page d'accueil",
    [TranslationKeys.IncorrectPassword]:
      "Mot de passe incorrect. Veuillez réessayer !",
    [TranslationKeys.InvalidKeyFormat]:
      "Format de clé invalide. Le format attendu est: aaaa-bbb-ccccc-dddd",
    [TranslationKeys.KeyGeneration]: "Génération de clé",
    [TranslationKeys.NewKey]: "Nouvelle clé",
    [TranslationKeys.NotFound]: "Non trouvé",
    [TranslationKeys.NotFoundMessage]:
      "La page recherchée n'existe pas ! Vérifiez l'URL entrée ou retournez à la",
    [TranslationKeys.Optional]: "facultatif",
    [TranslationKeys.Password]: "Mot de passe",
    [TranslationKeys.PasswordPlaceholder]: "Entrez un mot de passe...",
    [TranslationKeys.PasswordProtected]: "Protégé par mot de passe",
    [TranslationKeys.PasswordRequired]: "Mot de passe requis.",
    [TranslationKeys.ReturnTo]: "Retour à la",
    [TranslationKeys.Search]: "Rechercher",
    [TranslationKeys.SelectFile]: "Choisissez un fichier",
    [TranslationKeys.Share]: "Partager",
    [TranslationKeys.Unlock]: "Déverrouiller",
    [TranslationKeys.Upload]: "Envoyer",
    [TranslationKeys.UrlCopiedToClipboard]:
      "URL copiée dans le presse-papier !",
    [TranslationKeys.VideoNotSupported]:
      "Votre navigateur ne peut pas lire les fichiers video.",
  },
};

export function t(key: TranslationKeys, lang?: string): string {
  let langToUse: Lang = Lang.fr;
  if (lang !== undefined && LANGS.includes(lang as Lang))
    langToUse = lang as Lang;

  return TRANSLATIONS[langToUse][key] || "Non traduit";
}
