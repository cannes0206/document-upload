export enum DocumentType {
    Consent = 6,
    Financial = 5,
    Insurance = 7,
    PAP = 8,
    FaxCoverSheet = 14,
}

export const DOC_TYPES_ARR = (Object.keys(DocumentType).map(k => {
    return {
      id: k,
      docName: DocumentType[k]
    }
  }).filter(i => i.docName !== Object.keys(DocumentType))
);
  