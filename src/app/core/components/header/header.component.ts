import { Component } from '@angular/core';
import { AuthService } from 'src/app/features/auth/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public authService: AuthService, private storage: StorageService) {}

  onClick(): void {
    this.authService.logout();
  }

  get textBookLink() {
    let groupId = this.storage.getItem('groupId');
    let pageId = this.storage.getItem('pageId');
    groupId = groupId || '0';
    pageId = pageId || '0';
    return `text-book/group/${groupId}/page/${pageId}`;
  }
}
