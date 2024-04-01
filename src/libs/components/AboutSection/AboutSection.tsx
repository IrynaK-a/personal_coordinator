import cn from 'classnames';
import { StyledEngineProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { MENU_ITEMS } from '../../constants';

import styles from './AboutSection.module.scss';

type Props = {
  className?: string;
};

export const AboutSection: React.FC<Props> = ({ className }) => {
  return (
    <StyledEngineProvider injectFirst>
      <section
        id={MENU_ITEMS.About}
        className={cn(styles.section, className)}
      >
        <h2 className={styles.sectionTitle}>About the Project</h2>

        <p className={styles.aboutText}>
          <span className={styles.styledName}>Personal coordinator</span>
          is an innovating e-learning platform committed to ensuring accessible
          and effective education. Our platform is created to upgarate your
          studying experience and create a friendly and modern environment for
          studying
        </p>

        <h2 className={styles.subtitle}>
          <span className={styles.styledSubtitleText}>Experience a</span> better
          learning
          <span className={styles.styledSubtitleText}> with AI</span>
        </h2>

        <Button
          variant="contained"
          href={`#${MENU_ITEMS.Home}`}
          className={styles.button}
        >
          Try it
        </Button>

        <h3 className={styles.quote}>
          “We
          <span className={styles.styledQuoteText}> envision</span> a world with
          <span className={styles.styledQuoteText}> no limits</span>”
        </h3>
      </section>
    </StyledEngineProvider>
  );
};
