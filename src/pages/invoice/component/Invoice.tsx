import { useLoaderData } from 'react-router-dom';
// styles
import styles from '../../../assets/styles/modules/invoice/invoicepage.module.css';
// components
import GoBack from '../../../components/button/GoBack';
import InvoiceNav from './../component/InvoiceNav';
import InvoicePaper from './../component/InvoicePaper';
// types
import { paramsType } from '..';

/**
 * Invoice page component
 * {object} invoice Invoice information
 * 
 * @returns JSX.Element instance
 */

const Invoice = () => {
	const { invoice } = useLoaderData() as paramsType;
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