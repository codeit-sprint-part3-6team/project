import instance from '../instance';

export interface PostDashboardsParams {
  title: string;
  color: string;
}

export interface PostDashboardsResponse {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export default async function postDashboards(
  params: PostDashboardsParams,
): Promise<PostDashboardsResponse> {
  try {
    const { title, color } = params;

    const { data } = await instance.post<PostDashboardsResponse>(
      `/11-6/dashboards`,
      {
        title,
        color,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || '대시보드 등록에 실패했습니다.',
      );
    }
    throw new Error('대시보드 등록 요청 중 문제가 발생했습니다.');
  }
}
