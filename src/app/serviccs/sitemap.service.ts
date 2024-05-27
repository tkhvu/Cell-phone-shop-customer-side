import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SitemapService {

  constructor() { }

  generateSitemap(): Observable<string> {
    const routes = [
      '/',
      '/Login',
      '/Createaccount',
      '/Listmobile',
      '/orderconfirmation',
      '/Director',
      '/Favourites',
      '/Sitemap'
    ];
    
    const now = new Date().toISOString().split('T')[0];
    const sitemapContent = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes.map(route => `
        <url>
          <loc>https://client-domain.com${route}</loc>
          <lastmod>${now}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.8</priority>
        </url>
      `).join('')}
    </urlset>
    `.trim();

    return of(sitemapContent);
  }
}
