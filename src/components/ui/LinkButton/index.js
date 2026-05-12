import Link from "next/link";
import cn from "classnames";
import styles from "./LinkButton.module.css";

//temos 3 tamanhos de botao: lg, md e sm
//e dois estilos de botao: primary e outline

const LinkButton = ({ variant = "primary", size = "md", path, children }) => {
  return (
    <Link href={path} className={cn(styles.btn, styles[variant], styles[size])}>
      {children}
    </Link>
  );
};

export default LinkButton;
