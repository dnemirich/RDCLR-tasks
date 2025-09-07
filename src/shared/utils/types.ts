export type Book = {
  accessInfo?: {
    accessViewStatus: string;
    country: string;
    downloadAccess?: {
      deviceAllowed: boolean;
      downloadsAcquired: number;
      justAcquired: boolean;
      kind: 'books#downloadAccessRestriction';
      maxDownloadDevices: number;
      message: string;
      nonce: string;
      reasonCode: string;
      restricted: boolean;
      signature: string;
      source: string;
      volumeId: string;
    };
    embeddable: boolean;
    epub: {
      acsTokenLink?: string;
      downloadLink?: string;
      isAvailable: boolean;
    };
    pdf: {
      acsTokenLink?: string;
      downloadLink?: string;
      isAvailable: boolean;
    };
    publicDomain: boolean;
    textToSpeechPermission: string;
    viewability: string;
    webReaderLink: string;
  };
  etag: string;
  id: string;
  kind: 'books#volume';
  saleInfo?: {
    buyLink?: string;
    country: string;
    isEbook: boolean;
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
    onSaleDate?: string;
    retailPrice?: {
      amount: number;
      currencyCode: string;
    };
    saleability: string;
  };
  searchInfo?: {
    textSnippet: string;
  };
  selfLink: string;
  userInfo?: {
    isPreordered?: boolean;
    isPurchased?: boolean;
    readingPosition?: unknown;
    review?: unknown;
    updated?: string;
  };
  volumeInfo: {
    authors?: string[];
    averageRating?: number;
    canonicalVolumeLink?: string;
    categories?: string[];
    contentVersion?: string;
    description?: string;
    dimensions?: {
      height?: string;
      thickness?: string;
      width?: string;
    };
    imageLinks?: {
      extraLarge?: string;
      large?: string;
      medium?: string;
      small?: string;
      smallThumbnail?: string;
      thumbnail?: string;
    };
    industryIdentifiers?: {
      identifier: string;
      type: string;
    }[];
    infoLink?: string;
    language?: string;
    mainCategory?: string;
    pageCount?: number;
    previewLink?: string;
    printType?: string;
    publishedDate?: string;
    publisher?: string;
    ratingsCount?: number;
    subtitle?: string;
    title: string;
  };
};