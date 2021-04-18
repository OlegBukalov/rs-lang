import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAssetPipe } from './card-asset.pipe';
import { FullScreenButtonDirective } from './fullscreen.directive';

@NgModule({
  declarations: [CardAssetPipe, FullScreenButtonDirective],
  imports: [CommonModule],
  exports: [CardAssetPipe, FullScreenButtonDirective],
})
export class SharedModule {}
