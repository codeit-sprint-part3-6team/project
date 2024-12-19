import { useState, useCallback } from 'react';
import getCards from '@/lib/dashboard/getCards';
import { GetCardsResponse } from '@/type/card';

function useColumnData(targetId: number) {
  const [columnData, setColumnData] = useState<GetCardsResponse>({
    cards: [],
    totalCount: 0,
    cursorId: null,
  });

  const fetchCards = useCallback(
    async (cursor?: number, size = 4, reset = false) => {
      try {
        const response = await getCards({
          teamId: '11-6',
          size,
          columnId: targetId,
          cursorId: cursor,
        });

        const { cards, totalCount, cursorId } = response;

        setColumnData((prev) => ({
          cards: reset ? cards : [...prev.cards, ...cards],
          totalCount,
          cursorId,
        }));
      } catch (error) {
        console.error('컬럼 조회 실패 : ', error);
      }
    },
    [targetId],
  );

  return { columnData, fetchCards };
}

export default useColumnData;
