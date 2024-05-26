// import { Component, OnInit } from '@angular/core';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { saveAs } from 'file-saver';
// import { SitemapService } from '../serviccs/sitemap.service';

// @Component({
//   selector: 'app-sitemap',
//   templateUrl: './sitemap.component.html',
//   styleUrls: ['./sitemap.component.css']
// })
// export class SitemapComponent implements OnInit {
//     sitemapData: string = '';
//     sitemapDownloadUrl: SafeUrl = '';

//   constructor(private sitemapService: SitemapService, private sanitizer: DomSanitizer) { }

//   ngOnInit(): void {
//     this.sitemapService.generateSitemap()
//       .subscribe(
//         data => {
//           this.sitemapData = data;
//           const blob = new Blob([data], { type: 'application/xml' });
//           this.sitemapDownloadUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
//           saveAs(blob, 'sitemap.xml'); // Automatically save the sitemap
//         },
//         error => console.error(error)
//       );
//   }
// }
