import CDSButton from '@/components/common/button/CDSButton';

function ButtonPage() {
  const handleClick = (e) => {
    /** @EventHandler */
    console.log(e);
  };

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: 'calc(100vw - 40px)',
        padding: '0 20px',
      }}
    >
      <CDSButton btnType="normal" onClick={handleClick}>
        거절
      </CDSButton>
      <span style={{ margin: '0 5px' }} />
      <CDSButton btnType="normal_colored" onClick={handleClick}>
        수락
      </CDSButton>
      <br />
      <CDSButton btnType="delete" onClick={handleClick}>
        삭제
      </CDSButton>
      <br />
      <CDSButton btnType="cancel" onClick={handleClick}>
        취소
      </CDSButton>
      <br />
      <CDSButton btnType="edit" onClick={handleClick}>
        입력
      </CDSButton>
      <br />
      <CDSButton btnType="modal" onClick={handleClick}>
        취소
      </CDSButton>
      <span style={{ margin: '0 5px' }} />
      <CDSButton btnType="modal_colored" onClick={handleClick}>
        생성
      </CDSButton>
      <br />
      <CDSButton btnType="modal_single" onClick={handleClick}>
        확인
      </CDSButton>
      <br />
      <CDSButton btnType="auth" onClick={handleClick}>
        로그인
      </CDSButton>
      <br />
      <CDSButton btnType="auth" onClick={handleClick} disabled>
        로그인
      </CDSButton>
      <br />
      <CDSButton btnType="column" onClick={handleClick}>
        새로운 컬럼 추가하기
      </CDSButton>
      <br />
      <CDSButton btnType="todo" onClick={handleClick} />
      <br />
      <CDSButton btnType="dashboard_add" onClick={handleClick}>
        새로운 대시보드
      </CDSButton>
      <br />
      <CDSButton btnType="dashboard_delete" onClick={handleClick}>
        대시보드 삭제하기
      </CDSButton>
      <br />
      <CDSButton btnType="dashboard_card" badge="#7ac555" onClick={handleClick}>
        비브리지
      </CDSButton>
      <br />
      <CDSButton btnType="dashboard_card" badge="#760dde" onClick={handleClick}>
        비브리지
      </CDSButton>
      <br />
      <CDSButton btnType="dashboard_card" badge="#ffa500" onClick={handleClick}>
        비브리지
      </CDSButton>
      <br />
      <CDSButton btnType="dashboard_card" badge="#76a5ea" onClick={handleClick}>
        비브리지
      </CDSButton>
      <br />
      <CDSButton btnType="dashboard_card" badge="#e876ea" onClick={handleClick}>
        비브리지
      </CDSButton>
      <br />
      <CDSButton
        btnType="dashboard_card"
        badge="#7ac555"
        owner
        onClick={handleClick}
      >
        비브리지
      </CDSButton>
      <br />
      <CDSButton btnType="pagination_prev" onClick={handleClick} disabled />
      <CDSButton btnType="pagination_next" onClick={handleClick} />
    </div>
  );
}

export default ButtonPage;
