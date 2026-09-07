import { DOCUMENTS, type DocumentRecord } from "@/lib/constants";

export function documentHref(doc: DocumentRecord) {
  return doc.file ? `/certificates/${doc.file}` : null;
}

export function documentStatusLabel(doc: DocumentRecord) {
  return documentHref(doc) ? "Открыть документ" : "Документ готовится";
}

export function availableDocuments() {
  return DOCUMENTS.filter((doc) => Boolean(doc.file));
}

export function pendingDocuments() {
  return DOCUMENTS.filter((doc) => !doc.file);
}

export function hasAnyDocuments() {
  return availableDocuments().length > 0;
}
