export const DOCUMENT_TYPES = {
  CertificationDocument: 'Certification Document',
  ComplianceDocument: 'Compliance Document',
  CourierSop: 'Courier SOP',
  CourierLetter: 'Courier Letter',
  InsuranceCertificate: 'Insurance Certificate',
  NdaAgreement: 'NDA Agreement',
  RequestProposal: 'Request Proposal',
  ServiceAgreement: 'Service Agreement'
};

export const DOCUMENT_TYPES_ARR = Object.keys(DOCUMENT_TYPES).map(k => DOCUMENT_TYPES[k]);
