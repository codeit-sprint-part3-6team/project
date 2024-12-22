import CDSButton from '@/components/common/button/CDSButton';
import getMembers, { GetMembersResponse } from '@/lib/editdashboard/getMembers';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberList from './MemberList';
import styles from './MemberTitle.module.css';

export default function MemberTitle() {
  const [members, setMembers] = useState<GetMembersResponse['members']>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const dashboardId = Number(router.query.id);

  useEffect(() => {
    if (!router.query.id) return;
    
    const fetchMembers = async () => {
      try {
        const response = await getMembers({
          page: currentPage,
          size: 4,
          dashboardId: Number(router.query.id),
        });
        setMembers(response.members);
        setTotalPages(Math.ceil(response.totalCount / 4));
      } catch (error) {
        alert('Failed to fetch members.');
      }
    };
    fetchMembers();
  }, [router.query.id, currentPage]);

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };


  return (
    <section className={styles.title_container}>
      <div className={styles.member_section}>
        <h1 className={styles.title}>구성원</h1>
        <div className={styles.button}>
          <span className={styles.page_info}>
            {currentPage} 페이지 중 {totalPages}
          </span>
          <CDSButton
            btnType="pagination_prev"
            onClick={() => handlePageChange('prev')}
            disabled={currentPage === 1}
          />
          <CDSButton
            btnType="pagination_next"
            onClick={() => handlePageChange('next')}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
      <div className={styles.name_section}>
        <h2 className={styles.sub_title}>이름</h2>
        <MemberList members={members} />
      </div>
    </section>
  );
}
