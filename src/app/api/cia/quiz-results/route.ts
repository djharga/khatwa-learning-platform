import { NextResponse } from 'next/server';

export async function GET() {
  const quizResults = [
    {
      id: 'qr-1',
      userId: 'u-100',
      userName: 'متدرب 1',
      score: 78,
      totalQuestions: 20,
      correctAnswers: 15,
      timeSpent: 22 * 60,
      completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      quizType: 'free',
      difficulty: 'متوسط',
    },
    {
      id: 'qr-2',
      userId: 'u-101',
      userName: 'متدرب 2',
      score: 85,
      totalQuestions: 25,
      correctAnswers: 21,
      timeSpent: 45 * 60,
      completedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
      quizType: 'premium',
      difficulty: 'صعب',
    },
    {
      id: 'qr-3',
      userId: 'u-100',
      userName: 'متدرب 1',
      score: 92,
      totalQuestions: 15,
      correctAnswers: 14,
      timeSpent: 28 * 60,
      completedAt: new Date(Date.now() - 86400000 * 15).toISOString(),
      quizType: 'certification',
      difficulty: 'متوسط',
    }
  ];

  return NextResponse.json({ quizResults });
}
