import React, { useEffect } from "react";
import styles from "../../../../assets/styles/modules/Toaster.module.css";

interface NotificationProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

/**
 * A temporary notification component that automatically dismisses itself after 3 seconds.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.message - The text message to display in the notification
 * @param {('success'|'error'|'warning'|'info')} props.type - The type of notification which determines its styling
 * @param {() => void} props.onClose - Callback function to execute when the notification should be closed
 * 
 * @returns {JSX.Element} A styled notification element that displays the message
 * 
 * @example
 * // Success notification
 * <Notification 
 *   message="Operation completed successfully"
 *   type="success"
 *   onClose={() => setShowNotification(false)}
 * />
 * 
 * // Error notification
 * <Notification
 *   message="An error occurred"
 *   type="error"
 *   onClose={() => setShowNotification(false)}
 * />
 */

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {

  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>{message}</div>
  )
}

export default Notification;