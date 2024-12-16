import styles from '@/components/dashboard/column/Column.module.css';
import CDSButton from '@/components/common/button/CDSButton';
import Card from '@/components/dashboard/card/Card';
import getCards from '@/lib/dashboard/getCards';
import { GetCardsResponse } from '@/type/card';
import { MouseEventHandler, useEffect, useState } from 'react';
import SettingIcon from 'public/ic/ic_setting.svg';
import Link from 'next/link';

interface ColumnProp {
  targetId: number;
  title: string;
}

function Column({ targetId, title }: ColumnProp) {
  const [columnData, setColumnData] = useState<GetCardsResponse>({
    cards: [],
    totalCount: null,
    cursorId: null,
  });

  const fetchCards = async () => {
    try {
      const response = await getCards({ teamId: '11-6', columnId: targetId });

      const { cards, totalCount, cursorId } = response;

      setColumnData({ cards, totalCount, cursorId });
    } catch (error) {
      console.error('컬럼 조회 실패 : ', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);
  return (
    <div className={styles.column}>
      <div className={styles['column-title-section']}>
        <div className={styles['column-title']}>
          {title}
          <span className={styles['column-size']}>
            {columnData.cards.length}
          </span>
        </div>
        <Link
          href={`/dashboard/${targetId}/edit`}
          className={styles['btn-edit-column']}
        >
          <SettingIcon className={styles['icon-setting']} />
        </Link>
      </div>
      <CDSButton btnType="todo" />
      <div className={styles['card-section']}>
        {columnData.cards.map((card) => (
          <Card
            key={`card_${card.id}`}
            imageUrl={card.imageUrl}
            id={card.id}
            title={card.title}
            tags={card.tags}
            dueDate={card.dueDate}
          />
        ))}
      </div>
    </div>
  );
}

export default Column;
