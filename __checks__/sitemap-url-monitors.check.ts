import { Frequency, UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'
import * as https from 'https';
//grepped a sitemap.xml file for an array of URLs
let sitemapUrls = [
    'https://docs.anthropic.com/de/api/admin-api/workspace_members/get-workspace-member',
    'https://docs.anthropic.com/de/api/admin-api/workspace_members/list-workspace-members'
]

function downloadSitemap(url: string): void {
  https.get(url, (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
      data += chunk;
    });
    response.on('end', () => {
      console.log('Sitemap downloaded successfully');
      parseSitemap(data);
    });
    
    response.on('error', (error) => {
      console.error('Error downloading sitemap:', error);
      process.exit(1);
    });
  }).on('error', (error) => {
    console.error('Error downloading sitemap:', error);
    process.exit(1);
  });
}

function parseSitemap(xmlContent: string): void {
  const urls: string[] = [];
  // Simple regex to extract URLs from <loc> tags
  const locRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  
  while ((match = locRegex.exec(xmlContent)) !== null) {
    urls.push(match[1]);
  }
  
  console.log(`Found ${urls.length} URLs in sitemap`);
  console.log('\nSitemap URLs:');
  console.log(urls);
  sitemapUrls = urls;
}
downloadSitemap('https://openai.com/sitemap.xml')
//create paths and friendly names for each monitor
sitemapUrls.forEach((url, index) => {
    const urlPath = new URL(url).pathname.replace(/\//g, '-').replace(/^-+|-+$/g, '') || 'root'
    const monitorId = `checkly-${urlPath}-${index}`
    const monitorName = `Checkly ${urlPath.replace(/-/g, ' ')} Monitor`

    //create each monitor with a five minute interval
    new UrlMonitor(monitorId, {
        frequency: Frequency.EVERY_5M,
        name: monitorName,
        activated: true,
        request: {
            url: url,
            skipSSL: false,
            followRedirects: true,
            assertions: [
                UrlAssertionBuilder.statusCode().equals(200),
            ]
        }
    })
})