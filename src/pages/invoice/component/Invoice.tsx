import { useLoaderData } from "react-router-dom";
import { useFetchData } from "../../../services/api/useFetch"; // Add fetch logic

// styles
import styles from "../../../assets/styles/modules/invoice/invoicepage.module.css";

// components
import GoBack from "../../../components/button/GoBack";
import InvoiceNav from "./../component/InvoiceNav";
import InvoicePaper from "./../component/InvoicePaper";

// types
import { paramsType } from "..";
import { useEffect, useState } from "react";
import { InvoiceType } from "../../../types/InvoiceTypes"; // Import InvoiceType

const Invoice = () => {
  const { id } = useLoaderData() as paramsType; // Get ID from loader data
  const [invoice, setInvoice] = useState<InvoiceType | null>(null); // State to hold invoice data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchInvoice = async () => {
      const fetchedInvoice = await useFetchData(
        `https://invoice-app-bknd-strapi-cloud.onrender.com/invoices/${id}`
      );
      setInvoice(fetchedInvoice);
      setLoading(false); // Set loading to false after fetching
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Handle loading state
  }

  if (!invoice) {
    return <div>Invoice not found.</div>; // Handle case where invoice is not found
  }

  return (
    <div className={styles.invoicePage}>
      <div className={styles.container}>
        <GoBack />
        <InvoiceNav invoice={invoice} />
        <InvoicePaper invoice={invoice} />
      </div>
    </div>
  );
};

export default Invoice;
