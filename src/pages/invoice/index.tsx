import Invoice from "./component/Invoice";
import { LoaderFunction } from "react-router-dom";
import { InvoiceType } from "../../types";

export interface paramsType {
  id: string;
  invoice: InvoiceType;
}

export const invoiceLoader: LoaderFunction<paramsType> = async ({ params }) => {
  const id = params.id ?? "";
  return { id }; // Return only the ID
};

const InvoicePage = () => {
  return <Invoice />;
};

export default InvoicePage;
