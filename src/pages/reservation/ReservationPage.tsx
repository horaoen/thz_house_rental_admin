import { ReservationQueryForm } from "./components/reservationQueryForm";
import { ReservationTable } from "./components/reservationTable";
import styles from "./ReservationPage.module.css";

export const ReservationPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <ReservationQueryForm />
      <ReservationTable />
    </div>
  );
};
