import Link from "next/link";
import styles from "../../styles/components/Customer/Breadcrumb.module.scss";

interface Props {
  category?: {
    name: string;
    url: string;
  };
  subCategory?: {
    name: string;
    url: string;
  };
  grandCategory?: {
    name: string;
    url: string;
  };
};

const Breadcrumb = ({ category, subCategory, grandCategory }: Props) => {
  return (
    <div className={styles.breadcrumb}>
      <Link href="/"><a>Home</a></Link> &gt;&nbsp;
      {category && <><Link href={`/categories/${category.url}`}><a>{category.name}</a></Link> &gt;&nbsp;</>}
      {subCategory && <><Link href={`/categories/${subCategory.url}`}><a>{subCategory.name}</a></Link> &gt;&nbsp;</>}
      {grandCategory && <><span>{grandCategory.name}</span></>}
    </div>
  );
};

export default Breadcrumb;
