export default async function sitemap() {
  const baseUrl = 'https://incoding.co.kr';
  
  // 기본 정적 페이지들
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/portfolio',
    '/lab',
    '/recommend'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.7
  }));

  // Lab 페이지들 (현재 알려진 것들)
  const labRoutes = [
    '/lab/LensRefraction'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.6
  }));

  try {
    // WordPress에서 recommend 페이지들 가져오기
    const response = await fetch('https://incodingco.mycafe24.com/wp-json/wp/v2/posts?categories=6&_fields=slug,modified', {
      next: { revalidate: 3600 } // 1시간마다 재검증
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    const recommendPosts = await response.json();
    
    const recommendRoutes = recommendPosts.map(post => ({
      url: `${baseUrl}/recommend/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'weekly',
      priority: 0.6
    }));

    return [...staticRoutes, ...labRoutes, ...recommendRoutes];
    
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // WordPress 데이터를 가져올 수 없는 경우 기본 페이지들만 반환
    return [...staticRoutes, ...labRoutes];
  }
} 