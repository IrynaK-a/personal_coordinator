import cn from 'classnames';
import { StyledEngineProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { MENU_ITEMS } from '../../constants';

import styles from './ContactsSection.module.scss';

type Props = {
  className?: string;
};

export const ContactsSection: React.FC<Props> = ({ className }) => {
  return (
    <StyledEngineProvider injectFirst>
      <section
        id={MENU_ITEMS.Contacts}
        className={cn(styles.section, className)}
      >
        <h2 className={styles.sectionTitle}>Do you have questions?</h2>

        <p className={styles.sectionText}>
          Contact our team if you have any questions and we will very happy to
          help you with everything
        </p>

        <form className={styles.contactsForm}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter your email"
          />

          <Button
            variant="contained"
            type="submit"
            className={styles.button}
          >
            Submit
          </Button>
        </form>
      </section>
    </StyledEngineProvider>
  );
};
