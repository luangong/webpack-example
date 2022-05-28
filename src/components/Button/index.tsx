import styles from './styles.module.css';

type ButtonProps = {
  text: string;
};

export default function Button({ text }: ButtonProps) {
  return (
    // eslint-disable-next-line
    <button type="button" className={styles.button}>
      {text}
    </button>
  );
}
