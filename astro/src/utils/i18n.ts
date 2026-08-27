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
  DevelopedBy,
  Download,
  EnterText,
  EnterTextPlaceholder,
  FileHasExpired,
  FileIsPasswordProtected,
  FileIsTooLarge,
  Filename,
  FilenamePlaceholder,
  HomePage,
  HomepageMessage,
  IncorrectPassword,
  InternalServerError,
  InvalidFileOrTextInput,
  InvalidKeyFormat,
  KeyGeneration,
  MethodNotAllowed,
  NewKey,
  NoFileOrTextProvided,
  NoKeyProvided,
  NotFound,
  NotFoundOnFS,
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
  TooManyKeyConflicts,
  Unlock,
  Upload,
  UrlCopiedToClipboard,
  Using,
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
    [TranslationKeys.DevelopedBy]: "Developed by",
    [TranslationKeys.Download]: "Download",
    [TranslationKeys.EnterText]: "or enter some text",
    [TranslationKeys.EnterTextPlaceholder]: "Enter your text here...",
    [TranslationKeys.FileHasExpired]: "File has expired",
    [TranslationKeys.FileIsPasswordProtected]:
      "This file is password protected.",
    [TranslationKeys.FileIsTooLarge]: "File XXX is too large",
    [TranslationKeys.Filename]: "Filename",
    [TranslationKeys.FilenamePlaceholder]: "e.g.: notes.txt",
    [TranslationKeys.HomePage]: "homepage",
    [TranslationKeys.HomepageMessage]:
      "Partag'Express is a simple file server. Upload your file and share it across devices or with friends using a very simple and easy-to-remember key. Be careful though, your files will expire after 7 days !",
    [TranslationKeys.IncorrectPassword]:
      "Incorrect password. Please try again.",
    [TranslationKeys.InternalServerError]: "Internal Server Error",
    [TranslationKeys.InvalidFileOrTextInput]: "Invalid file or text input",
    [TranslationKeys.InvalidKeyFormat]:
      "Invalid key format. Please use the format: aaaa-bbb-ccccc-dddd",
    [TranslationKeys.KeyGeneration]: "Key generation",
    [TranslationKeys.MethodNotAllowed]: "Method Not Allowed",
    [TranslationKeys.NewKey]: "Generate new key",
    [TranslationKeys.NoFileOrTextProvided]: "No file or text provided",
    [TranslationKeys.NoKeyProvided]: "No key provided",
    [TranslationKeys.NotFound]: "Not Found",
    [TranslationKeys.NotFoundMessage]:
      "The page you are looking for does not exist ! Please check the URL or return to the",
    [TranslationKeys.NotFoundOnFS]: "File Not Found on filesystem",
    [TranslationKeys.Optional]: "optional",
    [TranslationKeys.Password]: "Password",
    [TranslationKeys.PasswordPlaceholder]: "Enter a password...",
    [TranslationKeys.PasswordProtected]: "Password protected",
    [TranslationKeys.PasswordRequired]: "A password is required",
    [TranslationKeys.ReturnTo]: "Return to the",
    [TranslationKeys.Search]: "Search",
    [TranslationKeys.SelectFile]: "Select a file",
    [TranslationKeys.Share]: "Share",
    [TranslationKeys.TooManyKeyConflicts]:
      "Too many key conflicts ! Contact the administrator (luc.billaud.pro@gmail.com)",
    [TranslationKeys.Unlock]: "Unlock",
    [TranslationKeys.Upload]: "Upload",
    [TranslationKeys.UrlCopiedToClipboard]: "URL copied to clipboard",
    [TranslationKeys.Using]: "using",
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
    [TranslationKeys.DevelopedBy]: "Développé par",
    [TranslationKeys.Download]: "Télécharger",
    [TranslationKeys.EnterText]: "ou entrez du texte",
    [TranslationKeys.EnterTextPlaceholder]: "Entrez votre texte ici...",
    [TranslationKeys.FileHasExpired]: "Le fichier a expiré",
    [TranslationKeys.FileIsPasswordProtected]:
      "Ce fichier est protégé par un mot de passe.",
    [TranslationKeys.FileIsTooLarge]: "Le fichier XXX est trop volumineux.",
    [TranslationKeys.Filename]: "Nom du fichier",
    [TranslationKeys.FilenamePlaceholder]: "par ex.: notes.txt",
    [TranslationKeys.HomePage]: "page d'accueil",
    [TranslationKeys.HomepageMessage]:
      "Partag'Express est un serveur de fichier facile à utiliser. Envoie ton fichier et partage-le entre tes appareils ou avec tes amis facilement grâce à une clé facile à retenir. Attention: les fichiers expirent au bout de 7 jours !",
    [TranslationKeys.IncorrectPassword]:
      "Mot de passe incorrect. Veuillez réessayer !",
    [TranslationKeys.InternalServerError]: "Erreur interne au serveur",
    [TranslationKeys.InvalidFileOrTextInput]: "Fichier ou texte invalide",
    [TranslationKeys.InvalidKeyFormat]:
      "Format de clé invalide. Le format attendu est: aaaa-bbb-ccccc-dddd",
    [TranslationKeys.KeyGeneration]: "Génération de clé",
    [TranslationKeys.MethodNotAllowed]: "Méthode non-autorisée",
    [TranslationKeys.NewKey]: "Nouvelle clé",
    [TranslationKeys.NoFileOrTextProvided]: "Aucun fichier ou texte transmis",
    [TranslationKeys.NoKeyProvided]: "Aucune clé transmise",
    [TranslationKeys.NotFound]: "Non trouvé",
    [TranslationKeys.NotFoundMessage]:
      "La page recherchée n'existe pas ! Vérifiez l'URL entrée ou retournez à la",
    [TranslationKeys.NotFoundOnFS]:
      "Le fichier n'a pas pu être trouvé sur le serveur",
    [TranslationKeys.Optional]: "facultatif",
    [TranslationKeys.Password]: "Mot de passe",
    [TranslationKeys.PasswordPlaceholder]: "Entrez un mot de passe...",
    [TranslationKeys.PasswordProtected]: "Protégé par mot de passe",
    [TranslationKeys.PasswordRequired]: "Mot de passe requis.",
    [TranslationKeys.ReturnTo]: "Retour à la",
    [TranslationKeys.Search]: "Rechercher",
    [TranslationKeys.SelectFile]: "Choisissez un fichier",
    [TranslationKeys.Share]: "Partager",
    [TranslationKeys.TooManyKeyConflicts]:
      "Nombre de conflits de clés dépassé ! Contactez l'administrateur (luc.billaud.pro@gmail.com)",
    [TranslationKeys.Unlock]: "Déverrouiller",
    [TranslationKeys.Upload]: "Envoyer",
    [TranslationKeys.UrlCopiedToClipboard]:
      "URL copiée dans le presse-papier !",
    [TranslationKeys.Using]: "avec",
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
