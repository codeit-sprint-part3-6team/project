import clsx from 'clsx';
import { CDSButtonProps, types } from '@/type/button';
import PlusIcon from 'public/ic/ic_chip.svg';
import CrownIcon from 'public/ic/ic_crown.svg';
import styles from './Button.module.css';
import Button from './Button';

/**
 * CDSButton: 다양한 버튼 유형을 처리하는 공통 버튼 컴포넌트.
 *
 * @param {CDSButtonProps} props - 커스텀 버튼 속성
 * @returns {JSX.Element} - 버튼 컴포넌트
 */
function CDSButton({
  children,
  btnType,
  badge,
  owner,
  ...props
}: CDSButtonProps) {
  /**
   * renderPlusIcon: 특정 버튼 유형에서 + 아이콘 렌더링
   * - 대상: 'column', 'todo', 'dashboard_add' 타입
   * @returns {JSX.Element} - + 아이콘
   */
  const renderPlusIcon = () =>
    ['column', 'todo', 'dashboard_add'].includes(btnType) && (
      <PlusIcon className={styles.icon_plus} />
    );

  /**
   * renderOwnerIcon: 대시보드 카드 유형에서 소유인 경우 왕관 아이콘 렌더링
   * - 조건: btnType === 'dashboard_card' && owner === true
   * @returns {JSX.Element} - 왕관 아이콘
   */
  const renderOwnerIcon = () =>
    btnType === 'dashboard_card' &&
    owner && <CrownIcon className={styles.icon_crown} />;

  /**
   * renderBadge: 대시보드 카드 유형에서 색상 배지 렌더링
   * - 조건: btnType === 'dashboard_card' && badge !== null
   * @returns {JSX.Element} - 배지 span 태그
   */
  const renderBadge = () =>
    btnType === 'dashboard_card' &&
    badge && <span className={clsx(styles.badge, styles[badge])} />;

  return (
    <Button classes={types[btnType].classes} {...props}>
      <span className={styles.button_content}>
        {renderBadge()}
        {children}
        {renderPlusIcon()}
        {renderOwnerIcon()}
      </span>
    </Button>
  );
}

CDSButton.defaultProps = {
  badge: null,
  owner: false,
};

export default CDSButton;
