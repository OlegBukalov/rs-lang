import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from 'src/app/features/auth/auth.service';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'cardAsset',
})
export class CardAssetPipe implements PipeTransform {
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private sanitizer: DomSanitizer,
  ) {}

  async transform(fragment: string): Promise<SafeResourceUrl> {
    try {
      const headers = new HttpHeaders({ Authorization: `Bearer ${this.auth.token}` });
      const url = `${environment.baseUrl}/${fragment}`;
      const blob = await this.http.get(url, { headers, responseType: 'blob' }).toPromise();
      const reader = new FileReader();
      return await new Promise((resolve) => {
        reader.onload = () => {
          const result: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            reader.result as string,
          );
          resolve(result);
        };
        reader.readAsDataURL(blob);
      });
    } catch {
      // TODO: return fallback image;
      return '';
    }
  }
}
