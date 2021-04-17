import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAssetPipe } from './card-asset.pipe';
import { FullscreenDirective } from './fullscreen.directive';

@NgModule({
  declarations: [CardAssetPipe, FullscreenDirective],
  imports: [CommonModule],
  exports: [CardAssetPipe, FullscreenDirective],
})
export class SharedModule {}
