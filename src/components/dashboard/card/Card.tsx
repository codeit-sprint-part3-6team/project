import styles from '@/components/dashboard/card/Card.module.css';
import Chip from '@/components/common/chip/Chip';
import CardImage from '@/components/dashboard/card/CardImage';
import CalendarIcon from 'public/ic/ic_calendar.svg';
import formatDate from '@/utils/formatDate';
import useModal from '@/hooks/useModal';
import OverlayContainer from '@/components/common/modal/overlay-container/OverlayContainer';
import DetailCardModal from '@/components/common/modal/detail-cards/DetailCardModal';
import UserProfile from '@/components/common/userprofile/UserProfile';
import { GetCardsResponse } from '@/type/card';

interface CardProps {
  imageUrl: string;
  id: number;
  title: string;
  tags: string[];
  dueDate: string;
  nickname: string;
  profileImage: string | null;
  columnTitle: string;
  setColumnData: React.Dispatch<React.SetStateAction<GetCardsResponse>>;
}

function Card({
  imageUrl,
  id,
  title,
  tags,
  dueDate,
  nickname,
  profileImage,
  columnTitle,
  setColumnData,
}: CardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const fomattedDueDate = formatDate(dueDate);

  return (
    <>
      <button type="button" className={styles.card} onClick={openModal}>
        <CardImage image={imageUrl} name={title} />
        <div className={styles['content-section']}>
          <div className={styles['card-title']}>{title}</div>
          <div className={styles['description-section']}>
            <div className={styles['card-tags']}>
              {tags.map((tag) => (
                <Chip key={`${id}_tag_${tag}`} chipType="tag">
                  {tag}
                </Chip>
              ))}
            </div>
            <div className={styles['card-date']}>
              <CalendarIcon className={styles['icon-calendar']} />
              <span className={styles.date}>{fomattedDueDate}</span>
            </div>
            <div className={styles.badge}>
              <UserProfile
                type="dashboard-detail"
                profileImageUrl={profileImage}
                nickname={nickname}
                onlyImg
              />
            </div>
          </div>
        </div>
      </button>
      {isOpen && (
        <OverlayContainer>
          <DetailCardModal
            title={title}
            cardId={id}
            columnTitle={columnTitle}
            closeModal={closeModal}
            setColumnData={setColumnData}
          />
        </OverlayContainer>
      )}
    </>
  );
}

export default Card;
