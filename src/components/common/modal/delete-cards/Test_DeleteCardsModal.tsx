import { useState } from 'react';
import OverlayContainer from '../overlay-container/OverlayContainer';
import DeleteCardsModal from './DeleteCardsModal';

function TestDeleteCardsModal() {
  const [Modal, setModal] = useState(false);
  const onClick = () => {
    setModal(true);
  };

  const handleCancelClick = () => {
    setModal(false);
  };

  const handleDeleteClick = () => {
    console.log('Delete');
  };

  return (
    <>
      <button onClick={onClick}>카드 삭제 모달</button>
      {Modal && (
        <OverlayContainer>
          <DeleteCardsModal
            message={'컬럼의 모든 카드가 삭제됩니다.'}
            handleCancelClick={handleCancelClick}
            handleDeleteClick={handleDeleteClick}
          />
        </OverlayContainer>
      )}
    </>
  );
}

export default TestDeleteCardsModal;