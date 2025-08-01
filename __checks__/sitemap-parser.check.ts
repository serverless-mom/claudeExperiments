import https from 'https';
import { Frequency, UrlMonitor, UrlAssertionBuilder } from 'checkly/constructs'
const sitemapUrl = 'https://openai.com/sitemap.xml';

function downloadSitemap(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', () => {
        resolve(data);
      });
      response.on('error', (error) => {
        reject(error);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

function parseSitemap(xmlData: string): string[] {
  const urls: string[] = [];
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = urlRegex.exec(xmlData)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

function createMonitors(urls){
  urls.forEach((url, index) => {
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
}

async function main() {
  console.log('Downloading sitemap from:', sitemapUrl);
  const xmlData = await downloadSitemap(sitemapUrl);
  console.log('Sitemap downloaded successfully');
  const urls = parseSitemap(xmlData);
  createMonitors(urls);
}

main();