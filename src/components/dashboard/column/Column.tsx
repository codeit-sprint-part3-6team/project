import styles from '@/components/dashboard/column/Column.module.css';
import CDSButton from '@/components/common/button/CDSButton';
import Card from '@/components/dashboard/card/Card';
import { useCallback, useEffect } from 'react';
import SettingIcon from 'public/ic/ic_setting.svg';
import Link from 'next/link';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import useColumnData from '@/hooks/useColumnData';

interface ColumnProp {
  columnId: number;
  columnTitle: string;
}

function Column({ columnId, columnTitle }: ColumnProp) {
  const { columnData, setColumnData, fetchCards } = useColumnData(columnId);

  const handleObserver = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && columnData.cursorId)
        fetchCards(columnData.cursorId);
    },
    [fetchCards, columnData.cursorId],
  );

  const endPoint = useIntersectionObserver(handleObserver);

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return (
    <div className={styles.column}>
      <div className={styles['column-title-section']}>
        <div className={styles['column-title']}>
          {columnTitle}
          <span className={styles['column-size']}>{columnData.totalCount}</span>
        </div>
        <Link
          href={`/dashboard/${columnId}/edit`}
          className={styles['btn-edit-column']}
        >
          <SettingIcon className={styles['icon-setting']} />
        </Link>
      </div>
      <CDSButton btnType="todo" />
      <div className={styles['card-section']}>
        {columnData.cards.map(
          ({
            imageUrl,
            id,
            title,
            tags,
            dueDate,
            assignee: { nickname, profileImageUrl },
          }) => (
            <Card
              key={`card_${id}`}
              imageUrl={imageUrl}
              id={id}
              title={title}
              tags={tags}
              dueDate={dueDate}
              nickname={nickname}
              profileImage={profileImageUrl}
              columnTitle={columnTitle}
              setColumnData={setColumnData}
            />
          ),
        )}
        {columnData.cursorId && (
          <div ref={endPoint} className={styles['end-point']} />
        )}
      </div>
    </div>
  );
}

export default Column;
