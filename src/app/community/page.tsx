import CommunityPage from '@/components/community/CommunityPage';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // إعادة التحقق كل ساعة

export default function Community() {
  return <CommunityPage />;
}
