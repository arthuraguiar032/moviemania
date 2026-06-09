import TagButton from "@/components/ui/TagButton";
import styles from './TagList.module.css';

const TagList = ({items, getKey, getLabel, getPath}) => {
    return (
        <div className={styles.tagList}>
            {
                items?.map( (item) => {
                    return <TagButton label={getLabel(item)} path={getPath(item)} key={getKey(item)} /> 
                })
            }
        </div>
    );
};

export default TagList;