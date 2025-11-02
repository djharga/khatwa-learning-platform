/**
 * SEO Utilities - أدوات تحسين محركات البحث
 * Utilities for generating SEO metadata, structured data, and social tags
 */

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  url?: string;
  image?: string;
  type?: 'website' | 'article' | 'course' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  locale?: string;
}

/**
 * Generate comprehensive meta tags for SEO
 */
export function generateSEOMetadata(config: SEOConfig) {
  const {
    title,
    description,
    keywords = [],
    url,
    image,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    locale = 'ar_EG',
  } = config;

  const siteName = 'خطى للتدريب والاستشارات';
  const siteUrl = url || 'https://khata-platform.com';
  const ogImage = image || `${siteUrl}/og-image.jpg`;
  const twitterHandle = '@khata_platform';

  return {
    title: title.includes(siteName) ? title : `${title} | ${siteName}`,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: twitterHandle,
      images: [ogImage],
    },
    alternates: {
      canonical: siteUrl,
    },
  };
}

/**
 * Generate JSON-LD structured data for various content types
 */
export function generateStructuredData(type: 'organization' | 'course' | 'article' | 'breadcrumb', data: any) {
  const baseUrl = 'https://khata-platform.com';

  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        name: 'خطى للتدريب والاستشارات',
        description: 'بيئة تعليمية متكاملة للمراجعة الداخلية والمحاسبة',
        url: baseUrl,
        logo: `${baseUrl}/globe.svg`,
        sameAs: [
          'https://twitter.com/khata_platform',
          'https://linkedin.com/company/khata-platform',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['Arabic', 'English'],
        },
        ...data,
      };

    case 'course':
      return {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: data.name,
        description: data.description,
        provider: {
          '@type': 'EducationalOrganization',
          name: 'خطى للتدريب والاستشارات',
        },
        ...data,
      };

    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.headline,
        description: data.description,
        author: {
          '@type': 'Organization',
          name: 'خطى للتدريب والاستشارات',
        },
        publisher: {
          '@type': 'Organization',
          name: 'خطى للتدريب والاستشارات',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/globe.svg`,
          },
        },
        ...data,
      };

    case 'breadcrumb':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };

    default:
      return null;
  }
}

/**
 * Generate sitemap entries
 */
export function generateSitemapEntry(
  url: string,
  lastmod?: string,
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' = 'weekly',
  priority = 0.8
) {
  return {
    url,
    lastmod: lastmod || new Date().toISOString(),
    changefreq,
    priority,
  };
}

