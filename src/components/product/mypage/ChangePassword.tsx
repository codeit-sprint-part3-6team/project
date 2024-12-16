import { useState } from 'react';
import CDSButton from '@/components/common/button/CDSButton';
import clsx from 'clsx';
import changePassword from '@/lib/mypage/changePassword';
import styles from './ChangePassword.module.css';

interface CheangePasswordValue {
  password: string;
  newPassword: string;
  confirmPassword: string;
  error: string;
}

const INITIAL_VALUES: CheangePasswordValue = {
  password: '',
  newPassword: '',
  confirmPassword: '',
  error: null,
};

interface CheangePasswordProps {
  initialValue?: CheangePasswordValue;
}

export default function ChangePassword({
  initialValue = INITIAL_VALUES,
}: CheangePasswordProps) {
  const [values, setValues] = useState(initialValue);
  // const [password, setPassword] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [error, setError] = useState(null);

  const handleChangePassword = async () => {
    try {
      const { password, newPassword } = values;
      const putData = { password, newPassword };
      await changePassword(putData);
      setValues({
        password: '',
        newPassword: '',
        confirmPassword: '',
        error: null,
      });
      // 비밀번호가 성공적으로 변경되었다는 모달 추가
    } catch (e) {
      console.error(e);
    }
  };

  const handleBlur = () => {
    const { newPassword, confirmPassword } = values;
    if (newPassword !== confirmPassword) {
      setValues((prevValues) => ({
        ...prevValues,
        error: '비밀번호가 일치하지 않습니다.',
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        error: null,
      }));
    }
  };

  const isFormValid =
    values.password &&
    values.newPassword &&
    values.confirmPassword &&
    !values.error;

  return (
    <section className={clsx(styles[`modify-profile`], styles[`bottom-box`])}>
      <p className={styles.title}>비밀번호 변경</p>
      <div>
        <p className={styles[`sub-title`]}>현재 비밀번호</p>
        <input
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          className={styles.input}
          placeholder="비밀번호 입력"
        />
      </div>
      <div>
        <p className={styles[`sub-title`]}>새 비밀번호</p>
        <input
          value={values.newPassword}
          onChange={(e) =>
            setValues({ ...values, newPassword: e.target.value })
          }
          className={styles.input}
          placeholder="새 비밀번호 입력"
          onBlur={handleBlur}
        />
      </div>
      <div>
        <p className={styles[`sub-title`]}>새 비밀번호 확인</p>
        <input
          value={values.confirmPassword}
          onChange={(e) =>
            setValues({ ...values, confirmPassword: e.target.value })
          }
          className={clsx(
            styles.input,
            values.error ? styles['error-input'] : styles[`bottom-input`],
            values.error ? styles['error-margin'] : '',
          )}
          placeholder="새 비밀번호 입력"
          onBlur={handleBlur}
        />
        {values.error && (
          <p className={styles['error-message']}>{values.error}</p>
        )}
      </div>
      <div>
        <CDSButton
          onClick={handleChangePassword}
          btnType="profile_save"
          disabled={!isFormValid}
        >
          변경
        </CDSButton>
      </div>
    </section>
  );
}
