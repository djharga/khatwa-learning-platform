'use client';

import { motion } from 'framer-motion';
import { User, Star, Users, BookOpen, Linkedin, Twitter, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface InstructorCardProps {
  instructor: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    bio: string;
    rating?: number;
    students?: number;
    courses?: number;
    email?: string;
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
  };
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200 dark:border-neutral-700"
    >
      <div className="flex items-start gap-6">
        <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100 dark:ring-blue-900/30 flex-shrink-0">
          <Image
            src={instructor.avatar}
            alt={instructor.name}
            width={96}
            height={96}
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {instructor.name}
              </h2>
              <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-3">
                {instructor.title}
              </p>
            </div>
            {instructor.rating && (
              <div className="flex items-center gap-2 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {instructor.rating}
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            {instructor.bio}
          </p>

          {/* Stats */}
          {(instructor.students || instructor.courses) && (
            <div className="flex flex-wrap gap-6 mb-6">
              {instructor.students && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">{instructor.students.toLocaleString()}</span>
                  <span>طالب</span>
                </div>
              )}
              {instructor.courses && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">{instructor.courses}</span>
                  <span>كورس</span>
                </div>
              )}
            </div>
          )}

          {/* Social Links */}
          {instructor.socialLinks && (
            <div className="flex items-center gap-4">
              {instructor.socialLinks.linkedin && (
                <Link
                  href={instructor.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              )}
              {instructor.socialLinks.twitter && (
                <Link
                  href={instructor.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
              )}
              {instructor.socialLinks.website && (
                <Link
                  href={instructor.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                  aria-label="Website"
                >
                  <Globe className="w-5 h-5" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
}

